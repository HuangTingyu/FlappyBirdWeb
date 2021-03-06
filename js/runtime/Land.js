// 不断移动的陆地
import Sprite from '../base/Sprite.js'
import Director from '../Director.js'
import DataStore from '../base/DataStore.js'
export class Land extends Sprite{
  constructor(){
    const image = Sprite.getImage('land')
    super(image, 0, 0,
    image.width, image.height,
    0, window.innerHeight - image.height,
    image.width, image.height)
    this.landX = 0
    this.landSpeed = Director.getInstance().moveSpeed
  }

  draw(){
    this.landX = this.landX + this.landSpeed
    if(this.landX > (this.img.width - window.innerWidth)){
      // 即将到canvas右侧边界的时候，继续开始循环
      this.landX = 0
    }
    super.draw(this.img,
    this.srcX,
    this.srcY,
    this.srcW,
    this.srcH,
    -this.landX,
    this.y,
    this.width,
    this.height)
  }
}
export default Land
