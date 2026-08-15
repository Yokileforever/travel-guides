---
name: travel-guide-publisher
description: Convert travel notes, Yuque docs, Markdown, pasted itineraries, or booking/boarding-pass artifacts into a polished interactive travel guide website with itinerary cards, leave/public-holiday calendars, Leaflet maps, route data, lodging/hotel points, images, flights, preparation checklists, and optional GitHub Pages publishing. Use when the user asks to turn a travel article into an攻略/guide/site/map, calculate a time-off plan, show workdays/leave/holidays/weekends, extract a travel plan from a document, make a public shareable trip page, add map layers such as accommodation points, deploy a travel guide to GitHub, or maintain a multi-trip travel-guides repository.
---

# Travel Guide Publisher

## Overview

Create a shareable travel-guide website from source notes and deploy it when requested. Favor a static site that can run on GitHub Pages: root collection page plus one subfolder per trip.

Read `references/implementation-checklist.md` before implementation or deployment. Read `references/module-architecture.md` when adding new guide sections, map features, data layers, or reusable components.

## Standard Workflow

When a user reports a defect in an existing guide and also asks to improve this skill, fix and verify the guide first. Only then generalize the verified correction into the skill. Do not substitute skill documentation work for repairing the current artifact.

1. **Ingest source**
   - For Yuque links, prefer `yuque-cli show <namespace>/<slug>` when available and authenticated.
   - If `yuque-cli` is unavailable, check whether the installed command is named `yuque`; inspect `yuque --help`, then use `yuque show <namespace>/<repo>/<slug>` when supported.
   - If attachments matter, use browser/computer-use with logged-in state for read-only download; never publish ticket numbers, barcodes, booking references, passport numbers, or token-like data.
   - Read booking screenshots when they contain facts missing from the body, especially hotel names, stay dates, booking status, and total price. Extract only facts needed by the guide; do not embed private order screenshots in a public page.
   - If source content is pasted, parse directly.

2. **Extract trip model**
   - Build structured data for flights, dates, routes, places, attractions, hotels, activities, preparation items, and notes.
   - Add a `tripCalendar` module when the trip crosses workdays, public holidays, adjusted workdays, or weekends, or when the user asks how many leave days are needed.
   - Verify holiday and adjusted-workday classifications against an authoritative schedule for the exact year and jurisdiction. Never infer official holiday status from weekday alone.
   - Keep inclusive calendar span, itinerary-day count, overnight count, and personal leave-day count as separate values. Use “天跨度” when the headline describes an inclusive date range rather than full sightseeing days.
   - Preserve uncertainty explicitly with `待补` fields rather than inventing.
   - For flight times and route distances, verify from public/current sources when the user asks or the source is incomplete.
   - Keep the model extensible: store new guide concepts as named modules with data arrays/objects instead of scattering one-off strings through the UI.
   - For every lodging, capture the exact public name, city, stay dates/nights, map point, booking status, price data, and verified public booking links when available.
   - If lodging is booked, display the booked total from the source. If it is not booked, look up a current reference price for the exact stay dates and label it as a dated reference price. Never mix booked totals with live reference prices.
   - Prefer exact Trip.com and Booking.com property pages; include only confirmed platforms and never guess a URL. Use an exact Ctrip page when Trip.com is unavailable. Never link a private order-detail page.
   - Reconcile source coverage before rendering: compare source itinerary rows, attraction headings, driving-route headings, lodging screenshots, and transport blocks against the structured modules. Every source item must be intentionally represented or explicitly classified as omitted/optional; do not rely on ad hoc “key attraction” selection.

3. **Generate guide**
   - Prefer a static HTML/CSS/JS app unless the existing repo has a framework.
   - Use actual usable guide UI as the first screen, not a marketing landing page.
   - Include: overview, flight cards, daily itinerary, lodging/accommodation points when present, attractions with images, preparation checklist, and an interactive map.
   - When `tripCalendar` is enabled, render a compact time-off section after the summary/stats and before flight cards, with an explicit date range and a headline such as `请 3 天，串起 11 天跨度`.
   - Reuse the same calendar data shape, badge semantics, responsive layout, and visual language across every guide in a collection unless a guide-specific design clearly requires adaptation.
   - For guides with several content views, use a prominent sticky tab bar. Pair each tab label with one semantically matched emoji when a friendly, highly scannable style is appropriate; keep the text label and mark the emoji `aria-hidden`.
   - Use Leaflet for maps when requested; for this user's default style, use Leaflet 1.9.4, Esri World Topographic Map tiles, and OSRM/OpenStreetMap route fetching with dashed fallback lines.
   - Make sections modular: optional modules can include lodging, budget, weather, visa, food, risks, packing, photo spots, tickets, driving notes, offline maps, map filters, layer toggles, and GPX/GeoJSON overlays.

4. **Validate locally**
   - Run JS syntax checks.
   - Start a local static server and verify routes/files return `200`.
   - Open the page in the browser when possible. Check map tiles, route labels, image layout, text overflow, mobile behavior, and console errors.
   - Confirm every interactive control has intentional project-matching styles; native browser buttons are a failed visual check.
   - For a time-off calendar, verify every displayed date, weekday, type, leave count, inclusive span, and trip-boundary day. Check desktop and narrow layouts for badge or label overflow.
   - At full-route zoom, check that permanent day labels, lodging markers, and nearby attraction markers do not hide one another. Adjust placement, zoom behavior, or clustering when collisions occur.
   - Run a coverage audit after visual fixes: for every attraction named in a day route or activity, confirm whether it needs a `spots` entry and map marker. Verify the current artifact before updating this skill with any newly learned rule.

5. **Publish**
   - For a collection repo, use:
     ```text
     travel-guides/
       index.html
       <trip-slug>/
         index.html
         styles.css
         app.js
         vendor/
     ```
   - Use GitHub Pages from `main` branch root when deploying to GitHub.
   - Exact personal leave dates and work schedules are privacy-sensitive. Before publishing them to a public site, identify the dates that will be exposed and obtain explicit informed confirmation from the user. Do not treat a generic “deploy latest” request as consent when a new update introduces this data.
   - Verify the GitHub Pages homepage and trip subpage both return `200`.

## UX Requirements

- Make the page practical for travelers: dense enough to scan, not a generic hero site.
- Make section tabs unmistakable: give inactive items a visible surface and boundary, and use a high-contrast fill plus a secondary indicator for the active item. Do not combine numeric prefixes and emoji in compact tabs.
- Implement tab navigation with `tablist`/`tab`/`tabpanel`, synchronized `aria-selected` and `tabindex`, and Arrow/Home/End keyboard switching. Keep labels stable in one row when space permits and a balanced grid on narrow screens.
- Use stable dimensions for map, cards, route labels, image strips, and badges.
- Do not let tags, distance pills, or image previews overlap text.
- Keep route/date identity visible on the map with labels or legend.
- Treat a time-off calendar as an optional module, not hand-written hero copy. Distinguish `工作日`, `请假`, `法定假期`, `调休上班`, and `周末` with text as well as color. Show a compact `请` badge on every leave day and a compact `假` badge on every official holiday or weekend; do not rely on the tile background alone.
- When a public holiday overlaps a weekend, keep the tile type/label as `周末`, show the `假` badge, and state the overlapping holiday in the note or accessible title.
- Keep calendar tiles stable and scannable: six or seven columns on wide layouts, two or three columns on narrow layouts, with no badge, weekday, or note overflow.
- Show lodging as its own map layer when coordinates are available; use a distinct hotel/accommodation marker, include a list or tab, and let list items focus/open the map marker.
- Lodging cards and lodging map popups must show verified booking links and price status when the data exists. Use labels such as `已预订 · 1 晚总价` or `参考价 · 9 月 22 日入住`; never imply a live price is a paid amount.
- Only attractions in the structured `spots` module receive attraction markers. Ensure important route waypoints that are also attractions are present in `spots`, and resolve marker collisions rather than assuming a marker is missing.
- For maps, design for future layers: routes, places, hotels, scenic spots, airports, driving segments, day filters, category filters, and custom imported GeoJSON/GPX should be able to coexist.
- Use images only when they clearly belong to the attraction; remove ambiguous booking, airline, or unrelated screenshots from attraction cards.
- If publishing publicly, remove or avoid sensitive travel data: barcodes, booking refs, ticket numbers, identity document details, phone/email, and exact private accommodation documents.
- Treat exact leave/work dates as personal schedule data. Publish them only after the user explicitly approves public disclosure of those dates.

## Deployment Notes

- Use `gh` when available for repository creation, push, and GitHub Pages setup.
- If `gh auth status` fails, ask the user to authorize before creating persistent GitHub access.
- Avoid committing temporary downloads, PDFs, CLI installs, `.npm-global`, screenshots, or source documents unless the user explicitly wants them public.
- After deployment, provide both the repository URL and public Pages URLs.
