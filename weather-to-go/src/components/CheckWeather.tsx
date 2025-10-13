import { useLocation } from 'react-router-dom'
import { type Location } from '../interfaces/location';

function CheckWeather() {
  const { state } = useLocation();
  const weatherData = state?.locationData as Location
  return (
    <div>
      <h1>{weatherData.display_name}</h1>
      <h2>{`緯度：${weatherData.lat}`}</h2>
      <h2>{`経度：${weatherData.lon}`}</h2>
    </div>
  )
}

export default CheckWeather
