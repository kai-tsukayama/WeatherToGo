import React, { useState } from 'react'
import { locationSearch } from '../apis/location-search-func';
import { type Location } from '../interfaces/location';
import { useNavigate } from 'react-router-dom';
import { getWeather } from '../apis/weather-get-func';
import type { WeatherInfomation } from '../interfaces/weather-infomation';
import { judgementWeather } from '../functions/judgement-weather-condition';
import { setWeatherIcon } from '../functions/set-weather-icon';
import { suggestPlan } from '../functions/suggest-plan';
import { calculatonAverage } from '../functions/average-property';

// どこの天気を探すかを表示ホーム画面
function Home() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate();

    // queryをセットする関数
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setError("")
    }

    // queryの値を基にAPIを叩く関数
    const submitQuery = async(): Promise<void> => {
        if(query.trim() === ""){
            setError("どこの天気を調べるか入力してください。")
            return;
        }

        // 緯度・経度を取得する
        const data = await locationSearch(query)
        // 動作確認用
        // console.log(data)
        const name = data[0].display_name.split(",")[0].trim();
        // console.log(name);
        const locationData: Location = {
            display_name: name,
            lat: data[0].lat,
            lon: data[0].lon,
        }

        // 天気データの取得
        const weatherDataRes = await getWeather(locationData.lat, locationData.lon)

        // 風速の平均を出力
        const windSpeedArray: number[] = weatherDataRes.hourly.wind_speed_10m;
        const pressureArray: number[] = weatherDataRes.hourly.pressure_msl;

        const averageWindSpeed = calculatonAverage(windSpeedArray)
        const averagePressure = calculatonAverage(pressureArray)

        // 天気データを整形する
        const weather: WeatherInfomation = {
            temperature: weatherDataRes.hourly.temperature_2m,
            precipitationProbability: weatherDataRes.hourly.precipitation_probability,
            windSpeed: averageWindSpeed,
            snowfall: weatherDataRes.hourly.snowfall,
            visibility: weatherDataRes.hourly.visibility,
            weatherCode: weatherDataRes.hourly.weather_code,
            elevation: weatherDataRes.elevation,
            pressure_msl: averagePressure
        }

        // 最終的な天気を判断する関数を実行
        const condition = judgementWeather(weather, averageWindSpeed);

        // 天気アイコンを設定する関数を実行
        const setIcon = setWeatherIcon(condition);

        // 提案プランを設定する関数を実行
        const plan = suggestPlan(weather);

        weather.icon = setIcon;
        weather.condition = condition;
        weather.plan = plan;

        // 動作確認用
        console.log("取得した天気データ", weatherDataRes)
        console.log("天気データ：", weather);

        navigate("/location", { state: { locationData, weather } })
    }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f8fafc] to-[#e6eefc] text-center px-6">
            <div className="absolute inset-0" />

            <div className="relative z-10 w-full max-w-xl">
                <div className="text-4xl md:text-5xl font-semibold text-slate-800 mb-6 tracking-tight">
                    天気を検索
                </div>

                <div className="text-slate-500 text-lg md:text-xl font-light mb-12 leading-relaxed">
                    地名を入力して<br className="md:hidden" />
                    今日の天気をチェックしましょう。
                </div>

                {error && (
                    <div className="text-sky-600 text-sm font-medium mb-4">{error}</div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="例：東京、沖縄、札幌..."
                        value={query}
                        onChange={handleSubmit}
                        className="flex-1 w-full px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-colors duration-200"
                    />
                    <button
                        type="button"
                        onClick={submitQuery}
                        className="w-full sm:w-auto px-10 py-3 text-lg font-medium rounded-xl text-white bg-sky-500 hover:bg-sky-600 focus:outline-none transition-colors duration-200"
                    >
                        検索する
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
