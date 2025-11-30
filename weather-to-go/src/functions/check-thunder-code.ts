// 天気コードに雷を表す95，96，99があるか確認。
// あれば95を固定で返す。
export const isThunderCode = (code: number[]): number => {
    return code.some(c => [95, 96, 99].includes(c)) ? 95 : 0;
}
