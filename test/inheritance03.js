function Person(){
  this.info = {
    name:'father',
    age:23
  }
}
Person.prototype.sayName = function(){
  console.log(this.info.name)
}
Person.prototype.sayAge = function(){
  console.log(this.info.age)
}
function Ninja(age){
  // 在构造函数中调用父类构造方法
  // 给每个子类实例添加一个属性
  // 从而子类实例直接不会相互影响
  Person.call(this)
  this.info.age = age || 23
}
// 寄生组合继承
Ninja.prototype = Object.create(Person.prototype)
Ninja.prototype.constructor = Ninja
let ninja1 = new Ninja(20)
let ninja2 = new Ninja(24)
let ninja3 = new Ninja()
ninja1.sayAge()//20
ninja2.sayAge()//24
ninja3.sayAge()//23
console.log(ninja1.__proto__.info)//undefined
console.log(ninja2.__proto__.info)//undefined
console.log(ninja3.__proto__.info)//undefined
