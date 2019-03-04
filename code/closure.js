var F= (function(){
    var value = 0;
    return function(){
        this.value = ++value;
    }
})()
var a = new F();
var b = new F();

console.log(a.value);
console.log(b.value);

function init(){
    var value = 0;
    return function(){
        console.log(value++)
    }
}
var f=init()
f()
f()
