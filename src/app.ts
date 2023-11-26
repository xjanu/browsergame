interface IGameObject {
  update( dt: number, input: InputEvents ): void
  draw( ctx: CanvasRenderingContext2D ): void
}

abstract class TextObject implements IGameObject {
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

class FPSCounter extends TextObject
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

class Player implements IGameObject
{
  private x: number
  private y: number

  constructor( x: number, y: number ) {
    this.x = x
    this.y = y
  }

  public update( dt: number, input: InputEvents ) {
    if (input.right) {
      this.x += 100 * dt
    }
    if (input.left) {
      this.x -= 100 * dt
    }
    if (input.down) {
      this.y += 100 * dt
    }
    if (input.up) {
      this.y -= 100 * dt
    }
  }

  public draw( ctx: CanvasRenderingContext2D ) {
    ctx.fillStyle = "blue"
    ctx.fillRect(this.x, this.y, 50, 50)
  }
}

class InputEvents {
  public up:    number
  public down:  number
  public left:  number
  public right: number
  public space: number

  constructor() {
    this.reset()
    window.addEventListener('keydown', (e) => this.keydown_cb(e))
    window.addEventListener('keyup',   (e) => this.keyup_cb(e))
    window.addEventListener('blur',    (_) => this.reset())
  }

  public keydown_cb( e: KeyboardEvent ) {
    switch (e.key) {
      case "ArrowUp":    this.up    = 1; break;
      case "ArrowDown":  this.down  = 1; break;
      case "ArrowLeft":  this.left  = 1; break;
      case "ArrowRight": this.right = 1; break;
      case " ":          this.space = 1; break;
    }
  }

  public keyup_cb( e: KeyboardEvent ) {
    switch (e.key) {
      case "ArrowUp":    this.up    = 0; break;
      case "ArrowDown":  this.down  = 0; break;
      case "ArrowLeft":  this.left  = 0; break;
      case "ArrowRight": this.right = 0; break;
      case " ":          this.space = 0; break;
    }
  }

  public reset() {
    this.up    = 0
    this.down  = 0
    this.left  = 0
    this.right = 0
    this.space = 0
  }
}

class Game
{
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private game_objects: IGameObject[] = [ new FPSCounter( 50, 50 ), new Player( 100, 100 ) ]
  private input: InputEvents = new InputEvents()

  constructor()
  {
    this.canvas = document.getElementById("app") as HTMLCanvasElement
    this.ctx = this.canvas.getContext("2d")
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
    this.game_objects.forEach( (obj) => obj.update( dt, this.input ) )
  }

  private draw()
  {
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.game_objects.forEach( (obj) => obj.draw( this.ctx ) )
  }
}

const main = async () => {
  const game = new Game()
  game.start()
}

main()
