import React, { useState } from 'react'
import { locationSearch } from '../apis/location-search-func';
import { type Location } from '../interfaces/location';
import { useNavigate } from 'react-router-dom';
import { getWeather } from '../apis/weather-get-func';
import type { WeatherInfomation } from '../interfaces/weather-infomation';
import { judgementWeather } from '../functions/judgement-weather-condition';

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
        const locationData: Location = {
            display_name: data[0].display_name,
            lat: data[0].lat,
            lon: data[0].lon,
        }

        // 天気データの取得
        const weatherDataRes = await getWeather(locationData.lat, locationData.lon)

        // 風速の平均を出力
        const windSpeedArray: number[] = weatherDataRes.hourly.wind_speed_10m;
        const avarageWindSpeed = (windSpeedArray: number[]): number => {
            const totalWindSpeed = windSpeedArray.reduce((item, arr) => item + arr, 0);
            return totalWindSpeed / windSpeedArray.length;
        }
        const windSpeedAva = avarageWindSpeed(windSpeedArray);

        // 天気データを整形する
        const weather: WeatherInfomation = {
            temperature: weatherDataRes.hourly.temperature_2m,
            precipitationProbability: weatherDataRes.hourly.precipitation_probability,
            windSpeed: windSpeedAva,
            snowfall: weatherDataRes.hourly.snowfall,
            visibility: weatherDataRes.hourly.visibility,
            weatherCode: weatherDataRes.hourly.weather_code,
            elevation: weatherDataRes.elevation,
            // ここはロジックで変えるが、一旦は晴れに統一する
        }

        // 最終的な天気を判断する関数を実行
        const condition = judgementWeather(weather, windSpeedAva);
        weather.condition = condition;

        // 動作確認用
        console.log("取得した天気データ", weatherDataRes)
        console.log("天気データ：", weather);

        navigate("/location", { state: { locationData, weather } })
    }
    return (
        <div>
            <h1>どこの天気を調べますか？</h1>
            <br />
            {error &&(<>
                    <p>{error}</p>
                    <br />
                </>)
            }
            <input type="text" style={{ backgroundColor: '#fff', border: "1px solid #282727ff" }} value={query} onChange={handleSubmit} />
            <button type="button" onClick={submitQuery}>検索する</button>
        </div>
    )
}

export default Home
