# Study Room Booking System

A Vue 3 study computer booking demo for checking live workstation availability, searching by booking details, and reserving one device per student ID.

![Booking workspace preview](docs/preview-home.png)

## What It Does

This project presents a campus-style booking interface where students can check which study computers are available before they arrive. The system includes an interactive booking form, shared reservation logic, a live status dashboard, and a visual computer map that lets users reserve an available workstation.

## Preview

The opening screenshot shows the booking workspace with validated student ID input, available computer results, and a direct path into the live computer status page.

### Live Status Dashboard

The status page summarizes total workstations, available computers, unavailable devices, service issues, and the student's current reservation.

![Live status dashboard preview](docs/preview-status-overview.png)

### Clickable Computer Map

Each workstation is displayed as an individual computer. Green computers are available and can be reserved, grey computers are unavailable, and amber computers show a service issue.

![Clickable computer map preview](docs/preview-computer-map.png)

## Core Features

- Validated booking form with location, date, start time, duration, and student ID.
- Visual workstation map with individual computer states.
- Click-to-reserve flow from both the booking page and live status page.
- One active reservation per student ID.
- Shared reservation state stored in localStorage.
- Reservation panel with cancel option.
- Device detail panel for selected computers.
- Quick filters for all, available, unavailable, and service issue devices.
- Session activity log for recent actions.
- Node test coverage for reservation rules, filters, validation, and cancellation.
- Responsive blue campus-style interface.

## User Flow

1. Enter booking details and a student ID on the booking page.
2. Review available computers and reserve one device.
3. Open the live status page to see the reservation reflected on the visual map.
4. Try another booking with the same student ID and the system blocks it.
5. Cancel the current reservation before booking a different computer.

## Tech Stack

- Vue 3
- Vite
- Node test runner
- HTML
- CSS
- JavaScript

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Test and Build

```bash
npm test
npm run build
```

## Project Structure

```text
.
|-- docs/
|   |-- preview-home.png
|   |-- preview-status-overview.png
|   `-- preview-computer-map.png
|-- src/
|   |-- StatusApp.vue
|   |-- bookingData.js
|   |-- bookingData.test.js
|   |-- bookingStore.js
|   |-- main.js
|   |-- status.js
|   `-- styles.css
|-- index.html
|-- status.html
|-- package.json
`-- vite.config.js
```

## Note

This is a generic demo project for study computer booking workflows. It is not an official campus service.
