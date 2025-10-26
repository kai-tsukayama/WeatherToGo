import { useLocation } from 'react-router-dom'
import type { Location } from '../interfaces/location';
import type { WeatherInfomation } from '../interfaces/weather-infomation';

function CheckWeather() {
  const { state } = useLocation();
  const locationData = state?.locationData as Location
  const weatherData = state?.weather as WeatherInfomation
  console.log("プラン：", weatherData.plan)
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
        <div className="mb-0">
          <div className="text-xl md:text-lg font-semibold text-slate-800 mb-3 tracking-tight">
            今日の天気
          </div>
          <div className="text-4xl text-sky-600 tracking-tight font-bold">
            {locationData.display_name}
          </div>
        </div>

        <div className="mb-14 flex flex-col items-center">
          <div className="items-center justify-center gap-6 mb-8">
            <img
              src={weatherData.icon}
              alt=""
              className="w-80 md:w-96 lg:w-[28rem] h-auto object-contain drop-shadow-md"
            />
            <div className="text-5xl md:text-6xl lg:text-7xl font-semibold text-sky-600 tracking-tight">
              {weatherData.condition}
            </div>
          </div>

          <div className="mt-4 mb-8 text-center">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-3">
              今日のおすすめプラン
            </h2>
            <p className="text-2xl md:text-3xl text-sky-700 font-semibold leading-relaxed max-w-2xl mx-auto">
              {weatherData.plan}
            </p>
          </div>

          <div className="text-slate-500 text-base md:text-lg">
            標高 {weatherData.elevation}m・風速 {weatherData.windSpeed}m/s
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto scroll-smooth px-4 pb-6 snap-x">
          {weatherData.temperature.map((temp, index) => (
            <div
              key={index}
              className="min-w-[260px] flex-shrink-0 snap-center bg-white rounded-2xl shadow-md border border-slate-100 p-6 text-left hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-slate-400 text-sm mb-3 font-medium">
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
