export default class Controls{
    constructor(game){

        this.game = game
        this.defaultSettings = {
            weights: {
                empty: 10,
                cross: 25,
                horizontal: 20,
                vertical: 20,
                corner: 1,
                t: 1
            },
            speed: 16
        }

        this.UP = false
        this.RIGHT = false
        this.DOWN = false
        this.LEFT = false

        this.emptySlider = document.getElementById("emptyTileWeight")
        this.crossSlider = document.getElementById("crossTileWeight")
        this.horizontalSlider = document.getElementById("horizontalTileWeight")
        this.verticalSlider = document.getElementById("verticalTileWeight")
        this.cornersSlider = document.getElementById("cornersTileWeight")
        this.tSlider = document.getElementById("tTileWeight")
        this.speedSlider = document.getElementById("gameSpeed")

        this.emptySlider.value = this.emptySlider.nextElementSibling.value = this.defaultSettings.weights.empty
        this.crossSlider.value = this.crossSlider.nextElementSibling.value = this.defaultSettings.weights.cross
        this.horizontalSlider.value = this.horizontalSlider.nextElementSibling.value = this.defaultSettings.weights.horizontal
        this.verticalSlider.value = this.verticalSlider.nextElementSibling.value = this.defaultSettings.weights.vertical
        this.cornersSlider.value = this.cornersSlider.nextElementSibling.value = this.defaultSettings.weights.corner
        this.tSlider.value = this.tSlider.nextElementSibling.value = this.defaultSettings.weights.t
        this.speedSlider.value = this.speedSlider.nextElementSibling.value = this.defaultSettings.speed

        document.getElementById('generateButton').addEventListener('click', (e) => {
            e.preventDefault()
            this.handleGenerateButton()
          })
      
        document.getElementById('gameSpeed').addEventListener('change', (e) => {
            e.preventDefault()
            this.handleChangeSpeedSlider(e)
        })

        this.dragElement(document.getElementById('controller'))

        document.addEventListener('keydown', (e) => {
          switch (e.key) {
              case "A":
              case "a":
                  this.LEFT = true
                  break;
              case "D":
              case "d":
                  this.RIGHT = true
                  break;
              case "W":
              case "w":
                  this.UP = true
                  break;
              case "S":
              case "s":
                  this.DOWN = true
                  break;
          }
      })
      document.addEventListener('keyup', (e) => {
          switch (e.key) {
              case "A":
              case "a":
                  this.LEFT = false
                  break;
              case "D":
              case "d":
                  this.RIGHT = false
                  break;
              case "W":
              case "w":
                  this.UP = false
                  break;
              case "S":
              case "s":
                  this.DOWN = false
                  break;
          }
      })
    }

    changeSpeed(newSpeed){
        this.game.speed = newSpeed
        if(this.game.timer) clearInterval(this.game.timer)
        this.game.timer = setInterval(()=>{
          this.game.update()
          this.game.graphics.draw(this.game)
        }, this.game.speed)
      }

    handleChangeSpeedSlider(e){
        e.preventDefault()
        this.changeSpeed(parseInt(e.target.value))
      }
  
    handleGenerateButton(){
        this.game.stop()
        const newEmptyWeight = this.emptySlider.value
        const newCrossWeight = this.crossSlider.value
        const newHorizontalTileWeight = this.horizontalSlider.value
        const newVerticalTileWeight = this.verticalSlider.value
        const newCornersTileWeight = this.cornersSlider.value
        const newTTileWeight = this.tSlider.value

        this.game.map.baseTiles[0].weight = newEmptyWeight
        this.game.map.baseTiles[1].weight = newCrossWeight
        this.game.map.baseTiles[2].weight = newVerticalTileWeight
        this.game.map.baseTiles[3].weight = newHorizontalTileWeight
        this.game.map.baseTiles[4].weight = newTTileWeight
        this.game.map.baseTiles[5].weight = newTTileWeight
        this.game.map.baseTiles[6].weight = newTTileWeight
        this.game.map.baseTiles[7].weight = newTTileWeight
        this.game.map.baseTiles[8].weight = newCornersTileWeight
        this.game.map.baseTiles[9].weight = newCornersTileWeight
        this.game.map.baseTiles[10].weight = newCornersTileWeight
        this.game.map.baseTiles[11].weight = newCornersTileWeight

        this.game.map.iterations = 0
        this.game.start()
    }

    dragElement(elmnt) {
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
}