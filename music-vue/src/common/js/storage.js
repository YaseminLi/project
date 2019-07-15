export function saveToLocal(key, value) {
    let list = JSON.parse(localStorage.getItem(key));
    if (!list) {
        list = []
    }
    list.push(value)
    localStorage.setItem(key, JSON.stringify(list))
}

export function loadFromLocal(key) {
    let list = JSON.parse(localStorage.getItem(key));
    if (!list) {
        return [];
    } else {
        return list
    }
}