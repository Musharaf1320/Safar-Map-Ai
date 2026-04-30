# Safar Project - AI Agent Instructions

## Project Overview

Safar is a React-based map application that provides location search, routing, nearby places discovery, and voice command functionality using OpenStreetMap (via Nominatim API).

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Map Library**: Leaflet + react-leaflet
- **HTTP Client**: axios
- **Linting**: ESLint 9

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Structure

```
safar/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component styles
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   └── services/
│       ├── geocoding.js   # Address to coordinates (Nominatim API)
│       ├── routing.js     # Route between two points
│       ├── nearby.js      # Search nearby places
│       └── voice.js       # Voice command parsing
├── index.html
├── vite.config.js
└── package.json
```

## Key Patterns

- **Map State**: Uses `useRef` for map instance, `useState` for markers/routes
- **API Integration**: All external calls use Nominatim OpenStreetMap API
- **Leaflet Fix**: Icon URL fix required for React-Leaflet (lines 8-14 in App.jsx)

## Important Notes

- Nominatim API has rate limits - add delays between requests
- Map uses OpenStreetMap tiles (free, no API key needed)
- Voice recognition uses Web Speech API (`window.SpeechRecognition`)