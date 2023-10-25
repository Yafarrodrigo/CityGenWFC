import Cell from "./Cell.js"
import Tile from "./Tile.js"
import tilesConfig from "./tilesConfig.js"

export default class Map {
    constructor(w,h, size){
        this.baseLayer = []
        this.tiles = []

        this.tileSize = size
        this.subTileSize = this.tileSize / 3 
        
        this.tilesPerColumn = Math.floor(h / this.tileSize)
        this.tilesPerRow = Math.floor(w / this.tileSize)
        
        this.iterations = 0
        this.maxIterations = (this.tilesPerColumn * this.tilesPerRow)

        this.baseTiles = []
        tilesConfig.forEach( tileInfo => {
        this.baseTiles.push( new Tile(tileInfo))

        for (let i = 0; i < this.baseTiles.length; i++) {
            const tile = this.baseTiles[i];
            tile.analyze(this.baseTiles);
        }

        this.baseLayer = []
        this.tiles = new Array(this.tilesPerRow*3).fill(null).map( () => new Array(this.tilesPerColumn*3).fill(null))
        for(let x = 0; x < this.tilesPerRow*3; x++){
            for(let y = 0; y < this.tilesPerColumn*3; y++){
            this.tiles[x][y] = {x,y}
            }
        }
      })
    }

    getTileAtBaseLayer(x,y){
        return this.baseLayer[y+ x*this.tilesPerColumn]
    }
    getSubTileAt(x,y){
        return this.tiles[x][y]
    }

    populateBaseLayer(){
        for(let x = 0; x < this.tilesPerRow; x++){
            for(let y = 0; y < this.tilesPerColumn; y++){
                const i = y+x*this.tilesPerColumn
                this.baseLayer[i] = new Cell(x,y,this.baseTiles.length);
            }
        }
    }

    checkValid(arr, valid) {
        for (let i = arr.length - 1; i >= 0; i--) {
          let element = arr[i];
          if (!valid.includes(element)) {
            arr.splice(i, 1);
          }
        }
    }

    selectRandomOption(options){
      let pool = []
      options.forEach( opt => {
        for(let i = 0; i < this.baseTiles[opt].weight; i++){
          pool.push(opt)
        }
      })
      return pool[Math.floor(Math.random()*pool.length)]
    }

    convertToSubTiles(){
      this.baseLayer.forEach( cell => {
        for(let y = 0; y < 3; y++){
          for(let x = 0; x < 3; x++){
            const value = tilesConfig[cell.options[0]].subTiles[x+(y*3)]
            const img = new Image()
            if(value === "empty"){
              img.src = "./images/subTiles/sub_empty.jpg"
            }else if(value === "cross"){
              img.src = "./images/subTiles/sub_cross.jpg"
            } else if(value === "horizontal"){
              img.src = "./images/subTiles/sub_horizontal.jpg"
            } else if(value === "vertical"){
              img.src = "./images/subTiles/sub_vertical.jpg"
            } else if(value === "leftT"){
              img.src = "./images/subTiles/sub_leftT.jpg"
            } else if(value === "rightT"){
              img.src = "./images/subTiles/sub_rightT.jpg"
            } else if(value === "topT"){
              img.src = "./images/subTiles/sub_topT.jpg"
            } else if(value === "bottomT"){
              img.src = "./images/subTiles/sub_bottomT.jpg"
            } else if(value === "cornerTR"){
              img.src = "./images/subTiles/sub_cornerTR.jpg"
            } else if(value === "cornerTL"){
              img.src = "./images/subTiles/sub_cornerTL.jpg"
            } else if(value === "cornerBR"){
              img.src = "./images/subTiles/sub_cornerBR.jpg"
            } else if(value === "cornerBL"){
              img.src = "./images/subTiles/sub_cornerBL.jpg"
            } else {
              img.src = "./images/subTiles/sub_empty.jpg"
            }
            this.tiles[ (cell.x*3) + x ][ (cell.y*3) + y ] = {...this.tiles[ (cell.x*3) + x ][ (cell.y*3) + y ], value, img}
          }
        }
      })
    }

    processBaseLayer(game){
      if(game.finished) return
        this.iterations += 1
          let gridCopy = this.baseLayer.slice();
          gridCopy = gridCopy.filter((cell) => !cell.collapsed);
  
          if (gridCopy.length == 0) {
            console.log("finished");
            game.finished = true
            
            this.convertToSubTiles()
            game.player.x = this.tiles[Math.floor(this.tiles.length/2)][Math.floor(this.tiles[0].length/2)].x * this.subTileSize
            game.player.y = this.tiles[Math.floor(this.tiles.length/2)][Math.floor(this.tiles[0].length/2)].y * this.subTileSize
            
            setTimeout( () => {
              game.graphics.updateViewport(game, game.player.x, game.player.y)
              game.graphics.drawViewport(game)
            },1)
            return
          }
  
          gridCopy.sort((a, b) => {
              return a.options.length - b.options.length;
          });
  
          gridCopy = gridCopy.filter( cell => cell.options.length <= gridCopy[0].options.length)
  
          const cell = gridCopy[Math.floor(Math.random()*gridCopy.length)]
          const pick = this.selectRandomOption(cell.options)
          if (pick === undefined) {
              game.start()
              return;
          }
  
          this.baseLayer[cell.y + (cell.x*this.tilesPerColumn)].collapsed = true
          this.baseLayer[cell.y + (cell.x*this.tilesPerColumn)].options = [pick]
  
          // entropy calc
          const nextGrid = []
          for(let x = 0; x < this.tilesPerRow; x++){
              for(let y = 0; y < this.tilesPerColumn; y++){
  
              let index = y + (x * this.tilesPerColumn);
  
              if (this.baseLayer[index].collapsed) {
                nextGrid[index] = this.baseLayer[index];
              } else {
                  
                let options = [0,1,2,3,4,5,6,7,8,9,10,11]
                // Look up
                if (y > 0) {
                  let up = this.getTileAtBaseLayer(x,y-1);
                  let validOptions = [];
                  for (let option of up.options) {
                    let valid = this.baseTiles[option].down;
                    validOptions = validOptions.concat(valid);
                  }
                  this.checkValid(options, validOptions);
                }
                // Look right
                if (x < this.tilesPerRow - 1) {
                  let right = this.getTileAtBaseLayer(x+1,y);
                  let validOptions = [];
                  for (let option of right.options) {
                    let valid = this.baseTiles[option].left;
                    validOptions = validOptions.concat(valid);
                  }
                  this.checkValid(options, validOptions);
                }
                // Look down
                if (y < this.tilesPerColumn - 1) {
                  let down = this.getTileAtBaseLayer(x,y+1);
                  let validOptions = [];
                  for (let option of down.options) {
                    let valid = this.baseTiles[option].up;
                    validOptions = validOptions.concat(valid);
                  }
                  this.checkValid(options, validOptions);
                }
                // Look left
                if (x > 0) {
                  let left = this.getTileAtBaseLayer(x-1,y);
                  let validOptions = [];
                  for (let option of left.options) {
                    let valid = this.baseTiles[option].right;
                    validOptions = validOptions.concat(valid);
                  }
                  this.checkValid(options, validOptions);
                }
        
                nextGrid[index] = new Cell(x,y,options);
              }
            }
          }
          this.baseLayer = nextGrid
      }
}