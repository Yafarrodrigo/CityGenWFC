export default class Player{
    constructor(){
        this.x = 0
        this.y = 0
    }

    randomPosition(game){
        let tile = game.map.getRandomTile(game.getRandomNum)
        while(tile.value === "empty"){
            tile = game.map.getRandomTile(game.getRandomNum)
        }
        this.x = tile.x
        this.y = tile.y 
    }

    moveLeft(){ this.x -= 1 }
    moveRight(){ this.x += 1 }
    moveUp(){ this.y -= 1 }
    moveDown(){ this.y += 1 }

    checkForRoad(map, dir){
        let tile = null
        if(dir === "up"){
            tile = map.getTileAt(this.x, this.y - 1)
        }
        else if(dir === "down"){
            tile = map.getTileAt(this.x, this.y + 1)
        }
        else if(dir === "left"){
            tile = map.getTileAt(this.x - 1, this.y)
        }
        else if(dir === "right"){
            tile = map.getTileAt(this.x + 1, this.y)
        }
        if(tile === false) return false
        if(tile.value !== "empty") return true
        else return false
    }
}