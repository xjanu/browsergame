export class InputEvents {
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
