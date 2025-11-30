// 平均を計算す関数
export const calculatonAverage = (numbers: number[]): number => {
    const len = numbers.length;
    return numbers.reduce((val, arr) => val + arr, 0) / len
}
