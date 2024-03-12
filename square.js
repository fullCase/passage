import {Shape} from "./shape.js";
export class Square extends Shape{
    colorTab = ['red', 'blue', 'green', 'purple'];
    constructor(ctx, side, colorNum, figureNum){
        super(ctx, undefined, 0, 0, side, side);
        this.side = side;
        this.colorNum = colorNum;
        this.figureNum = figureNum;
        console.log(this.figureNum);
    }

    colorSetUp(){
        this.setColor(this.colorTab[this.colorNum]);    
    }

    getPosition(pos_x, pos_y){
        this.setNewPos(pos_x, pos_y);
        console.log("work");
    }
    drawFigure(){
        switch(this.figureNum){
            case 0:{  // triangle
                this.ctx.beginPath();
                this.ctx.fillStyle = 'black';
                this.ctx.moveTo(this.pos_x + this.s_x / 2, this.pos_y + this.s_y / 6);
                this.ctx.lineTo((this.pos_x + this.s_x) - this.s_x / 6, (this.pos_y + this.s_y) - this.s_y / 6);
                this.ctx.lineTo(this.pos_x + this.s_x / 6, (this.pos_y + this.s_y) - this.s_y / 6);
                this.ctx.fill();
                this.ctx.closePath();
            }
            break;
            case 1: {  // circle
                this.ctx.beginPath();
                this.ctx.fillStyle = 'black';
                this.ctx.arc(this.pos_x + this.s_x / 2, this.pos_y + this.s_y / 2, this.s_x / 3, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.closePath();
            }
            break;
            case 2: {  // square
                this.ctx.beginPath();
                this.ctx.fillStyle = 'black';
                this.ctx.moveTo(this.pos_x + this.s_x / 6, this.pos_y + this.s_y / 6);
                this.ctx.lineTo((this.pos_x + this.s_x) - this.s_x / 6, this.pos_y + this.s_y / 6);
                this.ctx.lineTo((this.pos_x + this.s_x) - this.s_x / 6, (this.pos_y + this.s_y) - this.s_y / 6);
                this.ctx.lineTo(this.pos_x + this.s_x / 6, (this.pos_y + this.s_y) - this.s_y / 6);
                this.ctx.fill();
                this.ctx.closePath();
            }
            break;
        }
        
    }

    create(){
        this.colorSetUp();
        this.setNewSide(this.side - 2, this.side - 2);
        this.draw();
        this.drawFigure();
    }

}   