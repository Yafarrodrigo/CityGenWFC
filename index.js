import Cell from "./Cell.js";
import Tile from "./Tile.js";
import tilesConfig from "./tilesConfig.js";

class WFC {
    constructor(w,h){

      this.finished = false

      this.defaultSettings = {
        wieghts: {
          empty: 50,
          cross: 5,
          horizontal: 15,
          vertical: 15,
          corner: 1,
          t: 10
        },
        speed: 16
      }

      const emptySlider = document.getElementById("emptyTileWeight")
      emptySlider.value = emptySlider.nextElementSibling.value = this.defaultSettings.wieghts.empty
      const crossSlider = document.getElementById("crossTileWeight")
      crossSlider.value = crossSlider.nextElementSibling.value = this.defaultSettings.wieghts.cross
      const horizontalSlider = document.getElementById("horizontalTileWeight")
      horizontalSlider.value = horizontalSlider.nextElementSibling.value = this.defaultSettings.wieghts.horizontal
      const verticalSlider = document.getElementById("verticalTileWeight")
      verticalSlider.value = verticalSlider.nextElementSibling.value = this.defaultSettings.wieghts.vertical
      const cornerSlider = document.getElementById("cornersTileWeight")
      cornerSlider.value = cornerSlider.nextElementSibling.value = this.defaultSettings.wieghts.corner
      const tSlider = document.getElementById("tTileWeight")
      tSlider.value = tSlider.nextElementSibling.value = this.defaultSettings.wieghts.t
      const speedSlider = document.getElementById("gameSpeed")
      speedSlider.value = speedSlider.nextElementSibling.value = this.defaultSettings.speed

      this.canvas = document.getElementById('canvas')
      this.ctx = canvas.getContext('2d')

      this.canvas.width = w
      this.canvas.height = h

      this.tileSize = 90
      this.subTileSize = this.tileSize / 3 
      
      this.tilesPerColumn = Math.floor(h / this.tileSize)
      this.tilesPerRow = Math.floor(w / this.tileSize)
      
      this.iterations = 0
      this.maxIterations = (this.tilesPerColumn * this.tilesPerRow)
      
      this.ctx.fillStyle = "black"
      this.ctx.fillRect(0,0,w,h)

      this.tiles = []
      tilesConfig.forEach( tileInfo => {
        this.tiles.push( new Tile(tileInfo) )
      })

      window.addEventListener('click', (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((evt.clientX - rect.left)/this.subTileSize)
        const y = Math.floor((evt.clientY - rect.top)/this.subTileSize)
        console.log(this.getSubTileAt(x,y));
    })
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
      this.speed = this.defaultSettings.speed

      this.grid = []
      this.subGrid = new Array(this.tilesPerRow*3).fill(null).map( () => new Array(this.tilesPerColumn*3).fill(null))
      for(let x = 0; x < this.tilesPerRow*3; x++){
        for(let y = 0; y < this.tilesPerColumn*3; y++){
          this.subGrid[x][y] = {x,y}
        }
      }

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

      this.iterations = 0
      this.start()
    }

    start(){
      this.stop()
      this.finished = false
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
    getSubTileAt(x,y){
      return this.subGrid[x][y]
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

    convertToSubTiles(){
      this.grid.forEach( cell => {
        for(let y = 0; y < 3; y++){
          for(let x = 0; x < 3; x++){
            let value = tilesConfig[cell.options[0]].subTiles[x+(y*3)]
            this.subGrid[ (cell.x*3) + x ][ (cell.y*3) + y ] = {...this.subGrid[ (cell.x*3) + x ][ (cell.y*3) + y ], value}
          }
        }
      })
    }

    update(){

      this.iterations += 1
        let gridCopy = this.grid.slice();
        gridCopy = gridCopy.filter((cell) => !cell.collapsed);

        if (gridCopy.length == 0) {
          console.log("finished");
          this.stop()
          this.finished = true
          setTimeout( () => {
            this.convertToSubTiles()
          },1)
          
          this.draw()
          setTimeout( () => {
            this.drawSubGrid()
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

    showProgress(){
      const percent = Math.floor((this.iterations/this.maxIterations)*100)
      if(this.finished) return
      const txt = "Progress: " + percent  + "%"
      this.ctx.fillStyle = "white"
      this.ctx.fillRect(15,15,200,50)
      this.ctx.font = "25px Arial"
      this.ctx.fillStyle = "black"
      this.ctx.fillText(txt, 45,50)
    }

    drawSubGrid(){
      for(let x = 0; x < this.tilesPerRow*3; x++){
        for(let y = 0; y < this.tilesPerColumn*3; y++){
          const subTile = this.subGrid[x][y]
          this.ctx.strokeStyle = "#777"
          this.ctx.lineWidth = 1
          this.ctx.strokeRect(subTile.x * this.subTileSize, subTile.y * this.subTileSize,this.subTileSize,this.subTileSize)
        }
      }
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.ctx.strokeStyle = "#333"
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.grid.forEach( cell => {
            if(cell.collapsed){
              let image = this.tiles[cell.options[0]].image
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
        this.showProgress()  
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