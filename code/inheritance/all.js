function Animal (){
    this.num = 4;
    this.sleep = function (params) {
        console.log('睡觉')
    }
}

function Cat(){
    Animal.call(this);
    this.name = 'cat'
}
(function(){
    var Super = function(){};
    Super.prototype = Animal.prototype;
    Cat.prototype = Super.prototype;
})();