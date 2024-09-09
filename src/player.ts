import { OutlineObject } from "./game_object"
import { InputState } from "./input"
import { PLAYER_SPEED, PLAYER_ANGULAR_SPEED, COLOR, PLAYER_SHAPE } from "./constants";
import { Point } from "./point"
import { Projectile } from "./projectile";
import { Game } from "./game";

export class Player extends OutlineObject
{
  private game: Game
  last_shot = 0;

  constructor( x: number, y: number, game: Game ) {
    super(
      new Point( x, y ),
      PLAYER_SHAPE.map(
        ( tuple ) => { return new Point( tuple[0], tuple[1] ) } ),
      COLOR.player )
    this.game = game
  }

  public destroy(): boolean {
    return false;
  }

  public update( dt: number, input: InputState ) {
    this.angle += input.right * dt * PLAYER_ANGULAR_SPEED
    this.angle -= input.left  * dt * PLAYER_ANGULAR_SPEED

    let x = 0
    x += input.down  * PLAYER_SPEED * dt
    x -= input.up    * PLAYER_SPEED * dt

    this.pos = this.pos.add( new Point( 0, x ).rotate( this.angle ) )

    const now = performance.now()
    if ( input.space && ( now - this.last_shot > 100 ) ) {
      this.last_shot = now
      this.game.game_objects.push(
        new Projectile(
          this.pos.add( new Point( 0, -40 ).rotate( this.angle ) ),
          this.angle, this.color ) )
    }
  }
}
