import { OutlineObject } from "./game_object";
import { Point } from "./point";

export class Projectile extends OutlineObject
{
  constructor( pos: Point, angle: number, color: string ) {
    super( pos,
           [ new Point( 0, 0 ), new Point( 0, -10 ) ],
           color )
    this.angle = angle
  }

  public update(dt: number, _ ): void {
    this.pos = this.pos.add( new Point( 0, -1000 * dt ).rotate( this.angle ) )
  }
}
