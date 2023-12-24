import Inventory from "./Inventory.js"

export default class Equipment{

    head: string
    mask: string
    eyes: string
    neck: string
    chest: string
    waist: string
    legs: string
    feet: string
    hands: string
    backpack: string
    inventory: Inventory

    constructor(){
        this.head = ""
        this.mask = ""
        this.eyes = ""
        this.neck = ""
        this.chest = ""
        this.waist = ""
        this.legs = ""
        this.feet = ""
        this.hands = ""
        this.backpack = ""
        this.inventory = new Inventory()
    }
}