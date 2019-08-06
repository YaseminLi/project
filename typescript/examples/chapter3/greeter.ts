//class和interface可以兼容，因为有相同的属性
class User{
    fullname:string
    firstname:string
    lastname:string

    constructor(firstname:string,lastname:string){
        this.firstname=firstname
        this.lastname=lastname
        this.fullname=firstname+" "+lastname
    }
}

//接口定义，对象结构的描述
interface Person{
    firstname:string,
    lastname:string
}


//添加类型注解person:String,传参只能是string类型且参数数量为1
function greeter(person:Person) {
    return "hello "+person.firstname+" "+person.lastname
}

let user=new User("xiao","ming")

console.log(greeter(user));


//基础类型
let sam:boolean=false
let a:number=2
let b:string="a"
let c:number[]=[1,2,3]
let d:boolean[]=[false,true]
let e:Array<number>=[4,5,6]


//元祖
let f:[boolean,string]
f=[false,"a"]
// f=["a",false] error
let g=f[0] //false
g[3]="a"

enum Color{red,green,blue}
let h:Color=Color.green
console.log(h);//1
let i:string=Color[2]
console.log(i); //blue

let j:any[]=[1,"a",false]

// function k():void{
//     console.log('aaa');
    
// }
// k()

declare function create(o:object|null):void
create({props:0})
// create(o:"a")

let someValue:any="this id"
let str:number=(<string>someValue).length
let str1:number=(someValue as string).length
