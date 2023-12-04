export type TileInfo = {
    name: string
    imgName: string
    edges: string[]
    weight: number
    subTiles: string[]
}

const tilesConfig: TileInfo[] = [
    {name:"empty", imgName:"empty", edges: [ "eee", "eee", "eee", "eee" ],
        weight: 100, subTiles:["empty","empty","empty","empty","empty","empty","empty","empty","empty"]},

    {name:"cross", imgName:"cross", edges: [ "brb", "brb", "brb", "brb" ],
        weight: 50, subTiles:["empty","vertical","empty","horizontal","cross","horizontal","empty","vertical","empty"]},

    {name:"vertical", imgName:"vertical", edges: [ "brb", "eee", "brb", "eee" ],
        weight: 500, subTiles:["empty","vertical","empty","empty","vertical","empty","empty","vertical","empty"]},

    {name:"horizontal", imgName:"horizontal", edges: [ "eee", "brb", "eee", "brb" ],
        weight: 500,subTiles:["empty","empty","empty","horizontal","horizontal","horizontal","empty","empty","empty"]},

    {name:"topT", imgName:"topT", edges: [ "brb", "brb", "eee", "brb" ],
        weight: 10, subTiles:["empty","vertical","empty","horizontal","topT","horizontal","empty","empty","empty"]},

    {name:"rightT", imgName:"rightT", edges: [ "brb", "brb", "brb", "eee" ],
        weight: 10, subTiles: ["empty","vertical","empty","empty","rightT","horizontal","empty","vertical","empty"]},

    {name:"bottomT", imgName:"bottomT", edges: [ "eee", "brb", "brb", "brb" ],
        weight: 10, subTiles: ["empty","empty","empty","horizontal","bottomT","horizontal","empty","vertical","empty"]},

    {name:"leftT", imgName:"leftT", edges: [ "brb", "eee", "brb", "brb" ],
        weight: 10,  subTiles: ["empty","vertical","empty","horizontal","leftT","empty","empty","vertical","empty"]},

    {name:"cornerTL", imgName:"cornerTL", edges: [ "brb", "eee", "eee", "brb" ],
        weight: 10,  subTiles: ["empty","vertical","empty","horizontal","cornerTL","empty","empty","empty","empty"]},

    {name:"cornerTR", imgName:"cornerTR", edges: [ "brb", "brb", "eee", "eee" ],
        weight: 10,  subTiles: ["empty","vertical","empty","empty","cornerTR","horizontal","empty","empty","empty"]},

    {name:"cornerBL",imgName: "cornerBL", edges: [ "eee", "eee", "brb", "brb" ],
        weight: 10,  subTiles: ["empty","empty","empty","horizontal","cornerBL","empty","empty","vertical","empty"]},

    {name:"cornerBR", imgName:"cornerBR", edges: [ "eee", "brb", "brb", "eee" ],
        weight: 10,  subTiles: ["empty","empty","empty","empty","cornerBR","horizontal","empty","vertical","empty"]},

    {name:"roundel", imgName: "", edges: [ "brb", "brb", "brb", "brb" ],
    weight: 1,  subTiles: ["cornerBR","topT","cornerBL","leftT","empty","rightT","cornerTR","bottomT","cornerTL"]}

]

export default tilesConfig