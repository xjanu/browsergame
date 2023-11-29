import { InputState } from "./input"
import { COLOR, FONT, STROKE_WIDTH } from "./constants"

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

type Point = {
  x: number
  y: number
}

export abstract class OutlineObject implements IGameObject
{
  protected pos:   Point
  protected shape: Point[]
  protected color: string

  constructor( x: number, y: number, shape: Point[], color: string ) {
    this.pos = { x, y }
    this.shape = shape
    this.color = color
  }

  public abstract update( dt: number, input: InputState ): void

  public draw( ctx: CanvasRenderingContext2D ) {
    ctx.beginPath()
    ctx.moveTo(this.pos.x + this.shape[0].x, this.pos.y + this.shape[0].y)
    for (let i = 1; i < this.shape.length; i++) {
      ctx.lineTo(this.pos.x + this.shape[i].x, this.pos.y + this.shape[i].y)
    }
    ctx.closePath()
    ctx.lineWidth = STROKE_WIDTH;
    ctx.strokeStyle = this.color
    ctx.stroke()
  }
}
