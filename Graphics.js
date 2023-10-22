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