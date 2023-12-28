export type buildingInfo = {
    id: string
    weight: number
    areas: {id:string,min:number,max:number}[]
    entrances:{id: string, min:number, max:number}[]
}

const buildingsConfig: buildingInfo[] = [
    {
        id:"smallHouse",
        weight:100,
        areas:[
            {id:"livingRoom",min: 0,max: 1},
            {id:"kitchen",min: 1,max: 1},
            {id:"bathroom",min: 1,max: 1},
            {id:"bedroom",min: 1,max: 2},
            {id:"garden",min: 0,max: 1},
            {id:"garage",min: 0,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 1},
            {id: "backDoor", min: 0, max: 1},
            {id: "garageDoor", min: 0, max: 1},
            {id: "smallWindow", min: 1, max: 8},
            {id: "largeWindow", min: 0, max: 1},
        ]
    },
    {
        id:"bigHouse",
        weight:100,
        areas:[
            {id:"livingRoom",min: 1,max: 1},
            {id:"kitchen",min: 1,max: 1},
            {id:"bathroom",min: 1,max: 2},
            {id:"bedroom",min: 2,max: 4},
            {id:"garden",min: 1,max: 1},
            {id:"gardeningShack",min: 0,max: 1},
            {id:"garage",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 1},
            {id: "backDoor", min: 1, max: 1},
            {id: "garageDoor", min: 1, max: 1},
            {id: "smallWindow", min: 1, max: 12},
            {id: "largeWindow", min: 0, max: 4}
        ]
    },
    {
        id:"clothingShop",
        weight:25,
        areas:[
            {id:"clothesStorageRoom",min: 1,max: 1},
            {id:"toilet",min: 0,max: 2},
            {id:"parking",min: 0,max: 1},
            {id:"offices",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 1},
            {id: "backDoor", min: 0, max: 1},
            {id: "smallWindow", min: 0, max: 2},
            {id: "largeWindow", min: 1, max: 1}
        ]
    },
    {
        id:"toolsShop",
        weight:25,
        areas:[
            {id:"toolsStorageRoom",min: 1,max: 1},
            {id:"toilet",min: 0,max: 2},
            {id:"parking",min: 0,max: 1},
            {id:"offices",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 1},
            {id: "backDoor", min: 0, max: 1},
            {id: "smallWindow", min: 0, max: 2},
            {id: "largeWindow", min: 1, max: 1}
        ]
    },
    {
        id:"mechanicShop",
        weight:25,
        areas:[
            {id:"mechanicStorage",min: 1,max: 1},
            {id:"garage",min: 1,max: 1},
            {id:"toilet",min: 0,max: 2},
            {id:"offices",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 1},
            {id: "backDoor", min: 0, max: 1},
            {id: "smallWindow", min: 0, max: 2},
            {id: "largeWindow", min: 1, max: 1}
        ]
    },
    {
        id:"hospital",
        weight:1,
        areas:[
            {id:"toilet",min: 4,max: 10},
            {id:"parking",min: 1,max: 1},
            {id:"kitchen",min: 1,max: 1},
            {id:"hospitalRoom",min: 10,max: 50},
            {id:"operatingRoom",min: 1,max: 5},
            {id:"pharmacy",min: 1,max: 2},
            {id:"offices",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 2},
            {id: "backDoor", min: 1, max: 1},
            {id: "garageDoor", min: 1, max: 1},
            {id: "smallWindow", min: 4, max: 12},
            {id: "largeWindow", min: 1, max: 2}
        ]
    },
    {
        id:"policeStation",
        weight:1,
        areas:[
            {id:"cells",min: 1,max: 5},
            {id:"armory",min: 1,max: 1},
            {id:"toilet",min: 1,max: 2},
            {id:"offices",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 2},
            {id: "backDoor", min: 0, max: 1},
            {id: "smallWindow", min: 1, max: 4},
            {id: "largeWindow", min: 0, max: 1}
        ]
    },
    {
        id:"fireStation",
        weight:1,
        areas:[
            {id:"toilet",min: 1,max: 2},
            {id:"offices",min: 1,max: 1},
            {id:"garage",min: 1,max: 1},
            {id:"kitchen",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 1},
            {id: "backDoor", min: 1, max: 1},
            {id: "garageDoor", min: 1, max: 2},
            {id: "smallWindow", min: 2, max: 6},
            {id: "largeWindow", min: 0, max: 1}
        ]
    },
    {
        id:"park",
        weight:5,
        areas:[
            {id:"toilet",min: 0,max: 2},
            {id:"kiosk",min: 0,max: 2},
            {id:"gardeningShack",min: 1,max: 1}
        ],
        entrances:[]
    },
    {
        id:"gasStation",
        weight:0,
        areas:[
            {id:"toilet",min: 2,max: 4},
            {id:"offices",min: 1,max: 1},
            {id:"parking",min: 1,max: 1},
            {id:"kitchen",min: 1,max: 1},
            {id:"kiosk",min: 1,max: 1}
        ],
        entrances:[
            {id: "frontDoor", min: 1, max: 2},
            {id: "backDoor", min: 1, max: 1},
            {id: "smallWindow", min: 1, max: 4},
            {id: "largeWindow", min: 1, max: 2}
        ]
    }
]

export default buildingsConfig