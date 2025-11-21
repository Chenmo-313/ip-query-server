document.getElementById("queryBtn").addEventListener("click", loadIPInfo);

async function loadIPInfo() {
  document.getElementById("info").innerHTML = "正在查询...";
  try {
    const res = await fetch("/api/ip");
    const data = await res.json();

    document.getElementById("info").innerHTML = `
      <b>IP 地址：</b> ${data.ip}<br>
      <b>城市：</b> ${data.city || "未知"}<br>
      <b>地区：</b> ${data.region || "未知"}<br>
      <b>国家：</b> ${data.country || "未知"}<br>
      <b>位置：</b> ${data.loc || "未知"}<br>
      <b>ISP：</b> ${data.org || "未知"}<br>
      <b>邮编：</b> ${data.postal || "未知"}<br>
    `;

    if (data.loc) {
      const [lat, lon] = data.loc.split(",");
      showMap(lat, lon);
    } else {
      showMap(0, 0);
    }
  } catch (err) {
    console.error(err);
    document.getElementById("info").innerHTML = "<b>无法获取 IP 信息</b>";
    showMap(0, 0);
  }
}

function showMap(lat, lon) {
  const map = L.map("map").setView([lat, lon], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);
  L.marker([lat, lon]).addTo(map).bindPopup("你的位置").openPopup();
}
