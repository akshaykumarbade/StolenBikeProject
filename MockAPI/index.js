const express = require("express");
const app = express();
//import { DumnyData } from './DumyData';
const DumyData = require("./DumyData");
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
    const { q } = req.url;
    const keys = ["id", "title", "body", "dateoftheft", "dateofReport", "location"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };
    q ? res.json(search(DumyData)) : res.json(DumyData);
})

app.listen("5000", () => {
    console.log("Backend is running");
})