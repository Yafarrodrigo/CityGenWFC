import itemsConfig from "../itemsConfig.js";
import Item from "./Item.js";

export default class Inventory {

    items: {[key:string]:{
        data: Item,
        qty: number
    }}
    weight: number
    maxWeight: number

    constructor(){  
        this.items = {}
        this.weight = 0
        this.maxWeight = 10000
    }

    changeWeight(qty:number){

        const totalWeight = this.weight + qty

        if(totalWeight >= this.maxWeight) this.weight = this.maxWeight
        else if (totalWeight <= 0) this.weight = 0
        else this.weight = totalWeight
    }

    checkForWeight(id:string,qty:number){
        const totalWeight = itemsConfig[id].weight * qty
        if(this.weight + totalWeight <= this.maxWeight) return true
        else return false
    }

    addItem(id:string, qty: number){
        if(!this.items[id]){
            if(this.checkForWeight(id,qty) === false) return
            this.items[id] = {
                data: new Item(id),
                qty: qty
            }
            this.changeWeight(itemsConfig[id].weight * qty)
        }else{
            this.items[id].qty += qty
        }
    }

    removeItem(id:string, qty: number){
        if(!this.items[id]){
            return
        }else{
            if(this.items[id].qty - qty > 0){
                this.items[id].qty -= qty
            }else{
                delete this.items[id]
            }
        }
        this.changeWeight(-itemsConfig[id].weight * qty)
    }
}