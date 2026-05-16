#  Safar – AI Powered Smart Map (In Progress)

Safar is an AI-powered navigation web application inspired by Google Maps and Waze.
It enables users to search locations, get routes, discover nearby places, and interact using voice commands and AI.

---

##  Features

*  **Location Search** (Geocoding with OpenStreetMap)
*  **Route Navigation** (OpenRouteService API)
*  **Nearby Places** (Gas stations, restaurants, hospitals)
*  **Smart Nearby Selection** (Click marker → route)
*  **Voice Commands** (Web Speech API)
*  **Interactive Map UI** (Leaflet + OpenStreetMap)
*  **Modular Architecture** (Service-based design)

---

##  Tech Stack

* **Frontend:** React (Vite)
* **Maps:** Leaflet + OpenStreetMap
* **APIs:**

  * OpenRouteService (Routing)
  * Nominatim (Geocoding)
  * Overpass API (Nearby Places)
* **Other:** Axios, Web Speech API
* **Upcoming:** OpenAI API (AI Assistant)

---

##  How It Works

1. Search any location
2. View it on the map
3. Get directions between locations
4. Find nearby places (restaurants, gas stations, hospitals)
5. Click any nearby marker → route is generated
6. Use voice commands for hands-free interaction

---

##  Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

##  Project Structure

```
src/
  services/
    geocoding.js     # location search
    routing.js       # route calculation
    nearby.js        # nearby places
    voice.js         # voice command parsing
  App.jsx            # main UI & logic
```

---

## 🔮 Future Improvements

*  AI-based route suggestions (fastest / safest)
*  ChatGPT-powered travel assistant
*  Real-time traffic integration
*  Save favorite / recent locations
*  Mobile app (React Native / Flutter)
*  Google Maps–like UI/UX

---

## 📸 Demo

*(Add screenshots or demo link here)*

---

##  Key Highlights

* Designed a **modular frontend architecture** using service abstraction
* Integrated multiple real-world APIs for geolocation and routing
* Built interactive map-based UI with dynamic markers and routing
* Implemented voice-based interaction for hands-free navigation

---

##  Author
**Musharaf Uddin**
Master’s in Information Systems
Interested in Software Engineering, Networking, and AI Systems

| Tool / API               | What it is used for                                  |
| ------------------------ | ---------------------------------------------------- |
| **React**                | Builds the frontend/user interface                   |
| **Vite**                 | Runs the React app fast during development           |
| **JavaScript**           | Main programming language                            |
| **Leaflet**              | Displays the interactive map                         |
| **OpenStreetMap**        | Provides the map data/tiles                          |
| **Nominatim API**        | Converts place names into latitude/longitude         |
| **Overpass API**         | Finds nearby places like gas, restaurants, hospitals |
| **OpenRouteService API** | Creates route/directions between two locations       |
| **Axios**                | Sends API requests from your app                     |
| **Web Speech API**       | Lets user speak commands instead of typing           |
| **OpenAI API / ChatGPT** | AI assistant for travel/navigation questions         |
| **Node.js + Express**    | Backend server to safely call OpenAI API             |
| **CORS**                 | Allows frontend and backend to communicate           |
| **dotenv**               | Stores API keys safely in `.env`                     |
| **Git**                  | Tracks code changes                                  |
| **GitHub**               | Stores and shares your project online                |


User Search / Voice Command
        ↓
React + Vite
(frontend UI)

        ↓
Leaflet + OpenStreetMap
(display interactive map)

        ↓
Nominatim API
(convert place name → coordinates)

        ↓
OpenRouteService API
(generate routes & directions)

        ↓
Overpass API
(find nearby places)

        ↓
Web Speech API
(convert speech → text)

        ↓
Node.js + Express Backend
(handle AI requests securely)

        ↓
OpenAI API / ChatGPT
(generate AI travel responses)

        ↓
Map Updates + AI Responses
(show routes, markers, travel help)


