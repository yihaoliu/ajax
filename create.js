// new 关键字做了那些事
/**
 * 
 * 1. 创建一个新的对象
 * 2. 将新创建的空对象的隐式原型指向其构造函数的显示原型。
 * 3. 使用 call 改变 this 的指向
 * 4. 如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。
 * 
 */

function newClass(cls,args){
  var obj = {};
    obj.__proto__ = cls.prototype;
    var result = cls.call(obj,args||[]);
    return typeof result === 'obj'? result : obj;
};