const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

app.get("/tour", async (req, res) => {
  try {
    const areaCode = req.query.areaCode || 1;

    const url =
      `https://apis.data.go.kr/B551011/KorService2/areaBasedList2` +
      `?serviceKey=${process.env.SERVICE_KEY}` +
      `&numOfRows=12` +
      `&pageNo=1` +
      `&MobileOS=ETC` +
      `&MobileApp=AppTest` +
      `&_type=json` +
      `&areaCode=${areaCode}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).send("error");
  }
});

app.listen(3000, () => {
  console.log("server start");
});