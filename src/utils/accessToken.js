import axios from "axios";
import qs from "qs"


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


let accessToken = null
let tokenExpiry = null

const getAccessToken = async () => {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post(
            'https://api.sandbox.ebay.com/identity/v1/oauth2/token/',
            qs.stringify({
                grant_type: 'client_credentials',
                scope: 'https://api.ebay.com/oauth/api_scope'
            }),
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        console.log('Generated accessToken: ', response.data);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching OAuth token:', error);
        throw error;
    }
};

export { getAccessToken }