const tilesConfig = [
    {name:"empty",img: `./images/empty.jpg`,edges: [ "eee", "eee", "eee", "eee" ],
        weight: 10, subTiles:["empty","empty","empty","empty","empty","empty","empty","empty","empty"]},

    {name:"cross",img: `./images/cross.jpg`,edges: [ "brb", "brb", "brb", "brb" ],
        weight: 25, subTiles:["empty","vertical","empty","horizontal","cross","horizontal","empty","vertical","empty"]},

    {name:"vertical",img: `./images/vertical.jpg`,edges: [ "brb", "eee", "brb", "eee" ],
        weight: 20, subTiles:["empty","vertical","empty","empty","vertical","empty","empty","vertical","empty"]},

    {name:"horizontal",img: `./images/horizontal.jpg`,edges: [ "eee", "brb", "eee", "brb" ],
        weight: 20,subTiles:["empty","empty","empty","horizontal","horizontal","horizontal","empty","empty","empty"]},

    {name:"topT",img: `./images/topT.jpg`,edges: [ "brb", "brb", "eee", "brb" ],
        weight: 1, subTiles:["empty","vertical","empty","horizontal","topT","horizontal","empty","empty","empty"]},

    {name:"rightT",img: `./images/rightT.jpg`,edges: [ "brb", "brb", "brb", "eee" ],
        weight: 1, subTiles: ["empty","vertical","empty","empty","rightT","horizontal","empty","vertical","empty"]},

    {name:"bottomT",img: `./images/bottomT.jpg`,edges: [ "eee", "brb", "brb", "brb" ],
        weight: 1, subTiles: ["empty","empty","empty","horizontal","bottomT","horizontal","empty","vertical","empty"]},

    {name:"leftT",img: `./images/leftT.jpg`,edges: [ "brb", "eee", "brb", "brb" ],
        weight: 1,  subTiles: ["empty","vertical","empty","horizontal","leftT","empty","empty","vertical","empty"]},

    {name:"cornerTL",img: `./images/cornerTL.jpg`,edges: [ "brb", "eee", "eee", "brb" ],
        weight: 1,  subTiles: ["empty","vertical","empty","horizontal","cornerTL","empty","empty","empty","empty"]},

    {name:"cornerTR",img: `./images/cornerTR.jpg`,edges: [ "brb", "brb", "eee", "eee" ],
        weight: 1,  subTiles: ["empty","vertical","empty","empty","cornerTR","horizontal","empty","empty","empty"]},

    {name:"cornerBL",img: `./images/cornerBL.jpg`,edges: [ "eee", "eee", "brb", "brb" ],
        weight: 1,  subTiles: ["empty","empty","empty","horizontal","cornerBL","empty","empty","vertical","empty"]},

    {name:"cornerBR",img: `./images/cornerBR.jpg`,edges: [ "eee", "brb", "brb", "eee" ],
        weight: 1,  subTiles: ["empty","empty","empty","empty","cornerBR","horizontal","empty","vertical","empty"]}

]

export default tilesConfig