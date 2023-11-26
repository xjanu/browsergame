import { InputEvents } from "./input"

export interface IGameObject {
  update( dt: number, input: InputEvents ): void
  draw( ctx: CanvasRenderingContext2D ): void
}

export abstract class TextObject implements IGameObject {
  protected x: number
  protected y: number
  protected text: string
  protected color: string
  protected font: string

  constructor( x: number, y: number, text: string,
               color: string = "white", font: string = "16pt sans-serif" ) {
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
