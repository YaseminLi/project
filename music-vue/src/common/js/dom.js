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