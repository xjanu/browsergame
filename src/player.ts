import { IGameObject } from "./game_object"
import { InputEvents } from "./input"

export class Player implements IGameObject
{
  private x: number
  private y: number

  constructor( x: number, y: number ) {
    this.x = x
    this.y = y
  }

  public update( dt: number, input: InputEvents ) {
    if (input.right) {
      this.x += 100 * dt
    }
    if (input.left) {
      this.x -= 100 * dt
    }
    if (input.down) {
      this.y += 100 * dt
    }
    if (input.up) {
      this.y -= 100 * dt
    }
  }

  public draw( ctx: CanvasRenderingContext2D ) {
    ctx.fillStyle = "blue"
    ctx.fillRect(this.x, this.y, 50, 50)
  }
}
