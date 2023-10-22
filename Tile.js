function compareEdge(a, b) {
  let reversed = b.split("").reverse().join("")
  return a == reversed
}  
export default class Tile {
  constructor(tileInfo) {
    this.name = tileInfo.name
    this.edges = tileInfo.edges
    this.weight = tileInfo.weight
    this.image = new Image()
    this.image.src = tileInfo.img
    this.up = []
    this.right = []
    this.down = []
    this.left = []
  }
  
  // Find the valid neighbors
  analyze(tiles) {
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
