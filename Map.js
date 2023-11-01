import MapGenerator from "./MapGenerator.js"

export default class Map {
    constructor(game, w,h){
      this.mapGen = new MapGenerator(w,h)

      this.tileSize = 60
      this.subTileSize = this.tileSize / 3 
      
      this.tilesPerColumn = Math.floor(h / this.tileSize)
      this.tilesPerRow = Math.floor(w / this.tileSize)

      this.tiles = this.mapGen.generate(game)
    }

    getRandomTile(getRandomNum){
      let tile = this.tiles[Math.floor(getRandomNum()*this.tiles.length)][Math.floor(getRandomNum()*this.tiles[0].length)]
      return tile
    }
    
    getTileAt(x,y){
      if(x<0 || y < 0 || x > (this.tilesPerRow*3)-1 || y > (this.tilesPerColumn*3)-1) return false
      let tile = this.tiles[x][y]
      if(tile === undefined) return false
      else return tile
    }
}