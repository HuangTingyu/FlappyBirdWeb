/*
 * 铅笔的基类
 * 传入两个参数 - image,top
 * */
import Sprite from "../base/Sprite.js"
import Director from "../Director.js"

export class Pencil extends Sprite {
    constructor(image, top) {
        /**
         * img 传入Image对象
         * srcX 要剪裁的起始X坐标
         * srcY 要剪裁的起始Y坐标
         * srcW 剪裁的宽度
         * srcH 剪裁的高度
         * x 放置的x坐标
         * y 放置的y坐标
         * width 要使用的宽度
         * height 要使用的高度
         */
        super(image,
            0, 0,
            image.width, image.height,
            // 图片的起始位置是window.innerWidth
            // 也就是说，图片左侧的线刚好在可视宽度右侧的外面
            // 刚好是眼睛看不见的位置
            window.innerWidth, 0,
            image.width, image.height
        )
        this.top = top
    }
    draw() {
        // 地板移动的速度
        this.x = this.x - Director.getInstance().moveSpeed
        super.draw(this.img,
            0, 0,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height)
    }

}
export default Pencil