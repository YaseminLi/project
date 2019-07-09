export function normalizeNum(num) {
    if (num < 1000) {
        return num;
    } else {
        return (num / 10000).toFixed(1) + '万'
    }
}

//取min、max中的随机数
function _getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//随机打乱数组
export function shullfle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = _getRandom(0, i);
        let m = arr[i];
        arr[i] = arr[j];
        arr[j] = m
    }
    return arr
}