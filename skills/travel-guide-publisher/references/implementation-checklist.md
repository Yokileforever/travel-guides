# Implementation Checklist

## Contents

- [Source Ingestion](#source-ingestion)
- [Travel Data Model](#travel-data-model)
- [Map Defaults](#map-defaults)
- [Visual Checks](#visual-checks)
- [GitHub Pages Workflow](#github-pages-workflow)
- [Recommended Trip Slugs](#recommended-trip-slugs)
- [Final Response](#final-response)

## Source Ingestion

- Yuque doc URL shape: `https://www.yuque.com/<namespace>/<repo>/<slug>?...`
- `yuque-cli show <namespace>/<repo>/<slug>` can read the Markdown body when token is available.
- The executable may be named `yuque`; check both commands before falling back to browser retrieval.
- Attachments may require a logged-in browser session even when `YUQUE_TOKEN` works for document body.
- Use Computer Use only for read-only retrieval unless the user explicitly asks to modify or publish.
- When lodging facts appear only in screenshots, inspect each image for hotel name, stay date, booking status, and total price. Treat all other order content as private by default.

## Travel Data Model

Prefer modular data. Start with `flights`, `days`, `places`, `spots`, and `prep`; add `travelerGroups` when people have different origins, departures, returns, or transport records, and add `lodgings` whenever the source mentions hotels/accommodation. Add `tripCalendar` when leave planning or holiday/weekend context matters. Add optional arrays such as `budget`, `weather`, `tickets`, `food`, `drivingNotes`, or `photoSpots` only when source content or the user asks for them.

Before implementation, build a lightweight coverage ledger from the source:

| Source item | Required representation |
| --- | --- |
| Itinerary route stop | `places` plus the relevant `days[].route` |
| Named attraction/activity | `days[].activities`; also `spots` when it should have a card or map marker |
| Scenic/driving road | `drivingNotes` and the relevant day route when used |
| Lodging screenshot | `lodgings` with verified name, dates, status, price, links, and map point |
| Flight/rail segment | `flights` or the applicable transport module; link it to `travelerGroups` when travelers differ |
| Leave/holiday plan | `tripCalendar` plus explicit span and leave counts |

Mark deliberate exclusions explicitly in working notes. Before finishing, compare the ledger to the rendered modules so no heading or itinerary item disappears through manual selection.

Recommended JavaScript structures:

```js
const flights = [
  {
    groupId: "parents",
    direction: "去程",
    badge: "出发",
    date: "4 月 30 日 - 5 月 1 日",
    from: { code: "PVG", city: "上海浦东", terminal: "T2", time: "23:55", date: "4 月 30 日" },
    to: { code: "CAI", city: "开罗", terminal: "T3", time: "06:25", date: "5 月 1 日" },
    flightNo: "埃及航空 MS952",
    meta: "航程约 12 小时 30 分钟",
    note: "抵达后取车。"
  }
];

const airports = {
  PVG: { name: "上海浦东国际机场", lat: 31.1443, lng: 121.8083 },
  CAI: { name: "开罗国际机场", lat: 30.1119, lng: 31.4140 }
};

const days = [
  {
    date: "5 月 1 日",
    title: "开罗机场 → 赫尔格达",
    drive: "约 460 公里",
    route: ["cairoAirport", "hurghada"],
    activities: ["抵达取车", "入住酒店", "休整"],
    stay: "赫尔格达"
  }
];

const tripCalendar = [
  {
    date: "2026-05-06",
    month: "5 月",
    day: "6",
    weekday: "周三",
    type: "leave",
    label: "请假",
    note: "金字塔日",
    badge: "请",
    inTrip: true
  }
];

const lodgings = [
  {
    name: "Great Pyramid Inn",
    city: "吉萨 / 开罗",
    dates: "5 月 6 日 - 5 月 7 日",
    nights: "1 晚",
    lat: 29.9759,
    lng: 31.1378,
    note: "靠近金字塔区，适合晚上休整和次日清晨进金字塔。"
  }
];
```

For the `travelerGroups` schema, association rules, renderer, and public-name privacy guidance, read `module-architecture.md#traveler-transport-groups`.

Calendar rules:

- Use ISO `date` as the source of truth; derive display month/day/weekday where practical.
- Supported types should include `workday`, `leave`, `holiday`, `weekend`, and `adjusted-workday`. Add `buffer` only when an adjacent recovery day is intentionally shown outside the active itinerary.
- Verify `holiday` and `adjusted-workday` against an authoritative schedule for the exact year and jurisdiction. Record uncertainty instead of guessing.
- Calculate `spanDays` inclusively from trip start through trip end. Calculate `leaveDays` from entries explicitly marked `leave`; do not count every weekday automatically.
- Keep `spanDays`, `itineraryDays`, and `nights` distinct. Prefer `11 天跨度` over `11 天` when partial travel days or adjacent rest days are included.
- Mark calendar-only dates outside the active trip with `inTrip: false` and label their purpose, such as `返程后休整`.
- Render type names in text, not color alone. Every `leave` entry gets a visible `请` badge. Every `holiday` and `weekend` entry gets a visible `假` badge. Keep the full type label visible beside the compact badge.
- For a holiday/weekend overlap, preserve `type: "weekend"`, use `badge: "假"`, and put the holiday name in `note` or `badgeTitle`; this preserves both calendar classification and holiday context.
- Place the calendar after hero summary/stats and before the flight summary. Apply the same component contract and responsive behavior to other guides in the same collection.
- Before public deployment, list the exact leave/work dates being introduced and obtain explicit user confirmation to publish them.

For public pages, keep lodging display data limited to hotel name, city, dates/nights, coordinates, and practical notes. Do not publish booking numbers, order screenshots, guest names, phone/email, room numbers, payment details, or barcodes.

Add verified booking and pricing fields when available:

```js
{
  name: "Hotel Name",
  price: {
    status: "booked", // or "reference"
    amount: "220",
    currency: "CNY",
    basis: "1 晚总价",
    stayDates: "2026-09-22/2026-09-23",
    checkedAt: null,
    source: "预订截图"
  },
  bookingLinks: [
    { provider: "Trip.com", url: "https://www.trip.com/hotels/..." }
  ]
}
```

- For `booked`, use the amount shown in the source confirmation and label it as the booked total.
- For `reference`, query the exact hotel for the intended stay dates, record `checkedAt`, and visibly label the amount as a dated reference price.
- Prefer exact Trip.com and Booking.com property pages. Omit an unavailable provider. Use exact Ctrip when Trip.com has no matching page. Never construct or guess property URLs.
- Render verified links in both lodging cards and lodging popups when practical, using `target="_blank"` and `rel="noopener noreferrer"`.

## Map Defaults

- Map stack contract: Leaflet is the browser rendering framework; Esri supplies the default topographic tiles; OSRM calculates driving routes from OpenStreetMap road data. Do not describe OpenStreetMap as the routing engine, substitute OpenStreetMap tiles for the requested Esri basemap, or spell Esri as `Eris`.
- Leaflet version: `1.9.4`.
- Esri World Topographic Map tile URL:
  ```js
  https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
  ```
- OSRM route URL:
  ```js
  https://router.project-osrm.org/route/v1/driving/<lng,lat;lng,lat>?overview=full&geometries=geojson&continue_straight=false
  ```
- Always keep fallback polylines from coordinates because OSRM can fail or rate-limit.
- Add a route legend and labels such as `5/1`, `5/2`; clicking a legend item should focus/highlight the day.
- When flights exist, resolve each IATA code to a verified airport coordinate and render flight routes in a dedicated `flightLayer` plus airport markers in `airportLayer`. Use great-circle interpolation or another documented geodesic implementation; do not use OSRM for air travel.
- Keep the default bounds focused on the destination itinerary. Add a visible `航班` layer toggle that synchronizes `flightLayer` and `airportLayer`; turning it off hides both and returns to the ground route, while turning it on fits the flight bounds. Separate flight legend entries must restore hidden flight layers before focusing the selected corridor.
- Group reciprocal flights into one visual corridor when they share the same airport pair, while listing every flight number and direction in the popup. State that the route is illustrative and not a real-time track.
- Add lodging markers as their own layer (`lodgingLayer` or `hotelLayer`) when hotel coordinates exist. Use a visually distinct marker such as `住`/hotel icon, show them by default, and provide a toggle if the toolbar already has map controls.
- If adding a lodging list/tab, clicking a lodging card should `setView`/focus the marker and open its popup.
- Keep layers separate by concept: route, fallback route, labels, places, hotels, airports, restaurants, photo spots, and imported GeoJSON/GPX.
- Add filters or toggles when there are multiple categories; avoid making every marker identical.
- Inspect full-route zoom for collisions. Permanent day tooltips can render above hotel or attraction markers; move labels, offset points, cluster markers, or reveal them when focusing a day.
- Route waypoints do not automatically become attraction markers. Add important attractions to `spots` as well as to day routes.

## Visual Checks

- If adding a new module, check that it can be hidden/omitted without leaving empty UI shells.
- Typography: identify the collection reference guide before styling. Compare the computed `font-family` for `body`, `h1`, `h2`, `h3`, tabs, labels, and `.stats strong` between the new/repaired page and that reference. For this collection, interface text should resolve from `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`; keep `Georgia, serif` only where the reference already uses it for numeric emphasis. Treat an unrequested Songti/CJK-serif heading as a failed consistency check.
- Flight cards: show flight number, airport codes, city/terminal, departure/arrival dates and times, and duration.
- Traveler transport groups: render the outer group list as one column so every group owns a full-width row; separate groups with a clear dashed boundary. Render each group's cards with a responsive `auto-fit`/`minmax` inner grid, collapsing to one column on narrow screens. Test at least one, two, and three-or-more groups; also test a long group label and a group with three-or-more transport/pending cards.
- Traveler transport groups: confirm displayed group labels come from `travelerGroups[].label`, every grouped transport appears exactly once, source order is preserved, and no `第一组`/`第二组` text is generated from array indexes.
- Flight maps: verify every flight code resolves to an airport marker, each unique corridor is visible and clickable, shared outbound/return corridors list both flights, map overlay padding keeps both endpoints visible, and ground-route focus restores the normal legend. Test initial, hidden, and legend-restored states; airport markers, route lines, and `aria-pressed` must change together.
- Itinerary cards: distance badges must be small and must not cover body text.
- Lodging cards: show city, hotel name, dates/nights, and a short practical note; make badges compact so they do not cover long hotel names.
- Lodging cards: show booked/reference price state and verified platform links when available. Long names, price pills, and link buttons must wrap without overlap.
- Buttons and links: confirm all controls use intentional project styles. A browser-default button means visual validation failed.
- Section tabs: use a clearly bounded segmented surface, visible inactive states, and a high-contrast active state with a second cue such as an underline or accent bar. Verify sticky positioning does not cover content.
- Emoji tabs: use one meaningful emoji plus a text label, set the emoji `aria-hidden="true"`, and avoid mixing emoji with numeric prefixes when space is tight. Never use emoji alone as the accessible label.
- Tab behavior: use `role="tablist"`, `role="tab"`, `role="tabpanel"`, synchronized `aria-selected`/`tabindex`, and ArrowLeft/ArrowRight/Home/End navigation. Test click, keyboard focus, and panel synchronization.
- Responsive tabs: prefer one row at wide widths and a balanced two- or three-column grid on narrow screens. Check the longest label for button overflow and confirm the tab bar does not widen the document.
- Time-off calendar: verify date range, weekdays, type labels, `请`/`假` badge coverage, leave count, inclusive span, holiday/weekend overlaps, and whether calendar-only buffer days are outside the itinerary.
- Time-off calendar: use stable equal-width tiles; target six or seven columns on wide layouts and two or three columns on narrow layouts. Confirm long holiday labels and badges do not overlap.
- Regression order: repair the current guide, run syntax/route/visual checks, and only afterward update the reusable skill. Re-check the repaired guide after any skill-driven follow-up edit.
- Coverage: sample every day and confirm each named attraction appears in the intended modules. In particular, a place present in `days[].route` does not receive a `景` marker unless it is also present in `spots`.
- Attraction images: use `loading="lazy"` and `onerror="this.hidden=true"`.
- Do not use images from booking/order/airline screenshots as attraction imagery unless the user explicitly asks.
- For public pages, do not embed boarding pass images, barcodes, ticket numbers, booking references, or passenger identifiers.

## GitHub Pages Workflow

1. `gh auth status`; if invalid, ask user to authorize `gh auth login`.
2. Create repo if needed:
   ```bash
   gh repo create <owner>/travel-guides --public --description "Interactive travel guide collection with maps and itineraries"
   ```
3. Initialize and push:
   ```bash
   git init
   git remote add origin https://github.com/<owner>/travel-guides.git
   git add .gitignore index.html <trip-slug>
   git commit -m "Add <trip name> travel guide"
   git push -u origin main
   ```
   If the staged update newly exposes exact personal leave/work dates, stop before `git push`, enumerate those dates, and obtain explicit informed confirmation for public disclosure.
4. Enable Pages:
   ```bash
   gh api --method POST repos/<owner>/travel-guides/pages -f 'source[branch]=main' -f 'source[path]=/'
   ```
   If Pages already exists, query or update instead of creating.
5. Verify:
   ```bash
   curl -I https://<owner>.github.io/travel-guides/
   curl -I https://<owner>.github.io/travel-guides/<trip-slug>/
   ```

## Recommended Trip Slugs

Use lowercase ASCII and dates:

- `egypt-2026-may`
- `japan-2026-sakura`
- `thailand-2027-winter`

## Final Response

Return:

- Local files changed.
- Repository URL.
- Public collection URL.
- Public trip URL.
- Any known caveats, especially images that depend on third-party CDN access.
