export function saveToLocal(key, value) {
    let list = JSON.parse(localStorage.getItem(key));
    if (!list) {
        list = []
    }
    //之前存在，位置调到第一个，不存在放到队首
    const find=list.findIndex(item=>item==value)
    if(find==-1){
        list.unshift(value)
    }else{
        for(let i=find;i>0;i--){
            list[i]=list[i-1]
        }
        list[0]=value;
    }
    
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
export function removeLocalAll(key){
    localStorage.removeItem(key);
}
export function  removeLocalItem(key,value){
    let list=JSON.parse(localStorage.getItem(key))
    list=list.filter(item=>item!==value);
    localStorage.setItem(key, JSON.stringify(list))
}