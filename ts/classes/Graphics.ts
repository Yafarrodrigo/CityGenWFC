import Game from "../index.js"
import tilesConfig from "../tilesConfig.js"
import Player from "./Player.js"
import Viewport from "./Viewport.js"

export default class Graphics {
  w: number
  h: number
  tileImgs: {[key:string]: HTMLImageElement}
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  viewTileSize: number
  viewport: Viewport
  constructor(w: number,h: number){
    this.w = w
    this.h = h

    this.tileImgs = {}
    tilesConfig.forEach( tileInfo => {
      if(tileInfo.imgName){
        this.tileImgs[tileInfo.name] = new Image()
        this.tileImgs[tileInfo.name].src = "./images/" + tileInfo.imgName + ".jpg"
      }
    })

    this.canvas = (document.getElementById('canvas')) as HTMLCanvasElement
    this.ctx = (this.canvas.getContext('2d')) as CanvasRenderingContext2D

    this.canvas.width = w
    this.canvas.height = h

    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0,0,w,h)

    this.viewTileSize = 150

    this.viewport = new Viewport(w,h,this.viewTileSize)
  }


  drawPlayer(player: Player){
    const {offset} = this.viewport
    this.ctx.fillStyle = "red"
    this.ctx.beginPath()
    this.ctx.arc((player.x * this.viewTileSize) + offset.x + (this.viewTileSize/2), (player.y * this.viewTileSize) + offset.y + (this.viewTileSize/2), 15,0, Math.PI*2)
    this.ctx.closePath()
    this.ctx.fill()
  }

  showProgress(current: number, max: number){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    const percent = Math.floor((current/max)*100)
    const txt = "Generating Base Map: " + percent  + "%"
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(15,15,350,50)
    this.ctx.font = "25px Arial"
    this.ctx.fillStyle = "black"
    this.ctx.fillText(txt, 45,50)
  }

  drawSubGrid(game: Game){
    const tileSize = this.viewTileSize
    const { offset } = this.viewport
    for(let x = 0; x < game.map.tilesPerRow*3; x++){
      for(let y = 0; y < game.map.tilesPerColumn*3; y++){
        const subTile = game.map.tiles[x][y]
        this.ctx.strokeStyle = "#888"
        this.ctx.lineWidth = 1
        this.ctx.strokeRect((subTile.x * tileSize)+offset.x, (subTile.y * tileSize)+offset.y,tileSize,tileSize)
      }
    }
  }

  drawViewport(game: Game){

    const tileSize =  this.viewTileSize

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.ctx.strokeStyle = "#333"
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for(let x = this.viewport.startTile.x; x <= this.viewport.endTile.x; x++){
      for(let y = this.viewport.startTile.y; y <= this.viewport.endTile.y; y++){

        const subTile = game.map.tiles[x][y]

        const finalX = (subTile.x * tileSize) + this.viewport.offset.x
        const finalY = (subTile.y * tileSize) + this.viewport.offset.y

        this.ctx.drawImage(this.tileImgs[subTile.img], finalX, finalY, tileSize, tileSize)

        if(subTile.building !== null){
          this.drawBuilding(subTile.building, finalX,finalY)
        }
      }
    }
  }

  drawBuilding(building:string, x:number,y:number){
    if(building === "gasStation") this.ctx.fillStyle = "rgb(0,255,0,0.25)"
    else this.ctx.fillStyle = "rgb(0,0,255,0.25)"
    this.ctx.fillRect(x+2,y+2, this.viewTileSize -2,this.viewTileSize -2)

    this.ctx.font = "15px Arial"
    this.ctx.strokeStyle = "black"
    this.ctx.lineWidth = 1
    this.ctx.strokeText(building, x+5 ,y+50 )
  }

  update(game: Game){
    this.viewport.updateViewport(game, (game.player.x * this.viewTileSize), (game.player.y * this.viewTileSize))
    this.drawViewport(game)
    this.drawSubGrid(game)
    this.drawPlayer(game.player)
  }
}