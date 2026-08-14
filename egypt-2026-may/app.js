const places = {
  cairoAirport: {
    name: "开罗机场",
    city: "开罗",
    lat: 30.1119,
    lng: 31.4140,
    note: "入境后取车，直接向红海方向开。"
  },
  hurghada: {
    name: "赫尔格达",
    city: "赫尔格达",
    lat: 27.2579,
    lng: 33.8116,
    note: "第一晚休整；次日可安排出海、海钓、跳岛、追海豚。"
  },
  hurghadaMarina: {
    name: "赫尔格达出海码头",
    city: "赫尔格达",
    lat: 27.2253428,
    lng: 33.8422113,
    note: "建议提前一天到码头谈价格和服务商。"
  },
  dendera: {
    name: "丹德拉神庙群",
    city: "基纳",
    lat: 26.1419375,
    lng: 32.6702031,
    note: "赫尔格达到卢克索途中顺路。开放时间参考 7:00-17:00。"
  },
  luxor: {
    name: "卢克索",
    city: "卢克索",
    lat: 25.6872,
    lng: 32.6396,
    note: "神庙密度最高，适合安排 2 晚。"
  },
  luxorTemple: {
    name: "卢克索神庙",
    city: "卢克索",
    lat: 25.6995,
    lng: 32.6391,
    note: "夜游亮灯约 19:00，21:00 关灯。"
  },
  karnak: {
    name: "卡纳克神庙",
    city: "卢克索",
    lat: 25.7188,
    lng: 32.6573,
    note: "重点看羊头狮身像大道、大列柱厅、方尖碑和圣甲虫。"
  },
  medinetHabu: {
    name: "哈布城",
    city: "卢克索",
    lat: 25.7194,
    lng: 32.6014,
    note: "西岸行程重点，可与帝王谷方向组合。"
  },
  komOmbo: {
    name: "考姆翁布神庙",
    city: "考姆翁布",
    lat: 24.4522,
    lng: 32.9281,
    note: "卢克索前往阿斯旺路上顺访。"
  },
  aswan: {
    name: "阿斯旺",
    city: "阿斯旺",
    lat: 24.0889,
    lng: 32.8998,
    note: "尼罗河下午茶和落日帆船是当天主线。"
  },
  oldCataract: {
    name: "Old Cataract Hotel",
    city: "阿斯旺",
    lat: 24.0821,
    lng: 32.8876,
    note: "下午茶观景位，预算高但复古感强。"
  },
  abuSimbel: {
    name: "阿布辛贝神庙",
    city: "阿布辛贝",
    lat: 22.3372319,
    lng: 31.625799,
    note: "全程最远折返点，建议凌晨或清晨出发。"
  },
  pyramids: {
    name: "吉萨金字塔",
    city: "开罗",
    lat: 29.9792,
    lng: 31.1342,
    note: "重点看胡夫金字塔和六塔重叠机位。"
  },
  menaHouse: {
    name: "Marriott Mena House",
    city: "开罗",
    lat: 29.985364,
    lng: 31.133072,
    note: "绿洲金字塔视角，适合拍照。"
  },
  marsaMatruh: {
    name: "马特鲁港",
    city: "马特鲁港",
    lat: 31.3543,
    lng: 27.2373,
    note: "地中海海岸休整两晚。"
  },
  cairo: {
    name: "开罗",
    city: "开罗",
    lat: 30.0444,
    lng: 31.2357,
    note: "返程前收尾。"
  }
};

const days = [
  {
    date: "5 月 1 日",
    title: "开罗机场 → 赫尔格达",
    drive: "约 460 公里",
    route: ["cairoAirport", "hurghada"],
    activities: ["抵达取车", "入住 Sunny Days Palma De Mirette Resort & SPA", "躺酒店、倒时差、恢复体力"],
    stay: "赫尔格达"
  },
  {
    date: "5 月 2 日",
    title: "赫尔格达 → 丹德拉 → 卢克索",
    drive: "约 320 公里",
    route: ["hurghada", "hurghadaMarina", "dendera", "luxor"],
    activities: ["上午出海：海钓、跳岛、追海豚", "途中顺访丹德拉神庙群", "晚上视体力夜游卡纳克或卢克索神庙"],
    stay: "卢克索娜芙蒂蒂酒店"
  },
  {
    date: "5 月 3 日",
    title: "卢克索西岸与神庙日",
    drive: "市内短途",
    route: ["luxor", "medinetHabu", "karnak", "luxorTemple"],
    activities: ["哈布城", "卡纳克神庙或卢克索神庙二选一补齐", "可增加帝王谷方向"],
    stay: "卢克索"
  },
  {
    date: "5 月 4 日",
    title: "卢克索 → 考姆翁布 → 阿斯旺",
    drive: "约 250 公里",
    route: ["luxor", "komOmbo", "aswan", "oldCataract"],
    activities: ["途中看考姆翁布神庙", "阿斯旺尼罗河下午茶", "16:30 后安排落日帆船巡航"],
    stay: "ASWAN NILE PALACE"
  },
  {
    date: "5 月 5 日",
    title: "阿斯旺 → 阿布辛贝 → 卢克索",
    drive: "约 750 公里",
    route: ["aswan", "abuSimbel", "luxor"],
    activities: ["阿布辛贝神庙", "长距离回程到卢克索", "今天建议极早出发，减少夜路"],
    stay: "卢克索娜芙蒂蒂酒店"
  },
  {
    date: "5 月 6 日",
    title: "卢克索 → 开罗",
    drive: "约 650 公里",
    route: ["luxor", "cairo"],
    activities: ["以赶路为主", "入住 Great Pyramid Inn", "晚上休整或看金字塔夜景"],
    stay: "开罗 Great Pyramid Inn"
  },
  {
    date: "5 月 7 日",
    title: "开罗金字塔 → 马特鲁港",
    drive: "约 450 公里",
    route: ["cairo", "pyramids", "menaHouse", "marsaMatruh"],
    activities: ["胡夫金字塔", "Mena House 绿洲金字塔视角拍照", "下午北上马特鲁港"],
    stay: "Hostmark Blue Beach Hotel"
  },
  {
    date: "5 月 8 日",
    title: "马特鲁港海岸休整",
    drive: "轻松日",
    route: ["marsaMatruh"],
    activities: ["地中海海岸休息", "补拍照、补睡眠", "为回开罗留体力"],
    stay: "马特鲁港"
  },
  {
    date: "5 月 9 日",
    title: "马特鲁港 → 开罗",
    drive: "约 440 公里",
    route: ["marsaMatruh", "cairo"],
    activities: ["返程开罗", "还车前整理行李", "补买纪念品或安排轻量城市活动"],
    stay: "开罗"
  },
  {
    date: "5 月 10 日",
    title: "开罗返程",
    drive: "机场交通",
    route: ["cairo", "cairoAirport"],
    activities: ["预留机场安检、退税、还车时间", "返程"],
    stay: "机上"
  }
];

const flights = [
  {
    direction: "去程",
    badge: "出发",
    date: "4 月 30 日 - 5 月 1 日",
    from: { code: "PVG", city: "上海浦东", terminal: "T2", time: "23:55", date: "4 月 30 日" },
    to: { code: "CAI", city: "开罗", terminal: "T3", time: "06:25", date: "5 月 1 日" },
    flightNo: "埃及航空 MS952",
    meta: "航程约 12 小时 30 分钟 · 登机 22:45 · 过夜航班",
    note: "抵达开罗机场后取车，直接自驾前往赫尔格达休整。"
  },
  {
    direction: "回程",
    badge: "返程",
    date: "5 月 10 日",
    from: { code: "CAI", city: "开罗", terminal: "T3", time: "01:25", date: "5 月 10 日" },
    to: { code: "PVG", city: "上海浦东", terminal: "T2", time: "17:00", date: "5 月 10 日" },
    flightNo: "埃及航空 MS951",
    meta: "航程约 10 小时 35 分钟",
    note: "前一晚就要按返程节奏收尾，预留还车、值机、安检和出境时间。"
  }
];

const lodgings = [
  {
    name: "Sunny Days Palma De Mirette Resort & SPA",
    city: "赫尔格达",
    dates: "5 月 1 日 - 5 月 2 日",
    nights: "1 晚",
    lat: 27.2447,
    lng: 33.8422,
    note: "抵达埃及后的第一晚，靠红海休整、倒时差。"
  },
  {
    name: "卢克索娜芙蒂蒂酒店",
    city: "卢克索",
    dates: "5 月 2 日 - 5 月 4 日；5 月 5 日 - 5 月 6 日",
    nights: "共 3 晚",
    lat: 25.7006,
    lng: 32.6410,
    note: "卢克索核心落脚点，方便安排东岸神庙和西岸行程。"
  },
  {
    name: "ASWAN NILE PALACE",
    city: "阿斯旺",
    dates: "5 月 4 日 - 5 月 5 日",
    nights: "1 晚",
    lat: 24.0839,
    lng: 32.8960,
    note: "阿斯旺过夜点，衔接尼罗河下午茶、落日帆船和次日阿布辛贝。"
  },
  {
    name: "Great Pyramid Inn",
    city: "吉萨 / 开罗",
    dates: "5 月 6 日 - 5 月 7 日",
    nights: "1 晚",
    lat: 29.9759,
    lng: 31.1378,
    note: "靠近金字塔区，适合晚上休整和次日清晨进金字塔。"
  },
  {
    name: "Hostmark Blue Beach Hotel",
    city: "马特鲁港",
    dates: "5 月 7 日 - 5 月 9 日",
    nights: "2 晚",
    lat: 31.3500,
    lng: 27.2634,
    note: "地中海海岸休整两晚，作为长途返开罗前的缓冲。"
  }
];

const spots = [
  {
    name: "赫尔格达出海",
    city: "红海",
    note: "海钓、跳岛、追海豚，建议提前一天到码头谈价格。",
    images: []
  },
  {
    name: "丹德拉神庙群",
    city: "基纳",
    note: "从赫尔格达去卢克索的途中顺路，开放时间参考 7:00-17:00。",
    images: [
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583288596-392c9c72-347e-4887-8c92-bdb489676e8d.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583298617-b7ac1ced-64c9-43f1-b98f-1079e910cc00.png"
    ]
  },
  {
    name: "卢克索神庙",
    city: "卢克索",
    note: "夜游亮灯约 19:00，21:00 关灯，亮灯前到更从容。",
    images: [
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583364677-5cdb94fd-c6c8-4985-9580-d2df4eecf4ad.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583373171-ff2c77fa-17be-4484-ae33-e6dc7bd71025.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583705050-ea08f44f-0045-4a37-8092-c0653c0f0cca.png"
    ]
  },
  {
    name: "卡纳克神庙",
    city: "卢克索",
    note: "羊头狮身像大道、大列柱厅、方尖碑、圣甲虫是核心看点。",
    images: [
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583811249-77c4aefc-207a-4082-98a1-dd37bd04b2ed.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583751117-5197a86e-e829-4eca-8440-f6cdd6de3ad0.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583756638-40a23e6a-64d4-49bd-8968-5e16c90aba04.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776583765520-8796ba74-1097-42b8-8143-93ed850e4e53.png"
    ]
  },
  {
    name: "哈布城",
    city: "卢克索",
    note: "西岸重点，可和帝王谷方向组合成半日线。",
    images: []
  },
  {
    name: "考姆翁布神庙",
    city: "考姆翁布",
    note: "卢克索到阿斯旺路上顺访，不建议专程折返。",
    images: [
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776585888810-7c2d9e0b-ed95-48bd-83e7-780102f3bb31.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776585905383-39d28369-bf2c-4000-85c4-bc4c5a51dd91.png"
    ]
  },
  {
    name: "阿斯旺尼罗河下午茶",
    city: "阿斯旺",
    note: "15:00-16:30 光线柔和，Old Cataract 复古，Freya Garden 性价比高。",
    images: [
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776587044039-cb5d3291-30e5-43c8-adb2-477797ede8fb.png",
      "https://cdn.nlark.com/yuque/0/2026/png/21411456/1776589496585-266926a4-e06c-4c16-bd02-e5d0b45d4d6b.png"
    ]
  },
  {
    name: "阿斯旺落日巡航",
    city: "阿斯旺",
    note: "16:30 出发，17:00-18:10 适合帆船日落。",
    images: ["https://cdn.nlark.com/yuque/0/2026/png/21411456/1776587909650-013f51a0-b8b3-4782-9554-fbd13afdbc01.png"]
  },
  {
    name: "阿布辛贝神庙",
    city: "阿布辛贝",
    note: "远但震撼，适合早起冲刺，当天行车压力最大。",
    images: []
  },
  {
    name: "胡夫金字塔",
    city: "吉萨",
    note: "重点安排六塔重叠机位和 Mena House 绿洲视角。",
    images: [
      "https://cdn.nlark.com/yuque/0/2025/png/21411456/1759128126477-13cd4be2-e571-48a6-9a07-763b021719eb.png",
      "https://cdn.nlark.com/yuque/0/2025/png/21411456/1759128170812-9b0e7564-5c11-438c-aff8-6d60c58aa7f3.png",
      "https://cdn.nlark.com/yuque/0/2025/png/21411456/1759128182834-a008377b-e271-43c5-9c52-323396fee1ca.png",
      "https://cdn.nlark.com/yuque/0/2025/png/21411456/1759397442011-6fe960bc-518f-4698-b458-f7dfcdf00e96.png"
    ]
  }
];

const prep = [
  {
    title: "出入境",
    items: [
      ["签证", true],
      ["保险", true],
      ["线上 check-in / 登机牌", true],
      ["护照、身份证、现金、银行卡", true]
    ]
  },
  {
    title: "医疗物品",
    items: [
      ["过敏药：氯雷他定、息斯敏", false],
      ["液体创可贴", true],
      ["碘伏棉签", true],
      ["膏药", true],
      ["晕船药", true],
      ["感冒药", false]
    ]
  },
  {
    title: "海边与摄影",
    items: [
      ["沙滩鞋", true],
      ["浴巾", true],
      ["泳衣", false],
      ["浮潜面镜和呼吸管", true],
      ["大疆 Action 及潜水配件", true]
    ]
  },
  {
    title: "生活用品",
    items: [
      ["衣服、袜子、内裤、鞋子", true],
      ["充电宝、手机充电器", true],
      ["电脑充电器", false],
      ["耳塞、眼罩、隐形眼镜、墨镜", true],
      ["国外流量卡 / 电话卡", true],
      ["万能转换插座", true],
      ["帽子和配饰", true]
    ]
  }
];

const palette = ["#2f6f54", "#246b8f", "#bb5a43", "#aa7a22", "#7a4f8f", "#3f7d7a", "#c06135", "#596b3b", "#8e4e63", "#4776a9"];
const allRouteKeys = days.flatMap((day) => day.route);
const boundsPoints = [
  ...[...new Set(allRouteKeys)].map((key) => [places[key].lat, places[key].lng]),
  ...lodgings.map((lodging) => [lodging.lat, lodging.lng])
];

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: true
});

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri | Route data &copy; OpenStreetMap contributors via OSRM",
  maxZoom: 19
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const lodgingLayer = L.layerGroup().addTo(map);
const fallbackLayer = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);
const labelLayer = L.layerGroup().addTo(map);
const fallbackRoutes = [];
const osmRoutes = [];
const lodgingMarkers = [];

const locationIcon = L.divIcon({
  className: "location-pin",
  html: '<span style="display:block;width:16px;height:16px;border:3px solid white;border-radius:50%;background:#bb5a43;box-shadow:0 2px 8px rgba(0,0,0,.3)"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const lodgingIcon = L.divIcon({
  className: "lodging-pin",
  html: '<span>住</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17]
});

Object.entries(places).forEach(([key, place]) => {
  L.marker([place.lat, place.lng], { icon: locationIcon })
    .bindPopup(`<div class="popup-title">${place.name}</div><div class="popup-note">${place.note}</div>`)
    .addTo(markerLayer);
});

lodgings.forEach((lodging, index) => {
  const marker = L.marker([lodging.lat, lodging.lng], { icon: lodgingIcon })
    .bindPopup(`
      <div class="popup-kicker">${lodging.city} · ${lodging.dates}</div>
      <div class="popup-title">${lodging.name}</div>
      <div class="popup-note">${lodging.nights}｜${lodging.note}</div>
    `)
    .addTo(lodgingLayer);
  marker.lodgingIndex = index;
  lodgingMarkers.push(marker);
});

days.forEach((day, index) => {
  const latlngs = day.route.map((key) => [places[key].lat, places[key].lng]);
  if (latlngs.length > 1) {
    const line = L.polyline(latlngs, {
      color: palette[index % palette.length],
      weight: 3,
      opacity: 0.5,
      dashArray: "7 8"
    }).bindPopup(`${day.date}｜${day.title}`).addTo(fallbackLayer);
    line.dayIndex = index;
    fallbackRoutes.push(line);
  }
});

map.fitBounds(boundsPoints, { padding: [45, 45] });
requestAnimationFrame(() => map.invalidateSize());
window.addEventListener("resize", () => map.invalidateSize());

function render() {
  document.querySelector("#flightSummary").innerHTML = flights
    .map((flight) => `
      <article class="flight-card">
        <div class="flight-card-top">
          <div>
            <div class="flight-kicker">${flight.badge} · ${flight.date}</div>
            <h3>${flight.direction}航班</h3>
          </div>
          <span class="flight-number">${flight.flightNo}</span>
        </div>
        <div class="flight-route">
          <div class="airport">
            <strong>${flight.from.code}</strong>
            <span>${flight.from.city} ${flight.from.terminal}</span>
            <em>${flight.from.date} ${flight.from.time}</em>
          </div>
          <div class="flight-line" aria-hidden="true">
            <span></span>
          </div>
          <div class="airport airport-arrival">
            <strong>${flight.to.code}</strong>
            <span>${flight.to.city} ${flight.to.terminal}</span>
            <em>${flight.to.date} ${flight.to.time}</em>
          </div>
        </div>
        <div class="flight-detail"><span>${flight.meta}</span></div>
        <p class="flight-note">${flight.note}</p>
      </article>
    `)
    .join("");

  document.querySelector("#routeFlow").innerHTML = days
    .map((day) => `
      <article class="flow-item">
        <div class="flow-date">${day.date}</div>
        <div>
          <div class="flow-title">${day.title}</div>
          <div class="flow-detail">${day.activities.join(" · ")}</div>
        </div>
      </article>
    `)
    .join("");

  document.querySelector("#dayList").innerHTML = days
    .map((day, index) => `
      <article class="day-card" data-day="${index}">
        <div class="day-top">
          <div>
            <div class="day-date">${day.date}</div>
            <h3>${day.title}</h3>
          </div>
          <span class="drive-pill">${day.drive}</span>
        </div>
        <p>${day.activities.join("；")}。</p>
        <div class="tag-row">
          <span class="tag">住宿：${day.stay}</span>
          ${day.route.map((key) => `<span class="tag">${places[key].name}</span>`).join("")}
        </div>
      </article>
    `)
    .join("");

  document.querySelector("#lodgingList").innerHTML = lodgings
    .map((lodging, index) => `
      <article class="lodging-card" data-lodging="${index}">
        <div class="lodging-top">
          <div>
            <div class="lodging-city">${lodging.city}</div>
            <h3>${lodging.name}</h3>
          </div>
          <span class="lodging-nights">${lodging.nights}</span>
        </div>
        <p>${lodging.note}</p>
        <div class="tag-row">
          <span class="tag">${lodging.dates}</span>
        </div>
      </article>
    `)
    .join("");

  document.querySelector("#spotList").innerHTML = spots
    .map((spot) => `
      <article class="spot-card">
        ${renderSpotImages(spot)}
        <div class="spot-meta">${spot.city}</div>
        <h3>${spot.name}</h3>
        <p>${spot.note}</p>
      </article>
    `)
    .join("");

  document.querySelector("#prepList").innerHTML = prep
    .map((group) => `
      <article class="prep-group">
        <h3>${group.title}</h3>
        <ul class="check-list">
          ${group.items.map(([label, done]) => `
            <li class="${done ? "done" : ""}">
              <span class="check">${done ? "✓" : ""}</span>
              <span>${label}</span>
            </li>
          `).join("")}
        </ul>
      </article>
    `)
    .join("");

  document.querySelector("#mapLegend").innerHTML = `
    <div class="legend-title">每日路线</div>
    ${days.map((day, index) => `
      <button class="legend-item" type="button" data-day="${index}" title="${day.title}">
        <span class="legend-date" style="background:${palette[index % palette.length]}">${shortDate(day.date)}</span>
        <span class="legend-route">${day.title}</span>
      </button>
    `).join("")}
  `;

  renderRouteLabels();
}

function renderSpotImages(spot) {
  if (!spot.images.length) {
    return "";
  }

  return `
    <div class="spot-images" aria-label="${spot.name} 图片">
      ${spot.images.map((url, index) => `
        <img
          src="${url}"
          alt="${spot.name} 参考图 ${index + 1}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.hidden=true"
        >
      `).join("")}
    </div>
  `;
}

function focusDay(index) {
  document.querySelectorAll(".day-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.day) === index);
  });
  document.querySelectorAll(".legend-item").forEach((item) => {
    item.classList.toggle("active", Number(item.dataset.day) === index);
  });

  const keys = days[index].route;
  const latlngs = keys.map((key) => [places[key].lat, places[key].lng]);
  if (latlngs.length === 1) {
    map.setView(latlngs[0], 10);
  } else {
    map.fitBounds(latlngs, { padding: [70, 70] });
  }
  highlightDay(index);
}

function focusLodging(index) {
  const lodging = lodgings[index];
  if (!lodging) return;
  lodgingLayer.addTo(map);
  document.querySelector("#toggleLodgingButton").setAttribute("aria-pressed", "true");
  map.setView([lodging.lat, lodging.lng], 13);
  lodgingMarkers[index]?.openPopup();
  document.querySelectorAll(".lodging-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.lodging) === index);
  });
}

function shortDate(dateText) {
  const match = dateText.match(/(\d+)\s*月\s*(\d+)\s*日/);
  return match ? `${match[1]}/${match[2]}` : dateText;
}

function getRouteMidpoint(latlngs) {
  const usable = latlngs.map((point) => Array.isArray(point) ? point : [point.lat, point.lng]);
  return usable[Math.floor((usable.length - 1) / 2)];
}

function renderRouteLabels() {
  labelLayer.clearLayers();
  days.forEach((day, index) => {
    if (day.route.length < 2) return;
    const latlngs = day.route.map((key) => [places[key].lat, places[key].lng]);
    const midpoint = getRouteMidpoint(latlngs);
    L.marker(midpoint, {
      icon: L.divIcon({
        className: "route-label-marker",
        html: `<span class="route-label" style="background:${palette[index % palette.length]}">${shortDate(day.date)}</span>`,
        iconSize: [42, 24],
        iconAnchor: [21, 12]
      }),
      interactive: true
    }).bindPopup(`${day.date}｜${day.title}`).on("click", () => focusDay(index)).addTo(labelLayer);
  });
}

function highlightDay(index) {
  fallbackRoutes.forEach((line) => {
    const active = line.dayIndex === index;
    line.setStyle({
      weight: active ? 6 : 3,
      opacity: active ? 0.86 : 0.38,
      dashArray: active ? "1 0" : "7 8"
    });
    if (active) line.bringToFront();
  });

  osmRoutes.forEach((line) => {
    const active = line.dayIndex === index;
    line.setStyle({
      weight: active ? 8 : 5,
      opacity: active ? 0.95 : 0.56
    });
    if (active) line.bringToFront();
  });
}

async function loadOsmRoutes() {
  const status = document.querySelector("#mapStatus");
  const button = document.querySelector("#loadRoutesButton");
  button.disabled = true;
  status.textContent = "正在向 OSRM 请求 OpenStreetMap 路线数据...";
  routeLayer.clearLayers();
  osmRoutes.length = 0;

  let loaded = 0;
  for (const [index, day] of days.entries()) {
    if (day.route.length < 2) continue;
    const coordinates = day.route
      .map((key) => `${places[key].lng},${places[key].lat}`)
      .join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&continue_straight=false`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      const route = json.routes?.[0]?.geometry;
      if (!route) throw new Error("No route");
      const routeLine = L.geoJSON(route, {
        style: {
          color: palette[index % palette.length],
          weight: 5,
          opacity: 0.82
        }
      }).bindPopup(`${day.date}｜${day.title}`).addTo(routeLayer);
      routeLine.dayIndex = index;
      osmRoutes.push(routeLine);
      routeLine.on("click", () => focusDay(index));
      loaded += 1;
    } catch (error) {
      console.warn(`Route failed: ${day.date}`, error);
    }
  }

  status.textContent = loaded
    ? `已加载 ${loaded} 段 OSRM / OpenStreetMap 路线；虚线为未加载成功的兜底连线。`
    : "OSM 路线暂未加载成功；当前显示虚线兜底路线。";
  button.disabled = false;
}

render();

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.view}`).classList.add("active");
  });
});

  document.querySelector("#dayList").addEventListener("click", (event) => {
  const card = event.target.closest(".day-card");
  if (!card) return;
  focusDay(Number(card.dataset.day));
});

document.querySelector("#lodgingList").addEventListener("click", (event) => {
  const card = event.target.closest(".lodging-card");
  if (!card) return;
  focusLodging(Number(card.dataset.lodging));
});

document.querySelector("#mapLegend").addEventListener("click", (event) => {
  const item = event.target.closest(".legend-item");
  if (!item) return;
  focusDay(Number(item.dataset.day));
});

document.querySelector("#fitRouteButton").addEventListener("click", () => {
  map.fitBounds(boundsPoints, { padding: [45, 45] });
});

document.querySelector("#toggleLodgingButton").addEventListener("click", (event) => {
  const enabled = map.hasLayer(lodgingLayer);
  if (enabled) {
    map.removeLayer(lodgingLayer);
  } else {
    lodgingLayer.addTo(map);
  }
  event.currentTarget.setAttribute("aria-pressed", String(!enabled));
});

document.querySelector("#loadRoutesButton").addEventListener("click", loadOsmRoutes);
