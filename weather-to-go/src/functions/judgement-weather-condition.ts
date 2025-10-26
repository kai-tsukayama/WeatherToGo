import type { WeatherInfomation } from "../interfaces/weather-infomation";
import { isThunderCode } from "./check-thunder-code";

// データから天気を判断する関数
export const judgementWeather = (data: WeatherInfomation, avgSpeed: number): string => {
    // 降水確率の平均を計算
    const avgPre = data.precipitationProbability.reduce((pre, arr) => pre + arr, 0) / data.precipitationProbability.length;
    // 降雪量の平均を計算
    const avgSnow = data.snowfall.reduce((snow, arr) => snow + arr, 0) / data.snowfall.length;
    // 視程の平均を計算
    const avgVis = data.visibility.reduce((vis, arr) => vis + arr, 0) / data.visibility.length;

    console.log(`降水確率：${avgPre}`)

    // 天気コードに雷を表す95，96，99があるか確認。
    const thunderCode = isThunderCode(data.weatherCode)

    const counts: Record<number, number> = {};

    // 各コードを1回ずつ数える
    data.weatherCode.forEach((code) => {
        if (counts[code]) {
        counts[code] += 1;
        } else {
        counts[code] = 1;
        }
    });

    // 出現回数が最も多いコードを取得
    let mostCommonCode = 0;
    let maxCount = 0;

    Object.keys(counts).forEach((key) => {
        const code = Number(key);
        const count = counts[code];
        if (count > maxCount) {
        maxCount = count;
        mostCommonCode = code;
        }
    });

    // ここからロジック
    // WMOのWeather interpretation codesをベースにした数値で判断
    let condition = "晴れ"
    if(avgSnow > 0.3 || [71, 73, 75, 77, 85, 86].includes(mostCommonCode)){
        condition = "雪"
    }
    else if(avgPre >= 20 && avgPre < 30){
        condition = "晴れ時々曇り"
    }
    else if(avgPre >= 30 && avgPre < 40){
        condition = "曇り"
    }
    else if(avgPre >= 40 && avgPre < 50){
        condition = "雨の可能性あり"
    }
    else if(avgPre >= 50 && avgPre < 70){
        condition = "雨"
    }
    else if(avgPre >= 70 || [80, 81, 82, 95].includes(mostCommonCode)){
        condition = "大雨・豪雨の可能性"
    }
    else if(avgVis < 5000 || [45, 48].includes(mostCommonCode)){
        condition = "霧"
    }

    if(avgSpeed >= 10 && condition === "晴れ"){
        condition = "風が強い晴れ"
    }

    if(data.windSpeed >= 25){
        condition = "台風"
    }

    if(thunderCode === 95){
        condition = "雷雨（雷のみの可能性あり）"
    }

    const morningVisibility = data.visibility.slice(0, Math.floor(data.visibility.length / 3));
    const morningFog = morningVisibility.some((v) => v < 3000);
    if(morningFog && condition === "晴れ"){
        condition = "晴れ（朝は霧）";
    }
    return condition;
}
