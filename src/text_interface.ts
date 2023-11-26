import { TextObject } from "./game_object"

export class FPSCounter extends TextObject
{
  constructor( x: number, y: number,
               color: string = "white", font: string = "16pt sans-serif" ) {
    super( x, y, "", color, font )
  }

  public update( dt: number ) {
    const fps = Math.round(1 / dt)
    this.text = `FPS: ${fps}`
  }
}
