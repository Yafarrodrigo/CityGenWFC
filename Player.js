export default class Player{
    constructor(){
        this.x = 0
        this.y = 0
    }

    randomPosition(map){
        let tile = map.getRandomTile()
        console.log(tile.value);
        while(tile.value === "empty"){
            tile = map.getRandomTile()
            console.log(tile.value);
        }
        this.x = tile.x
        this.y = tile.y 
    }

    moveLeft(){ this.x -= 1 }
    moveRight(){ this.x += 1 }
    moveUp(){ this.y -= 1 }
    moveDown(){ this.y += 1 }

    checkForRoad(map, dir){
        let tile
        if(dir === "up"){
            tile = map.getSubTileAt(this.x, this.y - 1)
        }
        else if(dir === "down"){
            tile = map.getSubTileAt(this.x, this.y + 1)
        }
        else if(dir === "left"){
            tile = map.getSubTileAt(this.x - 1, this.y)
        }
        else if(dir === "right"){
            tile = map.getSubTileAt(this.x + 1, this.y)
        }
        return tile.value !== "empty"
    }
}