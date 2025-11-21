// 获取公网 IP
async function getCurrentIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error("获取公网 IP 错误：", error);
    return null;
  }
}

// 查询 IP 信息
async function loadIPInfo() {
  const ip = await getCurrentIP();
  if (!ip) {
    document.getElementById("info").innerHTML = "无法获取公网 IP";
    return;
  }

  const res = await fetch(`/api/ip?ip=${ip}`);
  const data = await res.json();
  document.getElementById("info").innerHTML = `
    <b>IP 地址：</b>${data.ip}<br>
    <b>城市：</b>${data.city || "未知"}<br>
    <b>地区：</b>${data.region || "未知"}<br>
    <b>国家：</b>${data.country || "未知"}<br>
    <b>位置：</b>${data.loc || "未知"}<br>
  `;

  if (data.loc) {
    const [lat, lon] = data.loc.split(",");
    showMap(lat, lon);
  }
}
