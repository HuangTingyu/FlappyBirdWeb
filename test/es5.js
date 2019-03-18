let Animal = function (name,age){
  this.name = name
  this.age = age
}
Animal.prototype.say = function () {
  console.log('这是父类'+this.name + ' ' + this.age )
}
// let cat = new Animal('小猫',3)
// cat.say()
// // 寄生组合
// // call() apply()
// // 调用一个对象的一个方法，用另一个对象替换当前对象
//
// Animal.prototype.say.apply(cat)
// let params = {
//   name:'小猫2',
//   age:4
// }
// cat.say.call(params)
// 寄生组合继承
let Cat = function(name,age){
  // 以下几个方法等价
  Animal.apply(this,[name,age])
  Animal.apply(this,arguments)
  // Animal.call(this,name,age)
}
// 这里是一个浅克隆
Cat.prototype = Object.create(Animal.prototype)
// 这两种有区分，这里只是把prototype继承过来
// Cat.prototype = new Animal()
Cat.prototype.say = function(){
  let p = {
    name: 'Cat',
    age: 10
  }
  Animal.prototype.say.apply(p)
  console.log('这是子类'+this.name + ' ' + this.age)
}
let catOne = new Cat('childCat',5)
catOne.say()
