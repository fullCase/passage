import { Rectangle, SpecialTiles } from "./figure.js";
import { Tiles } from "./figure.js";
const canvas = document.querySelector('[data-canv]');
// canvas.width = 1500;
// canvas.height = 800;

class Game{
    image = new Image();
    ctx = undefined;
    background = undefined;
    field_background = undefined;
    score_background = undefined;
    sideSize = undefined;
    nextTile = undefined;
    fieldTab = new Array();
    titleTab = new Array();
    STROKE = 2;
    ROW = 8;
    COL = 12;
    COLORTAB = [
        '#00000092', ['green', 'forestgreen', 'darkgreen', 'forestgreen', 'green'], 
        ['blueviolet', 'darkorchid', 'darkmagenta', 'purple', 'darkmagenta'],
        ['crimson', 'orangered', 'crimson', 'red', 'crimson'],
        ['lightskyblue', 'deepskyblue', 'deepskyblue', 'deepskyblue','lightskyblue'], 
        '#ffd700'
    ];

    constructor(canvas ,recta){
        this.canvas = canvas;
        this.recta = recta;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.image.src = "../image.jpg";
        for(let i = 0; i < this.ROW; i++){
            this.fieldTab.push(new Array());
            for(let j = 0; j < this.COL; j++)
                this.fieldTab[i].push(0);
        } 
    }

    calcSideSize(width, height){
        let c = height / this.ROW;
        let d = width / this.COL;
        if(c < d)
            return c;
        return d;
    }

    mousePositionToFieldTabCord(x, y){
        return [Math.floor(x / this.sideSize), Math.floor(y / this.sideSize)];
    }

    mousePosition = (event, title) => {
        if(event.clientX > this.field_background.getPositionX() + this.field_background.getStrokeSize() && 
        event.clientX < this.field_background.getPositionX() + this.field_background.getSizeX() - this.field_background.getStrokeSize())
            if(event.clientY > this.field_background.getPositionY() + this.field_background.getStrokeSize() && 
            event.clientY  < this.field_background.getPositionY() + this.field_background.getSizeY() - this.field_background.getStrokeSize()){
                let mouseCord = this.mousePositionToFieldTabCord(event.clientX, event.clientY);
                if(this.fieldTab[mouseCord[1]][mouseCord[0]] == 0){
                    this.fieldTab[mouseCord[1]][mouseCord[0]] = 1;
                    title.update(event.clientX, event.clientY, true, this.COLORTAB[this.COLORTAB.length - 1]); 
                    console.log(this.fieldTab);
                }
                else{
                    console.log("is not a empty");  
                    console.log(this.fieldTab); 
                }
            }

        return [event.clientX, event.clientY]; 
    }

   checkFieldTab = (x, y) =>{
      if(this.fieldTab[y][x] == 1)
         return false;
      return true;
   }

	checkAroundisEmpty(cordX, cordY){
		if(this.fieldTab[cordY][cordX - 1] == 0 && this.fieldTab[cordY][cordX + 1] == 0 &&
			this.fieldTab[cordY - 1][cordX] == 0 && this.fieldTab[cordY + 1][cordX] == 0)
			return false;
		return true;
	}

   isPosibleSet = (cordX, cordY, cordCheckX, cordCheckY) =>{
		let searchTitile;
		console.clear();
		console.log("X; " + cordX);
		console.log("y; " + cordY);
		console.log("X2; " + (Number(cordX) + Number(cordCheckX)));
		console.log("y2; " + (Number(cordY) + Number(cordCheckY)));
		console.log(this.fieldTab);
		
		if(this.fieldTab[(Number(cordY) + Number(cordCheckY))][(Number(cordX) + Number(cordCheckX))] == 0)
			return true;

		this.titleTab.forEach(element => {
			if(cordCheckX != 0){
				if(element.getPositionX() == this.field_background.getStrokeSize() + (cordX + cordCheckX) * this.sideSize &&
				element.getPositionY() == this.field_background.getStrokeSize() + cordY * this.sideSize)
					searchTitile = element;
			}
			if(cordCheckY != 0){
				if(element.getPositionY() == this.field_background.getStrokeSize() + (cordY + cordCheckY) * this.sideSize &&
				element.getPositionX() == this.field_background.getStrokeSize() + cordX * this.sideSize)
					searchTitile = element;
			}
		});
		
		console.log(searchTitile);
		if(searchTitile.shapeNumber == this.titleTab[this.titleTab.length - 1].shapeNumber){
			console.log("shape correct");
			return true;
		}

		if(searchTitile.getColorNumber() == this.titleTab[this.titleTab.length - 1].getColorNumber()){
			console.log("Color correct");
			return true;
		}
		
		return false;
		
			

        // console.log("X: " + cordX + " Y: " + cordY);
        // console.log(this.titleTab[this.titleTab.length - 1].getColorNumber());
        // console.log("x1: " + cordCheckX)
        // if(this.fieldTab[cordY + cordCheckY][cordX + cordCheckX] == 0)
        //     return true;
    
        
        // this.titleTab.forEach(element => {
        //     if(cordCheckX != 0){
        //         if(element.getPositionX() == this.field_background.getStrokeSize() + (cordX + cordCheckX) * this.sideSize){
        //             console.log("check");
        //             if(element.getColorNumber() == this.titleTab[this.titleTab.length - 1].getColorNumber()){
        //                 console.log("color correct");
        //                 console.log("color num: " + element.getColorNumber());
        //                 console.log("color number: " + this.titleTab[this.titleTab.length - 1].getColorNumber());
        //                 if(element.shapeNumber == this.titleTab[this.titleTab.length - 1].shapeNumber){
        //                     console.log("SHAPE NUM : " + element.shapeNumber);
        //                     console.log("shape number: " + this.titleTab[this.titleTab.length - 1].shapeNumber);
        //                     return true;
        //                 }
        //                 else
        //                     return false
        //             }
        //             else{
        //                 console.log("color not correct");
        //                 return false;
        //             }
                        
        //         }
        //         else
        //             console.log("not check"); 
        //     }
        //     if(cordCheckY != 0){
        //         if(element.getPositionY() == this.field_background.getStrokeSize() + (cordY + cordCheckY) * this.sideSize){
        //             if(element.color == this.titleTab[this.titleTab.length - 1].color){
        //                 if(element.shapeNumber == this.titleTab[this.titleTab.length - 1].shapeNumber){

        //                     return true;
        //                 }
                            
        //                 else
        //                     return false
        //             }
        //             else
        //                 return false;
        //         } 
        //     }  
        // });
    }


    createMainBackground = (pos_x = 0, pos_y = 0, side_w, side_h) =>{
        this.background = new this.recta(this.ctx, pos_x, pos_y, side_w, side_h);
        this.background.draw();
    }

    createFieldBackground = (pos_x = 0, pos_y = 0, side_w, side_h) =>{
        this.field_background = new this.recta(this.ctx, pos_x, pos_y, side_w, side_h);
        this.field_background.changeColor(this.COLORTAB[this.COLORTAB.length - 1]);
        this.field_background.changeStrokeSize(this.STROKE * 3);
    }

    createScoreBackground = (pos_x = 0, pos_y = 0, side_w, side_h) =>{
        let pointRect, timeRect; 
        this.score_background = new this.recta(this.ctx, pos_x, pos_y, side_w, side_h);
        pointRect = new this.recta(this.ctx, pos_x + side_w / 2 - this.sideSize / 2, pos_y + side_h / 4, this.sideSize, this.sideSize / 2);
        timeRect = new this.recta(this.ctx, pos_x + side_w / 2 - this.sideSize / 2, (pos_y + side_h / 4) * 3, this.sideSize, this.sideSize / 2);
        this.score_background.changeColor("white");
        this.score_background.draw();
        pointRect.changeStrokeSize(this.STROKE);
        timeRect.changeStrokeSize(this.STROKE);
        pointRect.draw(true, this.COLORTAB[this.COLORTAB.length - 1]);
        timeRect.draw(true, this.COLORTAB[this.COLORTAB.length - 1]);
    }

    createNextTitleField = () =>{
        this.nextTile = new this.recta(
            this.ctx, 
            (this.score_background.getPositionX() + this.score_background.getSizeX() / 2) - this.sideSize / 2 - this.STROKE, 
            (this.score_background.getPositionY() + this.score_background.getSizeY() / 2) - this.sideSize / 2 - this.STROKE, 
            this.sideSize + this.STROKE * 2,
            this.sideSize + this.STROKE * 2
        );
        this.nextTile.changeStrokeSize(this.STROKE);
        this.nextTile.draw(true, this.COLORTAB[this.COLORTAB.length - 1]);
    }
    
    createField = () =>{
    for(let i = 0; i < this.ROW; i++)
        for(let j = 0; j < this.COL; j++){
            let r = new this.recta(
                this.ctx, 
                this.field_background.getStrokeSize() - 2 + (this.sideSize) * j, 
                this.field_background.getStrokeSize() - 2 + (this.sideSize) * i, 
                this.sideSize, 
                this.sideSize
            )           
            r.changeStrokeSize(this.STROKE);
            r.changeColor(this.COLORTAB[0]);
            r.draw2(this.COLORTAB[this.COLORTAB.length - 1]);
        }      
    }

    createNextTitle = () =>{
		// this.titleTab.push( new SpecialTiles(this.ctx, this.nextTile.getPositionX() + this.nextTile.getStrokeSize(), this.nextTile.getPositionY() + this.nextTile.getStrokeSize(), this.sideSize));
		// let rand = this.titleTab[this.titleTab.length - 1].random(4, 1);
		//  this.titleTab[this.titleTab.length - 1].changeStrokeSize(this.STROKE);
		// this.titleTab[this.titleTab.length - 1].changeColor("grey");
		// this.titleTab[this.titleTab.length - 1].setColorNumber(rand, rand, rand, rand);
		// console.log(this.titleTab[this.titleTab.length - 1].getColorNumber());
		//  this.titleTab[this.titleTab.length - 1].changeColor(this.titleTab[this.titleTab.length - 1].createGradient(this.sideSize, this.COLORTAB[rand]));
		// this.titleTab[this.titleTab.length - 1].drawShapeInside();



        this.titleTab.push(new Tiles(this.ctx, this.nextTile.getPositionX() + this.nextTile.getStrokeSize(), this.nextTile.getPositionY() + this.nextTile.getStrokeSize(), this.sideSize));
        let rand = this.titleTab[this.titleTab.length - 1].random(4, 1);
        this.titleTab[this.titleTab.length - 1].changeStrokeSize(this.STROKE);
        this.titleTab[this.titleTab.length - 1].changeColor(this.titleTab[this.titleTab.length - 1].createGradient(this.sideSize, this.COLORTAB[rand]));
        this.titleTab[this.titleTab.length - 1].setColorNumber(rand);
        this.titleTab[this.titleTab.length - 1].draw();
        this.titleTab[this.titleTab.length - 1].drawShapeInside();
    }



    start = () =>{
        if(document.body.clientWidth < 1280){
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = screen.height;
            this.sideSize = this.calcSideSize(this.canvas.width, this.canvas.height - 6 * this.STROKE);
            this.createMainBackground(0, 0, this.canvas.width, this.canvas.height);
            this.createFieldBackground(
                0, 
                0, 
                this.sideSize * this.COL + 6 * this.STROKE, 
                this.sideSize * this.ROW + 6 * this.STROKE
            );
            this.createScoreBackground(
                this.field_background.getPositionX() + this.field_background.getSizeX(), 
                0, 
                this.background.getSizeX() - (this.field_background.getPositionX() + this.field_background.getSizeX()), 
                this.background.getSizeY()
            );

            this.image.onload = () =>{
                this.field_background.draw(true, this.COLORTAB[this.COLORTAB.length - 1]);
                this.ctx.drawImage(
                    this.image,
                    this.field_background.getPositionX() + this.field_background.getStrokeSize(),
                    this.field_background.getPositionY() + this.field_background.getStrokeSize(), 
                    this.field_background.getSizeX() - this.field_background.getStrokeSize() * 2, 
                    this.field_background.getSizeY() - this.field_background.getStrokeSize() * 2
                );
                this.createField();
                this.createNextTitleField();  
                this.createNextTitle();
            } 
        }
        else{
            this.createMainBackground(0, 0, 500, this.canvas.height);
        }
    }

    update(){
        this.ctx.drawImage(
            this.image,
            this.field_background.getPositionX() + this.field_background.getStrokeSize(),
            this.field_background.getPositionY() + this.field_background.getStrokeSize(), 
            this.field_background.getSizeX() - this.field_background.getStrokeSize() * 2, 
            this.field_background.getSizeY() - this.field_background.getStrokeSize() * 2
        );
        this.createField();
        this.createNextTitle();
        this.titleTab.forEach(element => {
            element.update(undefined, undefined, true, this.COLORTAB[this.COLORTAB.length - 1]); 
        });
    }

   main = () =>{
      this.canvas.addEventListener('click', (e) => {
         if(e.clientX > this.field_background.getPositionX() + this.field_background.getStrokeSize() && 
         	e.clientX < this.field_background.getPositionX() + this.field_background.getSizeX() - this.field_background.getStrokeSize() &&
            e.clientY > this.field_background.getPositionY() + this.field_background.getStrokeSize() && 
            e.clientY  < this.field_background.getPositionY() + this.field_background.getSizeY() - this.field_background.getStrokeSize()){
            let mouseCord = this.mousePositionToFieldTabCord(e.clientX, e.clientY);
				if(this.checkFieldTab(mouseCord[0], mouseCord[1])){
					if(this.isPosibleSet(mouseCord[0], mouseCord[1], -1, 0) && this.isPosibleSet(mouseCord[0], mouseCord[1], 1, 0)&&
						this.isPosibleSet(mouseCord[0], mouseCord[1], 0, -1) && this.isPosibleSet(mouseCord[0], mouseCord[1], 0, 1)){
						this.fieldTab[mouseCord[1]][mouseCord[0]] = 1;
						this.titleTab[this.titleTab.length - 1].changePosition(this.field_background.getStrokeSize() + mouseCord[0] * this.sideSize, this.field_background.getStrokeSize() + mouseCord[1] * this.sideSize);
						this.update();
					}
				}         
         }            
      });         
   }
 
}

const game = new Game(canvas, Rectangle);
game.start();
game.main();
