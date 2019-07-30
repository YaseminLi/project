export function timeStamp(time) {
    let a=new Date(time);
    let b=a.toLocaleString();
    return b;
    
}
Date.prototype.toLocaleString = function() {
    const month=this.getMonth()<9?'0'+(this.getMonth()+1):this.getMonth()+1;
    const minute=this.getMinutes()==0?'00':this.getMinutes();

    return this.getFullYear() + "-" + month + "-" + this.getDate() + " " + this.getHours() + ":" + minute;
};


// 解析url参数
// @example: ?id=12345&a=b
// @return :{id:12345,a:b}
export function urlParse() {
    let url=window.location.search;
    let obj={};
    let reg=/[?&][^?&]+=[^?&]+/g;
    let array=url.match(reg);
    if(array){
        array.forEach(item => {
           let tempArr=item.substring(1).split('=');
           let key=tempArr[0];
           let value=tempArr[1];
           obj[key]=value;
        });
    }
    return obj;
}
// module.exports={timeStamp,urlParse};