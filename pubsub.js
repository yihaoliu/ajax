var pubsub = function(){
    this.sbuid =0;
    this.listen = {}
}
pubsub.prototype.publish = function(tipic,args){
   if(!this.listen[tipic]) return;
   let sub = this.listen[tipic];
   let len = sub.length;
   while(len--){
    sub[len].fun(tipic,args)
   }
   return this;
}
pubsub.prototype.subscribe  = function(tipic,fun){
    if(!this.listen[tipic]){
        this.listen[tipic] = [];
    }
    var id = (this.sbuid++).toString();
    this.listen[tipic].psuh({
        fun:fun,
        id:id
    })
    return this;
}
