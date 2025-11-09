// @ts-nocheck
import { suggestPlan } from "../../functions/suggest-plan";

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
      precipitationProbability: [0, 5, 10],
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
});
