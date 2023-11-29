import { OutlineObject } from "./game_object"
import { InputState } from "./input"
import { PLAYER_SPEED, COLOR, PLAYER_SHAPE } from "./constants";

export class Player extends OutlineObject
{
  constructor( x: number, y: number ) {
    super( x, y, PLAYER_SHAPE, COLOR.player )
  }

  public update( dt: number, input: InputState ) {
    this.pos.x += input.right * PLAYER_SPEED * dt
    this.pos.x -= input.left  * PLAYER_SPEED * dt
    this.pos.y += input.down  * PLAYER_SPEED * dt
    this.pos.y -= input.up    * PLAYER_SPEED * dt
  }
}
