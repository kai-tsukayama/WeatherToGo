// @ts-nocheck
import { suggestPlan } from "../../functions/suggest-plan";

const makeWeather = (overrides = {}) => ({
  temperature: [20, 20, 20],
  precipitationProbability: [0, 0, 0],
  windSpeed: 0,
  snowfall: [0, 0, 0],
  visibility: [20000, 20000, 20000],
  weatherCode: [0],
  elevation: 0,
  pressure_msl: 1015,
  ...overrides,
})

describe("suggestPlan関数のテスト", () => {
  test("豪雨のときに適切なplanを返す", () => {
    const mockWeather = {
      temperature: [25, 26, 27],
      precipitationProbability: [70, 75, 80],
      windSpeed: 15,
      snowfall: [0, 0, 0],
      visibility: [10000, 10000, 10000],
      weatherCode: [61, 63, 65],
      elevation: 50,
      pressure_msl: 1010,
    };

    const plan = suggestPlan(mockWeather);

    expect(plan).toBe(
      "豪雨が予想されます☔。また、風も強くなる恐れがあるので、屋内でゆっくり過ごす日にしましょう。"
    );
  });

  test("大雪のとき", () => {
    const mockWeather = {
      temperature: [-1, -3, 0],
      precipitationProbability: [0, 5, 10],
      windSpeed: 3,
      snowfall: [1, 0.5, 4],
      visibility: [20000, 20000, 20000],
      weatherCode: [0, 1, 1],
      elevation: 30,
      pressure_msl: 1015,
    };

    const plan = suggestPlan(mockWeather);
    expect(plan).toMatch("雪が降りそうです⛄。防寒をしっかりして外出を。車の運転には注意をしてください。");
  });

  test("霧のとき", () => {
    const mockWeather = {
      temperature: [25, 26, 27],
      precipitationProbability: [0, 5, 10],
      windSpeed: 3,
      snowfall: [0, 0, 0],
      visibility: [2000, 2000, 2000],
      weatherCode: [0, 1, 1],
      elevation: 30,
      pressure_msl: 1015,
    };

    const plan = suggestPlan(mockWeather);
    expect(plan).toMatch("霧が出やすい日。運転や外出時の視界に注意してください。");
  });

  test("台風のとき", () => {
    const mockWeather = {
      temperature: [25, 26, 27],
      precipitationProbability: [70, 75, 80],
      windSpeed: 32,
      snowfall: [0, 0, 0],
      visibility: [20000, 20000, 20000],
      weatherCode: [0, 1, 1],
      elevation: 30,
      pressure_msl: 1015,
    };

    const plan = suggestPlan(mockWeather);
    expect(plan).toMatch("台風もしくは台風のような天気となります。外出は避け、安全第一で過ごしましょう。");
  });

  test("異常系：値がないとき", () => {
    const mockWeather = {
      temperature: [],
      precipitationProbability: [0, 5, 10],
      windSpeed: 32,
      snowfall: [0, 0, 0],
      visibility: [20000, 20000, 20000],
      weatherCode: [0, 1, 1],
      elevation: 30,
      pressure_msl: 1015,
    };

    const plan = suggestPlan(mockWeather);
    expect(plan).toMatch("temperatureが不正な値です。");
  });

  test("異常系：値がnullのとき", () => {
    const mockWeather = {
      temperature: [25, 26, 27],
      precipitationProbability: null,
      windSpeed: 32,
      snowfall: [0, 0, 0],
      visibility: [20000, 20000, 20000],
      weatherCode: [0, 1, 1],
      elevation: 30,
      pressure_msl: 1015,
    };

    const plan = suggestPlan(mockWeather);
    expect(plan).toMatch("precipitationProbabilityが不正な値です。");
  });

  test("異常系：気温にあり得ない数値が存在があるとき", () => {
    const mockWeather = {
      temperature: [25, 26, 999],
      precipitationProbability: [0, 5, 10],
      windSpeed: 32,
      snowfall: [0, 0, 0],
      visibility: [20000, 20000, 20000],
      weatherCode: [0, 1, 1],
      elevation: 30,
      pressure_msl: 1015,
    };

    const plan = suggestPlan(mockWeather);
    expect(plan).toMatch("気温があり得ない数値で設定されています。");
  });

  test("preAvg = 71（風速10以下 → 通常の豪雨メッセージ）", () => {
    const weather = makeWeather({
      precipitationProbability: [71, 71, 71],
      windSpeed: 10,
    });

    const result = suggestPlan(weather);
    expect(result).toMatch("雨が強まりそう。カフェや映画館など、屋内で過ごしましょう。");
  });

  test("境界値テスト：preAvg = 71（風速11〜24 → 豪雨 + 強風）", () => {
    const weather = makeWeather({
      precipitationProbability: [71, 71, 71],
      windSpeed: 15,
    });

    const result = suggestPlan(weather);
    expect(result).toMatch("豪雨が予想されます☔。また、風も強くなる恐れがあるので、屋内でゆっくり過ごす日にしましょう。");
  });

  test("境界値テスト：preAvg = 71（風速25以上 → 台風のメッセージ）", () => {
    const weather = makeWeather({
      precipitationProbability: [71, 71, 71],
      windSpeed: 25,
    });

    const result = suggestPlan(weather);
    expect(result).toMatch("台風もしくは台風のような天気となります。外出は避け、安全第一で過ごしましょう。");
  });

  test("preAvg = 70（この条件には入らない → 他の条件へ流れる）", () => {
    const weather = makeWeather({
      precipitationProbability: [70, 70, 70],
    });

    const result = suggestPlan(weather);
    expect(result).not.toMatch("豪雨が予想されます☔。また、風も強くなる恐れがあるので、屋内でゆっくり過ごす日にしましょう。");
  });
});
