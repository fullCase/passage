const canv = document.querySelector("[data-canvas]");
import  {Shape} from './shape.js';
import  {Square} from './square.js';
import { Background } from './background.js';

class Game{
    #GameTab = new Array();
    #COL = 12;
    #ROW = 8;
    WindowWidth = 0;
    WindowHeight = 0;
    borderSize = 2;
    squareSide = undefined;
    mouse = {
        x: undefined,
        y: undefined,
    }
    ctx = undefined;
    GameField = 343;
    PointField = undefined;
    Background = undefined;
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    rand(a, b = 0){
        return Math.floor(Math.random() * a) + b; 
    }

    getWindowScreenSize = () =>{
        return [window.innerWidth, window.innerHeight];
    };

    calcSqSizeSide = () =>{
        if(this.WindowWidth > this.WindowHeight){
            return [Math.floor((this.WindowWidth - this.borderSize * (this.#COL + 1)) / this.#COL),
            Math.floor((this.WindowHeight - this.borderSize * (this.#ROW + 1)) / this.#ROW)];
        }
        return [Math.floor((this.WindowWidth - this.borderSize * (this.#ROW + 1)) / this.#ROW),
            Math.floor((this.WindowHeight - this.borderSize * (this.#COL + 1)) / this.#COL)];
    }

    getMousePressed = (x, y) =>{
        this.mouse.x = x; this.mouse.y = y;
    }

    

    mousePressed = () =>{
        if(this.mouse.x < 0 || this.mouse.x > this.GameField.s_x || !this.mouse.y < 0 || this.mouse.y > this.GameField.s_y) return;
        console.log("work");
        // this.mouse.x / 
    }

    start(){
        let shape;
        this.WindowWidth = this.getWindowScreenSize()[0];
        this.WindowHeight = this.getWindowScreenSize()[1];
        this.canvas.width = this.WindowWidth;
        this.canvas.height = this.WindowHeight;

        for(let i = 0; i < this.#ROW + 2; i++){
            this.#GameTab.push([]);
            for(let x = 0; x < this.#COL + 2 ; x++) this.#GameTab[i].push(0);
        }

        if(this.calcSqSizeSide()[0] > this.calcSqSizeSide()[1]){
            this.squareSide = this.calcSqSizeSide()[1];
            this.GameField = new Shape(this.ctx, "black", 0, 0, this.squareSide * this.#COL + this.borderSize * (this.#COL + 1), this.squareSide * this.#ROW + this.borderSize * (this.#ROW + 1));
            this.PointField = new Shape(this.ctx, "white", this.squareSide * this.#COL + this.borderSize * (this.#COL + 1), 0, this.WindowWidth - this.GameField.s_x, this.WindowHeight);
        }
        else{
            this.squareSide = this.calcSqSizeSide()[0];
            this.GameField = new Shape(this.ctx, "black", 0, 0, this.squareSide * this.#ROW + this.borderSize * (this.#ROW + 1), this.squareSide * this.#COL + this.borderSize * (this.#COL + 1));
            this.PointField = new Shape(this.ctx, "white", 0, this.squareSide * this.#COL + this.borderSize * (this.#COL + 1), this.WindowWidth, this.WindowHeight - this.GameField.s_y);
        }

        console.log(this.GameField);
        
        this.Background = new Background(this.ctx, [0, 0, this.GameField.s_x, this.GameField.s_y], "img01.jpg");
        this.Background.src = "img01.jpg";
        this.GameField.draw(); 
        this.PointField.draw();
    }

    drawBackground(){
        let shape;
        this.Background.draw();
        for(let i = 0; i < this.#COL; i++){
            shape = new Shape(this.ctx, "#00000038", i * this.squareSide + this.borderSize * (i + 1), 0, this.squareSide, this.GameField.s_y);
            shape.setStroke("#f0d458", this.borderSize);
            shape.draw();
        }
        for(let i = 0; i < this.#ROW; i++){
            shape = new Shape(this.ctx, "#00000038", 0, i * this.squareSide + this.borderSize * (i + 1), this.GameField.s_x, this.squareSide);
            shape.setStroke("#f0d458", this.borderSize);
            shape.draw();
        }
    }

    mainFloop(){

    }

    restart(){
       
    }
}

const game = new Game(canv);
game.start();
const ani = () => {
    window.requestAnimationFrame(ani);
    game.drawBackground();
}

ani();

canv.addEventListener("click", (e) => {
    game.getMousePressed(e.offsetX, e.offsetY);
    game.mousePressed();
})




// const ctx = canv.getContext("2d");
// const FULLSCREENWIDTHSIZE = 1024;
// const MAXSQUARESIDESIZE = 70;
// const COL = 12, ROW = 8;
// let gameField = undefined, pointField = undefined; 
// let gameFieldTab = new Array();

// const getWindowScreenSize = () =>{
//     return [window.innerWidth, window.innerHeight];
// };

// const setCanvasSize = (size) =>{
//     if(getWindowScreenSize()[0] < size){
//         canv.width = getWindowScreenSize()[0];
//         canv.height = getWindowScreenSize()[1];
//     }
//     else{
//         canv.width = 1024;
//         canv.height = getWindowScreenSize()[1];
//     }    
// }

// const calcSqSizeSide = (w,h, col, row) =>{ // w - Canvas width, h - Canvas height, col - columns value, row - rows value
//     let a, b;
//     a = h / col;
//     b =  w / row;
//     if(a < b)
//         return a;
//     return b;
// }

// // const mouse


// setCanvasSize(FULLSCREENWIDTHSIZE);
// let sqSideSize =  calcSqSizeSide(canv.width, canv.height, COL, ROW);

// for(let i = 0; i < ROW + 2; i++){
//     gameFieldTab.push([]);
//     for(let x = 0; x < COL + 2 ; x++){
//         gameFieldTab[i].push(0);
//     }
// }

// for(let i = 1; i < ROW + 1; i++){
//     for(let x = 1; x < COL + 1 ; x++){
//         let s = new Shape(ctx, "white", (i - 1) * sqSideSize, (x - 1) * sqSideSize, sqSideSize, sqSideSize);
//         s.setStroke("#D4AF37", 2);
//         s.draw();
//         s.setStroke("#996513", 1);
//         s.draw();
        
//     }
// }
// let re = Math.floor(Math.random() * 3);

// let s = new Square(ctx, sqSideSize, re, 1);
// s.getPosition(re * sqSideSize + .5, re * sqSideSize + .5);
// s.create();
// console.log(gameFieldTab);
