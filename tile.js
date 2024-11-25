import { Rectangle } from "./rectangle.js";

export class Tile extends Rectangle{
   SPECIALBLOK = false;
   COLORTAB = [
		'#aaaaaa',  // <-- grey
		'forestgreen',
		'darkmagenta',
		'crimson',
		'lightskyblue', 
	];

   constructor(ctx, pos_x = 0, pos_y = 0, size = 0){
      super(ctx, pos_x, pos_y, size, size);
      this.size = size;
      this.shapeColor = new Array();
      this.setColors();
      this.shapeNumber = this.random(4);
   }

   ////////////////////////////////////////////////////////////////

   setShapeNumber = (num) =>{
      this.shapeNumber = num;
   }

   setColors = () =>{
      let r = this.random(this.COLORTAB.length - 1, 1);
      
      for (let i = 0; i < 4; i++) {
         this.shapeColor.push(this.COLORTAB[r]);
      }

      this.Color = this.COLORTAB[r];
   }

   //////////////////////////////////////////////////////////////

   getSpecialBlok = () =>{
      return this.SPECIALBLOK;
   }

   getShapeNumber = () =>{
      return this.shapeNumber;
   }

   getShapeColor = () =>{
      return this.shapeColor;
   }

   ///////////////////////////////////////////////////////////////

   isPosibleSet = (obj, way) =>{
      if(obj.getSpecialBlok()){
         if(way == 'left'){
            if(obj.getShapeColor()[2] == this.COLORTAB[0]){
               return true;
            }

            if(obj.getShapeColor()[2] == this.shapeColor[0]){
               return true;
            }
         }

         else if(way == 'top'){
            if(obj.getShapeColor()[3] == this.COLORTAB[0]){
               return true;
            }

            if(obj.getShapeColor()[3] == this.shapeColor[0]){
               return true;
            }
         }

         else if(way == 'right'){
            if(obj.getShapeColor()[0] == this.COLORTAB[0]){
               return true;
            }

            if( obj.getShapeColor()[0] == this.shapeColor[0]){
               return true;
            }
         }
            
         else if(way == 'bottom'){
            if(obj.getShapeColor()[1] == this.COLORTAB[0]){
               return true;
            }

            if(obj.getShapeColor()[1] == this.shapeColor[0]){
               return true;
            }
         }       
      }

      if(!obj.getSpecialBlok()){
         if(way == 'left'){
            if(this.shapeColor[0] == obj.getShapeColor()[2]){
               return true;
            }

            if(obj.getShapeNumber() == this.shapeNumber){
               return true;
            }
         }

         else if(way == 'top'){
            if(this.shapeColor[0] == obj.getShapeColor()[3]){
               return true;
            }

            if(obj.getShapeNumber() == this.shapeNumber){
               return true;
            }
         }

         else if(way == 'right'){
            if(this.shapeColor[0] == obj.getShapeColor()[0]){
               return true;
            }

            if(obj.getShapeNumber() == this.shapeNumber){
               return true;
            }
         }
            
         else if(way == 'bottom'){
            if(this.shapeColor[0] == obj.getShapeColor()[1]){
               return true;
            }

            if(obj.getShapeNumber() == this.shapeNumber){
               return true;
            }
         }       
      }

      return false;
   }

   //////////////////////////////////////////////////////////////

   drawShapeInside = () =>{
      this.ctx.fillStyle = "black";
      if(this.shapeNumber == 0){
         let x = this.x + this.size / 4;
         let y = this.y + this.size / 4;
         this.ctx.beginPath();
         this.ctx.moveTo(x, y);
         this.ctx.lineTo(x + this.size / 2, y);
         this.ctx.lineTo(x + this.size / 2, y + this.size / 2);
         this.ctx.lineTo(x, y + this.size / 2);
         this.ctx.lineTo(x, y);
         this.ctx.fill();
         this.ctx.closePath();
      }
      else if(this.shapeNumber == 1){
         let x = this.x + this.size / 2;
         let y = this.y + this.size / 4;
         this.ctx.beginPath();
         this.ctx.moveTo(x, y);
         this.ctx.lineTo(x + this.size / 3, y + this.size / 2);
         this.ctx.lineTo(x - this.size / 3, y + this.size / 2);
         this.ctx.lineTo(x, y);
         this.ctx.fill();
         this.ctx.closePath();
      }
      else if(this.shapeNumber == 2){
         let x = this.x + this.size / 2;
         let y = this.y + this.size / 4;
         this.ctx.beginPath();
         this.ctx.moveTo(x, y);
         this.ctx.lineTo(x + this.size / 4, y + this.size / 4);
         this.ctx.lineTo(x, y + this.size / 2);
         this.ctx.lineTo(x - this.size / 4, y + this.size / 4);
         this.ctx.lineTo(x, y);
         this.ctx.fill();
         this.ctx.closePath();
      }
      else if(this.shapeNumber == 3){
         let x = this.x + this.size / 2;
         let y = this.y + this.size / 2;
         this.ctx.beginPath();
         this.ctx.arc(x, y, this.size / 4, 0, 2 * Math.PI);
         this.ctx.fill();
         this.ctx.closePath();
      }
   }

   ////////////////////////////////////////////////////////////

   draw = () =>{
      super.draw();
      this.drawShapeInside();
   }
    
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//

export class SpecialTile extends Rectangle{
   SPECIALBLOK = true;
   COLORTAB = [
		'#aaaaaa',  // <-- grey
		'forestgreen',
		'darkmagenta',
		'crimson',
		'lightskyblue', 
	];

   constructor(ctx, pos_x = 0, pos_y = 0, size = 0){
      super(ctx, pos_x, pos_y, size, size);
      this.size = size;
      this.shapeColor = new Array();
     
   }

   setColors = (isfirst = false) =>{
      if(isfirst){
         for(let i = 0; i < 4; i++) {
            this.shapeColor.push(this.COLORTAB[0]);
         }
      }
      else{
         for(let i = 0; i < 4; i++) {
            this.shapeColor.push(this.COLORTAB[this.random(this.COLORTAB.length - 1)]);
         }
      }  
   }

   ////////////////////////////////////////////////////////////////////////

   getShapeColor = () =>{
      return this.shapeColor;
   }

   getSpecialBlok = () =>{
      return this.SPECIALBLOK;
   }

   ////////////////////////////////////////////////////////////

   isPosibleSet = (obj, way) =>{
      if(way == 'left'){
         if(obj.getShapeColor()[2] == this.COLORTAB[0] || this.shapeColor[0] == this.COLORTAB[0]){
            return true;
         }

         if(obj.getShapeColor()[2] == this.shapeColor[0]){
            return true;
         }
      }
      else if(way == 'top'){
            if(obj.getShapeColor()[3] == this.COLORTAB[0] || this.shapeColor[1] == this.COLORTAB[0]){
               return true;
            }

            if(obj.getShapeColor()[3] == this.shapeColor[1]){
               return true;
            }
      }

      else if(way == 'right'){
            if(obj.getShapeColor()[0] == this.COLORTAB[0] || this.shapeColor[2] == this.COLORTAB[0]){
               return true;
            }

            if(obj.getShapeColor()[0] == this.shapeColor[2]){
               return true;
            }
      } 
      else if(way == 'bottom'){
         if(obj.getShapeColor()[1] == this.COLORTAB[0] || this.shapeColor[3] == this.COLORTAB[0]){
            return true;
         }

         if(obj.getShapeColor()[1] == this.shapeColor[3]){
            return true;
         }
      }

      return false;
   }

   ////////////////////////////////////////////////////////////

   draw = () =>{
      this.ctx.fillStyle = this.shapeColor[0];
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
      this.ctx.lineTo(this.x, this.y + this.size);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.fillStyle = this.shapeColor[1];
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
      this.ctx.lineTo(this.x + this.size, this.y);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.fillStyle = this.shapeColor[2];
      this.ctx.beginPath();
      this.ctx.lineTo(this.x + this.size, this.y);
      this.ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
      this.ctx.lineTo(this.x + this.size, this.y + this.size);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.fillStyle = this.shapeColor[3];
      this.ctx.beginPath();
      this.ctx.lineTo(this.x + this.size, this.y + this.size);
      this.ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
      this.ctx.lineTo(this.x, this.y + this.size);
      this.ctx.fill();
      this.ctx.closePath();
   }
}
