// 初始化整个游戏的精灵，作为游戏开始的入口
import ResourceLoader from './js/base/ResourceLoader.js'
import Director from './js/Director.js'
import BackGround from "./js/runtime/BackGround.js"
import DataStore from './js/base/DataStore.js'
import Land from './js/runtime/Land.js'
class Main {
    constructor(){
        // 定义canvas对象
        this.canvas = document.getElementById('game_canvas')
        this.ctx = this.canvas.getContext('2d')
        // 初始化这个dataStore
        this.dataStore = DataStore.getInstance()
        // 图片的预加载
        const loader = ResourceLoader.create()
        loader.onloaded(map => this.onResourceFirstLoaded(map))

        let image = new Image()
        image.src = 'res/background.png'

        image.onload = () =>{
            this.ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                image.width,
                image.height
            )
        }
    }
    onResourceFirstLoaded(map) {
        // 希望游戏结束随时销毁的，就保存在dataStore的map中，使用put方法放进去
        // 如果希望保存在内存中，如ctx和map，采用下面的定义方法
        this.dataStore.ctx = this.ctx
        this.dataStore.res = map
        this.init()
    }
    init() {
        this.dataStore
            .put('background', BackGround)
            .put('land',Land)
        Director.getInstance().run()
        // let background = new BackGround(this.ctx, map.get('background'))
        // background.draw()
    }
}
export default Main
