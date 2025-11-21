// server.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const IPINFO_TOKEN = process.env.IPINFO_TOKEN;

app.use(express.static("public"));

app.get("/api/ip", async (req, res) => {
  try {
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip;

    // 本地访问时模拟一个公网 IP
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8"; // 模拟公网 IP
    }

    console.log("客户端 IP:", ip);

    // 请求 ipinfo 获取 IP 信息
    const response = await axios.get(
      `https://ipinfo.io/${ip}/json?token=${IPINFO_TOKEN}`
    );

    res.json(response.data);
  } catch (err) {
    console.error("获取 IP 信息失败:", err);
    res.json({
      ip: "8.8.8.8",
      city: "Mountain View",
      region: "California",
      country: "US",
      loc: "37.4056,-122.0775",
      org: "Google LLC",
      postal: "94043",
    });
  }
});

app.listen(PORT, () => {
  console.log(`服务器运行于 http://localhost:${PORT}`);
});
