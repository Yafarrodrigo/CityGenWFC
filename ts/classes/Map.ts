import Game from "../index.js"
import MapGenerator from "./MapGenerator.js"
import Tile from "./Tile.js"

export default class Map {
    mapGen: MapGenerator
    tileSize: number
    subTileSize: number
    tilesPerColumn: number
    tilesPerRow: number
    tiles: Tile[][]
    constructor(game:Game, w:number,h:number){
      this.mapGen = new MapGenerator(w,h)

      this.tileSize = 60
      this.subTileSize = this.tileSize / 3 
      
      this.tilesPerColumn = Math.floor(h / this.tileSize)
      this.tilesPerRow = Math.floor(w / this.tileSize)

      this.tiles = this.mapGen.generate(game)
    }

    getRandomTile(getRandomNum:()=>number){
      let tile = this.tiles[Math.floor(getRandomNum()*this.tiles.length)][Math.floor(getRandomNum()*this.tiles[0].length)]
      return tile
    }
    
    getTileAt(x:number,y:number){
      if(x<0 || y < 0 || x > (this.tilesPerRow*3)-1 || y > (this.tilesPerColumn*3)-1) return false
      let tile = this.tiles[x][y]
      if(tile === undefined) return false
      else return tile
    }
}