
export function saveToLocal(id,key,value) {
    let seller=localStorage.getItem('__seller__');
    if(!seller){
        seller={};
        seller[id]={};  
    }else{
        seller=JSON.parse(seller);
        if(!seller[id]){
            seller[id]={};
        }
    }
    seller[id][key]=value;
    localStorage.setItem('__seller__',JSON.stringify(seller));
}

// @def:读取不到值时的默认值
export function loadFromStore(id,key,def){
    let seller=localStorage.getItem('__seller__');
    if(!seller){
        return def;
    }
    seller= JSON.parse(seller)[id];
    if(!seller){
        return def;
    }
    return seller[key]||def;
}