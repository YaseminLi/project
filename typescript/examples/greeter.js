//class和interface可以兼容，因为有相同的属性
var User = /** @class */ (function () {
    function User(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = firstname + " " + lastname;
    }
    return User;
}());
//添加类型注解person:String,传参只能是string类型且参数数量为1
function greeter(person) {
    return "hello " + person.firstname + " " + person.lastname;
}
var user = new User("xiao", "ming");
console.log(greeter(user));
//基础类型
var sam = false;
var a = 2;
var b = "a";
var c = [1, 2, 3];
var d = [false, true];
var e = [4, 5, 6];
var f;
f = [false, "a"];
// f=["a",false] error
var g = f[0]; //false
g[3] = "a";
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
var h = Color.green;
console.log(h); //1
var i = Color[2];
console.log(i); //blue
var j = [1, "a", false];
function k() {
    console.log('aaa');
}
k();
