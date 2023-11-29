import { IGameObject } from "./game_object"
import { InputState } from "./input"
import { PLAYER_SPEED, COLOR } from "./constants";

export class Player implements IGameObject
{
  private x: number
  private y: number

  constructor( x: number, y: number ) {
    this.x = x
    this.y = y
  }

  public update( dt: number, input: InputState ) {
    this.x += input.right * PLAYER_SPEED * dt
    this.x -= input.left  * PLAYER_SPEED * dt
    this.y += input.down  * PLAYER_SPEED * dt
    this.y -= input.up    * PLAYER_SPEED * dt
  }

  public draw( ctx: CanvasRenderingContext2D ) {
    ctx.fillStyle = COLOR.player
    ctx.fillRect(this.x, this.y, 50, 50)
  }
}
