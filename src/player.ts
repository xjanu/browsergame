import { IGameObject, OutlineObject } from "./game_object"
import { InputState } from "./input"
import { PLAYER_SPEED, PLAYER_ANGULAR_SPEED, COLOR, PLAYER_SHAPE } from "./constants";
import { Point } from "./point"
import { Projectile } from "./projectile";

export class Player extends OutlineObject
{
  private game_objects: IGameObject[]

  constructor( x: number, y: number, game_objects: IGameObject[] ) {
    super(
      x, y,
      PLAYER_SHAPE.map(
        ( tuple ) => { return new Point( tuple[0], tuple[1] ) } ),
      COLOR.player )
    this.game_objects = game_objects
  }

  public update( dt: number, input: InputState ) {
    this.angle += input.right * dt * PLAYER_ANGULAR_SPEED
    this.angle -= input.left  * dt * PLAYER_ANGULAR_SPEED

    let x = 0
    x += input.down  * PLAYER_SPEED * dt
    x -= input.up    * PLAYER_SPEED * dt

    this.pos = this.pos.add( new Point( 0, x ).rotate( this.angle ) )

    if ( input.space ) {
      this.game_objects.push(
        new Projectile( this.pos.x, this.pos.y, this.angle, this.color ) )
    }
  }
}
