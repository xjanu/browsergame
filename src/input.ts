export type InputState = {
  up:    number
  down:  number
  left:  number
  right: number
  space: boolean
}

interface InputSource {
  get_state(): InputState
}

class KeyboardInput implements InputSource {
  private up:    number
  private down:  number
  private left:  number
  private right: number
  private space: boolean

  constructor() {
    this.reset()
    window.addEventListener('keydown', (e) => this.keydown_cb(e))
    window.addEventListener('keyup',   (e) => this.keyup_cb(e))
    window.addEventListener('blur',    (_) => this.reset())
  }

  public get_state() {
    return {
      up:    this.up,
      down:  this.down,
      left:  this.left,
      right: this.right,
      space: this.space,
    }
  }

  private keydown_cb( e: KeyboardEvent ) {
    switch (e.key) {
      case "ArrowUp":    this.up    = 1; break;
      case "ArrowDown":  this.down  = 1; break;
      case "ArrowLeft":  this.left  = 1; break;
      case "ArrowRight": this.right = 1; break;
      case " ":          this.space = true; break;
    }
  }

  private keyup_cb( e: KeyboardEvent ) {
    switch (e.key) {
      case "ArrowUp":    this.up    = 0; break;
      case "ArrowDown":  this.down  = 0; break;
      case "ArrowLeft":  this.left  = 0; break;
      case "ArrowRight": this.right = 0; break;
      case " ":          this.space = false; break;
    }
  }

  private reset() {
    this.up    = 0
    this.down  = 0
    this.left  = 0
    this.right = 0
    this.space = false
  }
}

class GamepadInput implements InputSource {
  private gamepad: Gamepad
  private deadzone: number

  constructor( gamepad: Gamepad, deadzone: number = 0.1 ) {
    this.gamepad = gamepad
    this.deadzone = deadzone
  }

  private map_axis( value ): number {
    if (value < this.deadzone) return 0
    return value
  }

  public get_state() {
    return {
      up:    this.map_axis( -this.gamepad.axes[1] ),
      down:  this.map_axis(  this.gamepad.axes[1] ),
      left:  this.map_axis( -this.gamepad.axes[0] ),
      right: this.map_axis(  this.gamepad.axes[0] ),
      space: this.gamepad.buttons[0].pressed,
    }
  }

  public get_id() {
    return this.gamepad.index
  }
}

class CompositeInput implements InputSource
{
  protected sources: InputSource[]

  constructor( sources: InputSource[] ) {
    this.sources = sources
  }

  public get_state(): InputState
  {
    const state = {
      up:    0,
      down:  0,
      left:  0,
      right: 0,
      space: false,
    }

    this.sources.forEach( (source) => {
      const source_state = source.get_state()
      state.up    = Math.max( state.up,    source_state.up )
      state.down  = Math.max( state.down,  source_state.down )
      state.left  = Math.max( state.left,  source_state.left )
      state.right = Math.max( state.right, source_state.right )
      state.space = state.space || source_state.space
    })

    return state
  }
}

class AllGamepads extends CompositeInput {
  protected sources: GamepadInput[]

  constructor() {
    super( Array.from( navigator.getGamepads() ).map( (gamepad) => new GamepadInput( gamepad ) ) )
    addEventListener('gamepadconnected', (e) => this.gamepadconnected_cb(e))
    addEventListener('gamepaddisconnected', (e) => this.gamepaddisconnected_cb(e))
  }

  private gamepadconnected_cb( e: GamepadEvent ) {
    this.sources.push( new GamepadInput( e.gamepad ) )
  }

  private gamepaddisconnected_cb( e: GamepadEvent ) {
    this.sources = this.sources.filter( (source) => source.get_id() != e.gamepad.index )
  }

}

export class Input extends CompositeInput {
  private source: InputSource

  constructor() {
    super([
      new KeyboardInput(),
      new AllGamepads(),
    ])
  }
}
