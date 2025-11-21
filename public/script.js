document.getElementById("btn").addEventListener("click", loadIPInfo);

async function loadIPInfo() {
  const infoEl = document.getElementById("info");
  infoEl.innerHTML = "正在查询...";

  try {
    const res = await fetch("/api/ip");
    const data = await res.json();

    infoEl.innerHTML = `
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
  } catch (err) {
    console.error(err);
    infoEl.innerHTML = "无法获取 IP 信息";
  }
}

function showMap(lat, lon) {
  const mapEl = document.getElementById("map");
  mapEl.innerHTML = ""; // 清空地图
  const map = L.map("map").setView([lat, lon], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
  L.marker([lat, lon]).addTo(map).bindPopup("你的位置").openPopup();
}
