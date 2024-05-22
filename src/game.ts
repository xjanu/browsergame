import { Input } from "./input"
import { IGameObject } from "./game_object"
import { FPSCounter } from "./text_interface"
import { Player } from "./player"
import { COLOR } from "./constants"

class Game
{
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private game_objects: IGameObject[] = [ new FPSCounter( 50, 50 ) ]
  private input: Input = new Input()

  constructor()
  {
    this.canvas = document.getElementById("app") as HTMLCanvasElement
    this.ctx = this.canvas.getContext("2d")
    this.game_objects.push(
      new Player( document.body.clientWidth / 2, document.body.clientHeight / 2,
                  this.game_objects ) )
    this.init()
  }

  private init()
  {
    window.addEventListener("resize", (e) => {
      this.canvas.width  = document.body.clientWidth
      this.canvas.height = document.body.clientHeight
    })
    window.dispatchEvent(new Event("resize"))
  }

  public start() {
    this.loop( performance.timeOrigin )
  }

  private loop( prev_t: number )
  {
    const t = performance.now()
    const dt = (t - prev_t) / 1000

    this.update( dt )
    this.draw()

    requestAnimationFrame(() => this.loop( t ))
  }

  private update( dt: number ) {
    this.game_objects.forEach( (obj) => obj.update( dt, this.input.get_state() ) )
  }

  private draw()
  {
    this.ctx.fillStyle = COLOR.bg
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.game_objects.forEach( (obj) => obj.draw( this.ctx ) )
  }
}

const main = () => {
  const game = new Game()
  game.start()
}

main()
