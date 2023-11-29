import { TextObject } from "./game_object"
import { COLOR, FONT } from "./constants"

export class FPSCounter extends TextObject
{
  constructor( x: number, y: number,
               color: string = COLOR.text, font: string = FONT ) {
    super( x, y, "", color, font )
  }

  public update( dt: number ) {
    const fps = Math.round(1 / dt)
    this.text = `FPS: ${fps}`
  }
}
