export default class Tile{
    x:number
    y:number
    value: string
    img: string
    building: string | null
    constructor(x:number,y:number,value:string,img:string,building:string|null){
        this.x = x,
        this.y = y,
        this.value = value
        this.img = img
        this.building = building
        // house, departments, shop,
        // hospital, gasStation, policeStation,
        // fireStation, park,
    }   
}