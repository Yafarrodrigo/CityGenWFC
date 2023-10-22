const tilesConfig = [
    {name:"empty",img: `./images/empty.jpg`,edges: [ "eee", "eee", "eee", "eee" ],weight: 10, subTiles:["empty","empty","empty","empty","empty","empty","empty","empty","empty"]},
    {name:"cross",img: `./images/cross.jpg`,edges: [ "brb", "brb", "brb", "brb" ],weight: 50, subTiles:["empty","road","empty","road","road","road","empty","road","empty"]},
    {name:"vertical",img: `./images/vertical.jpg`,edges: [ "brb", "eee", "brb", "eee" ],weight: 1, subTiles:["empty","road","empty","empty","road","empty","empty","road","empty"]},
    {name:"horizontal",img: `./images/horizontal.jpg`,edges: [ "eee", "brb", "eee", "brb" ],weight: 1,subTiles:["empty","empty","empty","road","road","road","empty","empty","empty"]},
    {name:"topT",img: `./images/topT.jpg`,edges: [ "brb", "brb", "eee", "brb" ],weight: 1, subTiles:["empty","road","empty","road","road","road","empty","empty","empty"]},
    {name:"rightT",img: `./images/rightT.jpg`,edges: [ "brb", "brb", "brb", "eee" ],weight: 1, subTiles: ["empty","road","empty","empty","road","road","empty","road","empty"]},
    {name:"bottomT",img: `./images/bottomT.jpg`,edges: [ "eee", "brb", "brb", "brb" ],weight: 1, subTiles: ["empty","empty","empty","road","road","road","empty","road","empty"]},
    {name:"leftT",img: `./images/leftT.jpg`,edges: [ "brb", "eee", "brb", "brb" ],weight: 1,  subTiles: ["empty","road","empty","road","road","empty","empty","road","empty"]},
    {name:"cornerTL",img: `./images/cornerTL.jpg`,edges: [ "brb", "eee", "eee", "brb" ],weight: 1,  subTiles: ["empty","road","empty","road","road","empty","empty","empty","empty"]},
    {name:"cornerTR",img: `./images/cornerTR.jpg`,edges: [ "brb", "brb", "eee", "eee" ],weight: 1,  subTiles: ["empty","road","empty","empty","road","road","empty","empty","empty"]},
    {name:"cornerBL",img: `./images/cornerBL.jpg`,edges: [ "eee", "eee", "brb", "brb" ],weight: 1,  subTiles: ["empty","empty","empty","road","road","empty","empty","road","empty"]},
    {name:"cornerBR",img: `./images/cornerBR.jpg`,edges: [ "eee", "brb", "brb", "eee" ],weight: 1,  subTiles: ["empty","empty","empty","empty","road","road","empty","road","empty"]}
]

export default tilesConfig