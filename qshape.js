export class Shape{
    strokeColor = undefined;
    strokeSize = 0;
    constructor(ctx, color = 'black', pos_x = 0, pos_y = 0, s_x = 0, s_y = 0){
        this.ctx = ctx;
        this.color = color;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.s_x  = s_x;
        this.s_y  = s_y;
    }

    setNewPos(newX, newY){
        this.pos_x = newX;
        this.pos_y = newY;
    }  
    
    setNewSide(newX, newY){
        this.s_x = newX;
        this.s_y = newY;
    }  

    setStroke(color, size){
        this.strokeColor = color;
        this.strokeSize = size;
    }

    setColor(newColor){
        this.color = newColor;
    }

    draw(){
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.strokeSize;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.pos_x - this.strokeSize / 2, this.pos_y);
        this.ctx.lineTo(this.pos_x + this.s_x, this.pos_y);
        this.ctx.lineTo(this.pos_x + this.s_x, this.pos_y + this.s_y);
        this.ctx.lineTo(this.pos_x ,this.pos_y + this.s_y);
        this.ctx.lineTo(this.pos_x ,this.pos_y);
        this.ctx.fill();
        if(this.strokeColor != undefined) this.ctx.stroke();
        this.ctx.closePath();
    }
}

