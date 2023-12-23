type ItemInfo = {
    id: string
    name: string
    desc: string
    tags: string[]
    size: "small" | "normal" | "big" | "giant"
    type: "tool" | "food" | "medicine" | "weapon" | "clothing" | "ammo" | "material"
    canBeCrafted: boolean
    canBeFound: boolean
    weight: number
}


const itemsConfig: {[key:string]: ItemInfo} = {
    shovel: {
        id: "shovel",
        name: "shovel",
        desc: "a shovel",
        tags: ["melee", "sharp", "construction"],
        size: "normal",
        type: "tool",
        weight: 2000,
        canBeCrafted: false,
        canBeFound: true
    }
}

export default itemsConfig