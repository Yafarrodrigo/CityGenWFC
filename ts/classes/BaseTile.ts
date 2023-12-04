import { TileInfo } from "../tilesConfig"

function compareEdge(a:string, b:string) {
  let reversed = b.split("").reverse().join("")
  return a == reversed
}  
export class BaseTile {
  name:string
  edges:string[]
  weight: number
  up:number[]
  right:number[]
  down:number[]
  left:number[]
  constructor(tileInfo:TileInfo) {
    this.name = tileInfo.name
    this.edges = tileInfo.edges
    this.weight = tileInfo.weight
    this.up = []
    this.right = []
    this.down = []
    this.left = []
  }
  
  // Find the valid neighbors
  analyze(tiles: BaseTile[]) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i]
      // UP
      if (compareEdge(tile.edges[2], this.edges[0])) {
        this.up.push(i)
      }
      // RIGHT
      if (compareEdge(tile.edges[3], this.edges[1])) {
        this.right.push(i)
      }
      // DOWN
      if (compareEdge(tile.edges[0], this.edges[2])) {
        this.down.push(i)
      }
      // LEFT
      if (compareEdge(tile.edges[1], this.edges[3])) {
        this.left.push(i)
      }
    }
  }
}
