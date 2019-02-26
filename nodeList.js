// new 关键字做了那些事
/**
 * 
 * 1. 创建一个新的对象
 * 2. 将新创建的空对象的隐式原型指向其构造函数的显示原型。
 * 3. 使用 call 改变 this 的指向
 * 4. 如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。
 * 
 */
function list (){
    let Node = function(val,next){
        this.val = val;
        this.next = next||null;
    }
    var hander = new Node('hander');
    var size = 0;
    this.findListNode = function(){
        var currNode = this.hander;
        while(!currNode.next == null){
            currNode = currNode.next;
        }
        return currNode;
    }
    this.push = function(val){
        var listNode = this.findListNode();
        var newNode = new Node(val,listNode.next);
        listNode.next = newNode;
        size++;
    }
    this.pop = function(){
        var currNode = this.hander;
        if(currNode.next ==null) return undefined;
        while(!currNode.next.next == null){
            currNode = currNode.next;
        }
        currNode.next = null;
        size--;
        return currNode;  
        
    }
}
