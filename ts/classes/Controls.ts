import Game from "../index"

export default class Controls{

  UP: boolean
  RIGHT: boolean
  DOWN: boolean
  LEFT: boolean

    constructor(){
      this.UP = false
      this.RIGHT = false
      this.DOWN = false
      this.LEFT = false
    }
    
    createListeners(game: Game){
      window.addEventListener('click', (evt) => {
        const rect = game.graphics.canvas.getBoundingClientRect();
        const x = Math.floor((evt.clientX - rect.left - game.graphics.viewport.offset.x)/game.graphics.viewTileSize)
        const y = Math.floor((evt.clientY - rect.top - game.graphics.viewport.offset.y)/game.graphics.viewTileSize)
        console.log(game.map.getTileAt(x,y));
      })

      document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "A":
            case "a":
              if(this.LEFT === false && game.player.checkForRoad(game.map, "left")) {
                game.player.moveLeft()
                this.LEFT = true
              }
                break;
            case "D":
            case "d":
              if(this.RIGHT === false && game.player.checkForRoad(game.map, "right")) {
                game.player.moveRight()
                this.RIGHT = true
              }
                break;
            case "W":
            case "w":
              if(this.UP === false && game.player.checkForRoad(game.map, "up")) {
                game.player.moveUp()
                this.UP = true
              }
                break;
            case "S":
            case "s":
              if(this.DOWN === false && game.player.checkForRoad(game.map, "down")) {
                game.player.moveDown()
                this.DOWN = true
              }
                break;
        }
    })
    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case "A":
            case "a":
                this.LEFT = false
                break;
            case "D":
            case "d":
                this.RIGHT = false
                break;
            case "W":
            case "w":
                this.UP = false
                break;
            case "S":
            case "s":
                this.DOWN = false
                break;
        }
      })
    }
}