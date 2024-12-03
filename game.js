import { Player } from "./player.js";
import { Rectangle } from "./rectangle.js";
import { SpecialTile } from "./tile.js";
import { Tile } from "./tile.js";


const canvas = document.querySelector('[data-canv]');

class Game{
    STROKE = 2;
    ROW = 8;
    COL = 12;
    IMAGE = new Image();
    BLACK_TRANSPARENT = '#00000092';
    GOLDEN = '#ffd700';
    PLAYER = new Player();

    SideSize = undefined;
	FieldTab = new Array();
	TilesField = Object;
	SecondField = Object;
	CurrentTileField = Object; 
	CurrentTile = Object; 
	TimeField = Object;
	LiveField = Object;
	ScoreField = Object; 
	HighScoreField = Object; 

	once = true;

    constructor(canvas){         // <--- Game class costructor
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = window.screen.availWidth;
        this.canvas.height = window.screen.availHeight;
    }

   /////////////////////////////////////////////////////////////////////////////////

	random = (a, b = 0) => {
        return Math.floor(Math.random() * a + b);
    }
  
    calcSideSize = (width, height) =>{     // <--- function that calculates the maximum size of the one tile   
        let c = width / this.ROW;
        let d = height / this.COL;
        if(c < d)
            return c;
        return d;
    }
  
    //////////////////////////////////////////////////////////////////////////////////

    createFieldShape = (x = 0, y = 0, w = 0, h = 0, stroke = undefined, strokeColor = undefined, color = undefined) =>{
		let field = new Rectangle(this.ctx, x, y, w, h);
		if(stroke != undefined) field.changeStrokeSize(stroke);
		if(strokeColor != undefined) field.changeStrokeColor(strokeColor);
		if(color != undefined) field.changeColor(color);	
		return field;
	}

    createNextTile = (x, y) =>{
		let r = this.random(2);
		if(!r){
			this.CurrentTile = new SpecialTile(this.ctx, x, y, this.SideSize);
			this.CurrentTile.setColors(false);
		}
		else{
			this.CurrentTile = new Tile(this.ctx, x, y, this.SideSize);
		}
	}

    ///////////////////////////////////////////////////////////////////////////////////////

    isCorrectSearchValue = (x, y) =>{
		if(x < 0 || y < 0 || x > this.ROW - 1 || y > this.COL - 1){
			return false;
		}
		return true;
	}

	isPosibleSet = (x, y) =>{
		let correct = 0;
		let s = 0;
		let q = Math.floor(x / this.SideSize);
		let w = Math.floor(y / this.SideSize);

		if(!this.FieldTab[w][q] == 0){
			return false;
		}

		if(this.isCorrectSearchValue(q - 1, w)){
			if(!this.FieldTab[w][q - 1] == 0){
				s += 1;
				if(!this.CurrentTile.isPosibleSet(this.FieldTab[w][q - 1], "left")){
					return false;
				}
			}
		}

		if(this.isCorrectSearchValue(q, w - 1)){
			if(!this.FieldTab[w - 1][q] == 0){
				s += 1;
				if(!this.CurrentTile.isPosibleSet(this.FieldTab[w - 1][q], "top")){
					return false;
				}
			}
		}

		if(this.isCorrectSearchValue(q + 1, w)){
			if(!this.FieldTab[w][q + 1] == 0){
				s += 1;
				if(!this.CurrentTile.isPosibleSet(this.FieldTab[w][q + 1], "right")){
					return false;
				}
			}
		}

		if(this.isCorrectSearchValue(q, w + 1)){
			if(!this.FieldTab[w + 1][q] == 0){
				s += 1;
				if(!this.CurrentTile.isPosibleSet(this.FieldTab[w + 1][q], "bottom")){
					return false;
				}
			}
		}

		if(s == 0){
			return false;
		}

		return true;
	}
	
	checkLine = () => {
		let row = -1;
		let col = -1;
		for(let i = 0; i < this.COL; i++){
			if(!this.FieldTab[i].includes(0)){
				row = i;
			}
		}

		for(let j = 0; j < this.ROW; j++){
			let t = 0;
			for(let i = 0; i < this.COL; i++){
				if(this.FieldTab[i][j] != 0)
						t += 1; 
			}
			if(t == this.COL){
				col = j;
			}
		}

		if(row > -1 && col > -1){
			for(let i = 0; i < this.COL; i++){
				this.FieldTab[col][i] = 0;
			}
			for(let i = 0; i < this.ROW; i++){
				this.FieldTab[i][row] = 0;
			} 
			this.PLAYER.addPoint(this.COL);
			this.PLAYER.addPoint(this.ROW);
		}
		else if(row > -1){
			for(let i = 0; i < this.ROW; i++){
				this.FieldTab[row][i] = 0;
			} 
			this.PLAYER.addPoint(this.ROW);
		}
		else if(col > -1){
			for(let i = 0; i < this.COL; i++){
				this.FieldTab[i][col] = 0;	
			} 
			this.PLAYER.addPoint(this.COL);
		}
	}

    //////////////////////////////////////////////////////////////////////////////////////

	save = (x, y, obj) =>{
		let q = Math.floor(x / this.SideSize);
		let w = Math.floor(y / this.SideSize);
		
		this.FieldTab[w][q] = obj; 

		obj.changePositionX(q *this.SideSize);  // <---- Change Position variables value
		obj.changePositionY(w *this.SideSize);  // <---- Change Position variables value
	}

	///////////////////////////////////////////////////////////////////////////////////

	resetFieldTab = () => {
		for(let i = 0; i < this.COL; i++){
			for(let j = 0; j < this.ROW; j++)
				this.FieldTab[i].splice(j, 1, 0);
        }
	}

	reset = () =>{
		this.resetFieldTab();

		let r1 = this.random(4, 2) * this.SideSize;
		let r2 =  this.random(4, 4) * this.SideSize;

		this.CurrentTile = new SpecialTile(this.ctx, r1, r2, this.SideSize); // <=-- Create again a first tile to restart a game
        this.CurrentTile.setColors(true);
        this.save(r1, r2, this.CurrentTile);

		this.createNextTile(this.CurrentTileField.getPositionX(), this.CurrentTileField.getPositionY());
	}

	//////////////////////////////////////////////////////////////////////////////////

	time = () =>{
		function pad(unit){
			return (("0") + unit).length > 2 ? unit : "0" + unit; 
		}
		this.TimeField.clear();

		this.TimeField.draw();

		this.ctx.fillStyle = "black";
        this.ctx.font = "25px Serif";
		
		let hour = Math.floor(this.PLAYER.getTime() / 3600);
		let min = Math.floor(this.PLAYER.getTime() / 60);
		let sec = Math.floor(this.PLAYER.getTime() % 60);

		hour = pad(hour);
		min = pad(min);
		sec = pad(sec);
		
		let str = `${hour}:${min}:${sec}`;

		this.ctx.fillText(str, this.TimeField.getPositionX() + this.TimeField.getStrokeSize(), this.TimeField.getPositionY() + this.TimeField.getSizeY() - this.STROKE);
	}
	//////////////////////////////////////////////////////////////////////////////////

    start = () =>{	
		this.SideSize = this.calcSideSize(this.canvas.width, this.canvas.height);

		let r1 = this.random(4, 2) * this.SideSize;
		let r2 =  this.random(4, 4) * this.SideSize;

		for(let i = 0; i < this.COL; i++){
            this.FieldTab.push(new Array());
			for(let j = 0; j < this.ROW; j++)
				this.FieldTab[i].push(0);
        }

        this.TilesField = this.createFieldShape(0, 0, this.SideSize * this.ROW, this.SideSize * this.COL, this.STROKE, this.GOLDEN);

        this.SecondField = this.createFieldShape(this.TilesField.getPositionX(), this.TilesField.getPositionY() + this.TilesField.getSizeY(), this.TilesField.getSizeX(), this.canvas.height - (this.TilesField.getPositionY() + this.TilesField.getSizeY()), undefined, undefined, "white");
        this.SecondField.draw();

        this.TimeField = this.createFieldShape(this.SecondField.getPositionX() + this.STROKE * 2, this.SecondField.getPositionY() + + this.STROKE * 2, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");
		
        this.LiveField = this.createFieldShape(this.SecondField.getPositionX() + this.STROKE * 2, this.SecondField.getPositionY() + this.SideSize, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

        this.ScoreField = this.createFieldShape(this.SecondField.getPositionX() + this.SecondField.getSizeX() - this.SideSize * 2 - + this.STROKE * 2, this.SecondField.getPositionY() + + this.STROKE * 2, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

        this.HighScoreField = this.createFieldShape(this.SecondField.getPositionX() + this.SecondField.getSizeX() - this.SideSize * 2 - + this.STROKE * 2, this.SecondField.getPositionY() + this.SideSize, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

        this.CurrentTileField = this.createFieldShape(this.SecondField.getPositionX() + this.SecondField.getSizeX() / 2 - this.SideSize / 2, this.SecondField.getPositionY() + this.SideSize / 3, this.SideSize, this.SideSize, this.STROKE, this.GOLDEN, "white");
        this.CurrentTileField.draw();

        this.CurrentTile = new SpecialTile(this.ctx, r1, r2, this.SideSize); // <=-- Create a first tile to start a game
        this.CurrentTile.setColors(true);
        this.save(r1, r2, this.CurrentTile);
         
		this.update();  // <--- add funcion "update" to draw  

		this.createNextTile(this.CurrentTileField.getPositionX(), this.CurrentTileField.getPositionY());
	}

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	

    update = () =>{
		this.IMAGE.addEventListener("load", () =>{
			this.TilesField.clear();
			this.LiveField.clear();
			this.ScoreField.clear();
			this.HighScoreField.clear();

			this.TilesField.draw();
			this.TimeField.draw();
			this.LiveField.draw();
			this.ScoreField.draw();
			this.HighScoreField.draw();
			
			
			this.ctx.drawImage(this.IMAGE, this.TilesField.getPositionX() + this.TilesField.getStrokeSize(), this.TilesField.getPositionY() + this.TilesField.getStrokeSize(), this.TilesField.getSizeX() - this.TilesField.getStrokeSize() * 2, this.TilesField.getSizeY() - this.TilesField.getStrokeSize() * 2);

			for(let i = 0; i < this.ROW; i++){
				for (let j = 0; j < this.COL; j++){
					let r = this.createFieldShape(i * this.SideSize, j * this.SideSize, this.SideSize, this.SideSize, this.STROKE, this.GOLDEN, this.BLACK_TRANSPARENT);
					r.draw();
				}
			}
			
			for(let i = 0; i < this.ROW; i++){
				for (let j = 0; j < this.COL; j++){
					if(this.FieldTab[j][i]){
						this.FieldTab[j][i].draw();
					}
				}
			}

			this.CurrentTile.draw();

			this.ctx.fillStyle = "black";
        	this.ctx.font = "28px Serif";

        	this.ctx.fillText(this.PLAYER.getLive(), this.LiveField.getPositionX() + this.LiveField.getStrokeSize(), this.LiveField.getPositionY() + this.LiveField.getSizeY() - this.STROKE);

        	this.ctx.fillText(this.PLAYER.getPoint(),this.ScoreField.getPositionX() + this.ScoreField.getStrokeSize(), this.ScoreField.getPositionY() + this.ScoreField.getSizeY() - this.STROKE);

        	this.ctx.fillText(this.PLAYER.getHighPoint(),this.HighScoreField.getPositionX() + this.HighScoreField.getStrokeSize(), this.HighScoreField.getPositionY() + this.HighScoreField.getSizeY() - this.STROKE);

			this.ctx.fillStyle = "white";
			this.ctx.font = "14px Serif";

			this.ctx.fillText("TIME", this.TimeField.getPositionX() + this.TimeField.getStrokeSize(), this.TimeField.getPositionY() + this.TimeField.getSizeY() + 14);
			this.ctx.fillText("LIVE", this.LiveField.getPositionX() + this.LiveField.getStrokeSize(), this.LiveField.getPositionY() + this.LiveField.getSizeY() + 14);
			this.ctx.fillText("SCORE",this.ScoreField.getPositionX() + this.ScoreField.getStrokeSize(), this.ScoreField.getPositionY() + this.ScoreField.getSizeY() + 14);
			this.ctx.fillText("HIGH SCORE",this.HighScoreField.getPositionX() + this.HighScoreField.getStrokeSize(), this.HighScoreField.getPositionY() + this.HighScoreField.getSizeY() + 14);

			this.ctx.fillStyle = "black";

			this.ctx.fillText("TIME", this.TimeField.getPositionX() + this.TimeField.getStrokeSize(), this.TimeField.getPositionY() + this.TimeField.getSizeY() + 14);
			this.ctx.fillText("LIVE", this.LiveField.getPositionX() + this.LiveField.getStrokeSize(), this.LiveField.getPositionY() + this.LiveField.getSizeY() + 14);
			this.ctx.fillText("SCORE",this.ScoreField.getPositionX() + this.ScoreField.getStrokeSize(), this.ScoreField.getPositionY() + this.ScoreField.getSizeY() + 14);
			this.ctx.fillText("HIGH SCORE",this.HighScoreField.getPositionX() + this.HighScoreField.getStrokeSize(), this.HighScoreField.getPositionY() + this.HighScoreField.getSizeY() + 14);
			
		});
		this.IMAGE.src = "image.jpg";
		
	}

    //////////////////////////////////////////////////////////////////////////////////////

	play = () =>{
		if(this.once){
			this.start();
			this.once = false;
		}

		setInterval(() => {
			this.PLAYER.addTime();
			this.time();
		}, 1000);

		this.canvas.addEventListener("click", (e) =>{
			let x = e.clientX - this.canvas.getBoundingClientRect().left;
			let y = e.clientY - this.canvas.getBoundingClientRect().top;
			if(this.TilesField.checkClick(x, y)){
				if(this.isPosibleSet(x, y)){
					this.save(x, y, this.CurrentTile);
                    this.PLAYER.addPoint();
					this.createNextTile(this.CurrentTileField.getPositionX(), this.CurrentTileField.getPositionY());
					this.checkLine();
					this.update();
				}
				else{
					this.PLAYER.deductLive();
					if(this.PLAYER.getLive() == 0){
						this.PLAYER.reset();
						this.reset();
						this.update();
					}
					this.update();
				}
				
			}
		});
	}
}


let game = new Game(canvas);

game.play();

