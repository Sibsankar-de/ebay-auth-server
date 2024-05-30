import express from "express";
import axios from "axios";
import dotenv from "dotenv"
import cors from "cors"
import { itemController } from "./controllers/item.controller.js";
import { searchItemController } from "./controllers/searchItem.controller.js";

dotenv.config({
    path: './env'
})


const port = process.env.PORT || 4000
const app = express();

app.use(express.json());
app.use(cors());




app.get('/api/v1/item/:itemId', itemController);
app.get('/api/v1/search', searchItemController);



app.listen(port, () => {
    console.log(`Proxy server is running at http://localhost:${port}`);
});
