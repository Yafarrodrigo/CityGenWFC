import Cell from "./Cell.js";
import Tile from "./Tile.js";

class WFC {
    constructor(w,h){
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')

        this.canvas.width = w
        this.canvas.height = h

        this.tileSize = 40
        this.tilesPerColumn = Math.floor(h / this.tileSize)
        this.tilesPerRow = Math.floor(w / this.tileSize)

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,w,h)

        this.tileImages = []
        this.allTiles = ["empty","cross","vertical","horizontal","topT","rightT","bottomT","leftT","cornerTL","cornerTR","cornerBL","cornerBR"]
        this.allTiles.forEach( item => {
            const newImg = new Image()
            newImg.src = `./${item}.jpg`
            this.tileImages.push(newImg)
        })
        this.tiles = []

        this.tiles[0] = new Tile(this.tileImages[0],   [ "eee", "eee", "eee", "eee" ], 1);     // empty
        this.tiles[1] = new Tile(this.tileImages[1],   [ "brb", "brb", "brb", "brb" ], 1);      // cross
        this.tiles[2] = new Tile(this.tileImages[2],   [ "brb", "eee", "brb", "eee" ], 1);     // vertical
        this.tiles[3] = new Tile(this.tileImages[3],   [ "eee", "brb", "eee", "brb" ], 1);     // horizontal
        this.tiles[4] = new Tile(this.tileImages[4],   [ "brb", "brb", "eee", "brb" ], 1);      // topT
        this.tiles[5] = new Tile(this.tileImages[5],   [ "brb", "brb", "brb", "eee" ], 1);      // rigthT
        this.tiles[6] = new Tile(this.tileImages[6],   [ "eee", "brb", "brb", "brb" ], 1);      // bottomT
        this.tiles[7] = new Tile(this.tileImages[7],   [ "brb", "eee", "brb", "brb" ], 1);      // leftT
        this.tiles[8] = new Tile(this.tileImages[8],   [ "brb", "eee", "eee", "brb" ], 1);      // cornerTL
        this.tiles[9] = new Tile(this.tileImages[9],   [ "brb", "brb", "eee", "eee" ], 1);      // cornerTR
        this.tiles[10] = new Tile(this.tileImages[10], [ "eee", "eee", "brb", "brb" ], 1);    // cornerBL
        this.tiles[11] = new Tile(this.tileImages[11], [ "eee", "brb", "brb", "eee" ], 1);    // cornerBR

        /* window.addEventListener('click', (evt) => {
          const rect = this.canvas.getBoundingClientRect();
          const x = Math.floor((evt.clientX - rect.left)/this.tileSize)
          const y = Math.floor((evt.clientY - rect.top)/this.tileSize)
          console.log(this.getTileAt(x,y));
      }) */
      document.getElementById('generateButton').addEventListener('click', (e) => {
        e.preventDefault()
        this.handleGenerateButton()
      })

      document.getElementById('gameSpeed').addEventListener('change', (e) => {
        e.preventDefault()
        this.handleChangeSpeedSlider(e)
      })
      dragElement(document.getElementById('controller'))

        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            tile.analyze(this.tiles);
        }

        this.timer = null
        this.speed = 100

        this.grid = []
        this.start()

        this.draw()
    }

    handleChangeSpeedSlider(e){
      e.preventDefault()
      this.changeSpeed(parseInt(e.target.value))
    }

    handleGenerateButton(){
      this.stop()
      const newEmptyWeight = document.getElementById("emptyTileWeight").value
      const newCrossWeight = document.getElementById("crossTileWeight").value
      const newHorizontalTileWeight = document.getElementById("horizontalTileWeight").value
      const newVerticalTileWeight = document.getElementById("verticalTileWeight").value
      const newCornersTileWeight = document.getElementById("cornersTileWeight").value
      const newTTileWeight = document.getElementById("tTileWeight").value

      this.tiles[0].weight = newEmptyWeight
      this.tiles[1].weight = newCrossWeight
      this.tiles[2].weight = newVerticalTileWeight
      this.tiles[3].weight = newHorizontalTileWeight
      this.tiles[4].weight = newTTileWeight
      this.tiles[5].weight = newTTileWeight
      this.tiles[6].weight = newTTileWeight
      this.tiles[7].weight = newTTileWeight
      this.tiles[8].weight = newCornersTileWeight
      this.tiles[9].weight = newCornersTileWeight
      this.tiles[10].weight = newCornersTileWeight
      this.tiles[11].weight = newCornersTileWeight

      this.start()
    }

    start(){
      this.stop()
      for(let x = 0; x < this.tilesPerRow; x++){
        for(let y = 0; y < this.tilesPerColumn; y++){
            const i = y+x*this.tilesPerColumn
            this.grid[i] = new Cell(x,y,this.tiles.length);
        }
      }
      this.timer = setInterval(()=>{
        this.update()
        this.draw()
      }, this.speed)
    }

    changeSpeed(newSpeed){
      this.speed = newSpeed
      clearInterval(this.timer)
      this.timer = setInterval(()=>{
        this.update()
        this.draw()
      }, this.speed)
    }

    stop(){
      clearInterval(this.timer)
      this.timer = null
    }

    getTileAt(x,y){
      return this.grid[y+ x*this.tilesPerColumn]
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
        for(let i = 0; i < this.tiles[opt].weight; i++){
          pool.push(opt)
        }
      })
      return pool[Math.floor(Math.random()*pool.length)]
    }

    update(){
        let gridCopy = this.grid.slice();
        gridCopy = gridCopy.filter((cell) => !cell.collapsed);

        if (gridCopy.length == 0) {
          console.log("finished");
            this.stop()
            return;
        }

        gridCopy.sort((a, b) => {
            return a.options.length - b.options.length;
        });

        gridCopy = gridCopy.filter( cell => cell.options.length <= gridCopy[0].options.length)

        const cell = gridCopy[Math.floor(Math.random()*gridCopy.length)]
        const pick = this.selectRandomOption(cell.options)
        if (pick === undefined) {
            this.start()
            return;
        }

        this.grid[cell.y + (cell.x*this.tilesPerColumn)].collapsed = true
        this.grid[cell.y + (cell.x*this.tilesPerColumn)].options = [pick]

        // entropy calc
        const nextGrid = []
        for(let x = 0; x < this.tilesPerRow; x++){
            for(let y = 0; y < this.tilesPerColumn; y++){

            let index = y + (x * this.tilesPerColumn);

            if (this.grid[index].collapsed) {
              nextGrid[index] = this.grid[index];
            } else {
                
              let options = [0,1,2,3,4,5,6,7,8,9,10,11]
              // Look up
              if (y > 0) {
                let up = this.getTileAt(x,y-1);
                let validOptions = [];
                for (let option of up.options) {
                  let valid = this.tiles[option].down;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
              // Look right
              if (x < this.tilesPerRow - 1) {
                let right = this.getTileAt(x+1,y);
                let validOptions = [];
                for (let option of right.options) {
                  let valid = this.tiles[option].left;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
              // Look down
              if (y < this.tilesPerColumn - 1) {
                let down = this.getTileAt(x,y+1);
                let validOptions = [];
                for (let option of down.options) {
                  let valid = this.tiles[option].up;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
              // Look left
              if (x > 0) {
                let left = this.getTileAt(x-1,y);
                let validOptions = [];
                for (let option of left.options) {
                  let valid = this.tiles[option].right;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
      
              nextGrid[index] = new Cell(x,y,options);
            }
          }
        }
        this.grid = nextGrid
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.ctx.strokeStyle = "#333"
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.grid.forEach( cell => {
            if(cell.collapsed){
              let image = this.tileImages[cell.options[0]]
              this.ctx.drawImage(image,cell.x * this.tileSize, cell.y * this.tileSize, this.tileSize, this.tileSize)
      
            }else{
              const entropy = cell.options.length
              this.ctx.strokeStyle = "#333"
                this.ctx.strokeRect(cell.x * this.tileSize, cell.y * this.tileSize, this.tileSize, this.tileSize)
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
                this.ctx.strokeText(entropy, (cell.x * this.tileSize)+7, (cell.y* this.tileSize)+25)
            }
        })   
    }     
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
const wfc = new WFC(window.innerWidth, window.innerHeight)
wfc.start()