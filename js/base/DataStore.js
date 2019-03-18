// 这是一个变量缓存器，方便在不同的类中，访问和修改变量
class DataStore{
    static getInstance() {
        if(!DataStore.instance) {
            DataStore.instance = new DataStore()
        }
        return DataStore.instance
    }
    constructor() {
        this.map = new Map()
    }
    // 这里的return this，是为后面的链式调用打下基础
    put(key, value) {
        // 这一行是为了避免一种复杂的写法
        // this.dataStore.put('background', new BackGround())

        if(typeof value === 'function'){
            value = new value()
        }
        this.map.set(key, value)
        return this
    }

    get(key){
        return this.map.get(key)
    }

    //游戏结束的时候，对已有的图形资源进行置空
    destroy() {
        for (let value of this.map.values()){
            value = null
        }
    }
}
export default DataStore

