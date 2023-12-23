import itemsConfig from "../itemsConfig.js"

export default class Item{

    id: string
    durability: number
    name: string
    desc: string
    tags: string[]
    weight: number
    canBeCrafted: boolean
    canBeFound: boolean
    size: "small" | "normal" | "big" | "giant"
    type: "tool" | "food" | "medicine" | "weapon" | "clothing" | "ammo" | "material"

    constructor(id:string){
        this.id = id
        this.type = itemsConfig[id].type
        this.name =  itemsConfig[id].name,
        this.desc =  itemsConfig[id].desc,
        this.tags =  itemsConfig[id].tags,
        this.size =  itemsConfig[id].size,
        this.type =  itemsConfig[id].type,
        this.weight = itemsConfig[id].weight

        this.canBeCrafted = itemsConfig[id].canBeCrafted
        this.canBeFound = itemsConfig[id].canBeFound
        this.durability = Math.random()
    }
}