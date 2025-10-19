import { useLocation } from 'react-router-dom'
import type { Location } from '../interfaces/location';
import type { WeatherInfomation } from '../interfaces/weather-infomation';

function CheckWeather() {
  const { state } = useLocation();
  const locationData = state?.locationData as Location
  const weatherData = state?.weather as WeatherInfomation
  return (
    <div>
      <h1>{locationData.display_name}</h1>
      <h2>{`緯度：${locationData.lat}`}</h2>
      <h2>{`経度：${locationData.lon}`}</h2>
      <div>
        {weatherData.temperature.map((item, index) => {
          return <div key={index}>{index + 1}時の気温： {item}℃</div>
        })}
        {weatherData.precipitationProbability.map((item, index) => {
          return <div key={index}>{index + 1}時の降水確率： {item}％</div>
        })}
        <div>風速：{ weatherData.windSpeed }m/s</div>
        {weatherData.snowfall.map((item, index) => {
          return <div key={index}>{index + 1}時の降雪量： {item}mm</div>
        })}
        {weatherData.visibility.map((item, index) => {
          return <div key={index}>{index + 1}時の視程： {item}m</div>
        })}
        {weatherData.weatherCode.map((item, index) => {
          return <div key={index}>{index + 1}時の天気コード： {item}</div>
        })}
        <div>標高：{ weatherData.elevation }m</div>
        <div>今日の天気：{ weatherData.condition }</div>
      </div>
    </div>
  )
}

export default CheckWeather
