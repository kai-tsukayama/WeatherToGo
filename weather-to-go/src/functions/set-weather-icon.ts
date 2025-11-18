import sun from "../assets/icons/sun.png"
import cloudy from "../assets/icons/cloudy.png"
import fog from "../assets/icons/fog.png"
import heavyrain from "../assets/icons/heavyrain.png"
import rain from "../assets/icons/rain.png"
import snow from "../assets/icons/snow.png"
import taifoon from "../assets/icons/taifoon.png"
import thunder from "../assets/icons/thunder.png"

// アイコンをセットする関数
export const setWeatherIcon = (condition: string): string => {
    switch (condition){
        case "晴れ":
        case "風が強い晴れ":
            return sun
        case "雪":
            return snow
        case "曇り":
            return cloudy
        case "雨" :
            return rain
        case "大雨・豪雨の可能性":
            return heavyrain
        case "霧":
            return fog
        case "台風":
            return taifoon
        case "雷雨（雷のみの可能性あり）":
            return thunder
        default:
            return sun;
    }
}
