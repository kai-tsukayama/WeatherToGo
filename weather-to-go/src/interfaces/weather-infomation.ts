// 天気のインタフェース
export interface WeatherInfomation {
    // 気温
    temperature: number[];
    // 降水確率
    precipitationProbability: number[];
    // 風速
    windSpeed: number;
    // 降雪量
    snowfall: number[];
    // 視程
    visibility: number[];
    // 天気コード
    weatherCode: number[];
    // 標高
    elevation: number;
    // 最終判断の表示パラメータ
    condition?: string;
    // アイコン
    icon?: string
    // 提案プラン
    plan?: string
}

