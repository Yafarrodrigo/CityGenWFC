import Cell from "./Cell.js"
import Tile from "./Tile.js"
import tilesConfig from "./tilesConfig.js"

export default class Map {
    constructor(w,h){
        this.baseLayer = []
        this.tiles = []

        this.tileSize = 90
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
            let value = tilesConfig[cell.options[0]].subTiles[x+(y*3)]
            this.tiles[ (cell.x*3) + x ][ (cell.y*3) + y ] = {...this.tiles[ (cell.x*3) + x ][ (cell.y*3) + y ], value}
          }
        }
      })
    }

    processBaseLayer(game){

        this.iterations += 1
          let gridCopy = this.baseLayer.slice();
          gridCopy = gridCopy.filter((cell) => !cell.collapsed);
  
          if (gridCopy.length == 0) {
            console.log("finished");
            game.stop()
            game.finished = true
            setTimeout( () => {
              this.convertToSubTiles()
            },1)
            
            game.graphics.draw(game)
            setTimeout( () => {
              game.graphics.drawSubGrid(game)
            },10)
            return;
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