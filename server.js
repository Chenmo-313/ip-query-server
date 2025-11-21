// server.js

const axios = require('axios');
const express = require('express');
const app = express();

app.get('/api/ip', async (req, res) => {
  const ip = req.query.ip;
  const token = 'YOUR_API_KEY';  // 使用你的 ipinfo.io API 密钥
  const url = `https://ipinfo.io/${ip}?token=${token}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);  // 返回 IP 详细信息
  } catch (err) {
    console.error('IP 查询失败:', err);
    res.status(500).json({ error: '无法获取 IP 信息' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
