# Module Architecture

Use this reference when extending travel-guide pages beyond the base itinerary/map/flight/spot/checklist experience.

## Contents

- [Principle](#principle)
- [Suggested Top-Level Data Shape](#suggested-top-level-data-shape)
- [Section Navigation](#section-navigation)
- [Common Modules](#common-modules)
- [Map Extension Points](#map-extension-points)
- [Rendering Pattern](#rendering-pattern)
- [Validation For New Modules](#validation-for-new-modules)

## Principle

Add features as modules with:

- A named data object or array.
- A render function or component section.
- Optional map layer behavior.
- Validation and privacy rules.

Avoid hard-coding new content into unrelated render functions. A future trip should be able to include or omit a module without breaking the layout.

## Suggested Top-Level Data Shape

```js
const trip = {
  slug: "egypt-2026-may",
  title: "五一埃及自驾",
  dates: { start: "2026-04-30", end: "2026-05-10" },
  modules: {
    flights: true,
    travelerGroups: true,
    calendar: true,
    itinerary: true,
    map: true,
    lodging: true,
    spots: true,
    rentals: false,
    prep: true,
    budget: false,
    weather: false,
    tickets: false,
    food: false,
    driving: false
  }
};
```

Existing simple pages may keep separate `flights`, `days`, `lodgings`, `rentals`, `spots`, and `prep` arrays, but new sections should follow the same pattern: a named data object/array plus a dedicated render function.

## Section Navigation

Model guide tabs as data when multiple trips share a shell:

```js
const guideTabs = [
  { id: "overview", label: "总览", icon: "🧭" },
  { id: "plan", label: "日程", icon: "📅" },
  { id: "lodging", label: "住宿", icon: "🏨" },
  { id: "spots", label: "景点", icon: "📍" },
  { id: "driving", label: "自驾", icon: "🚙" },
  { id: "prep", label: "准备", icon: "🎒" }
];
```

- Render emoji as decorative (`aria-hidden="true"`) beside persistent text labels.
- Use a bounded segmented container, styled inactive items, and a high-contrast active item with a second cue such as an accent line.
- Do not stack numeric prefixes and emoji in compact navigation. Choose the stronger visual vocabulary for the available width.
- Keep tab dimensions stable: one row on wide layouts when labels fit, and a balanced three-column/two-row grid for six tabs on narrow layouts.
- Synchronize active classes with `aria-selected`, roving `tabindex`, and the visible `tabpanel`; support ArrowLeft, ArrowRight, Home, and End.

## Common Modules

### Traveler Transport Groups

Use when travelers start from different cities, take different outbound or return trips, or otherwise need separate transport records. Keep group identity separate from flight data so the same renderer scales from one group to many.

Suggested fields:

```js
const travelerGroups = [
  {
    id: "parents",
    label: "父母",
    origin: "长沙出发",
    note: "抵达后与其他同行人会合",
    pendingItems: ["返程航班待补"]
  },
  {
    id: "dongyu-he-yali",
    label: "东嵎、Sunny",
    origin: "杭州出发",
    note: "上午先抵达目的地",
    pendingItems: []
  }
];

const flights = [
  {
    groupId: "parents",
    direction: "去程",
    flightNo: "FM7246",
    from: { code: "CSX", city: "长沙", time: "11:30" },
    to: { code: "CGQ", city: "长春", time: "14:55" }
  }
];
```

Data rules:

- Use stable, unique `id` values for joins and user-facing `label` values for headings. Prefer names, family roles, or approved aliases over array-derived labels such as `第一组` and `第二组`.
- Link every grouped flight or other transport record with `groupId`. Preserve group display order with the `travelerGroups` array; do not encode order into the ID.
- Store unknown return trips, missing flight details, and other unresolved facts in `pendingItems[]`. Do not add bespoke fields such as `parentsReturnPending`.
- Allow one group to have zero or many transport records. Render a zero-record group only when its note or pending items provide useful information.
- On public pages, treat names as personal information and use roles or aliases unless publication is approved.

Rendering pattern:

```js
function renderTravelerGroups() {
  return travelerGroups.map(group => {
    const groupFlights = flights.filter(flight => flight.groupId === group.id);
    return renderTravelerGroup(group, groupFlights);
  }).join("");
}
```

- Render the outer group list as a single-column grid. Every group spans the full available width and has a dashed boundary or separator.
- Render transport and pending cards inside the group with a responsive grid such as `repeat(auto-fit, minmax(min(100%, 220px), 1fr))`; collapse to one column on narrow screens.
- Use the same template for every group. Never branch on group count, array index, label text, or a specific person.
- Put the group label and origin in a shared header, add an accessible label such as `${group.label} 航班`, and allow long labels to wrap without covering the origin.

Validation:

- Check group IDs are unique and each `groupId` resolves to one group.
- Check each grouped transport record renders exactly once and groups remain in source order.
- Test one, two, and three-or-more groups, plus a long label and several cards in one group, at wide and narrow widths.

### Leave Calendar

Use when a trip overlaps workdays, official holidays, adjusted workdays, or weekends, or when the user asks for a leave strategy. Keep it separate from `days`: the calendar explains time-off math, while `days` describes the actual itinerary.

Suggested fields:

```js
const tripCalendar = [
  {
    date: "2026-05-06",
    weekday: "周三",
    type: "leave",
    label: "请假",
    note: "金字塔日",
    badge: "请",
    inTrip: true
  }
];
```

UI pattern:

- Place a compact calendar section after the trip summary/stats and before flight cards when it materially explains the schedule.
- Show an explicit range and separate summary values, for example `请 3 天` and `11 天跨度`.
- Use equal-width day tiles with visible date, weekday, type label, and short note.
- Distinguish workday, leave, official holiday, adjusted workday, weekend, and optional buffer days with text plus color. Add `请` to every leave tile and `假` to every holiday/weekend tile.
- When a holiday overlaps a weekend, retain the weekend type and label, add the `假` badge, and name the holiday in the note or badge title.
- Reuse the module's data contract and badge semantics across guides in a collection so equivalent dates behave consistently.
- Use six or seven columns on wide layouts and two or three columns on narrow layouts.
- Omit the whole module when calendar data is absent; do not leave an empty shell.

Validation:

- Verify year, jurisdiction, date, weekday, and official holiday/adjusted-workday status from an authoritative source or explicit user data.
- Calculate inclusive span, itinerary days, nights, and personal leave days independently.
- Mark adjacent recovery/buffer dates with `inTrip: false` so they are not presented as sightseeing days.

Privacy: exact personal leave and work dates reveal schedule information. Before public deployment, enumerate the dates being added and obtain explicit informed confirmation from the user.

### Lodging

Use when source notes mention hotels, resorts, apartments, camps, overnight cities, or booked accommodation. Keep lodging separate from attractions and route waypoints so it can be toggled, focused, omitted, or reused across trips.

Suggested fields:

```js
const lodgings = [
  {
    name: "Great Pyramid Inn",
    city: "吉萨 / 开罗",
    dates: "5 月 6 日 - 5 月 7 日",
    nights: "1 晚",
    lat: 29.9759,
    lng: 31.1378,
    note: "靠近金字塔区，适合晚上休整和次日清晨进金字塔。",
    price: {
      status: "booked",
      amount: "320",
      currency: "CNY",
      basis: "1 晚总价",
      stayDates: "2026-05-06/2026-05-07",
      checkedAt: null,
      source: "预订截图"
    },
    bookingLinks: [
      { provider: "Trip.com", url: "https://www.trip.com/hotels/..." }
    ]
  }
];
```

UI pattern:

- Add a `住宿` tab or compact lodging section when there are multiple stays.
- Render lodging cards with city, hotel name, stay dates/nights, and a practical note.
- Render explicit `booked` or `reference` price state. Booked prices are source totals; reference prices must match intended dates and show when they were checked.
- Render only verified Trip.com, Booking.com, or exact Ctrip property links. Omit unavailable providers instead of guessing.
- Add a dedicated Leaflet layer (`lodgingLayer` or `hotelLayer`) using distinct hotel/accommodation markers.
- Make lodging cards focus/open their map marker; add a map toolbar toggle when the map has multiple layers.

Privacy: never publish booking references, order screenshots, guest names, room numbers, payment details, phone/email, barcodes, or private accommodation documents.

### Rental Cars

Use when the source contains a rental order, self-drive booking, or pickup/return plan. Keep order records separate from generic driving advice so they can drive cards, alerts, budget totals, and map behavior.

Suggested fields:

```js
const rentals = [
  {
    id: "main-road-trip",
    role: "主线自驾",
    provider: "Rental provider",
    status: "预约成功 · 已支付",
    vehicle: "Vehicle model",
    specs: ["自动挡", "5 座"],
    duration: "3 天 22 小时",
    pickup: {
      place: "pickupStore",
      date: "9 月 22 日",
      time: "22:30",
      store: "机场门店",
      location: "公共停车区域"
    },
    returnTrip: {
      place: "returnStore",
      date: "9 月 26 日",
      time: "17:00",
      store: "机场门店",
      location: "公共停车区域"
    },
    price: {
      status: "paid",
      currency: "CNY",
      total: 849,
      breakdown: [
        { label: "车辆租赁及门店服务", amount: 629 },
        { label: "基本保障", amount: 200 },
        { label: "车辆整备费", amount: 20 },
        { label: "异地服务费", amount: 100 },
        { label: "优惠", amount: -100 }
      ]
    },
    severity: "urgent",
    warning: "还车时间与返程航班冲突，必须调整。"
  }
];
```

Data and timing rules:

- Join `pickup.place` and `returnTrip.place` to public `places` entries. Mark approximate coordinates explicitly; do not send private addresses to public geocoders without approval.
- Preserve the final paid total independently from the line-item breakdown. Store monetary values as numbers and format currency only while rendering.
- Compare inbound arrival to pickup and return to outbound check-in/departure. Treat impossible buffers as `urgent`, short positive buffers as `warning`, and explain the required action.
- Copy the corrective action into the applicable itinerary day and `prep`; the warning must not exist only inside the rental card.

UI and map pattern:

- Show provider/role, status, vehicle/specs, duration, pickup, return, final paid total, net line items, and warning in each card.
- Stack pickup and return sections on narrow screens. Keep totals and long store names from covering each other.
- Add a dedicated `rentalLayer` with distinct `取` and `还` markers and a visible toggle. Clicking a rental card must restore a hidden layer, fit both endpoints, and open the pickup popup.
- Offset or otherwise disambiguate rental and airport markers when they share coordinates.

Privacy: publish only public operational facts needed for the trip. Exclude order IDs, renter/contact information, access URLs/tokens, payment instruments, QR codes, and source screenshots. Treat exact pickup/return schedules and personal spend as sensitive; obtain informed approval before first public deployment.

### Budget

Use for confirmed spend, estimates, per-person/shared costs, traveler scenarios, cash needs, and currency notes. Keep budget data separate from the owning modules, but derive confirmed values from those modules so one amount has one source of truth.

Suggested fields:

```js
const budget = {
  confirmed: [
    { label: "往返机票", amount: 1126, basis: "perPerson", source: "flights" },
    { label: "住宿", amount: 808, basis: "perOrder", source: "lodgings" },
    { label: "租车", amount: 1111, basis: "perVehicle", source: "rentals" }
  ],
  estimates: [
    { label: "景区门票", min: 165, max: 165, basis: "perPerson" },
    { label: "油费、路费与停车", min: 900, max: 1200, basis: "perVehicle" },
    { label: "餐饮", min: 600, max: 900, basis: "perPerson" }
  ],
  scenarios: [
    { travelers: 1, label: "1 人出行", min: 4700, max: 5300 },
    { travelers: 2, label: "2 人同行", min: 6600, max: 7500 }
  ],
  assumptions: ["机票按每人计", "同行人同住并共用车辆"],
  exclusions: ["可选游船", "购物", "临时改签"]
};
```

Calculation rules:

- Use `confirmed`, `reference`, or `estimated` status and a basis such as `perPerson`, `perVehicle`, `perRoom`, or `perOrder` for every amount.
- Compute `confirmedTotal` from final paid totals, not pre-discount line items. Never add both a module total and its breakdown.
- Compute each scenario as shared confirmed/estimated costs plus `travelerCount × perPerson costs`. Keep estimate minima and maxima separate until the final range.
- Preserve decimal precision for source totals; round only the user-facing scenario range when useful. Display the arithmetic basis beside the result.
- If traveler count, price basis, or an item is unknown, mark it `待补` or show multiple labeled scenarios instead of inventing one exact total.

UI pattern:

- Show a dominant confirmed-spend total, a compact confirmed-category breakdown, estimated ranges, traveler-count scenarios, assumptions, and exclusions.
- Show known flight prices on flight cards and booked totals in lodging/rental cards; the budget is a roll-up, not the only place where prices appear.
- Stack category and scenario grids on narrow screens and verify there is no horizontal overflow.

Public-page privacy: do not publish booking IDs, payment screenshots, full receipts, card details, invoice identifiers, or private financial proof. Treat personal spending totals as sensitive and obtain informed approval before first public deployment.

### Weather

Use for route climate, sunrise/sunset, heat warnings, wind, sea condition, and packing implications.

Current weather or forecast must be checked from live sources when dates are near or the user asks for accuracy. Historical/seasonal weather can be labeled as seasonal reference.

### Tickets And Reservations

Use for museums, monuments, cruises, rental cars, lodging, and tour providers.

Separate public display data from private proof documents:

- Public: venue, date, time window, booking status, official URL.
- Private: PDF orders, QR codes, passports, policy numbers, booking references.

### Food

Use for restaurants, local dishes, food safety, markets, and meal timing.

Add map category markers when restaurants have coordinates.

### Driving

Use for rental car pickup/dropoff, fuel, tolls, road conditions, police checkpoints, parking, and long-drive risk.

Connect driving notes to day route segments where possible.

### Photo Spots

Use for camera positions, best light windows, lens suggestions, examples, and map pins.

Images must actually represent the spot. If uncertain, omit the image or label it as reference.

## Map Extension Points

Keep map implementation layer-oriented:

```js
const mapLayers = {
  routeLayer: L.layerGroup(),
  flightLayer: L.layerGroup(),
  fallbackLayer: L.layerGroup(),
  labelLayer: L.layerGroup(),
  spotLayer: L.layerGroup(),
  hotelLayer: L.layerGroup(),
  rentalLayer: L.layerGroup(),
  airportLayer: L.layerGroup()
};
```

Recommended future controls:

- Day filter: focus/highlight a single day.
- Category filter: toggle attractions, hotels, flight routes, airports, food, photo spots.
- Rental layer toggle: synchronize `rentalLayer` visibility and `aria-pressed`; rental cards restore the layer before focusing pickup/return bounds.
- Flight layer toggle: synchronize `flightLayer` and `airportLayer`; hide/show both together, restore them when a flight legend item is chosen, and keep distant airports out of the default local-itinerary bounds.
- Route source selector: fallback straight segments, OSRM driving route, imported GeoJSON/GPX.
- Basemap selector: Esri Topographic, OpenStreetMap, satellite imagery if requested.

Marker visibility rules:

- Keep permanent day labels from obscuring hotel and attraction markers at default zoom.
- Store a place in both a day route and `spots` when it should receive an attraction marker.
- For dense clusters, use offsets, clustering, spiderfying, or day-focus zoom rather than silently hiding points.

Always keep a non-network fallback for route visibility.

## Rendering Pattern

Use one render function per module:

```js
function renderFlights() {}
function renderTravelerGroups() {}
function renderCalendar() {}
function renderItinerary() {}
function renderLodgings() {}
function renderRentals() {}
function renderSpots() {}
function renderBudget() {}
function renderMapLayers() {}
```

Guard optional modules:

```js
if (trip.modules.rentals && rentals.length) {
  renderRentals();
}

if (trip.modules.budget && budget) {
  renderBudget();
}
```

## Validation For New Modules

- Check responsive layout at narrow and wide widths.
- Confirm text does not overlap badges, images, map controls, or long labels.
- Verify public pages do not expose sensitive booking, identity, financial, or barcode data.
- For rentals, verify source coverage, final paid totals, flight connection buffers, corrective prep items, dedicated layer toggling, card-to-map focus, and pickup/return marker collisions.
- For budgets, independently recompute confirmed totals and one-/two-traveler scenarios; verify basis multiplication, discounts, decimal precision, ranges, assumptions, exclusions, and narrow-screen stacking.
- If a public page includes exact leave/work dates, confirm the user explicitly approved publishing those dates.
- If a public page newly includes exact order-derived schedules or personal spending totals, enumerate them and obtain explicit informed approval before publishing.
- If a module uses live data, cite or note the source in the final response.
- Reconcile source coverage across modules: `days`, `places`, `spots`, `lodgings`, and `drivingNotes` are separate datasets, so adding an item to one does not add it to the others.
- For each named itinerary attraction, make an explicit choice: route-only, activity-only, full `spots` card plus marker, or intentionally omitted. Default to a `spots` entry when the guide presents it as a destination rather than incidental context.
