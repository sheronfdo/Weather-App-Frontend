# 🌦️ Weather App

A modern weather forecasting application built with **React**, **TailwindCSS**, and **Vite**. It delivers real-time weather updates, historical data, and 4-day forecasts with dynamic visuals and animations to enhance the user experience.

---

## 🔑 Key Features

* 🔍 **Smart Location Search** – with auto-suggestions
* 📍 **Automatic Geolocation Detection** – fallback to *Colombo*
* 📊 **Detailed Weather Metrics** – temperature, humidity, wind, UV index, etc.
* 🕓 **Time-Based Data Grouping** – 3-hour interval breakdowns
* 🌄 **Background Animations** – sunrise, day, sunset, night, clouds, fog
* 📅 **2-Day Historical + 4-Day Forecast** – grouped and visualized
* 📱 **Fully Responsive UI** – mobile and desktop friendly
* ⚡ **Fast Development** – powered by Vite + TailwindCSS

---

## 🗂️ Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CurrentWeatherTiles.jsx
│   │   ├── LocationDetails.jsx
│   │   ├── WeatherBackgroundAnimation.jsx
│   │   ├── WeatherSearch.jsx
│   │   └── WeatherTable.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🌐 Backend API Requirements

Ensure your backend is running and supports the following endpoints:

| Endpoint                              | Description                       |
| ------------------------------------- | --------------------------------- |
| `/api/current?q=London`               | Current weather for a city        |
| `/api/history?q=London&dt=YYYY-MM-DD` | Historical data for a city & date |
| `/api/forecast?q=London&days=4`       | 4-day forecast data               |
| `/api/search?q=Lo`                    | Location search suggestions       |

> Note: Backend is expected to be running on `http://localhost:3000` during development.

---

## 🌟 Customization Tips

Want to tailor this app to your specific use case or brand? Here's how you can customize it:

### 🔧 1. **Favicon & Branding**

* Update the favicon in `index.html`:

  ```html
  <link rel="icon" type="image/png" href="//cdn.weatherapi.com/weather/64x64/day/113.png" />
  ```

* To use your own logo:

  * Replace `src/assets/react.svg` with your logo file.
  * Update any `img` references inside components like `WeatherSearch` or `App.jsx`.

---

### 🌄 2. **Background Animations**

The `WeatherBackgroundAnimation.jsx` component dynamically renders animated visuals based on weather phase and conditions.

#### 🔁 How to Customize:

* You can enhance or replace SVG clouds, fog, sun, or night effects.
* Add more realistic animations using:

  * **Framer Motion** (already Vite-compatible)
  * **Lottie** animations for SVG-based animated backgrounds
  * Custom **Canvas/WebGL** visuals

#### ✨ Examples:

* Change cloud shape and animation speed.
* Add snow/rain particle systems.
* Adjust sun position based on time.

---

### 🎨 3. **TailwindCSS Styling**

#### 🧩 Customize Theme:

* Tailwind allows full customization of colors, fonts, breakpoints, etc.
* Edit `tailwind.config.js` to change default styles:

  ```js
  // tailwind.config.js
  export default {
    theme: {
      extend: {
        colors: {
          primary: '#00aaff',
          secondary: '#f5f5f5',
        },
        fontFamily: {
          body: ['Inter', 'sans-serif'],
        }
      }
    }
  }
  ```

#### 🧪 Tips:

* Use Tailwind’s utility classes to adjust responsiveness or accessibility.
* Apply themes for **dark/light modes** based on `phase`.

---

### 🖼️ 4. **Weather Icons**

#### 🔁 Replace Default Weather Icons:

* The app uses icons from **WeatherAPI CDN** like:

  ```js
  // Example:
  icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
  ```

#### ✅ Customize By:

* Downloading icons locally to `public/icons/` and using them instead
* Using your own custom SVG/PNG set
* Adding animated icons using tools like [Lordicon](https://lordicon.com) or [LottieFiles](https://lottiefiles.com)

---

### 🧠 5. **Data Transformation & Display**

* **WeatherTable.jsx** transforms raw hourly data into 3-hour interval blocks.
* You can customize:

  * Group sizes (e.g., switch to hourly or 6-hour blocks)
  * Add charts (e.g., **Recharts**, **Chart.js**, **ApexCharts**) for:

    * Temperature trends
    * Wind & humidity variations

---

### 🧪 6. **Experimental Ideas**

* 🔔 **Push Notifications** for weather alerts
* 🗺️ **Map Integration** (e.g., Leaflet.js or Google Maps for geolocation)
* 🎤 **Voice Search** for location input
* 🔐 **User Authentication** to save preferred cities or dashboard

---

## 🛠️ Technologies Used

* React 18
* TailwindCSS 3
* Vite
* Axios
* WeatherAPI

---

## 👨‍💻 Author

**Jamith Sheron**
Software Engineering Student | Java Institute for Advanced Technology

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).


