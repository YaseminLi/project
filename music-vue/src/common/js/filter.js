export function normalizeNum(num){
    if(num<1000){
        return num;
    }else{
        return (num/10000).toFixed(1)+'万'
    }
}