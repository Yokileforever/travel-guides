# Module Architecture

Use this reference when extending travel-guide pages beyond the base itinerary/map/flight/spot/checklist experience.

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
    calendar: true,
    itinerary: true,
    map: true,
    lodging: true,
    spots: true,
    prep: true,
    budget: false,
    weather: false,
    tickets: false,
    food: false,
    driving: false
  }
};
```

Existing simple pages may keep separate `flights`, `days`, `lodgings`, `spots`, and `prep` arrays, but new sections should follow the same pattern: `const budgets = [...]`, `const weather = [...]`, `const tickets = [...]`, with dedicated render functions.

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

### Budget

Use for spend estimates, paid bookings, deposits, per-person costs, cash needs, and currency notes.

Suggested fields:

```js
const budget = [
  { category: "住宿", amount: "¥3200", status: "已预订", note: "不公开订单号" },
  { category: "门票", amount: "待补", status: "现场/官网", note: "核对官方价格" }
];
```

Public-page privacy: do not publish booking IDs, payment screenshots, full receipts, card details, or invoice identifiers.

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
  airportLayer: L.layerGroup()
};
```

Recommended future controls:

- Day filter: focus/highlight a single day.
- Category filter: toggle attractions, hotels, flight routes, airports, food, photo spots.
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
function renderCalendar() {}
function renderItinerary() {}
function renderLodgings() {}
function renderSpots() {}
function renderBudget() {}
function renderMapLayers() {}
```

Guard optional modules:

```js
if (trip.modules.budget && budget.length) {
  renderBudget();
}
```

## Validation For New Modules

- Check responsive layout at narrow and wide widths.
- Confirm text does not overlap badges, images, map controls, or long labels.
- Verify public pages do not expose sensitive booking, identity, financial, or barcode data.
- If a public page includes exact leave/work dates, confirm the user explicitly approved publishing those dates.
- If a module uses live data, cite or note the source in the final response.
- Reconcile source coverage across modules: `days`, `places`, `spots`, `lodgings`, and `drivingNotes` are separate datasets, so adding an item to one does not add it to the others.
- For each named itinerary attraction, make an explicit choice: route-only, activity-only, full `spots` card plus marker, or intentionally omitted. Default to a `spots` entry when the guide presents it as a destination rather than incidental context.
