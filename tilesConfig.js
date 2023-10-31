const tilesConfig = [
    {name:"empty",img: `./images/empty.jpg`,edges: [ "eee", "eee", "eee", "eee" ],
        weight: 50, subTiles:["sub_empty","sub_empty","sub_empty","sub_empty","sub_empty","sub_empty","sub_empty","sub_empty","sub_empty"]},

    {name:"cross",img: `./images/cross.jpg`,edges: [ "brb", "brb", "brb", "brb" ],
        weight: 5, subTiles:["sub_empty","sub_vertical","sub_empty","sub_horizontal","sub_cross","sub_horizontal","sub_empty","sub_vertical","sub_empty"]},

    {name:"vertical",img: `./images/vertical.jpg`,edges: [ "brb", "eee", "brb", "eee" ],
        weight: 50, subTiles:["sub_empty","sub_vertical","sub_empty","sub_empty","sub_vertical","sub_empty","sub_empty","sub_vertical","sub_empty"]},

    {name:"horizontal",img: `./images/horizontal.jpg`,edges: [ "eee", "brb", "eee", "brb" ],
        weight: 50,subTiles:["sub_empty","sub_empty","sub_empty","sub_horizontal","sub_horizontal","sub_horizontal","sub_empty","sub_empty","sub_empty"]},

    {name:"topT",img: `./images/topT.jpg`,edges: [ "brb", "brb", "eee", "brb" ],
        weight: 1, subTiles:["sub_empty","sub_vertical","sub_empty","sub_horizontal","sub_topT","sub_horizontal","sub_empty","sub_empty","sub_empty"]},

    {name:"rightT",img: `./images/rightT.jpg`,edges: [ "brb", "brb", "brb", "eee" ],
        weight: 1, subTiles: ["sub_empty","sub_vertical","sub_empty","sub_empty","sub_rightT","sub_horizontal","sub_empty","sub_vertical","sub_empty"]},

    {name:"bottomT",img: `./images/bottomT.jpg`,edges: [ "eee", "brb", "brb", "brb" ],
        weight: 1, subTiles: ["sub_empty","sub_empty","sub_empty","sub_horizontal","sub_bottomT","sub_horizontal","sub_empty","sub_vertical","sub_empty"]},

    {name:"leftT",img: `./images/leftT.jpg`,edges: [ "brb", "eee", "brb", "brb" ],
        weight: 1,  subTiles: ["sub_empty","sub_vertical","sub_empty","sub_horizontal","sub_leftT","sub_empty","sub_empty","sub_vertical","sub_empty"]},

    {name:"cornerTL",img: `./images/cornerTL.jpg`,edges: [ "brb", "eee", "eee", "brb" ],
        weight: 1,  subTiles: ["sub_empty","sub_vertical","sub_empty","sub_horizontal","sub_cornerTL","sub_empty","sub_empty","sub_empty","sub_empty"]},

    {name:"cornerTR",img: `./images/cornerTR.jpg`,edges: [ "brb", "brb", "eee", "eee" ],
        weight: 1,  subTiles: ["sub_empty","sub_vertical","sub_empty","sub_empty","sub_cornerTR","sub_horizontal","sub_empty","sub_empty","sub_empty"]},

    {name:"cornerBL",img: `./images/cornerBL.jpg`,edges: [ "eee", "eee", "brb", "brb" ],
        weight: 1,  subTiles: ["sub_empty","sub_empty","sub_empty","sub_horizontal","sub_cornerBL","sub_empty","sub_empty","sub_vertical","sub_empty"]},

    {name:"cornerBR",img: `./images/cornerBR.jpg`,edges: [ "eee", "brb", "brb", "eee" ],
        weight: 1,  subTiles: ["sub_empty","sub_empty","sub_empty","sub_empty","sub_cornerBR","sub_horizontal","sub_empty","sub_vertical","sub_empty"]}

]

export default tilesConfig