import { getAccessToken } from "../utils/accessToken.js";
import axios from "axios";

const BASE_URL = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search';


export const searchItemController = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const queryParams = new URLSearchParams(req.query).toString();
        const response = await axios.get(`${BASE_URL}?${queryParams}`, {

            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-Type': 'application/json'
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Search details:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
}