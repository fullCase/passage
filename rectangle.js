export class Rectangle{
    Color = 'black';
    StrokeColor = 'red';
    Stroke = 0;
    
    constructor(ctx, pos_x = 0, pos_y = 0, size_x = 0, size_y = 0){
        this.ctx = ctx;
        this.x = pos_x;
        this.y = pos_y;
        this.sizeX = size_x;
        this.sizeY = size_y;
    }

    random = (a, b = 0) => {
        return Math.floor(Math.random() * a + b);
    }

    ////////////////////////////////////////////////////

    getPositionX = () => {
        return this.x;
    }

    getPositionY = () => {
        return this.y;
    }

    getSizeX = () => {
        return this.sizeX;
    }

    getSizeY = () => {
        return this.sizeY;
    }

    getStrokeSize = () => {
        return this.Stroke;
    }

    getStrokeColor = () => {
        return this.StrokeColor;
    }

    getColor(){
       return this.Color;
    }

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    changePositionX = (x) => {
        this.x = x;
    }

    changePositionY = (y) => {
        this.y = y;
    }

    changeSizeX = (x) => {
        this.sizeX = x;
    }

    changeSizeY = (y) => {
        this.sizeY = y;
    }

    changeStrokeSize = (size) => {
        this.Stroke = size;
    }

    changeStrokeColor = (color) => {
        this.StrokeColor = color;
    }

    changeColor(color){
        this.Color = color;
    }

    checkClick(x, y){
        if(x > this.x  && x < this.x + this.sizeX && y >  this.y && y < this.y + this.sizeY)
            return true;
        return false;
    }

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    clear = () =>{
        this.ctx.clearRect(this.x, this.y, this.sizeX, this.sizeY);
    }

    draw(){
        this.ctx.fillStyle = this.Color;
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);

        if(this.Stroke > 0){
            this.ctx.lineWidth = this.Stroke;
            this.ctx.strokeStyle = this.StrokeColor;
            this.ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
        }
        
    }
}