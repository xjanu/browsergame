import { InputState } from "./input"
import { COLOR, FONT, STROKE_WIDTH } from "./constants"
import { Point } from "./point"

export interface IGameObject {
  update( dt: number, input: InputState ): void
  draw( ctx: CanvasRenderingContext2D ): void
}

export abstract class TextObject implements IGameObject {
  protected x: number
  protected y: number
  protected text: string
  protected color: string
  protected font: string

  constructor( x: number, y: number, text: string,
               color: string = COLOR.text, font: string = FONT ) {
    this.x = x
    this.y = y
    this.text = text
    this.color = color
    this.font = font
  }

  public abstract update( dt: number ): void

  public draw( ctx: CanvasRenderingContext2D ) {
    ctx.fillStyle = this.color
    ctx.font = this.font
    ctx.fillText(this.text, this.x, this.y)
  }
}

export abstract class OutlineObject implements IGameObject
{
  protected pos:   Point
  protected angle: number
  protected shape: Point[]
  protected color: string

  constructor( x: number, y: number, shape: Point[], color: string ) {
    this.pos = new Point( x, y )
    this.angle = 0;
    this.shape = shape
    this.color = color
  }

  public abstract update( dt: number, input: InputState ): void

  private draw_path( ctx: CanvasRenderingContext2D, path: Point[] ) {
    ctx.beginPath()
    ctx.moveTo(this.pos.x + path[0].x, this.pos.y + path[0].y)
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(this.pos.x + path[i].x, this.pos.y + path[i].y)
    }
    ctx.closePath()
  }

  public draw( ctx: CanvasRenderingContext2D ) {
    this.draw_path( ctx, this.shape.map( ( p: Point ): Point => {
      return p.rotate( this.angle )
    }))
    ctx.lineWidth = STROKE_WIDTH;
    ctx.strokeStyle = this.color
    ctx.stroke()
  }
}
