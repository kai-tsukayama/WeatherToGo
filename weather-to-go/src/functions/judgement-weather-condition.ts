import type { WeatherInfomation } from "../interfaces/weather-infomation";

// データから天気を判断する関数
export const judgementWeather = (data: WeatherInfomation, avgSpeed: number): string => {
    // 朝・昼・夜の比率を設定する関数
    const weightedAverage = (arr: number[]) => {
        if(!arr.length) return 0;
        const len = arr.length;
        const n = Math.floor(len / 3);
        const morning = arr.slice(0, n);
        const noon = arr.slice(n, 2 * n);
        const night = arr.slice(2 * n);
        const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
        return (
            avg(morning) * 0.2 + avg(noon) * 0.5 + avg(night) * 0.3
        );
    };

    // 降水確率の平均を比率を考慮して計算
    const avgPre = weightedAverage(data.precipitationProbability)
    // 降雪量の平均を比率を考慮して計算
    const avgSnow = weightedAverage(data.snowfall)
    // 視程の平均を比率を考慮して計算
    const avgVis = weightedAverage(data.visibility)

    // 天気コードに雷を表す95，96，99があるか確認。
    // あれば95を固定で返す。
    const isThunderCode = (code: number[]): number => {
        return code.some(c => [95, 96, 99].includes(c)) ? 95 : 0;
    }
    const thunderCode = isThunderCode(data.weatherCode);

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
    else if(avgPre >= 1 && avgPre < 50 ){
        condition = "雨"
    }
    else if(avgPre >= 50 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(mostCommonCode)){
        condition = "豪雨"
    }

    else if(avgVis < 5000 || [45, 48].includes(mostCommonCode)){
        condition = "霧"
    }
    else if([1, 2, 3].includes(mostCommonCode)){
        condition = "曇り"
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
