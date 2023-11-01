const tilesConfig = [
    {name:"empty",edges: [ "eee", "eee", "eee", "eee" ],
        weight: 50, subTiles:["empty","empty","empty","empty","empty","empty","empty","empty","empty"]},

    {name:"cross",edges: [ "brb", "brb", "brb", "brb" ],
        weight: 5, subTiles:["empty","vertical","empty","horizontal","cross","horizontal","empty","vertical","empty"]},

    {name:"vertical",edges: [ "brb", "eee", "brb", "eee" ],
        weight: 50, subTiles:["empty","vertical","empty","empty","vertical","empty","empty","vertical","empty"]},

    {name:"horizontal",edges: [ "eee", "brb", "eee", "brb" ],
        weight: 50,subTiles:["empty","empty","empty","horizontal","horizontal","horizontal","empty","empty","empty"]},

    {name:"topT",edges: [ "brb", "brb", "eee", "brb" ],
        weight: 1, subTiles:["empty","vertical","empty","horizontal","topT","horizontal","empty","empty","empty"]},

    {name:"rightT",edges: [ "brb", "brb", "brb", "eee" ],
        weight: 1, subTiles: ["empty","vertical","empty","empty","rightT","horizontal","empty","vertical","empty"]},

    {name:"bottomT",edges: [ "eee", "brb", "brb", "brb" ],
        weight: 1, subTiles: ["empty","empty","empty","horizontal","bottomT","horizontal","empty","vertical","empty"]},

    {name:"leftT",edges: [ "brb", "eee", "brb", "brb" ],
        weight: 1,  subTiles: ["empty","vertical","empty","horizontal","leftT","empty","empty","vertical","empty"]},

    {name:"cornerTL",edges: [ "brb", "eee", "eee", "brb" ],
        weight: 1,  subTiles: ["empty","vertical","empty","horizontal","cornerTL","empty","empty","empty","empty"]},

    {name:"cornerTR",edges: [ "brb", "brb", "eee", "eee" ],
        weight: 1,  subTiles: ["empty","vertical","empty","empty","cornerTR","horizontal","empty","empty","empty"]},

    {name:"cornerBL",edges: [ "eee", "eee", "brb", "brb" ],
        weight: 1,  subTiles: ["empty","empty","empty","horizontal","cornerBL","empty","empty","vertical","empty"]},

    {name:"cornerBR",edges: [ "eee", "brb", "brb", "eee" ],
        weight: 1,  subTiles: ["empty","empty","empty","empty","cornerBR","horizontal","empty","vertical","empty"]}

]

export default tilesConfig