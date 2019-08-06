//var的坑……
//js是单线程，i循环加到10后，才会去执行异步中的setTimeout
// for (var i = 0; i < 10; i++) {
//     setTimeout(function () { console.log(i) }, 100 * i
//     )
// }//10，10，10，10，10
// for (var m = 0;m < 10; m++) {
//     (function (j) {
//         setTimeout(function () { console.log(j) }, 100 * j
//         )
//     })(m)
// }//0,1,2,3,4,5,6
//ab++暂时性死区
// let ab:number=1
//数组解构
// const input:[number,number]=[1,2]
// function ff([first,second]:[number,number]){
//     console.log(first);
//     console.log(second);
// }
// ff(input)
//缺省值
// function keepWholeObject(wholeObject:{ a: string, b?: number }) {
//     let { a, b = 1001 } = wholeObject
//     console.log(a);
//     console.log(b)
// }
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
    console.log(a);
}
keepWholeObject({ a: "mmm" });
