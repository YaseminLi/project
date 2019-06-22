function timeStamp(time) {
    let a=new Date(time);
    let b=a.toLocaleString();
    return b;
    
}
Date.prototype.toLocaleString = function() {
    const month=this.getMonth()<9?'0'+(this.getMonth()+1):this.getMonth()+1;
    const minute=this.getMinutes()==0?'00':this.getMinutes();

    return this.getFullYear() + "-" + month + "-" + this.getDate() + " " + this.getHours() + ":" + minute;
};

module.exports={timeStamp};