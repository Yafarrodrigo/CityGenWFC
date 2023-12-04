export default class Cell {
    x: number
    y: number
    collapsed: boolean
    options: number[]
    constructor(x: number,y: number,value: number|number[]) {
        this.x = x
        this.y = y
        this.collapsed = false;

        if (value instanceof Array) {
            this.options = value;
        } else {
        this.options = [];
            for (let i = 0; i < value; i++) {
            this.options[i] = i;
        }}
    }
}
  