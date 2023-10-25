import Controls from "./Controls.js"
import Graphics from "./Graphics.js"
import Map from "./Map.js"

class WFC {
    constructor(w,h){
        this.map = new Map(w,h, 150)
        this.graphics = new Graphics(w,h)
        this.controls = new Controls(this)
        this.timer = null
        this.speed = 16

        window.addEventListener('click', (evt) => {
            const rect = this.graphics.canvas.getBoundingClientRect();
            const x = Math.floor((evt.clientX - rect.left - this.graphics.viewport.offset.x)/this.graphics.viewTileSize)
            const y = Math.floor((evt.clientY - rect.top - this.graphics.viewport.offset.y)/this.graphics.viewTileSize)
            console.log(this.map.getSubTileAt(x,y));
        })

        this.player = {
            x: 0,
            y: 0
        }

        document.getElementById('controller').style.visibility = "hidden"
    }

    generateMap(){
        this.finished = false
        this.map.populateBaseLayer()
        while(this.finished === false){
            this.map.processBaseLayer(this)
            this.graphics.draw(this)
        }
        this.timer = setInterval(()=>{
            this.update()
        },this.speed)
    }

    update(){

        if(this.controls.RIGHT) this.player.x += 5
        if(this.controls.LEFT) this.player.x -= 5
        if(this.controls.UP) this.player.y -= 5
        if(this.controls.DOWN) this.player.y += 5

        this.graphics.updateViewport(this, this.player.x, this.player.y)
        this.graphics.drawViewport(this)
    }
}

const wfc = new WFC(window.innerWidth, window.innerHeight)
wfc.generateMap()