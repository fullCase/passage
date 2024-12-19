
import { Player } from "./player.js";
import { Rectangle } from "./rectangle.js";
import { SpecialTile } from "./tile.js";
import { Tile } from "./tile.js";

export class Game{
	STROKE = 2;
	ROW = 8;
	COL = 12;
	FONT_SIZE_NUMBER = 25;
	FONT_SIZE_TEXT = 20;
	IMAGE = new Image();
	BLACK_TRANSPARENT = '#00000092';
	GOLDEN = '#ffd700';
	PLAYER = new Player();

	SideSize = 70;
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

	constructor(canvas) {         // <--- Game class costructor
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = this.SideSize * this.COL;
		this.canvas.height = this.SideSize * (this.ROW + 2);
	}

		//////////////////////////////////////////////////////////////////////////////////

	random = (a, b = 0) => {
		return Math.floor(Math.random() * a + b);
	}

		//////////////////////////////////////////////////////////////////////////////////

	createFieldShape = (x = 0, y = 0, w = 0, h = 0, stroke = undefined, strokeColor = undefined, color = undefined) => {
		let field = new Rectangle(this.ctx, x, y, w, h);
		if (stroke != undefined) field.changeStrokeSize(stroke);
		if (strokeColor != undefined) field.changeStrokeColor(strokeColor);
		if (color != undefined) field.changeColor(color);
		return field;
	}

	createNextTile = (x, y) => {
		let r = this.random(2);
		if (!r) {
			this.CurrentTile = new SpecialTile(this.ctx, x, y, this.SideSize);
			this.CurrentTile.setColors(false);
		}
		else {
			this.CurrentTile = new Tile(this.ctx, x, y, this.SideSize);
		}
	}

	    /////////////////////////////////////////////////////////////////////////////////

	save = (x, y, obj) => {
		let q = Math.floor(x / this.SideSize);
		let w = Math.floor(y / this.SideSize);

		obj.changePositionX(q * this.SideSize);  // <---- Change Position variables value
		obj.changePositionY(w * this.SideSize);  // <---- Change Position variables value

		w -= 2;

		this.FieldTab[w][q] = obj;
	}

	    /////////////////////////////////////////////////////////////////////////////////

	isCorrectSearchValue = (x, y) => {
		if(x < 0 || y < 0 || x > this.COL - 1 || y > this.ROW - 1) {
			return false;
		}
		return true;
	}

	isPosibleSet = (x, y) => {   
		let s = 0;
		let q = Math.floor(x / this.SideSize);
		let w = Math.floor(y /this.SideSize);

		w -= 2;

        
		if(!this.FieldTab[w][q] == 0) {
			return false;
		}

		if (this.isCorrectSearchValue(q - 1, w)) {
			if (!this.FieldTab[w][q - 1] == 0) {
				s += 1;
				if (!this.CurrentTile.isPosibleSet(this.FieldTab[w][q - 1], "left")) {
					return false;
				}
			}
		}

		if (this.isCorrectSearchValue(q, w - 1)) {
			if (!this.FieldTab[w - 1][q] == 0) {
				s += 1;
				if (!this.CurrentTile.isPosibleSet(this.FieldTab[w - 1][q], "top")) {
					return false;
				}
			}
		}

		if (this.isCorrectSearchValue(q + 1, w)) {
			if (!this.FieldTab[w][q + 1] == 0) {
				s += 1;
				if (!this.CurrentTile.isPosibleSet(this.FieldTab[w][q + 1], "right")) {
					return false;
				}
			}
		}

		if (this.isCorrectSearchValue(q, w + 1)) {
			if (!this.FieldTab[w + 1][q] == 0) {
				s += 1;
				if (!this.CurrentTile.isPosibleSet(this.FieldTab[w + 1][q], "bottom")) {
					return false;
				}
			}
		}

		if (s == 0) {
			return false;
		}

		return true;

	}

		///////////////////////////////////////////////////////////////////////////////////

	checkLine = () => {
		let row = -1;
		let col = -1;
		for (let i = 0; i < this.ROW; i++) {
			if (!this.FieldTab[i].includes(0)) {
				col = i;
			}
		}

		for (let j = 0; j < this.COL; j++) {
			let t = 0;
			for (let i = 0; i < this.ROW; i++) {
				if (this.FieldTab[i][j] != 0)
					t += 1;
			}
			if (t == this.ROW) {
				row = j;
			}
		}

		if (row > -1 && col > -1) {
			for (let i = 0; i < this.ROW; i++) {
				this.FieldTab[row][i] = 0;
			}
			for (let i = 0; i < this.COL; i++) {
				this.FieldTab[i][col] = 0;
			}
			this.PLAYER.addPoint(this.COL);
			this.PLAYER.addPoint(this.ROW);
		}
		else if (col > -1) {
			for (let i = 0; i < this.COL; i++) {
				this.FieldTab[col][i] = 0;
			}
			this.PLAYER.addPoint(this.COL);
		}
		else if (row > -1) {
			for (let i = 0; i < this.ROW; i++) {
				this.FieldTab[i][row] = 0;
			}
			this.PLAYER.addPoint(this.ROW);
		}
	}

		/////////////////////////////////////////////////////////////////////////////////////

	resetFieldTab = () => {
		for (let i = 0; i < this.ROW; i++) {
			for (let j = 0; j < this.COL; j++)
				this.FieldTab[i].splice(j, 1, 0);
		}
	}

	reset = () => {
		this.resetFieldTab();

		let r1 = this.random(4, 4) * this.SideSize;
		let r2 = this.random(4, 4) * this.SideSize;

		this.CurrentTile = new SpecialTile(this.ctx, r1, r2, this.SideSize); // <=-- Create a first tile to start or restart the game
		this.CurrentTile.setColors(true);
		this.save(r1, r2, this.CurrentTile);

		this.createNextTile(this.CurrentTileField.getPositionX(), this.CurrentTileField.getPositionY());
	}

		/////////////////////////////////////////////////////////////////////////////////

	time = () => {  /// <<----- function white 
		function pad(unit) {  /// <<----------- internal function that has a task adds a "0" before number given as an argument, if "unit" less that 10.
			return (("0") + unit).length > 2 ? unit : "0" + unit;
		}
		this.TimeField.clear();

		this.TimeField.draw();

		this.ctx.fillStyle = "black";
		this.ctx.font = this.FONT_SIZE_NUMBER + "px Serif";

		let hour = Math.floor(this.PLAYER.getTime() / 3600);
		let min = Math.floor(this.PLAYER.getTime() / 60);
		let sec = Math.floor(this.PLAYER.getTime() % 60);

		hour = pad(hour);
		min = pad(min);
		sec = pad(sec);

		let str = `${hour}:${min}:${sec}`;

		this.ctx.fillText(str, this.TimeField.getPositionX() + this.TimeField.getSizeX() / 2 - this.ctx.measureText(str).width / 2, this.TimeField.getPositionY() + this.TimeField.getSizeY() - this.FONT_SIZE_NUMBER / 4);
	}
	
		/////////////////////////////////////////////////////////////////////////////////

	start = () => {
		for (let i = 0; i < this.ROW; i++) {
			this.FieldTab.push(new Array());
			for (let j = 0; j < this.COL; j++)
				this.FieldTab[i].push(0);
		}

		this.TilesField = this.createFieldShape(0, this.SideSize * 2, this.canvas.width, this.SideSize * this.ROW, this.STROKE, this.GOLDEN);
       
		this.SecondField = this.createFieldShape(this.TilesField.getPositionX(), 0, this.TilesField.getSizeX(), this.TilesField.getPositionY(), undefined, undefined, "white");
		this.SecondField.draw();

		this.TimeField = this.createFieldShape(this.SecondField.getPositionX() + this.STROKE, this.SecondField.getPositionY() + this.SecondField.getSizeY() / 2, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

		this.LiveField = this.createFieldShape(this.SecondField.getPositionX() + this.SideSize * 3, this.SecondField.getPositionY() + this.SecondField.getSizeY() / 2, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

		this.ScoreField = this.createFieldShape(this.SecondField.getPositionX() + this.SideSize * 7, this.SecondField.getPositionY() + this.SecondField.getSizeY() / 2, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

		this.HighScoreField = this.createFieldShape(this.SecondField.getPositionX() + this.SideSize * 10, this.SecondField.getPositionY() + this.SecondField.getSizeY() / 2, this.SideSize * 2, this.SideSize / 2, this.STROKE, this.GOLDEN, "white");

		this.CurrentTileField = this.createFieldShape(this.SecondField.getPositionX() + this.SecondField.getSizeX() / 2 - this.SideSize / 2, this.SecondField.getPositionY() + this.SideSize / 3, this.SideSize, this.SideSize, this.STROKE, this.GOLDEN, "white");
		this.CurrentTileField.draw();

		this.reset();

		this.update();  // <--- add funcion "update" to draw  
	}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	update = () => {
		function FillText(ctx, TimeField, LiveField, ScoreField, HighScoreField, font){
			ctx.fillText("TIME", TimeField.getPositionX() + TimeField.getSizeX() / 2 - ctx.measureText("TIME").width / 2, TimeField.getPositionY() - font / 2);
			ctx.fillText("LIVE", LiveField.getPositionX() + LiveField.getSizeX() / 2 - ctx.measureText("LIVE").width / 2, LiveField.getPositionY() - font / 2);
			ctx.fillText("SCORE", ScoreField.getPositionX() + ScoreField.getSizeX() / 2 - ctx.measureText("SCORE").width / 2, ScoreField.getPositionY() - font / 2);
			ctx.fillText("HIGH SCORE", HighScoreField.getPositionX() + HighScoreField.getSizeX() / 2 - ctx.measureText("HIGH SCORE").width / 2, HighScoreField.getPositionY() - font / 2);
		}

		this.IMAGE.addEventListener("load", () => {
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

			for (let i = 0; i < this.COL; i++) {
				for (let j = 2; j < this.ROW + 2; j++) {
					let r = this.createFieldShape(i * this.SideSize, j * this.SideSize, this.SideSize, this.SideSize, this.STROKE, this.GOLDEN, this.BLACK_TRANSPARENT);
					r.draw();
				}
			}

			for(let i = 0; i < this.COL; i++) {
				for(let j = 0; j < this.ROW; j++) {
					if(this.FieldTab[j][i]) {
						this.FieldTab[j][i].draw();
					}
				}
			}

			this.CurrentTile.draw();

			this.ctx.fillStyle = "black";
			this.ctx.font = this.FONT_SIZE_NUMBER + "px Serif";

			this.ctx.fillText(this.PLAYER.getLive(), this.LiveField.getPositionX() + this.LiveField.getSizeX() / 2 - this.ctx.measureText(this.PLAYER.getLive()).width / 2, this.LiveField.getPositionY() + this.LiveField.getSizeY() - this.FONT_SIZE_NUMBER / 4 - this.STROKE);

			this.ctx.fillText(this.PLAYER.getPoint(), this.ScoreField.getPositionX() + this.ScoreField.getSizeX() / 2 - this.ctx.measureText(this.PLAYER.getPoint()).width / 2, this.ScoreField.getPositionY() + this.ScoreField.getSizeY() -  this.FONT_SIZE_NUMBER / 4 - this.STROKE);

			this.ctx.fillText(this.PLAYER.getHighPoint(), this.HighScoreField.getPositionX() +  this.HighScoreField.getSizeX() / 2 - this.ctx.measureText(this.PLAYER.getHighPoint()).width / 2, this.HighScoreField.getPositionY() + this.HighScoreField.getSizeY() - this.FONT_SIZE_NUMBER / 4 - this.STROKE);

			this.ctx.fillStyle = "white";
			this.ctx.font = this.FONT_SIZE_TEXT + "px Serif";

			FillText(this.ctx, this.TimeField, this.LiveField, this.ScoreField, this.HighScoreField, this.FONT_SIZE_TEXT);

			this.ctx.fillStyle = "black";

			FillText(this.ctx, this.TimeField, this.LiveField, this.ScoreField, this.HighScoreField, this.FONT_SIZE_TEXT);

 		});
		this.IMAGE.src = "./img01.jpg";
		// this.IMAGE.src = "./image.jpg";
		// this.IMAGE.src = "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg";

	}

 	//////////////////////////////////////////////////////////////////////////////////////

	play = () => { /// <<------- Main function 

		if (this.once) {
			this.start();
			this.once = false;
		}

		setInterval(() => {
			this.PLAYER.addTime();
			this.time();
		}, 1000);
		

		this.canvas.addEventListener("click", (e) => {
			let x = e.clientX - this.canvas.getBoundingClientRect().left;
			let y = e.clientY - this.canvas.getBoundingClientRect().top;

			if(this.TilesField.checkClick(x, y)){
				if (this.isPosibleSet(x, y)) { // <<----  Call function checking the possibility of setting a "Tile" object. If true:
					this.save(x, y, this.CurrentTile); // <<----  Calling a function that saves the position of an object. 
					this.PLAYER.addPoint();
					this.createNextTile(this.CurrentTileField.getPositionX(), this.CurrentTileField.getPositionY());
					this.checkLine();
					this.update();
                   
				}
				else { // <<----- If False:
					this.PLAYER.deductLive();   
					if (this.PLAYER.getLive() == 0){
						this.PLAYER.reset();
						this.reset();
					}

					this.update();
				}
			}
		});
	}
}



