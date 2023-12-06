export type buildingInfo = {
    name: string
    weight: number
}

const buildingsConfig: buildingInfo[] = [
    {name:"houses",weight:100},
    {name:"departments",weight:10},
    {name:"shop",weight:25},
    {name:"hospital",weight:1},
    {name:"policeStation",weight:1},
    {name:"fireStation",weight:1},
    {name:"park",weight:5}
]

export default buildingsConfig