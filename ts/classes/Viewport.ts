import Game from "../index.js"

export default class Viewport{
  w:number
  h:number
  screen:{x:number,y:number}
  startTile:{x:number,y:number}
  endTile:{x:number,y:number}
  offset:{x:number,y:number}
  viewTileSize: number

    constructor(w:number,h:number, tileSize:number){
        this.w = w
        this.h = h
        this.screen = {x:w,y:h}
        this.startTile = {x:0,y:0}
        this.endTile = {x:0,y:0}
        this.offset = {x:0,y:0}
        this.viewTileSize = tileSize
    }

    updateViewport(game:Game, targetX:number,targetY:number){
          
        this.screen.x = this.w
        this.screen.y = this.h
    
        this.offset.x = Math.floor((this.screen.x/2) - Math.round(targetX))
        this.offset.y = Math.floor((this.screen.y/2) - Math.round(targetY))
    
        const tile = {
          x:Math.floor(targetX/this.viewTileSize),
          y:Math.floor(targetY/this.viewTileSize)
        }
    
        this.startTile.x = tile.x - 1 - Math.ceil((this.screen.x/2) / this.viewTileSize)
        this.startTile.y = tile.y - 1 - Math.ceil((this.screen.y/2) / this.viewTileSize)  
    
        if(this.startTile.x < 0) this.startTile.x = 0
        if(this.startTile.y < 0) this.startTile.y = 0
    
        this.endTile.x = tile.x + 1 + Math.ceil((this.screen.x/2) / this.viewTileSize)
        this.endTile.y = tile.y + 1 + Math.ceil((this.screen.y/2) / this.viewTileSize)
    
        if(this.endTile.x >= (game.map.tilesPerRow*3)) this.endTile.x = (game.map.tilesPerRow*3) -1
        if(this.endTile.y >= (game.map.tilesPerColumn*3)) this.endTile.y = (game.map.tilesPerColumn*3) -1
      }
}