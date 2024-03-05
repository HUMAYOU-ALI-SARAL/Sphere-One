export function kFormatter(num: number) {
    return Math.abs(num) > 999 ? Math.sign(num) * Number(((Math.abs(num) / 1000)).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

export function numberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function floorDifference(firstNum: number, secondNum: number) {
    return Math.abs(Math.round((firstNum - secondNum) / firstNum * 100));
}