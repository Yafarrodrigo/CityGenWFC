import Controls from "./Controls.js"
import Graphics from "./Graphics.js"
import Map from "./Map.js"
import Menu from "./Menu.js"
import Player from "./Player.js"

function mulberry32(a) {
    return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
}

class WFC {
    constructor(w,h, seed){
        this.getRandomNum = mulberry32(seed)
        this.map = new Map(w,h)
        this.graphics = new Graphics(window.innerWidth,window.innerHeight)
        this.controls = new Controls(this)
        this.rightClickMenu = new Menu()
        this.timer = null
        this.speed = 16

        window.addEventListener('click', (evt) => {
            const rect = this.graphics.canvas.getBoundingClientRect();
            const x = Math.floor((evt.clientX - rect.left - this.graphics.viewport.offset.x)/this.graphics.viewTileSize)
            const y = Math.floor((evt.clientY - rect.top - this.graphics.viewport.offset.y)/this.graphics.viewTileSize)
            console.log(this.map.getSubTileAt(x,y));
        })

        this.player = new Player()

        document.getElementById('controller').style.visibility = "hidden"
        this.rightClickMenu.updateItems()
        this.rightClickMenu.updateOptions("item3")
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

        const {viewTileSize} = this.graphics

        this.graphics.updateViewport(this, (this.player.x * viewTileSize), (this.player.y * viewTileSize))
        this.graphics.drawViewport(this)
    }
}

const wfc = new WFC(1000, 1000, 50)
wfc.generateMap()