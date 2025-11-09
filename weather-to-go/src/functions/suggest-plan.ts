import type { WeatherInfomation } from "../interfaces/weather-infomation";

export const suggestPlan = (weather: WeatherInfomation): string => {
    // 気温・降水確率・規程の平均値を算出&降雪量の合計を算出
    const tempAvg = weather.temperature.reduce((temp, arr) => temp + arr, 0) / weather.temperature.length;
    const preAvg = weather.precipitationProbability.reduce((pre, arr) => pre + arr, 0) / weather.precipitationProbability.length;
    const visibAvg = weather.visibility.reduce((vis, arr) => vis + arr, 0) / weather.visibility.length;
    const snowfallpAvg = weather.snowfall.reduce((snow, arr) => snow + arr, 0);

    // 標高100mにつき-0.6度
    const correctedTemp = tempAvg - (weather.elevation / 100) * 0.6;

    let plan = "";
    if(preAvg > 70){
        if(weather.windSpeed > 10 && weather.windSpeed < 25){
            return plan = "豪雨が予想されます☔。また、風も強くなる恐れがあるので、屋内でゆっくり過ごす日にしましょう。"
        }
        plan = "雨が強まりそう。カフェや映画館など、屋内で過ごしましょう。"
    }
    else if(preAvg >= 30 && preAvg < 40){
        plan = "今日の天気は曇りです。場合によっては雨が降る可能性あり。傘を持って外出しましょう。"
    }
    else if(preAvg >= 50 && preAvg < 70){
        plan = "今日は雨のようです☔。外出する際には傘を忘れずにしましょう。"
    }
    else if(snowfallpAvg > 0.5 && snowfallpAvg < 9.5){
        plan = "雪が降りそうです⛄。防寒をしっかりして外出を。車の運転には注意をしてください。"
    }
    else if(snowfallpAvg >= 9.5){
        plan = "大雪になりそうです。車の運転は控えてください。防寒必須です！"
    }
    else if(visibAvg < 3000){
        plan = "霧が出やすい日。運転や外出時の視界に注意してください。"
    }
    else if(weather.windSpeed >= 25){
        plan = "台風もしくは台風のような天気となります。外出は避け、安全第一で過ごしましょう。"
    }
    else {
        if(correctedTemp < 10){
            plan = "寒い日となりそうです。温泉やカフェでゆったり温まるのもいいかもしれないですね！"
        }else if(correctedTemp < 25){
            plan = "穏やかな気候🌤。散歩や屋外で遊ぶのにぴったりな一日です！"
        }else if(correctedTemp < 30){
            plan = "少し暑い日です！冷たいドリンクや水辺のスポットが◎"
        }else {
            plan = "真夏日🔥！無理せず屋内中心で過ごしましょう。"
        }
    }

    return plan
}
