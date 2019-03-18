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
  this.info.age = age || 23
}
Ninja.prototype = new Person()
let ninja1 = new Ninja(20)
let ninja2 = new Ninja(24)
ninja1.sayAge()//24
ninja2.sayAge()//24
