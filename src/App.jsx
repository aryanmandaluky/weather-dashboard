import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    const res = await fetch(`http://localhost:5000/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && weather.main && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temp: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {weather && weather.error && <p>{weather.error}</p>}
    </div>
  );
}

export default App;
