export default class Graphics {
    constructor(w,h){
        this.w = w
        this.h = h

        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')

        this.canvas.width = w
        this.canvas.height = h

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,w,h)

        this.viewTileSize = 100

        this.viewport = {
          screen: {x:w,y:h},
          startTile: {x:0,y:0},
          endTile: {x:0,y:0},
          offset: {x:0,y:0}
      }
    }

    updateViewport(game, targetX,targetY){
        
      const tileSize = this.viewTileSize //game.map.subTileSize

      this.viewport.screen.x = window.innerWidth
      this.viewport.screen.y = window.innerHeight

      this.viewport.offset.x = Math.floor((this.viewport.screen.x/2) - Math.round(targetX))
      this.viewport.offset.y = Math.floor((this.viewport.screen.y/2) - Math.round(targetY))

      const tile = {
          x:Math.floor(targetX/tileSize),
          y:Math.floor(targetY/tileSize)
      }

      this.viewport.startTile.x = tile.x - 1 - Math.ceil((this.viewport.screen.x/2) / tileSize)
      this.viewport.startTile.y = tile.y - 1 - Math.ceil((this.viewport.screen.y/2) / tileSize)  

      if(this.viewport.startTile.x < 0) this.viewport.startTile.x = 0
      if(this.viewport.startTile.y < 0) this.viewport.startTile.y = 0

      this.viewport.endTile.x = tile.x + 1 + Math.ceil((this.viewport.screen.x/2) / tileSize)
      this.viewport.endTile.y = tile.y + 1 + Math.ceil((this.viewport.screen.y/2) / tileSize)

      if(this.viewport.endTile.x >= (game.map.tilesPerRow*3)) this.viewport.endTile.x = (game.map.tilesPerRow*3) -1
      if(this.viewport.endTile.y >= (game.map.tilesPerColumn*3)) this.viewport.endTile.y = (game.map.tilesPerColumn*3) -1
    }

    drawPlayer(player){
      this.ctx.fillStyle = "red"
      this.ctx.beginPath()
      this.ctx.arc(player.x + this.viewport.offset.x, player.y + this.viewport.offset.y, 5,0, Math.PI*2)
      this.ctx.closePath()
      this.ctx.fill()
    }

    showProgress(game){
        const percent = Math.floor((game.map.iterations/game.map.maxIterations)*100)
        if(game.finished) return
        const txt = "Progress: " + percent  + "%"
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(15,15,200,50)
        this.ctx.font = "25px Arial"
        this.ctx.fillStyle = "black"
        this.ctx.fillText(txt, 45,50)
      }
  
      drawSubGrid(game){
        for(let x = 0; x < game.map.tilesPerRow*3; x++){
          for(let y = 0; y < game.map.tilesPerColumn*3; y++){
            const subTile = game.map.tiles[x][y]
            this.ctx.strokeStyle = "#777"
            this.ctx.lineWidth = 1
            this.ctx.strokeRect(subTile.x * game.map.subTileSize, subTile.y * game.map.subTileSize,game.map.subTileSize,game.map.subTileSize)
          }
        }
      }

      drawViewport(game){

        const tileSize =  this.viewTileSize //game.map.subTileSize

        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.ctx.strokeStyle = "#333"
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        for(let x = this.viewport.startTile.x; x < this.viewport.endTile.x; x++){
          for(let y = this.viewport.startTile.y; y < this.viewport.endTile.y; y++){

            const subTile = game.map.tiles[x][y]

            const finalX = (subTile.x * tileSize) + this.viewport.offset.x
            const finalY = (subTile.y * tileSize) + this.viewport.offset.y

          
            this.ctx.drawImage(subTile.img, finalX, finalY, tileSize, tileSize)
          }
        }

        this.drawPlayer(game.player)
      }

      drawHouse(x,y){

        this.ctx.fillStyle = "brown"
        this.ctx.fillRect(x+15, y+20, 20, 20)
        this.ctx.strokeRect(x+15, y+20, 20, 20)
        this.ctx.beginPath()
        this.ctx.moveTo(x+15,y+20)
        this.ctx.lineTo(x+25,y+10)
        this.ctx.lineTo(x+35,y+20)
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.fill()
      }

      drawBuildings(game){
        const {subTileSize} = game.map
        for(let x = 0; x < game.map.tilesPerRow*3; x++){
          for(let y = 0; y < game.map.tilesPerColumn*3; y++){
            const tile = game.map.tiles[x][y]
            if(tile.value !== "buildings") continue
            this.drawHouse(tile.x*subTileSize, tile.y*subTileSize)
          }
        }
      }
  
      draw(game){
        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.ctx.strokeStyle = "#333"
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        game.map.baseLayer.forEach( cell => {
            if(cell.collapsed){
            let image = game.map.baseTiles[cell.options[0]].image
            this.ctx.drawImage(image,cell.x * game.map.tileSize, cell.y * game.map.tileSize, game.map.tileSize, game.map.tileSize)
    
            }else{
                const entropy = cell.options.length
                this.ctx.strokeStyle = "#333"
                this.ctx.strokeRect(cell.x * game.map.tileSize, cell.y * game.map.tileSize, game.map.tileSize, game.map.tileSize)
                this.ctx.lineWidth = 1
                this.ctx.font = "20px Arial"
                if(entropy >= 12){
                this.ctx.strokeStyle = "red"
                }else if(entropy >= 7){
                this.ctx.strokeStyle = "orange"
                }else if(entropy >= 5){
                this.ctx.strokeStyle = "yellow"
                }else{
                this.ctx.strokeStyle = "lime"
                }
                this.ctx.strokeText(entropy, (cell.x * game.map.tileSize)+7, (cell.y* game.map.tileSize)+25)
            }
        }) 
        this.showProgress(game)  
    }  
}