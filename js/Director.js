// 导演类，控制游戏的逻辑
import DataStore from "./base/DataStore.js"


class Director{
    // 这个是设计模式里面的单例模式
    // instance这个属性是自定义的
    // 下面这个getInstance方法是为了确保
    // 不会出现两个Director类
    static getInstance(){
        // 创建一个Director单例
        if(!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance
    }
    // 导入类DataStore
    constructor() {
        this.dataStore = DataStore.getInstance()
    }
    // 思路是，把需要销毁的数据例如background,sprit等加到dataStore
    // 然后再director的run方法中加入backgroundSprite.draw()
    run(){
        // const backgroundSprite = this.dataStore.get('background')
        // backgroundSprite.draw()
        this.dataStore.get('background').draw()
        this.dataStore.get('land').draw()
        requestAnimationFrame(()=>this.run())
    }
}
export default Director
