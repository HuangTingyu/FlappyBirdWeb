import Sprite from '../base/Sprite.js'

class BackGround extends Sprite{
    constructor() {
        const image = Sprite.getImage('background')
        // super调用父类的构造函数
        super(image,
            0,0,
            image.width,image.height,
            0,0,
            // 不要使用图片的大小，以window的大小进行参考
            window.innerWidth,window.innerHeight)
    }
}
export default BackGround
