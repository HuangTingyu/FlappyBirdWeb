// 导演类，控制游戏的逻辑
import DataStore from "./base/DataStore.js"
import UpPencil from "./runtime/UpPencil.js"
import DownPencil from "./runtime/DownPencil.js"

class Director {
    // 这个是设计模式里面的单例模式
    // instance这个属性是自定义的
    // 下面这个getInstance方法是为了确保，不会出现两个Director类
    static getInstance() {
            // 创建一个Director单例
            if (!Director.instance) {
                Director.instance = new Director()
            }
            return Director.instance
        }
        // 导入类DataStore
    constructor() {
        this.dataStore = DataStore.getInstance()
        this.moveSpeed = 2
    }

    // 创建铅笔
    createPencil() {
        const minTop = (window.innerHeight / 8)
        const maxTop = (window.innerHeight / 2)
        const top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }

    // 思路是，把需要销毁的数据例如background,sprit等加到dataStore
    // 然后在director的run方法中加入backgroundSprite.draw()
    run() {
        // const backgroundSprite = this.dataStore.get('background')
        // backgroundSprite.draw()
        this.dataStore.get('background').draw()
        this.dataStore.get('land').draw()

        this.dataStore.get('pencils').forEach(function(value) {
                value.draw()
            })
            // requestAnimationFrame
            // 告诉浏览器——你希望执行一个动画，
            // 并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
            // 该方法需要传入一个回调函数作为参数，
            // 该回调函数会在浏览器下一次重绘之前执行
            // ---------------------
            // timer
            // 当游戏结束的时候，终止浏览器执行动画的线程
        let timer = requestAnimationFrame(() => this.run())
        this.dataStore.put('timer', timer)
            // cancelAnimationFrame(this.dataStore.get('timer'))
    }
}
export default Director