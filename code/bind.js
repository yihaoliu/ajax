Function.prototype.bind = function(context){
	if(typeof this !="function"){
		theow new TypeError('当前不是一个function,没有bind方法')
	}
	var args =  Array.prototype.slice(arguments,1),
	F = function(){},
	that = this,
	bind = function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var allArgs = innerArgs.concat(args)
		return that.apply((this instanceof F ? this||window),allArgs );
	}
	F.prototype = that.prototype;
	bind.prototype = new F();
	return bind;
}