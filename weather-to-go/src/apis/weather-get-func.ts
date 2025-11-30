// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,wind_speed_10m,visibility,weather_code,snowfall&forecast_days=1

const getUrl: string = import.meta.env.VITE_GET_WEATHER_URL

// 指定した地域の天気情報を取得するAPI
// 取得する情報は、気温・降水確率・風速(毎時)・視程(霧)・標高・海面気圧・1時間あたりの降雪量（ｃｍ）
export const getWeather = async(lat: string, lon: string) => {
    const searchWeatherUrl = `${getUrl}latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,wind_speed_10m,visibility,weather_code,snowfall,pressure_msl&forecast_days=1`
    const resWeather = await fetch(searchWeatherUrl);
    return await resWeather.json();
}
