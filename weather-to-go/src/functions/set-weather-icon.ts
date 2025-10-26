import  sun  from "../assets/icons/sun.svg"
import cloudy from "../assets/icons/cloudy.svg"
import fog from "../assets/icons/fog.svg"
import heavyrain from "../assets/icons/heavyrain.svg"
import rain from "../assets/icons/rain.svg"
import snow from "../assets/icons/snow.svg"
import taifoon from "../assets/icons/taifoon.svg"
import thunder from "../assets/icons/thumder.svg"

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
