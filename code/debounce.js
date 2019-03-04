function debounce(fun,wait,immediate){
    let timer,context,args;
    let later  = function(){
        return setTimeout(()=>{
            timer = null;
            if(!immediate){
                fun.apply(context,args)
            }
        },wait)
    }
    return function(...params){
        if(!timer){
            timer = later();
            if(immediate){
                fun.apply(this,params)
            }else{
                context = this;
                args = params;
            }
        }else{
            clearTimeout(timer);
            timer = later();
        }
    }
}