# Raintech Hotel Booking

A small React application for selecting a hotel room, choosing check-in and check-out dates, and calculating the total stay price.

## Features

- Displays five rooms using hardcoded JSON data
- Allows the user to select one room
- Accepts check-in and check-out dates
- Calculates the number of nights
- Calculates the total using the selected room's nightly rate
- Prevents check-in dates in the past
- Rejects same-day and reversed date ranges
- Validates the selected room's guest capacity
- Displays clear validation messages
- Creates an in-memory booking confirmation
- Includes unit tests for date, price, guest and validation rules

## Technology

- React
- Vite
- JavaScript
- CSS
- Vitest

I chose React with Vite because it provides a simple development environment while keeping the UI components and booking logic clearly separated.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Installation

Clone the repository and install its dependencies:

```bash
npm install
```

## Run the application

```bash
npm run dev
```

Open the local address displayed in the terminal.

## Run the tests

```bash
npm test
```

## Create a production build

```bash
npm run build
```

## Technical decisions

Room information is stored as hardcoded JSON because the exercise does not require an API or database.

Date, validation and price calculations are implemented as separate utility functions instead of being placed directly inside the React components.

Date calculations use calendar dates at UTC midnight to prevent time-zone or daylight-saving changes from affecting the number of nights.

The booking confirmation is stored only in React state. It is not persisted because booking persistence is outside the scope of the exercise.

## Improvements with more time

- Prevent selection of rooms with overlapping existing bookings
- Filter the room list by maximum guest capacity
- Connect the application to a real room-availability API
- Improve accessibility testing
