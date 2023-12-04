export default class Menu {
    menuContainer: HTMLDivElement
    itemsContainer: HTMLDivElement
    optionsContainer: HTMLDivElement
    menuInfo: {
        [key:string]: {order: number,text:string,options:{[key:string]:{text:string,value:string}}}
    }
    currentItem:{order: number,text:string,options:{[key:string]:{text:string,value:string}}}
    constructor(){
        this.menuContainer = document.createElement('div')
        this.menuContainer.id = "menuContainer"
        this.itemsContainer = document.createElement('div')
        this.itemsContainer.id = "menuItemsContainer"
        this.optionsContainer = document.createElement('div')
        this.optionsContainer.id = "menuOptionsContainer"
        this.menuContainer.append(this.itemsContainer,this.optionsContainer)
        document.body.append(this.menuContainer)

        this.menuContainer.style.display = "none"
        this.menuContainer.addEventListener('mouseleave',()=>{
            this.menuContainer.style.display = "none"
        })
        const canvas = (document.getElementById('canvas') as HTMLCanvasElement)
        canvas.addEventListener('contextmenu', (e:MouseEvent) => {
            e.preventDefault()
            this.menuContainer.style.display = "flex"
            this.menuContainer.style.top = e.clientY - 20 +"px"
            this.menuContainer.style.left = e.clientX - 20 +"px"
        })

        this.menuInfo = {
            item1: {
                order: 0,
                text: "item 1",
                options: {}
            },
            item2: {
                order: 1,
                text: "item 2",
                options: {opt1: {text: "2-1",value: "asdasd"}, opt2: {text: "2-2",value: "asdasd"}}
            },
            item3: {
                order: 2,
                text: "item 3",
                options: {opt1: {text: "3-1",value:"asdasd"},opt2: {text: "3-2",value:"asdasd"}, opt3: {text: "3-3",value:"asdasd"},opt4: {text: "3-4",value:"asdasd"},opt5: {text: "3-5",value:"asdasd"},opt6: {text: "3-6",value:"asdasd"}}
            },
            item4: {
                order: 3,
                text: "item 5",
                options: {opt1: {text: "4-1",value:"asdasd"},opt2: {text: "4-2",value:"asdasd"},opt3: {text: "4-3",value:"asdasd"},opt4: {text: "4-4",value:"asdasd"}}
            }
        }
        this.currentItem = this.menuInfo[Object.keys(this.menuInfo)[0]]
    }

    changeMenuInfo(newInfo:{[key:string]: {order: number,text:string,options:{[key:string]:{text:string,value:string}}}}){
        this.menuInfo = newInfo
        this.currentItem = this.menuInfo[Object.keys(newInfo)[0]]
    }

    updateItems(){
        this.itemsContainer.innerHTML = ""
        for(let item in this.menuInfo){
            const itemText = this.menuInfo[item].text

            const newItem = document.createElement('div')
            newItem.classList.add("menuItem")
            newItem.id = item
            newItem.innerText = itemText
            if(Object.keys(this.menuInfo[item].options).length === 0){
                newItem.style.cursor = "pointer"
            }else{
                newItem.style.cursor = "initial"
            }
            newItem.addEventListener('mouseover', (e:MouseEvent) => {
                if (e.target instanceof Element){
                    this.currentItem = this.menuInfo[e.target.id]
                    this.updateOptions()
                }
            })

            this.itemsContainer.append(newItem)
        }        
    }

    updateOptions(){
        this.optionsContainer.innerHTML = ""
    
        for(let opt in this.currentItem.options){
            const option = this.currentItem.options[opt]
            const newOption = document.createElement('div')
            newOption.classList.add("menuItem")
            newOption.innerText = option.text
            newOption.id = opt
            newOption.style.cursor = "pointer"
            newOption.addEventListener('click', (e) => {
                if(e.target instanceof Element){
                    console.log(this.currentItem.options[e.target.id]);
                    this.menuContainer.style.display = "none"
                }
            })
            this.optionsContainer.append(newOption)
        }
        this.optionsContainer.style.marginTop = this.currentItem.order * 40 + "px"
    }
}