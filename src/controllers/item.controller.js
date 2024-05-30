import { getAccessToken } from "../utils/accessToken.js";
import axios from "axios";

const BASE_URL = 'https://api.sandbox.ebay.com/buy/browse/v1/item/';

export const itemController = async (req, res) => {
    const { itemId } = req.params;

    if (!itemId) {
        return res.status(400).json({ error: 'Item id is required' });
    }

    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`${BASE_URL}${req.params.itemId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching item details:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
}