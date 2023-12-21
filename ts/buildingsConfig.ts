export type buildingInfo = {
    id: string
    weight: number
    areas: {[key:string]:{min:number,max:number}}
}

const buildingsConfig: buildingInfo[] = [
    {
        id:"smallHouse",
        weight:100,
        areas:{
            livingRoom:{
                min: 0,
                max: 1
            },
            kitchen:{
                min: 1,
                max: 1
            },
            bathroom:{
                min: 1,
                max: 1
            },
            bedroom:{
                min: 1,
                max: 2
            },
            garden:{
                min: 0,
                max: 1
            },
            garage:{
                min: 0,
                max: 1
            }
        }
    },
    {
        id:"bigHouse",
        weight:100,
        areas:{
            livingRoom:{
                min: 1,
                max: 1
            },
            kitchen:{
                min: 1,
                max: 1
            },
            bathroom:{
                min: 1,
                max: 2
            },
            bedroom:{
                min: 2,
                max: 4
            },
            garden:{
                min: 1,
                max: 1
            },
            gardeningShack:{
                min: 0,
                max: 1
            },
            garage:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"clothingShop",
        weight:25,
        areas:{
            clothesStorageRoom:{
                min: 1,
                max: 1
            },
            toilet:{
                min: 0,
                max: 2
            },
            parking:{
                min: 0,
                max: 1
            },
            offices:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"toolsShop",
        weight:25,
        areas:{
            toolsStorageRoom:{
                min: 1,
                max: 1
            },
            toilet:{
                min: 0,
                max: 2
            },
            parking:{
                min: 0,
                max: 1
            },
            offices:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"mechanicShop",
        weight:25,
        areas:{
            mechanicStorage:{
                min: 1,
                max: 1
            },
            garage:{
                min: 1,
                max: 1
            },
            toilet:{
                min: 0,
                max: 2
            },
            offices:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"hospital",
        weight:1,
        areas:{
            toilet:{
                min: 4,
                max: 10
            },
            parking:{
                min: 1,
                max: 1
            },
            kitchen:{
                min: 1,
                max: 1
            },
            hospitalRoom:{
                min: 10,
                max: 50
            },
            operatingRoom:{
                min: 1,
                max: 5
            },
            pharmacy:{
                min: 1,
                max: 2
            },
            offices:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"policeStation",
        weight:1,
        areas:{
            cells:{
                min: 1,
                max: 5
            },
            armory:{
                min: 1,
                max: 1
            },
            toilet:{
                min: 1,
                max: 2
            },
            offices:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"fireStation",
        weight:1,
        areas:{
            toilet:{
                min: 1,
                max: 2
            },
            offices:{
                min: 1,
                max: 1
            },
            garage:{
                min: 1,
                max: 1
            },
            kitchen:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"park",
        weight:5,
        areas:{
            toilet:{
                min: 0,
                max: 2
            },
            kiosk:{
                min: 0,
                max: 2
            },
            gardeningShack:{
                min: 1,
                max: 1
            }
        }
    },
    {
        id:"gasStation",
        weight:0,
        areas:{
            toilet:{
                min: 2,
                max: 4
            },
            offices:{
                min: 1,
                max: 1
            },
            parking:{
                min: 1,
                max: 1
            },
            kitchen:{
                min: 1,
                max: 1
            },
            kiosk:{
                min: 1,
                max: 1
            }
        }
    }
]

export default buildingsConfig