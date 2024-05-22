
export class Point
{
  x: number
  y: number

  constructor( x: number, y: number ) {
    this.x = x;
    this.y = y;
  }

  public add( other: Point ): Point {
    return new Point( this.x + other.x, this.y + other.y )
  }

  private mult( other: Point ): Point {
    return new Point( this.x * other.x - this.y * other.y,
                      this.x * other.y + this.y * other.x )
  }

  public rotate( rad: number ): Point {
    return this.mult( new Point( Math.cos( rad ), Math.sin( rad ) ) )
  }
}
