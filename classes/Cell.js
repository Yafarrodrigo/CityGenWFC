export default class Cell {
    constructor(x,y,value) {
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
  