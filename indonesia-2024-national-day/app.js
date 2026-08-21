(function () {
  "use strict";

  const data = window.BALI_GUIDE_DATA;
  if (!data) {
    throw new Error("旅行数据未加载");
  }

  const {
    tripCalendar,
    airports,
    places,
    travelerGroups,
    flights,
    routePhases,
    decisions,
    days,
    lodgings,
    spots,
    budget,
    transit,
    safetyCards,
    contacts,
    prepGroups,
    visualCards
  } = data;

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeUrl(value) {
    try {
      const url = new URL(String(value));
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "#";
    } catch (_error) {
      return "#";
    }
  }

  function formatIdr(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function renderCalendar() {
    const container = qs("#tripCalendar");
    container.innerHTML = tripCalendar.map((item) => {
      const badge = item.badge
        ? `<i class="calendar-badge ${item.type === "leave" ? "calendar-badge--leave" : ""}" title="${escapeHtml(item.badgeTitle || item.label)}">${escapeHtml(item.badge)}</i>`
        : "";
      return `
        <article class="calendar-day calendar-day--${escapeHtml(item.type)}" title="${escapeHtml(`${item.date} · ${item.label} · ${item.note}`)}">
          <div class="calendar-day-top"><span>${escapeHtml(item.month)} · ${escapeHtml(item.weekday)}</span>${badge}</div>
          <strong>${escapeHtml(item.day)}</strong>
          <span class="calendar-day-label">${escapeHtml(item.label)}</span>
          <small>${escapeHtml(item.note)}</small>
        </article>
      `;
    }).join("");
  }

  function airportDetail(endpoint) {
    const terminal = endpoint.terminal && endpoint.terminal !== "待补" ? ` · ${endpoint.terminal}` : " · 航站楼待补";
    return `${escapeHtml(endpoint.city)}${escapeHtml(terminal)}<br>${escapeHtml(endpoint.date)} · ${escapeHtml(endpoint.time)}`;
  }

  function renderFlightCard(flight) {
    const via = flight.via ? `<span title="经 ${escapeHtml(flight.via.city)}">✈ ${escapeHtml(flight.via.code)} ✈</span>` : "<span>✈</span>";
    return `
      <article class="flight-card">
        <div class="flight-card-top">
          <span class="flight-direction">${escapeHtml(flight.direction)}</span>
          <span class="flight-date">${escapeHtml(flight.date)}</span>
        </div>
        <div class="flight-route">
          <div class="airport-block">
            <strong class="airport-code">${escapeHtml(flight.from.code)}</strong>
            <small>${airportDetail(flight.from)}</small>
          </div>
          <div class="flight-line" aria-label="${flight.via ? `经 ${escapeHtml(flight.via.city)} 转机` : "直达或中间经停待补"}">${via}</div>
          <div class="airport-block">
            <strong class="airport-code">${escapeHtml(flight.to.code)}</strong>
            <small>${airportDetail(flight.to)}</small>
          </div>
        </div>
        <p class="flight-number">${escapeHtml(flight.flightNo)}</p>
        <p class="flight-note">${escapeHtml(flight.meta)} · ${escapeHtml(flight.note)}</p>
        <div class="card-actions">
          <button class="focus-button" type="button" data-flight-focus="${escapeHtml(flight.id)}"><span aria-hidden="true">⌖</span> 地图查看</button>
        </div>
      </article>
    `;
  }

  function renderTravelerGroups() {
    const container = qs("#flightSummary");
    container.innerHTML = travelerGroups.map((group) => {
      const groupFlights = flights.filter((flight) => flight.groupId === group.id);
      const cards = groupFlights.map(renderFlightCard).join("");
      const pending = group.pendingItems.map((item) => `
        <article class="pending-card">
          <strong>待补</strong>
          <p>${escapeHtml(item)}</p>
        </article>
      `).join("");
      return `
        <section class="flight-group" aria-label="${escapeHtml(group.label)} 航班">
          <div class="flight-group-heading">
            <div>
              <span class="flight-group-label">${escapeHtml(group.label)}</span>
              <p>${escapeHtml(group.note)}</p>
            </div>
            <span class="flight-group-origin">${escapeHtml(group.origin)}</span>
          </div>
          <div class="flight-group-list">${cards}${pending}</div>
        </section>
      `;
    }).join("");
  }

  function renderRouteFlow() {
    qs("#routeFlow").innerHTML = routePhases.map((phase, index) => `
      <article class="route-phase" style="--phase-color:${escapeHtml(phase.color)}">
        <span class="phase-number">${index + 1}</span>
        <h3>${escapeHtml(phase.title)}</h3>
        <p>${escapeHtml(phase.note)}</p>
        <small>${escapeHtml(phase.dates)} · ${escapeHtml(phase.place)}</small>
      </article>
    `).join("");
  }

  function renderDecisions() {
    qs("#decisionGrid").innerHTML = decisions.map((item) => {
      const toneClass = item.tone === "review" ? "status-tag--review" : item.tone === "urgent" ? "status-tag--urgent" : "";
      return `
        <article class="decision-card">
          <span class="card-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.note)}</p>
          <span class="status-tag ${toneClass}">${escapeHtml(item.status)}</span>
        </article>
      `;
    }).join("");
  }

  function renderBudget() {
    const quote = budget.quote;
    const depositWithFee = budget.plannedDeposit.amount * (1 + budget.plannedDeposit.feeRate);
    qs("#budgetSummary").innerHTML = `
      <div class="budget-grid">
        <article class="budget-card budget-card--warm">
          <p>原文中唯一可独立核算的整单报价</p>
          <strong class="budget-amount">${formatIdr(quote.amount)}</strong>
          <p>${escapeHtml(quote.label)} · ${escapeHtml(quote.basis)} · ${escapeHtml(quote.note)}</p>
          <ul class="budget-list">
            <li><span>14 人均摊（精确除法）</span><strong>${formatIdr(quote.perPerson)} / 人</strong></li>
            <li><span>计划定金 + 2.5% 手续费</span><strong>${formatIdr(depositWithFee)}</strong></li>
          </ul>
        </article>
        <article class="budget-card">
          <h3>不是全程总预算</h3>
          <p>没有项目可被可靠标记为“已确认支付”；住宿订单总价、机票、包车与船票均未在正文形成可复核的整单金额。</p>
          <ul class="budget-list">
            ${budget.exclusions.map((item) => `<li><span>${escapeHtml(item)}</span><strong>未计入</strong></li>`).join("")}
          </ul>
        </article>
      </div>
    `;
  }

  function renderDays() {
    qs("#dayList").innerHTML = days.map((day) => {
      const optional = day.optional.length
        ? `<div class="micro-note"><strong>可放弃 / 备选：</strong>${day.optional.map(escapeHtml).join(" · ")}</div>`
        : "";
      const warnings = day.warnings.length
        ? `<ul class="warning-list">${day.warnings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      return `
        <article class="day-card" id="day-${escapeHtml(day.id)}" style="--day-color:${escapeHtml(day.color)}">
          <div class="day-date">
            <span>${escapeHtml(day.month)}</span>
            <strong>${escapeHtml(day.day)}</strong>
            <small>${escapeHtml(day.weekday)}</small>
          </div>
          <div class="day-body">
            <div class="day-title-row">
              <h3>${escapeHtml(day.title)}</h3>
              <span class="route-badge">${escapeHtml(day.mode)}</span>
            </div>
            <p class="day-route">${escapeHtml(day.routeLabel)} · 住宿：${escapeHtml(day.stay)}</p>
            <ul class="activity-list">${day.activities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            ${optional}
            ${warnings}
            <div class="day-actions">
              <button class="focus-button" type="button" data-day-focus="${escapeHtml(day.id)}"><span aria-hidden="true">⌖</span> 在地图中查看</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderLodgings() {
    qs("#lodgingCount").textContent = `${lodgings.length} 个物业`;
    qs("#lodgingList").innerHTML = lodgings.map((lodging) => {
      const links = lodging.bookingLinks.map((link) => `
        <a class="link-button" href="${safeUrl(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.provider)}</a>
      `).join("");
      return `
        <article class="lodging-card" data-lodging-id="${escapeHtml(lodging.id)}">
          <div class="lodging-card-top">
            <div>
              <span class="lodging-city">${escapeHtml(lodging.city)}</span>
              <h3>${escapeHtml(lodging.name)}</h3>
            </div>
            <span class="price-pill">已预订 · 总价待补</span>
          </div>
          <div class="lodging-meta">
            <span class="tag">${escapeHtml(lodging.dates)}</span>
            <span class="tag">${escapeHtml(lodging.nights)}</span>
          </div>
          <p>${escapeHtml(lodging.note)}</p>
          ${lodging.approximate ? '<span class="approx-note">△ 地图点为区域近似位置</span>' : ""}
          <div class="card-actions">
            <button class="focus-button" type="button" data-lodging-focus="${escapeHtml(lodging.id)}"><span aria-hidden="true">⌖</span> 地图查看</button>
            ${links}
          </div>
        </article>
      `;
    }).join("");
  }

  function renderVisualStrip() {
    qs("#visualStrip").innerHTML = visualCards.map((item) => `
      <article class="visual-card visual-card--${escapeHtml(item.className)}">
        <div><small>${escapeHtml(item.kicker)}</small><strong>${escapeHtml(item.title)}</strong></div>
      </article>
    `).join("");
  }

  const spotRegions = [
    { id: "all", label: "全部" },
    { id: "south", label: "巴厘南部" },
    { id: "komodo", label: "科莫多" },
    { id: "penida-west", label: "佩尼达西线" },
    { id: "penida-east", label: "佩尼达东线" },
    { id: "ubud-east", label: "乌布与东部" },
    { id: "south-life", label: "购物与夜生活" }
  ];

  function filterSpots(region) {
    let visibleCount = 0;
    qsa(".spot-card", qs("#spotList")).forEach((card) => {
      const visible = region === "all" || card.dataset.region === region;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    qsa(".filter-button", qs("#spotFilters")).forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.region === region));
    });
    qs("#spotCount").textContent = `${visibleCount} 个点`;
  }

  function renderSpots() {
    qs("#spotFilters").innerHTML = spotRegions.map((region) => `
      <button class="filter-button" type="button" data-region="${escapeHtml(region.id)}" aria-pressed="${region.id === "all" ? "true" : "false"}">${escapeHtml(region.label)}</button>
    `).join("");

    qs("#spotList").innerHTML = spots.map((spot, index) => {
      const place = places[spot.place];
      const accuracy = place && place.accuracy === "approximate" ? '<span class="approx-note">△ 近似坐标</span>' : "";
      return `
        <article class="spot-card" data-region="${escapeHtml(spot.region)}" data-spot-place="${escapeHtml(spot.place)}">
          <div class="spot-card-top">
            <div>
              <span class="lodging-city">${escapeHtml(spot.regionLabel)} · ${escapeHtml(spot.date)}</span>
              <h3>${escapeHtml(spot.name)}</h3>
            </div>
            <span class="spot-index">${String(index + 1).padStart(2, "0")}</span>
          </div>
          <span class="tag">${escapeHtml(spot.tag)}</span>
          <p>${escapeHtml(spot.note)}</p>
          ${accuracy}
          <div class="card-actions">
            <button class="focus-button" type="button" data-spot-focus="${escapeHtml(spot.place)}"><span aria-hidden="true">⌖</span> 地图查看</button>
          </div>
        </article>
      `;
    }).join("");

    qs("#spotCount").textContent = `${spots.length} 个点`;
    qsa(".filter-button", qs("#spotFilters")).forEach((button) => {
      button.addEventListener("click", () => filterSpots(button.dataset.region));
    });
  }

  function renderTransit() {
    qs("#transitGrid").innerHTML = [transit.hotel, transit.shuttle].map((item) => `
      <article class="transit-card">
        <span class="transit-label">${escapeHtml(item.label)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <ol class="step-list">${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        <div class="micro-note">${escapeHtml(item.note)}</div>
        ${item.link ? `<div class="card-actions"><a class="link-button" href="${safeUrl(item.link)}" target="_blank" rel="noopener noreferrer">查看公开酒店页</a></div>` : ""}
      </article>
    `).join("");

    qs("#cashGuide").innerHTML = `
      <article class="cash-card">
        <div>
          <span class="transit-label">ATM FIELD NOTE</span>
          <h3>${escapeHtml(transit.cash.title)}</h3>
          <p>${escapeHtml(transit.cash.intro)}</p>
          <div class="micro-note">${escapeHtml(transit.cash.warning)}</div>
        </div>
        <ol class="step-list">${transit.cash.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      </article>
    `;
  }

  function renderSafety() {
    qs("#safetyGrid").innerHTML = safetyCards.map((card) => `
      <article class="safety-card">
        <span class="card-icon" aria-hidden="true">${escapeHtml(card.icon)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.note)}</p>
        <ul class="check-list">${card.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    `).join("");
  }

  function renderContacts() {
    qs("#contactGrid").innerHTML = contacts.map((contact) => {
      const action = contact.phone
        ? `<a class="link-button" href="tel:${escapeHtml(contact.phone)}">拨打电话</a>`
        : "";
      const source = contact.source
        ? `<a class="link-button" href="${safeUrl(contact.source)}" target="_blank" rel="noopener noreferrer">核对来源</a>`
        : "";
      return `
        <article class="contact-card">
          <small>${escapeHtml(contact.category)}</small>
          <h3>${escapeHtml(contact.title)}</h3>
          <strong class="contact-number">${escapeHtml(contact.number)}</strong>
          <p>${escapeHtml(contact.note)}</p>
          <div class="card-actions">${action}${source}</div>
        </article>
      `;
    }).join("");
  }

  const checklistStorageKey = "travel-guide-indonesia-2024-checklist-v1";

  function readChecklistState() {
    try {
      return JSON.parse(localStorage.getItem(checklistStorageKey) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function writeChecklistState(state) {
    try {
      localStorage.setItem(checklistStorageKey, JSON.stringify(state));
    } catch (_error) {
      // Local persistence is optional; the checklist remains usable in-memory.
    }
  }

  function renderPrep() {
    const state = readChecklistState();
    qs("#prepList").innerHTML = prepGroups.map((group) => `
      <section class="prep-group">
        <div class="prep-group-heading"><span aria-hidden="true">${escapeHtml(group.icon)}</span><h3>${escapeHtml(group.title)}</h3></div>
        ${group.items.map((item, index) => {
          const id = `check-${group.id}-${index}`;
          return `
            <div class="check-item">
              <input id="${escapeHtml(id)}" type="checkbox" ${state[id] ? "checked" : ""}>
              <label for="${escapeHtml(id)}">${escapeHtml(item.text)}${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}</label>
            </div>
          `;
        }).join("")}
      </section>
    `).join("");

    qsa('.check-item input[type="checkbox"]', qs("#prepList")).forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const next = readChecklistState();
        next[checkbox.id] = checkbox.checked;
        writeChecklistState(next);
      });
    });
  }

  function setupTabs() {
    const tabs = qsa('[role="tab"]', qs("#guideTabs"));

    function activate(tab, focus = false) {
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
        const panel = qs(`#${item.dataset.view}`);
        panel.hidden = !active;
        panel.classList.toggle("active", active);
      });
      if (focus) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activate(tabs[nextIndex], true);
      });
    });
  }

  let map;
  let mapLayers;
  let localBounds;
  let allFlightBounds;
  let flightsVisible = false;
  let spotsEnabled = true;
  let lodgingEnabled = true;
  let osrmLoaded = false;
  const hotelMarkers = new Map();
  const spotMarkers = new Map();
  const dayBounds = new Map();
  const dayRouteLayers = new Map();

  const flightCorridors = [
    {
      id: "main-international",
      label: "主线国际段",
      color: "#408bb5",
      legs: [["HGH", "SIN"], ["SIN", "DPS"]],
      details: ["9/27—28 杭州 → 新加坡 → 巴厘岛", "10/7 巴厘岛 → 新加坡 → 杭州"]
    },
    {
      id: "komodo-domestic",
      label: "科莫多往返",
      color: "#e76f51",
      legs: [["DPS", "LBJ"]],
      details: ["9/29 DPS 07:10 → LBJ 08:20", "10/1 LBJ 08:50 → DPS 10:10"]
    },
    {
      id: "elder-international",
      label: "长者去程参考",
      color: "#765a9c",
      legs: [["CSX", "XMN"], ["XMN", "CGK"], ["CGK", "DPS"]],
      details: ["长沙 → 厦门 → 雅加达", "雅加达 T1 06:20 → 巴厘岛"]
    }
  ];

  function divIcon(className, html, size, anchor) {
    return L.divIcon({
      className: "map-div-icon",
      html: `<div class="${className}">${html}</div>`,
      iconSize: size,
      iconAnchor: anchor || [size[0] / 2, size[1] / 2],
      popupAnchor: [0, -Math.round(size[1] / 2)]
    });
  }

  function popupHtml(kicker, title, note, links = []) {
    const renderedLinks = links.length
      ? `<span class="popup-links">${links.map((link) => `<a href="${safeUrl(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.provider)}</a>`).join("")}</span>`
      : "";
    return `<span class="popup-kicker">${escapeHtml(kicker)}</span><strong>${escapeHtml(title)}</strong>${note ? `<span class="popup-note">${escapeHtml(note)}</span>` : ""}${renderedLinks}`;
  }

  function getLatLng(key) {
    if (places[key]) return [places[key].lat, places[key].lng];
    if (airports[key]) return [airports[key].lat, airports[key].lng];
    return null;
  }

  function boundsPadding() {
    const narrow = qs("#map").clientWidth < 680;
    return narrow
      ? { paddingTopLeft: [18, 170], paddingBottomRight: [18, 220] }
      : { paddingTopLeft: [38, 130], paddingBottomRight: [300, 75] };
  }

  function fitBoundsSafe(bounds, options = {}) {
    if (!bounds || !bounds.isValid()) return;
    map.fitBounds(bounds, { ...boundsPadding(), maxZoom: 15, ...options });
  }

  function greatCirclePoints(from, to, steps = 72) {
    const toRad = (degrees) => degrees * Math.PI / 180;
    const toDeg = (radians) => radians * 180 / Math.PI;
    const lat1 = toRad(from.lat);
    const lng1 = toRad(from.lng);
    const lat2 = toRad(to.lat);
    const lng2 = toRad(to.lng);
    const delta = 2 * Math.asin(Math.sqrt(
      Math.sin((lat2 - lat1) / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2
    ));
    if (!Number.isFinite(delta) || delta === 0) return [[from.lat, from.lng], [to.lat, to.lng]];
    const points = [];
    for (let index = 0; index <= steps; index += 1) {
      const fraction = index / steps;
      const a = Math.sin((1 - fraction) * delta) / Math.sin(delta);
      const b = Math.sin(fraction * delta) / Math.sin(delta);
      const x = a * Math.cos(lat1) * Math.cos(lng1) + b * Math.cos(lat2) * Math.cos(lng2);
      const y = a * Math.cos(lat1) * Math.sin(lng1) + b * Math.cos(lat2) * Math.sin(lng2);
      const z = a * Math.sin(lat1) + b * Math.sin(lat2);
      points.push([toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), toDeg(Math.atan2(y, x))]);
    }
    return points;
  }

  function initMap() {
    if (!window.L) {
      qs("#mapStatus").textContent = "地图组件未加载；攻略正文仍可使用";
      return;
    }

    map = L.map("map", { zoomControl: false, preferCanvas: true, minZoom: 3 });
    L.control.zoom({ position: "bottomleft" }).addTo(map);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri · 路线数据 &copy; OpenStreetMap contributors"
    }).addTo(map);

    mapLayers = {
      fallbackLayer: L.layerGroup().addTo(map),
      osrmLayer: L.layerGroup().addTo(map),
      placeLayer: L.layerGroup().addTo(map),
      spotLayer: L.layerGroup(),
      spotOverviewLayer: L.layerGroup(),
      spotMacroLayer: L.layerGroup(),
      lodgingLayer: L.layerGroup(),
      lodgingOverviewLayer: L.layerGroup(),
      lodgingMacroLayer: L.layerGroup(),
      flightLayer: L.layerGroup(),
      airportLayer: L.layerGroup()
    };

    renderMapAnchors();
    renderFallbackRoutes();
    renderSpotMarkers();
    renderLodgingMarkers();
    renderOverviewMarkers();
    renderFlightLayers();
    renderMapLegend();
    buildLocalBounds();
    fitLocalRoute();
    map.on("zoomend", refreshConceptLayers);
    refreshConceptLayers();
    setupMapControls();
  }

  function renderMapAnchors() {
    Object.entries(places).forEach(([key, place]) => {
      if (!place.anchor || key === "DPS" || key === "LBJ") return;
      const icon = divIcon("place-marker", `<span>${escapeHtml(place.name.slice(0, 1))}</span>`, [26, 26], [13, 22]);
      L.marker([place.lat, place.lng], { icon, riseOnHover: true })
        .bindPopup(popupHtml(place.accuracy === "approximate" ? "路线锚点 · 近似坐标" : "路线锚点", place.name, place.note))
        .addTo(mapLayers.placeLayer);
    });
  }

  function segmentStyle(mode, color) {
    if (mode === "boat") return { color, weight: 3, opacity: 0.8, dashArray: "8 9" };
    if (mode === "ferry") return { color, weight: 3, opacity: 0.8, dashArray: "3 8" };
    if (mode === "walk") return { color, weight: 4, opacity: 0.72, dashArray: "1 7", lineCap: "round" };
    return { color, weight: 3, opacity: 0.58, dashArray: "7 8" };
  }

  function renderFallbackRoutes() {
    days.forEach((day) => {
      const group = L.layerGroup().addTo(mapLayers.fallbackLayer);
      const collected = [];
      day.mapSegments.forEach((segment) => {
        const latLngs = segment.route.map(getLatLng).filter(Boolean);
        if (latLngs.length < 2) return;
        collected.push(...latLngs);
        L.polyline(latLngs, segmentStyle(segment.mode, day.color))
          .bindTooltip(`${day.date} · ${day.title}`)
          .bindPopup(popupHtml(segment.mode === "road" ? "坐标回退路线" : `${segment.mode} 示意线`, `${day.date} · ${day.title}`, segment.mode === "road" ? "点击“公路”可尝试加载 OSRM 驾车路线。" : "连线只表示行程结构，不是实时航迹。"))
          .addTo(group);
      });
      dayRouteLayers.set(day.id, group);
      const focusPoints = day.focus.map(getLatLng).filter(Boolean);
      const allPoints = focusPoints.length ? focusPoints : collected;
      if (allPoints.length) dayBounds.set(day.id, L.latLngBounds(allPoints));
    });
  }

  function renderSpotMarkers() {
    spots.forEach((spot) => {
      const place = places[spot.place];
      if (!place) return;
      const icon = divIcon("spot-marker", "景", [25, 25]);
      const marker = L.marker([place.lat, place.lng], { icon, riseOnHover: true, title: spot.name })
        .bindPopup(popupHtml(`${spot.regionLabel} · ${spot.date}${place.accuracy === "approximate" ? " · 近似坐标" : ""}`, spot.name, spot.note))
        .addTo(mapLayers.spotLayer);
      spotMarkers.set(spot.place, marker);
    });
  }

  function renderLodgingMarkers() {
    lodgings.forEach((lodging) => {
      const icon = divIcon(`hotel-marker${lodging.approximate ? " approximate" : ""}`, "住", [28, 28]);
      const marker = L.marker([lodging.lat, lodging.lng], { icon, riseOnHover: true, title: lodging.name })
        .bindPopup(popupHtml(`${lodging.city} · ${lodging.dates}${lodging.approximate ? " · 区域近似点" : ""}`, lodging.name, `已预订 · ${lodging.price.basis}。${lodging.note}`, lodging.bookingLinks))
        .addTo(mapLayers.lodgingLayer);
      hotelMarkers.set(lodging.id, marker);
    });
  }

  function averagePoint(items, pointGetter) {
    const points = items.map(pointGetter).filter(Boolean);
    return [
      points.reduce((sum, point) => sum + point[0], 0) / points.length,
      points.reduce((sum, point) => sum + point[1], 0) / points.length
    ];
  }

  function renderOverviewMarkers() {
    const spotGroups = Map.groupBy
      ? Map.groupBy(spots, (spot) => spot.region)
      : spots.reduce((groups, spot) => {
          if (!groups.has(spot.region)) groups.set(spot.region, []);
          groups.get(spot.region).push(spot);
          return groups;
        }, new Map());

    spotGroups.forEach((items) => {
      const center = averagePoint(items, (item) => getLatLng(item.place));
      const label = items[0].regionLabel;
      const icon = divIcon("overview-marker overview-marker--spot", `<span>景</span><strong>${items.length}</strong>`, [38, 38]);
      L.marker(center, { icon, riseOnHover: true, title: `${label} · ${items.length} 个景点` })
        .bindPopup(popupHtml("区域景点", `${label} · ${items.length} 个点`, "继续放大后展开各景点标记。"))
        .addTo(mapLayers.spotOverviewLayer);
    });

    const lodgingGroups = lodgings.reduce((groups, lodging) => {
      if (!groups.has(lodging.city)) groups.set(lodging.city, []);
      groups.get(lodging.city).push(lodging);
      return groups;
    }, new Map());

    lodgingGroups.forEach((items, city) => {
      const center = averagePoint(items, (item) => [item.lat, item.lng]);
      const shifted = [center[0] + 0.012, center[1] - 0.012];
      const icon = divIcon("overview-marker overview-marker--lodging", `<span>住</span><strong>${items.length}</strong>`, [38, 38]);
      L.marker(shifted, { icon, riseOnHover: true, title: `${city} · ${items.length} 个住宿` })
        .bindPopup(popupHtml("区域住宿", `${city} · ${items.length} 个物业`, "气泡位置为避免与景点重叠而轻微偏移；放大后显示物业标记。"))
        .addTo(mapLayers.lodgingOverviewLayer);
    });

    const komodoSpots = spots.filter((spot) => spot.region === "komodo");
    const baliAreaSpots = spots.filter((spot) => spot.region !== "komodo");
    [
      { label: "巴厘岛与佩尼达", items: baliAreaSpots },
      { label: "科莫多群岛", items: komodoSpots }
    ].forEach((group) => {
      const center = averagePoint(group.items, (item) => getLatLng(item.place));
      const icon = divIcon("overview-marker overview-marker--spot", `<span>景</span><strong>${group.items.length}</strong>`, [38, 38]);
      L.marker(center, { icon, riseOnHover: true, title: `${group.label} · ${group.items.length} 个景点` })
        .bindPopup(popupHtml("路线区域", `${group.label} · ${group.items.length} 个景点`, "继续放大后按区域展开。"))
        .addTo(mapLayers.spotMacroLayer);
    });

    const labuanLodgings = lodgings.filter((lodging) => lodging.city === "Labuan Bajo");
    const baliAreaLodgings = lodgings.filter((lodging) => lodging.city !== "Labuan Bajo");
    [
      { label: "巴厘岛与佩尼达", items: baliAreaLodgings, shift: [0.22, -0.45] },
      { label: "Labuan Bajo", items: labuanLodgings, shift: [0.20, 0.35] }
    ].forEach((group) => {
      const center = averagePoint(group.items, (item) => [item.lat, item.lng]);
      const shifted = [center[0] + group.shift[0], center[1] + group.shift[1]];
      const icon = divIcon("overview-marker overview-marker--lodging", `<span>住</span><strong>${group.items.length}</strong>`, [38, 38]);
      L.marker(shifted, { icon, riseOnHover: true, title: `${group.label} · ${group.items.length} 个住宿` })
        .bindPopup(popupHtml("路线区域", `${group.label} · ${group.items.length} 个住宿`, "气泡为避免与景点重叠而偏移；继续放大后按地区展开。"))
        .addTo(mapLayers.lodgingMacroLayer);
    });
  }

  function syncConceptLayer(enabled, detailLayer, overviewLayer, macroLayer, zoomMode) {
    const layers = { detail: detailLayer, overview: overviewLayer, macro: macroLayer };
    const desired = layers[zoomMode];
    Object.values(layers).forEach((layer) => {
      if (layer !== desired && map.hasLayer(layer)) map.removeLayer(layer);
    });
    if (enabled && !map.hasLayer(desired)) map.addLayer(desired);
    if (!enabled && map.hasLayer(desired)) map.removeLayer(desired);
  }

  function refreshConceptLayers() {
    if (!map || !mapLayers) return;
    const zoom = map.getZoom();
    const zoomMode = zoom >= 9 ? "detail" : zoom >= 8 ? "overview" : "macro";
    if (zoom >= 8 && !map.hasLayer(mapLayers.placeLayer)) map.addLayer(mapLayers.placeLayer);
    if (zoom < 8 && map.hasLayer(mapLayers.placeLayer)) map.removeLayer(mapLayers.placeLayer);
    syncConceptLayer(spotsEnabled, mapLayers.spotLayer, mapLayers.spotOverviewLayer, mapLayers.spotMacroLayer, zoomMode);
    syncConceptLayer(lodgingEnabled, mapLayers.lodgingLayer, mapLayers.lodgingOverviewLayer, mapLayers.lodgingMacroLayer, zoomMode);
    qs("#toggleSpotsButton").setAttribute("aria-pressed", String(spotsEnabled));
    qs("#toggleLodgingButton").setAttribute("aria-pressed", String(lodgingEnabled));
  }

  function renderFlightLayers() {
    Object.entries(airports).forEach(([code, airport]) => {
      const icon = divIcon("airport-marker", escapeHtml(code), [33, 25]);
      L.marker([airport.lat, airport.lng], { icon, riseOnHover: true, title: airport.name })
        .bindPopup(popupHtml("机场", `${code} · ${airport.name}`, airport.city))
        .addTo(mapLayers.airportLayer);
    });

    const flightPoints = [];
    flightCorridors.forEach((corridor) => {
      corridor.legs.forEach(([fromCode, toCode]) => {
        const from = airports[fromCode];
        const to = airports[toCode];
        if (!from || !to) return;
        flightPoints.push([from.lat, from.lng], [to.lat, to.lng]);
        const detail = `${corridor.details.join("；")}。航线为大圆近似示意，不是实时航迹。`;
        L.polyline(greatCirclePoints(from, to), {
          color: corridor.color,
          weight: 3,
          opacity: 0.78,
          dashArray: "10 7"
        })
          .bindPopup(popupHtml("航班示意", `${corridor.label} · ${fromCode}—${toCode}`, detail))
          .addTo(mapLayers.flightLayer);
      });
    });
    allFlightBounds = L.latLngBounds(flightPoints);
  }

  function renderMapLegend() {
    const dayButtons = days.filter((day) => day.focus.length).map((day) => `
      <button class="legend-button" type="button" data-legend-day="${escapeHtml(day.id)}" style="--legend-color:${escapeHtml(day.color)}">
        <span class="legend-date">${escapeHtml(day.date.replace("月 ", "/").replace(" 日", ""))}</span>
        <span class="legend-label">${escapeHtml(day.title)}</span>
        <span class="legend-mode">${escapeHtml(day.mode.split(" + ")[0])}</span>
      </button>
    `).join("");
    const flightButtons = flightCorridors.map((corridor) => `
      <button class="legend-button" type="button" data-flight-corridor="${escapeHtml(corridor.id)}" style="--legend-color:${escapeHtml(corridor.color)}">
        <span class="legend-date">✈</span>
        <span class="legend-label">${escapeHtml(corridor.label)}</span>
        <span class="legend-mode">航班</span>
      </button>
    `).join("");
    qs("#mapLegend").innerHTML = `${dayButtons}${flightButtons}`;
    qsa("[data-legend-day]", qs("#mapLegend")).forEach((button) => {
      button.addEventListener("click", () => focusDay(button.dataset.legendDay));
    });
    qsa("[data-flight-corridor]", qs("#mapLegend")).forEach((button) => {
      button.addEventListener("click", () => focusFlightCorridor(button.dataset.flightCorridor));
    });
  }

  function buildLocalBounds() {
    const keys = new Set(days.flatMap((day) => day.focus));
    const points = Array.from(keys)
      .filter((key) => places[key])
      .map((key) => [places[key].lat, places[key].lng]);
    localBounds = L.latLngBounds(points);
  }

  function setFlightsVisible(visible, fit = true) {
    if (!map) return;
    flightsVisible = visible;
    if (visible) {
      if (!map.hasLayer(mapLayers.flightLayer)) map.addLayer(mapLayers.flightLayer);
      if (!map.hasLayer(mapLayers.airportLayer)) map.addLayer(mapLayers.airportLayer);
      if (fit) fitBoundsSafe(allFlightBounds, { maxZoom: 6 });
      qs("#mapStatus").textContent = "航班：大圆近似示意 · 非实时航迹";
      if (qs("#map").clientWidth < 680) qs("#mapLegend").classList.add("compact-flight-focus");
    } else {
      if (map.hasLayer(mapLayers.flightLayer)) map.removeLayer(mapLayers.flightLayer);
      if (map.hasLayer(mapLayers.airportLayer)) map.removeLayer(mapLayers.airportLayer);
      if (fit) fitLocalRoute();
      qs("#mapLegend").classList.remove("compact-flight-focus");
      qs("#mapStatus").textContent = osrmLoaded
        ? "底图：Esri · 驾车路线：OSRM / OpenStreetMap"
        : "底图：Esri World Topographic Map · 路线：坐标预览";
    }
    qs("#toggleFlightsButton").setAttribute("aria-pressed", String(visible));
  }

  function fitLocalRoute() {
    if (!map || !localBounds) return;
    fitBoundsSafe(localBounds, { maxZoom: 8 });
    qsa(".legend-button", qs("#mapLegend")).forEach((button) => button.classList.remove("active"));
  }

  function markLegend(selector, value) {
    qsa(".legend-button", qs("#mapLegend")).forEach((button) => {
      button.classList.toggle("active", button.getAttribute(selector) === value);
    });
  }

  function focusDay(dayId) {
    if (!map) return;
    const day = days.find((item) => item.id === dayId);
    const bounds = dayBounds.get(dayId);
    if (!day || !bounds) return;
    const flightDay = ["d0927", "d0929", "d1001", "d1007"].includes(dayId);
    setFlightsVisible(flightDay, false);
    fitBoundsSafe(bounds, { maxZoom: day.mapSegments.length ? 12 : 6 });
    markLegend("data-legend-day", dayId);
    qs("#mapStatus").textContent = `${day.date} · ${day.title}`;
  }

  function focusFlightCorridor(corridorId) {
    if (!map) return;
    const corridor = flightCorridors.find((item) => item.id === corridorId);
    if (!corridor) return;
    setFlightsVisible(true, false);
    const points = corridor.legs.flatMap(([fromCode, toCode]) => {
      const from = airports[fromCode];
      const to = airports[toCode];
      return [[from.lat, from.lng], [to.lat, to.lng]];
    });
    fitBoundsSafe(L.latLngBounds(points), { maxZoom: corridorId === "komodo-domestic" ? 7 : 5 });
    markLegend("data-flight-corridor", corridorId);
    qs("#mapStatus").textContent = `${corridor.label} · 航线为近似示意`;
  }

  function focusFlight(flightId) {
    if (flightId.startsWith("komodo")) focusFlightCorridor("komodo-domestic");
    else if (flightId.startsWith("elder")) focusFlightCorridor("elder-international");
    else focusFlightCorridor("main-international");
  }

  function focusLodging(lodgingId) {
    if (!map) return;
    setFlightsVisible(false, false);
    lodgingEnabled = true;
    const marker = hotelMarkers.get(lodgingId);
    if (!marker) return;
    map.setView(marker.getLatLng(), 14, { animate: true });
    refreshConceptLayers();
    marker.openPopup();
  }

  function focusSpot(placeKey) {
    if (!map) return;
    setFlightsVisible(false, false);
    spotsEnabled = true;
    const marker = spotMarkers.get(placeKey);
    if (!marker) return;
    map.setView(marker.getLatLng(), 15, { animate: true });
    refreshConceptLayers();
    marker.openPopup();
  }

  function toggleConceptLayer(type) {
    if (type === "lodging") lodgingEnabled = !lodgingEnabled;
    if (type === "spots") spotsEnabled = !spotsEnabled;
    refreshConceptLayers();
  }

  async function loadRoadRoutes() {
    if (!map || osrmLoaded) return;
    const button = qs("#loadRoutesButton");
    const roadSegments = days.flatMap((day) => day.mapSegments
      .filter((segment) => segment.mode === "road")
      .map((segment) => ({ day, segment }))
    );
    button.disabled = true;
    button.textContent = "公路加载中…";
    qs("#mapStatus").textContent = "正在向 OSRM 请求驾车路线…";
    let successCount = 0;

    await Promise.all(roadSegments.map(async ({ day, segment }) => {
      const points = segment.route.map((key) => places[key]).filter(Boolean);
      if (points.length < 2) return;
      const coordinates = points.map((point) => `${point.lng},${point.lat}`).join(";");
      const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&continue_straight=false`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        const geometry = payload.routes && payload.routes[0] && payload.routes[0].geometry;
        if (!geometry) throw new Error("No route geometry");
        L.geoJSON(geometry, {
          style: { color: day.color, weight: 5, opacity: 0.82 }
        })
          .bindTooltip(`${day.date} · OSRM 驾车路线`)
          .addTo(mapLayers.osrmLayer);
        successCount += 1;
      } catch (_error) {
        // Coordinate-based dashed fallback remains visible for failed segments.
      }
    }));

    osrmLoaded = successCount > 0;
    button.textContent = osrmLoaded ? "公路已加载" : "公路加载失败";
    qs("#mapStatus").textContent = osrmLoaded
      ? `OSRM 已加载 ${successCount}/${roadSegments.length} 段 · 道路数据：OpenStreetMap`
      : "OSRM 暂不可用 · 已保留坐标虚线回退路线";
  }

  function setupMapControls() {
    qs("#fitRouteButton").addEventListener("click", () => {
      setFlightsVisible(false, false);
      fitLocalRoute();
    });
    qs("#toggleFlightsButton").addEventListener("click", () => setFlightsVisible(!flightsVisible));
    qs("#toggleLodgingButton").addEventListener("click", () => toggleConceptLayer("lodging"));
    qs("#toggleSpotsButton").addEventListener("click", () => toggleConceptLayer("spots"));
    qs("#loadRoutesButton").addEventListener("click", loadRoadRoutes);

    qsa("[data-day-focus]").forEach((button) => button.addEventListener("click", () => focusDay(button.dataset.dayFocus)));
    qsa("[data-flight-focus]").forEach((button) => button.addEventListener("click", () => focusFlight(button.dataset.flightFocus)));
    qsa("[data-lodging-focus]").forEach((button) => button.addEventListener("click", () => focusLodging(button.dataset.lodgingFocus)));
    qsa("[data-spot-focus]").forEach((button) => button.addEventListener("click", () => focusSpot(button.dataset.spotFocus)));

    window.addEventListener("resize", () => map.invalidateSize(), { passive: true });
  }

  function renderAll() {
    renderCalendar();
    renderTravelerGroups();
    renderRouteFlow();
    renderDecisions();
    renderBudget();
    renderDays();
    renderLodgings();
    renderVisualStrip();
    renderSpots();
    renderTransit();
    renderSafety();
    renderContacts();
    renderPrep();
    setupTabs();
    initMap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll, { once: true });
  } else {
    renderAll();
  }
})();
