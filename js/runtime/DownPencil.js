// 下半部分铅笔
import Pencil from './Pencil.js'
import Sprite from '../base/Sprite.js'
export class DownPencil extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilDown')
        super(image, top)
    }
    draw() {
        // gap - 两铅笔中的间隙，屏幕高度的1/5
        let gap = window.innerHeight / 5
        this.y = this.top + gap
        super.draw()
    }
}
export default DownPencil