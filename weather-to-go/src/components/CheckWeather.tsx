import { useLocation } from 'react-router-dom'
import type { Location } from '../interfaces/location';
import type { WeatherInfomation } from '../interfaces/weather-infomation';

function CheckWeather() {
  const { state } = useLocation();
  const locationData = state?.locationData as Location
  const weatherData = state?.weather as WeatherInfomation
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f8fafc] to-[#e6eefc] px-6 py-10">
      <style>{`
        .scroll-smooth::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
        }
      `}</style>

      <div className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-5xl text-center">
        <div className="mb-10">
          <div className="text-4xl md:text-5xl font-semibold text-slate-800 mb-3 tracking-tight">
            {locationData.display_name}
          </div>
          <div className="text-slate-500 text-lg font-light">
            今日の天気データ
          </div>
        </div>

        <div className="mb-14">
          <div className="text-6xl font-semibold text-sky-600 mb-4">
            {weatherData.condition}
          </div>
          <img src={weatherData.icon} alt="" />
          <div className="text-slate-500 text-lg">
            標高 {weatherData.elevation}m・風速 {weatherData.windSpeed}m/s
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto scroll-smooth px-4 pb-6 snap-x">
          {weatherData.temperature.map((temp, index) => (
            <div
              key={index}
              className="min-w-[260px] flex-shrink-0 snap-center bg-white rounded-2xl shadow-md border border-slate-100 p-6 text-left hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-slate-400 text-base mb-3 font-medium">
                {index + 1}時 のデータ
              </div>

              <div className="text-3xl font-semibold text-slate-800 mb-4">
                {temp}℃
              </div>

              <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
                <div>
                  <span className="text-slate-400 mr-1">天気コード:</span>
                  {weatherData.weatherCode[index]}
                </div>
                <div>
                  <span className="text-slate-400 mr-1">降水確率:</span>
                  {weatherData.precipitationProbability[index]}%
                </div>
                <div>
                  <span className="text-slate-400 mr-1">降雪量:</span>
                  {weatherData.snowfall[index]}mm
                </div>
                <div>
                  <span className="text-slate-400 mr-1">視程:</span>
                  {weatherData.visibility[index]}m
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CheckWeather
