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
        
        this.currentState = "loading" // "loading","generating map", "selecting player pos", "playing"
        this.getRandomNum = mulberry32(seed)
        this.graphics = new Graphics(window.innerWidth,window.innerHeight)
        this.map = new Map(this, w,h)
        
        this.controls = new Controls()
        this.controls.createListeners(this)

        this.rightClickMenu = new Menu()
        this.timer = null
        this.speed = 16

        this.player = new Player()
    
        this.rightClickMenu.updateItems()
        this.rightClickMenu.updateOptions("item3")

        this.resetSave()
    }

    checkForSave(){
        const save = localStorage.getItem('savedGame')
        if(save){
            const savedState = JSON.parse(save)
            this.player.x = savedState.playerPos.x
            this.player.y = savedState.playerPos.y
            this.map.tiles = savedState.map
            this.currentState = "playing"
        }else{
            this.currentState = "generating map"
        }
    }

    saveState(){
        const currentState = {
            playerPos: {x:this.player.x,y:this.player.y},
            map: this.map.tiles
        }
        localStorage.setItem('savedGame', JSON.stringify(currentState))
    }

    resetSave(){
        localStorage.removeItem('savedGame')
    }

    start(){
        this.checkForSave()
        this.timer = setInterval(()=>{
            this.update()
        },this.speed)
    }

    update(){
        if(this.currentState === "generating map"){
            this.graphics.showProgress(this.map.mapGen.baseLayerIterations,this.map.mapGen.baseLayerMaxIterations)
            if(this.map.mapGen.finished){
                this.currentState = "selecting player pos"
            }
        }
        else if(this.currentState === "selecting player pos"){
            this.player.randomPosition(this)
            this.saveState()
            this.currentState = "playing"
        }
        else if(this.currentState === "playing"){
            this.graphics.update(this)
        }
    }
}

const wfc = new WFC(1000, 1000, Math.floor(Math.random()*1000))
wfc.start()
