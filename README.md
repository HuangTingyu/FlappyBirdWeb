项目未完，正在龟速开发中。。。

## 项目启动方式

1.下载`live-server`

```javascript
cnpm install live-server
```

2.启动项目

`git bash`  输入

```
live-server
```

## 项目构建方式

1.首先使用ES6语法构建，在浏览器的移动端模式调试

2.把代码相关的API，换成微信的API

## 初始化对象的创建

根目录 `Main.js` 文件

```javascript
// 初始化整个游戏的精灵，作为游戏开始的入口
import ResourceLoader from './js/base/ResourceLoader.js'
import Director from './js/Director.js'
import BackGround from "./js/runtime/BackGround.js"
import DataStore from './js/base/DataStore.js'
import Land from './js/runtime/Land.js'
class Main {
    constructor() {
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

        // 图片加载完才能canvas渲染
        image.onload = () => {
            // 参数从上到下，需要传入的图片，剪裁起始X位置(从左向右，剪裁起始Y位置(从上向下
            // 剪裁后图片的宽度，剪裁后图片的高度
            // 投屏起始X位置，投屏起始Y位置，(0,0 表示和canvas画布左上起点重合
            // 需要使用的图片宽度，需要使用的图片高度
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
            .put('land', Land)
        Director.getInstance().run()
            // let background = new BackGround(this.ctx, map.get('background'))
            // background.draw()
    }
}
export default Main

```

### canvas

作用 —— 把图像进行剪裁，缩放，然后放到画布上面。

## 基类的构建

base文件夹里面

1.DataStore.js

存储游戏需要长期保存的变量和需要定时销毁的变量（如果两个文件需要共用一个变量，直接从DataStore.js里面取，相当于中间件）

```javascript
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
```

DataStore的使用(`Director.js` 文件)

```javascript
import DataStore from "./base/DataStore.js"

run(){
        this.dataStore.get('background').draw()
        this.dataStore.get('land').draw()
        let timer = requestAnimationFrame(()=>this.run())
        this.dataStore.put('timer',timer)
  	    cancelAnimationFrame(this.dataStore.get('timer'))
    }
```

## 创建铅笔的办法

### 铅笔相关的类文件

1.js/runtime/Pencil.js(基类)

2.js/runtime/UpPencil.js

2.js/runtime/DownPencil.js

### Director中创建铅笔的行为

```javascript
// 创建铅笔
    createPencil() {
        const minTop = (window.innerHeight / 8)
        const maxTop = (window.innerHeight / 2)
        const Top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
    }
```

## Main.js游戏开始之前，先创建铅笔

```javascript
init() {
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
        // 创建铅笔，要在游戏逻辑运行之前
        this.director.createPencil()
        Director.getInstance().run()
    }
```

