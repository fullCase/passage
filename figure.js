export class Rectangle{
    color = 'black';
    strokeSize = 0;
    constructor(ctx, positionX = 0, positionY = 0, sideSizeX = 0, sideSizeY = 0){
        this.ctx = ctx;
        this.positionX = positionX;
        this.positionY = positionY;
        this.sideSizeX = sideSizeX;
        this.sideSizeY = sideSizeY;
    }

    getPositionX = () => {
        return this.positionX;
    }

    getPositionY = () => {
        return this.positionY;
    }

    getSizeX = () => {
        return this.sideSizeX;
    }

    getSizeY = () => {
        return this.sideSizeY;
    }

    getStrokeSize = () => {
        return this.strokeSize;
    }

    changeStrokeSize(newStrokeWidth){
        this.strokeSize = newStrokeWidth;
    }

    changeColor(color){
        this.color = color;
    }

    drawStroke(isActive = false, strokeColor = "black"){
        if(isActive){
            this.ctx.fillStyle = strokeColor;
            this.ctx.fillRect(this.positionX, this.positionY, this.sideSizeX, this.sideSizeY );
            this.ctx.clearRect(this.positionX + this.strokeSize, this.positionY + this.strokeSize , this.sideSizeX - this.strokeSize * 2 , this.sideSizeY - this.strokeSize * 2);
        }
        return isActive;
    }

    draw(isStroke = false, strokeColor = "black"){
        this.ctx.clearRect(this.positionX, this.positionY, this.sideSizeX, this.sideSizeY);
        if(isStroke == true){
            this.drawStroke(isStroke, strokeColor);
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.positionX + this.strokeSize, this.positionY + this.strokeSize , this.sideSizeX - this.strokeSize * 2, this.sideSizeY - this.strokeSize * 2);
            return;
        }
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.positionX, this.positionY, this.sideSizeX, this.sideSizeY); 
    }

   draw2 = (strokeColor = "black") =>{
      this.ctx.fillStyle = this.color;    
      this.ctx.fillRect(this.positionX + this.strokeSize, this.positionY + this.strokeSize , this.sideSizeX, this.sideSizeY);
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = this.strokeSize;
      this.ctx.strokeRect(this.positionX + this.strokeSize, this.positionY + this.strokeSize, this.sideSizeX, this.sideSizeY);
   }

   clear(){
		this.ctx.clearRect(this.positionX + this.strokeSize, this.positionY + this.strokeSize , this.sideSizeX, this.sideSizeY);
	}
}

export class Tiles extends Rectangle{
	fcolor;
   SPECIALBLOK = false;
   shapeNumber = undefined;
   colorNumber = Number;
   constructor(ctx, positionX = 0, positionY = 0, sideSize = 0){
        super(ctx, positionX, positionY, sideSize , sideSize)
        this.ctx = ctx;
        this.positionX = positionX;
        this.positionY = positionY;
        this.sideSize = sideSize;   
   }

   random = (a, b = 0) => {
        return Math.floor(Math.random() * a + b);
    }

    changePosition = (x, y) =>{
        this.positionX = x;
        this.positionY = y;
    }

	setColorNumber(num){
		this.colorNumber = num;
	}

	getColorNumber(){
		return this.colorNumber;
	}

   createGradient = (z, colorTab) =>{
		this.fcolor = colorTab;
        let gradient = this.ctx.createLinearGradient(this.positionX, this.positionY, this.positionX + z, this.positionY + z);
        for (let i = 0; i < colorTab.length; i++) 
            gradient.addColorStop(i / colorTab.length, colorTab[i]);  
        return gradient;
   }

   drawShapeInside(){
      this.ctx.fillStyle = "black";
		if(this.shapeNumber == undefined)
			this.shapeNumber = this.random(4);
      if(this.shapeNumber == 0){
            let x = this.positionX + this.sideSize / 4;
            let y = this.positionY + this.sideSize / 4;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + this.sideSize / 2, y);
            this.ctx.lineTo(x + this.sideSize / 2, y + this.sideSize / 2);
            this.ctx.lineTo(x, y + this.sideSize / 2);
            this.ctx.lineTo(x, y);
            this.ctx.fill();
            this.ctx.closePath();
        }
        else if(this.shapeNumber == 1){
            let x = this.positionX + this.sideSize / 2;
            let y = this.positionY + this.sideSize / 4;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + this.sideSize / 3, y + this.sideSize / 2);
            this.ctx.lineTo(x - this.sideSize / 3, y + this.sideSize / 2);
            this.ctx.lineTo(x, y);
            this.ctx.fill();
            this.ctx.closePath();
        }
        else if(this.shapeNumber == 2){
            let x = this.positionX + this.sideSize / 2;
            let y = this.positionY + this.sideSize / 4;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + this.sideSize / 4, y + this.sideSize / 4);
            this.ctx.lineTo(x, y + this.sideSize / 2);
            this.ctx.lineTo(x - this.sideSize / 4, y + this.sideSize / 4);
            this.ctx.lineTo(x, y);
            this.ctx.fill();
            this.ctx.closePath();
        }
        else if(this.shapeNumber == 3){
            let x = this.positionX + this.sideSize / 2;
            let y = this.positionY + this.sideSize / 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.sideSize / 4, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    update = (newPosX = this.positionX, newPosY = this.positionY, isStroke = false, color) =>{
        this.ctx.clearRect(this.positionX, this.positionY, this.sideSizeX, this.sideSizeY);
        this.positionX = newPosX;
        this.positionY = newPosY;
		  this.changeColor(this.createGradient(this.sideSize, this.fcolor));
        this.draw(isStroke, color);
        this.drawShapeInside();
    }

}

export class SpecialTiles extends Tiles{
	fcolor;
    SPECIALBLOK = true;
    shapeNumber = null;
    colorNumber = new Array();
    constructor(ctx, positionX = 0, positionY = 0, sideSize = 0){
        super(ctx, positionX, positionY, sideSize , sideSize)
        this.ctx = ctx;
        this.positionX = positionX;
        this.positionY = positionY;
        this.sideSize = sideSize;   
    }
 
    setColorNumber(leftColNum, topColNum, rightColNum, bottomColNum){
        this.colorNumber.push(Number(leftColNum));
        this.colorNumber.push(Number(topColNum));
        this.colorNumber.push(Number(rightColNum));
        this.colorNumber.push(Number(bottomColNum));
    }
 
    drawShapeInside(){
        this.draw();
        this.ctx.strokeStyle = "dimgrey";
        this.ctx.beginPath();
        this.ctx.moveTo(this.positionX, this.positionY);
        this.ctx.lineTo(this.positionX + this.sideSize / 2, this.positionY + this.sideSize / 2);
        this.ctx.lineTo(this.positionX + this.sideSize, this.positionY);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.positionX + this.sideSize, this.positionY);
        this.ctx.lineTo(this.positionX + this.sideSize / 2, this.positionY + this.sideSize / 2);
        this.ctx.lineTo(this.positionX + this.sideSize, this.positionY + this.sideSize);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.positionX + this.sideSize, this.positionY + this.sideSize);
        this.ctx.lineTo(this.positionX + this.sideSize / 2, this.positionY + this.sideSize / 2);
        this.ctx.lineTo(this.positionX, this.positionY + this.sideSize);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.positionX, this.positionY + this.sideSize);
        this.ctx.lineTo(this.positionX + this.sideSize / 2, this.positionY + this.sideSize / 2);
        this.ctx.lineTo(this.positionX, this.positionY);
        this.ctx.stroke();
        this.ctx.closePath();

    }
 
    update = (newPosX = this.positionX, newPosY = this.positionY, isStroke = false, color) =>{
        this.ctx.clearRect(this.positionX, this.positionY, this.sideSizeX, this.sideSizeY);
        this.positionX = newPosX;
        this.positionY = newPosY;
        this.draw(isStroke, color);
        this.drawShapeInside();
    }
 
}