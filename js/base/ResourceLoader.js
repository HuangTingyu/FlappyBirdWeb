// 资源文件加载器，确保canvas在图片加载完成后才进行渲染
import Resources from './Resources.js'

class ResourceLoader{
    map = null
    constructor() {
        this.map = new Map(Resources)
        // key资源的名字，value资源的相对路径
        for (let [key,value] of this.map) {
            const image = new Image()
            image.src = value
            // 把key值生成dom对象，这个时候key值就变成了
            // <img src="res/background.png" alt="">
            this.map.set(key,image)
        }
    }
    onloaded(callback) {
        let loadedCount = 0
        for (let value of this.map.values()) {
            // 因为ES6的箭头函数的this指向，是根据上层函数onloaded的指向确定的
            // 所以this不会出错
            // onload 事件会在页面或图像加载完成后立即发生。
            value.onload = () => {
                loadedCount++
                if (loadedCount >= this.map.size){
                    callback(this.map)
                }
            }
        }
    }
    // 类（class）通过 static 关键字定义静态方法。
    // 不能在类的实例上调用静态方法，而应该通过类本身调用。
    // 这些通常是实用程序方法，例如创建或克隆对象的功能。
    static create() {
        return new ResourceLoader()
    }
}

export default ResourceLoader
