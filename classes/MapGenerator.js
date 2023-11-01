import Cell from "./Cell.js"
import {BaseTile} from "./BaseTile.js"
import tilesConfig from "../tilesConfig.js"
import Tile from "./Tile.js"

export default class MapGenerator {
    constructor(w,h){

        this.finished = false
      
        this.baseLayer = []
        this.finalTiles = []

        this.tileSize = 60
        this.subTileSize = this.tileSize / 3 
        
        this.tilesPerColumn = Math.floor(h / this.tileSize)
        this.tilesPerRow = Math.floor(w / this.tileSize)
        
        this.baseLayerIterations = 0
        this.baseLayerMaxIterations = (this.tilesPerColumn * this.tilesPerRow)

        this.baseTiles = []
        tilesConfig.forEach( tileInfo => {this.baseTiles.push( new BaseTile(tileInfo))})

        for (let i = 0; i < this.baseTiles.length; i++) {
            const tile = this.baseTiles[i];
            tile.analyze(this.baseTiles);
        }

        this.finalTiles = new Array(this.tilesPerRow*3).fill(null).map( () => new Array(this.tilesPerColumn*3).fill(null))
        for(let x = 0; x < this.tilesPerRow*3; x++){
            for(let y = 0; y < this.tilesPerColumn*3; y++){
                this.finalTiles[x][y] = {x,y}
            }
        }

        this.baseLayer = []
        this.timer = null

    }

    generate(game){
        this.finished = false
        
        this.populateBaseLayer()
        this.timer = setInterval(()=>{
            this.processBaseLayer(game)
        })
        return this.finalTiles
    }
  
    getTileAtBaseLayer(x,y){
        return this.baseLayer[y+ x*this.tilesPerColumn]
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

    selectRandomOption(game,options){
      let pool = []
      options.forEach( opt => {
        for(let i = 0; i < this.baseTiles[opt].weight; i++){
          pool.push(opt)
        }
      })
      return pool[Math.floor(game.getRandomNum()*pool.length)]
    }

    selectRandomBuilding(game){
      const allBuildings = [{name:"houses",weight:100},{name:"departments",weight:10},
                            {name:"shop",weight:25},{name:"hospital",weight:1},
                            {name:"policeStation",weight:1},{name:"fireStation",weight:1},{name:"park",weight:5}]
      let pool = []
      allBuildings.forEach( building => {
        for(let i = 0; i < building.weight; i++){
          pool.push(building.name)
        }
      })
      return pool[Math.floor(game.getRandomNum()*pool.length)]
    }

    convertToSubTiles(game){
      this.baseLayer.forEach( cell => {
        for(let y = 0; y < 3; y++){
          for(let x = 0; x < 3; x++){
            const value = tilesConfig[cell.options[0]].subTiles[x+(y*3)]
            let building = null
            if(cell.options[0] !== 0 && value === "empty"){
              if(cell.options[0] === 12 && value === "empty"){ // roundel
                building = "gasStation"
              }else{
                building = this.selectRandomBuilding(game)
              }
            }
            const img = value
            this.finalTiles[ (cell.x*3) + x ][ (cell.y*3) + y ] = new Tile((cell.x*3) + x,(cell.y*3) + y, value, img, building)
          }
        }
      })
    }

    processBaseLayer(game){
      if(this.finished) return
        this.baseLayerIterations += 1
          let gridCopy = this.baseLayer.slice();
          gridCopy = gridCopy.filter((cell) => !cell.collapsed);
  
          // FINISH
          if (gridCopy.length == 0) {
            this.timer = null
            this.convertToSubTiles(game)
            this.finished = true
            return
          }
  
          gridCopy.sort((a, b) => {
              return a.options.length - b.options.length;
          });
  
          gridCopy = gridCopy.filter( cell => cell.options.length <= gridCopy[0].options.length)
  
          const cell = gridCopy[Math.floor(game.getRandomNum()*gridCopy.length)]
          const pick = this.selectRandomOption(game, cell.options)
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
                  
                let options = []
                for(let i = 0; i < tilesConfig.length; i++){
                  options.push(i)
                }
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