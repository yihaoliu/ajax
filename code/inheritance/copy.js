var suprtObj = {
    name: 'liu',
    age: 25,
    friends: ['小明', '小花'],
    showName: function () {
        console.log(this.name);
    }
}
var subObj = {};

for (let key in suprtObj) {
    subObj[i] = suprtObj[key]
}
// 如果继承过来的成员是引用类型的话,
// 那么这个引用类型的成员在父对象和子对象之间是共享的,
// 也就是说修改了之后, 父子对象都会受到影响.
let tasks = [];
for (var i = 0; i < 5; i++) { // 这里 i 的声明不能改成 let，如果要改该怎么做？
    ((j) => {
        tasks.push(new Promise((resolve) => {
            console.log('添加为任务',i)
            setTimeout(() => {
                console.log(new Date, j);
                resolve(); // 这里一定要 resolve，否则代码不会按预期 work
            }, 1000 * j); // 定时器的超时时间逐步增加
        }));
    })(i);
}

Promise.all(tasks).then(() => {
    console.log('添加一个宏认为',i)
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000); // 注意这里只需要把超时设置为 1 秒
});