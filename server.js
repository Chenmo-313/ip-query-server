const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// IP 查询 API
app.get("/api/ip", async (req, res) => {
  try {
    // 如果前端没有传 ip，就使用访问者的真实 IP
    let ip = req.query.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // IPv6 前缀处理
    if (ip.startsWith("::ffff:")) ip = ip.split("::ffff:")[1];
    
    const response = await axios.get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    // 查询失败时返回示例 IP
    res.json({
      ip: "8.8.8.8",
      city: "Mountain View",
      region: "California",
      country: "US",
      loc: "37.4056,-122.0775",
      org: "AS15169 Google LLC",
      postal: "94043",
      timezone: "America/Los_Angeles"
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
