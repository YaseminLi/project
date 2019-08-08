// function printLabel(labelObject:{label:string}){
//     console.log(labelObject.label)
// }
// printLabel({name:12,label:"hello label"})//直接传入字面量类型必须都有的

//可选属性,加问号
interface Square{
    color:string
    area:number
}
interface SquareConfig{
    color?:string
    width?:number
    [propName:string]:any
}

function createSquare(config:SquareConfig):Square{
    let newSquare={color:'black',area:100}
    if(config.color){
        newSquare.color=config.color
    }
    if(config.width){
        newSquare.area=config.width*config.width
    }
    return newSquare
}
let square={color:"pink",height:100,size:200}
//let mySquare=createSquare({color:"pink",height:100})//error SquareConfig中不存在height 属性，怎么解决嘞？
// let mySquare=createSquare({color:"pink",height:100} as SquareConfig) //ok
//赋值给变量会跳过额外检查
//在接口定义中添加字符串索引签名
let mySquare=createSquare(square)
console.log(mySquare);

//只读属性
// interface Point{
//     readonly x:number
//     y:number
// }
// let arr:Point={x:1,y:2}
// //arr.x=3  error  只读

// let arr1:number[]=[1,2,3,4]
// let arr2:ReadonlyArray<number>=arr1
// //arr2[0]=3 error 只读
// //arr1=arr2 error
// arr1=arr2 as number[]

//函数类型
// interface SearchFunc{
//     (source:string,search:string):boolean
// }

// let mySearch:SearchFunc
// mySearch=function(a,b){
//     let result=a.search(b)
//     return result>1
// }

// class Animal{
//     name:string
// }
// class Dog extends Animal{
//     breed:string
// }

// interface NotOkay{
//     [x:number]:Animal
//     [x:string]:Dog
// }

// interface Okay{
//     [x:number]:Dog
//     [x:string]:Animal
// }
// let cat:Okay[0]={name:'a',breed:'b'}

//泛型
function createArray<T>(length:number,value:T):Array<T>{
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<number>(3,4)