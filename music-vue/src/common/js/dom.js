export function addclassName(el,className){
    if(haveclassName(el,className)){
        return ;
    }
    let newClass=el.className?el.className.split(' '):[];
    newClass.push(className);
    el.className=newClass.join(' ');
}
export function haveclassName(el,className){
    let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
    return reg.test(el.className);
}

//获取属性值
//data-index=1
export function getData(el,name,val){
    let prefix='data-';
    name=prefix+name;
    if(val){
        return el.setAttribute(name,val);
    }else{
        return el.getAttribute(name);
    }
}