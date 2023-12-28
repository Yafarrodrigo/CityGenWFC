import buildingsConfig from "../buildingsConfig.js"
import Game from "../index.js"

export default class Building{

    id: string
    areas: {id:string, qty:number}[]
    entrances:{id: string, status:"open"|"locked"|"broken"|"reinforced", qty:number}[]

    constructor(game: Game,id:string){
        this.id = id
        this.areas = []
        this.entrances = []

        const allBuildings = buildingsConfig.find(b => b.id === id)
        if(allBuildings){
            allBuildings.areas.forEach(area => {
                const rndNum = Math.floor(game.getRandomNum()*(area.max - area.min + 1 ) + area.min)
                if(rndNum > 0) this.areas.push({id: area.id, qty: rndNum})
            });
            allBuildings.entrances.forEach(e => {
                const rndNum = Math.floor(game.getRandomNum()*(e.max - e.min + 1 ) + e.min)
                if(rndNum > 0) this.entrances.push({id: e.id, qty: rndNum, status:"locked"})
            });
        }

        console.log(this);
        
    }
}