function reverseString(s) {
  let arr = s.split("");
  arr = arr.reverse();
  return arr.join("");
}
  
function compareEdge(a, b) {
  return a == reverseString(b);
}
  
export default class Tile {
  constructor(img, edges, weight) {
    this.img = img;
    this.edges = edges;
    this.weight = weight
    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
  }
  
  // Find the valid neighbors
  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      // UP
      if (compareEdge(tile.edges[2], this.edges[0])) {
        this.up.push(i);
      }
      // RIGHT
      if (compareEdge(tile.edges[3], this.edges[1])) {
        this.right.push(i);
      }
      // DOWN
      if (compareEdge(tile.edges[0], this.edges[2])) {
        this.down.push(i);
      }
      // LEFT
      if (compareEdge(tile.edges[1], this.edges[3])) {
        this.left.push(i);
      }
    }
  }
}
