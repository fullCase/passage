const canv = document.getElementById("canvas");
const bg = document.getElementById("bg");
const rows = 8;
const columns = 12;
const borderWeight = 3;
const squareSideSize = 70;
const gameWidth = columns * (squareSideSize + borderWeight);
const gameBanner = 2 * (squareSideSize + borderWeight);
const gameHeight = rows * (squareSideSize +  borderWeight) + gameBanner;


let gameArr = [];
let figureArray = [];
let figureIterator = 0;

canv.width = gameWidth;
canv.height = gameHeight;

class Shape{
   borderColor = "black";
   gameArrColors = ['silver', 'red', 'blue', 'green', 'purple'];

   constructor(canv, posArr = [0, 0], shapeSide = [50, 50], borderWeight, colorNumArr = [0], shapeNum, id){
      this.canv = canv;
      this.ctx = canv.getContext('2d');
      this.posArr = posArr;
      this.shapeSide = shapeSide;
      this.borderWeight = borderWeight;
      this.colorNumArr = colorNumArr;
      this.shapeNum = shapeNum;
      this.id = id;
      if(this.colorNumArr.length > 1){
         this.left = this.colorNumArr[0];
         this.bottom = this.colorNumArr[1];
         this.right = this.colorNumArr[2];
         this.top = this.colorNumArr[3];
      }
      else
         this.left = this.bottom = this.right = this.top = this.colorNumArr[0];
   }

   changeShapeSide(a, b){
      this.shapeSide = [a, b];
   }

   changeShapePos(x, y){
      this.posArr = [x, y];
   }

   setFillColor(){
      if(this.colorNumArr.length == 1){
         this.ctx.fillStyle = this.gameArrColors[this.colorNumArr[0]];
         return true;
      }
      return false;
   }

   drawTriangleShape(){
      this.ctx.strokeStyle = this.borderColor;
      this.ctx.lineWidth = 1;

      this.ctx.fillStyle = this.gameArrColors[this.colorNumArr[0]];
      this.ctx.beginPath();
      this.ctx.moveTo(this.posArr[0], this.posArr[1]);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / 2, this.posArr[1] +  this.shapeSide[0] / 2);
      this.ctx.lineTo(this.posArr[0], this.posArr[1] + this.shapeSide[0]);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
      
      this.ctx.fillStyle = this.gameArrColors[this.colorNumArr[1]];
      this.ctx.beginPath();
      this.ctx.moveTo(this.posArr[0], this.posArr[1] + this.shapeSide[0]);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / 2, this.posArr[1] +  this.shapeSide[0] / 2);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0], this.posArr[1] + this.shapeSide[0]);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = this.gameArrColors[this.colorNumArr[2]];
      this.ctx.beginPath();
      this.ctx.moveTo(this.posArr[0] + this.shapeSide[0], this.posArr[1] + this.shapeSide[0]);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / 2, this.posArr[1] +  this.shapeSide[0] / 2);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0], this.posArr[1]);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = this.gameArrColors[this.colorNumArr[3]];
      this.ctx.beginPath();
      this.ctx.moveTo(this.posArr[0] + this.shapeSide[0], this.posArr[1]);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / 2, this.posArr[1] +  this.shapeSide[0] / 2);
      this.ctx.lineTo(this.posArr[0], this.posArr[1]);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
   }

   //
   //     draw Shape 

   drawSquareFigure(){
      let x = 4;
      this.ctx.fillStyle = this.borderColor;
      this.ctx.fillRect(this.posArr[0] + this.shapeSide[0] / x, this.posArr[1] + this.shapeSide[0] / x, this.shapeSide[0] - (2 * this.shapeSide[0] / x), this.shapeSide[0] - (2 * this.shapeSide[0] / x)); 
   }

   drawCircleFigure(){
      this.ctx.fillStyle = this.borderColor;
      this.ctx.beginPath();
      this.ctx.arc(this.posArr[0] + this.shapeSide[0] / 2, this.posArr[1] + this.shapeSide[0] / 2, this.shapeSide[0] / 4, 0, 2 * Math.PI);
      this.ctx.fill();
   }

   drawRombusFigure(){
      let x = 4;
      this.ctx.fillStyle = this.borderColor;
      this.ctx.beginPath();
      this.ctx.moveTo(this.posArr[0] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)) / 2, this.posArr[1] + this.shapeSide[0] / x);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / x + this.shapeSide[0] - (2 * this.shapeSide[0] / x), this.posArr[1] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)) / 2);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)) / 2, this.posArr[1] + this.shapeSide[0] / x + this.shapeSide[0] - (2 * this.shapeSide[0] / x));
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / x, this.posArr[1] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)) / 2);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
   }

   drawTriangleFigure(){
      let x = 4;
      this.ctx.fillStyle = this.borderColor;
      this.ctx.beginPath();
      this.ctx.moveTo(this.posArr[0] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)) / 2, this.posArr[1] + this.shapeSide[0] / x);
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / x + this.shapeSide[0] - (2 * this.shapeSide[0] / x), this.posArr[1] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)));
      this.ctx.lineTo(this.posArr[0] + this.shapeSide[0] / x, this.posArr[1] + this.shapeSide[0] / x + (this.shapeSide[0] - (2 * this.shapeSide[0] / x)));
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
   }


   drawStroke(){
      this.ctx.lineWidth = this.borderWeight;
      this.ctx.strokeStyle = this.borderColor;
      this.ctx.strokeRect(this.posArr[0], this.posArr[1], this.shapeSide[0], this.shapeSide[1]);
   }

   create(){
      this.setFillColor();
      this.ctx.fillRect(this.posArr[0], this.posArr[1], this.shapeSide[0], this.shapeSide[1]);
      if(!this.setFillColor()){
         this.drawTriangleShape();
         return;
      } 
      switch(this.shapeNum){
         case 0: this.drawSquareFigure(); break;
         case 1: this.drawCircleFigure(); break;
         case 2: this.drawRombusFigure(); break;
         case 3: this.drawTriangleFigure(); break;
         default: break;
      }   
   }
}

const createBackground = (d, bgImage, width, height, sideSize, border, row = 8) =>{
   d.ctx.drawImage(bgImage, 0, height - row * (sideSize + border), width, row * (sideSize + border));
}

const createCrissCross = (d, width, height, sideSize, border, row = 8, col = 12) =>{
   d.changeShapeSide(width + border, sideSize + border);

   for(let i = 1; i < row + 1; i++){
      d.changeShapePos(-border, height - i * (sideSize + border));
      d.drawStroke();
   }

   d.changeShapeSide(sideSize + border, height - (sideSize + border));

   for(let i = 1; i < col + 1; i++){
      d.changeShapePos(width - i * (sideSize + border), height - row * (sideSize + border));
      d.drawStroke();
   }
}

const createWindowForSqure = (d, width, height, sideSize, border, row = 8) =>{
   let x = width / 2 - sideSize / 2 - border;
   let y = height - row * (sideSize + 2 * border);
   d.changeShapePos(x, y / 2 - sideSize / 2 - border);
   d.changeShapeSide(sideSize + border, sideSize + border);
   d.create();
   d.drawStroke();
}

const getMousePosition = (e) =>{
   return [e.x, e.y];
}

const setArrayPosition = (func, width, height, sideSize, border) =>{
   let c = (window.innerWidth - width) / 2;
   let c2 = (window.innerHeight- height) / 2 + 2 * (sideSize + border); 
   let d = (func[0] - c) / (sideSize + border);
   let d1 = (func[1] - c2) / (sideSize + border);
   return [Math.floor(d), Math.floor(d1)];
}

const isPossibleSquareSetUp = (func, arr, row) =>{
   if(arr[func[1]][func[0]] == 0){
      if(func[1] == 0 && func[0] > 0){
         if(arr[func[1]+ 1][func[0]] > 0 || arr[func[1]][func[0] + 1] > 0 || arr[func[1]][func[0] - 1] > 0)
            return true;
      }
      else if(func[1] == 0 && func[0] == 0){
         if(arr[func[1]+ 1][func[0]] > 0 || arr[func[1]][func[0] + 1] > 0)
            return true;
      }
      else if(func[1] == row - 1 && func[0] > 0){
         if(arr[func[1] - 1][func[0]] > 0 || arr[func[1]][func[0] + 1] > 0 || arr[func[1]][func[0] - 1] > 0)
            return true;
      }
      else if(func[1] == row - 1 && func[0] == 0){
         if(arr[func[1] - 1][func[0]] > 0 || arr[func[1]][func[0] + 1] > 0 || arr[func[1]][func[0] - 1] > 0)
            return true;
      }
      else if(func[1] > 0 && func[0] > 0){
         if(arr[func[1]+ 1][func[0]] > 0 || arr[func[1]][func[0] + 1] > 0 || arr[func[1]][func[0] - 1] > 0 || arr[func[1] - 1][func[0]] > 0)
            return true;
      }
      else if(func[1] > 0 && func[0] == 0){
         if(arr[func[1]+ 1][func[0]] > 0 || arr[func[1]][func[0] + 1] > 0 || arr[func[1] - 1][func[0]] > 0)
            return true;
      }
   }
   return false;
}

const checkIfLineFull = (row, col, mainGameArr) =>{
   let x = [];
   let vertical = -1;
   let horizontal = -1;
   for(let i = 0; i < row; i++){
      for(let j = 0; j < col; j++){
         if(mainGameArr[i][j] > 0)
            x.push(true);
         else
            x.push(false);
      }
      // console.log(x);
      if(!x.includes(false))
         horizontal = i;
      x = [];
   }
   
   for(let i = 0; i < col; i++){
      for(let j = 0; j < row; j++){
         if(mainGameArr[j][i] > 0)
            x.push(true);
         else
            x.push(false);
      }
      console.log(x);
      if(!x.includes(false))
         vertical = i;
      x = [];
   }

   return [horizontal, vertical];

}

const createGameArea = (d, bgImage, width, height, sideSize, border, row = 8, col = 12) =>{
   let r, r1;
   r = Math.random() * 8 + 2;
   r1 = Math.random() * 4 + 2;
   let x = width / 2 - sideSize / 2 - border;
   let y = height - row * (sideSize + 2 * border);
   createWindowForSqure(d, width, height, sideSize, border);
   createBackground(d, bgImage, width, height, sideSize, border, row);
   createCrissCross(d, width, height, sideSize, border, row, col);
   figureIterator++;
   figureArray.push(new Shape(canv, [0, 0], [sideSize, sideSize], border, [0,0,0,0], 3, figureIterator));
   figureArray[figureArray.length - 1].changeShapePos(canv.clientLeft + Math.floor(r) * (sideSize + border), canv.clientTop + gameBanner + Math.floor(r1) * (sideSize + border));
   figureArray[figureArray.length - 1].create();
   gameArr[Math.floor(r1)][Math.floor(r)] = figureArray[figureArray.length - 1].id;
   figureIterator++;
   figureArray.push(new Shape(canv, [x + 1, y / 2 - sideSize / 2 - 1], [squareSideSize, squareSideSize], borderWeight, colorRandGenerator(), figureRandGenerator(), figureIterator));
   figureArray[figureArray.length - 1].create();
}

const createGameArea2 = (d, bgImage, width, height, sideSize, border, row = 8, col = 12) =>{
   createWindowForSqure(d, width, height, sideSize, border);
   createBackground(d, bgImage, width, height, sideSize, border, row);
   createCrissCross(d, width, height, sideSize, border, row, col);
}

const resetGameArr = (arr, row, col) =>{
   for(let i = 0; i < row; i++){
      arr.push([]);
      for(let j = 0; j < col; j++)
         arr[i][j] = 0;
   }
}

const colorRandGenerator = () =>{
   let x = Math.random();
   if(x > 0.88)
      return [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
   return [Math.floor(Math.random() * 4 + 1)];
}

const figureRandGenerator = () =>{
   return Math.floor(Math.random() * 3); 
}

function a(fArr, mainGameArr, side, r){
   // console.log(r);
   if(side == "left"){
      if(fArr[fArr.length - 1].left == fArr[mainGameArr[r[1]][r[0] - 1] - 1].right || fArr[mainGameArr[r[1]][r[0] - 1] - 1].right == 0 ||
         fArr[fArr.length - 1].left == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1]][r[0] - 1] - 1].shapeNum)
            return true;
         else
            return false;
   }
   if(side == "bottom"){
      if(fArr[fArr.length - 1].bottom == fArr[mainGameArr[r[1] + 1][r[0]] - 1].top || fArr[mainGameArr[r[1] + 1][r[0]] - 1].top == 0 ||
         fArr[fArr.length - 1].bottom == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1] + 1][r[0]] - 1].shapeNum)
            return true;
         else
            return false;
   }
   if(side == "right"){
      if(fArr[fArr.length - 1].right == fArr[mainGameArr[r[1]][r[0] + 1] - 1].left || fArr[mainGameArr[r[1]][r[0] + 1] - 1].left == 0 ||
         fArr[fArr.length - 1].right == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1]][r[0] + 1] - 1].shapeNum)
            return true;
         else
            return false;
   }
   if(side == "top"){
      if(fArr[fArr.length - 1].top == fArr[mainGameArr[r[1] - 1][r[0]] - 1].bottom || fArr[mainGameArr[r[1] - 1][r[0]] - 1].bottom == 0 ||
         fArr[fArr.length - 1].top == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1] - 1][r[0]] - 1].shapeNum)
            return true;
         else
            return false;
   }
   return false;
}

let px = 100;

function paint(i,j, sideSize){
   figureArray[gameArr[i][j] - 1].ctx.clearRect(0,0, px, px);
   px--;
   figureArray[gameArr[i][j] - 1].ctx.fillRect(0,0, px, px);
 
   window.requestAnimationFrame(paint);
}

const gameMainFunc = (d, mainGameArr, bgImage, width, height, sideSize, border, row = 8, col = 12, fArr) =>{
   resetGameArr(mainGameArr, row, col);
   createGameArea(d, bgImage, width, height, sideSize, border, row, col);
   let x = width / 2 - sideSize / 2 - border;
   let y = height - row * (sideSize + 2 * border);

   canv.addEventListener("click", (e) => {
      let r = setArrayPosition(getMousePosition(e), width, height, sideSize, border);
      if(isPossibleSquareSetUp(r, mainGameArr, row)){
         let setSide = [];
         if(r[0] - 1 >= 0 && mainGameArr[r[1]][r[0] - 1] != 0)
            setSide.push(a(fArr, mainGameArr, "left", r));
         else
            setSide.push(true);
         if(r[0] + 1 <= (col - 1) && mainGameArr[r[1]][r[0] + 1] != 0)
            setSide.push(a(fArr, mainGameArr, "right", r));
         else
            setSide.push(true);
         if(r[1] - 1 >= 0 && mainGameArr[r[1] - 1][r[0]] != 0)
            setSide.push(a(fArr, mainGameArr, "top", r));
         else
            setSide.push(true);
         if(r[1] + 1 <= (row - 1) && mainGameArr[r[1] + 1][r[0]] != 0)
            setSide.push(a(fArr, mainGameArr, "bottom", r));
         else
            setSide.push(true);

         if(!setSide.includes(false)){
            fArr[fArr.length - 1].changeShapePos(canv.clientLeft + r[0] * (sideSize + border), canv.clientTop + gameBanner + r[1] * (sideSize + border));
            fArr[fArr.length - 1].create();
            mainGameArr[r[1]][r[0]] = fArr[fArr.length - 1].id;
            figureIterator++;
            fArr.push(new Shape(canv, [x + 1, y / 2 - sideSize / 2 - 1], [squareSideSize, squareSideSize], borderWeight, colorRandGenerator(), figureRandGenerator(), figureIterator));
            fArr[fArr.length - 1].create();
         }  

         let b = checkIfLineFull(row, col, mainGameArr);
         if(b[0] > -1 && b[1] > -1){
            for(let i = 0; i < col; i++){
               figureArray[gameArr[b[0]][i] - 1].ctx.clearRect( figureArray[gameArr[b[0]][i] - 1].posArr[0] , figureArray[gameArr[b[0]][i] - 1].posArr[1] , sideSize, sideSize);
               gameArr[b[0]][i] = 0;
               gameArr[i][b[1]] = 0;
            }
            createGameArea2(d, bgImage, width, height, sideSize, border, row, col);
               for(let i = 0; i < 8; i++)
                  for(let j = 0; j < 12; j++){
                     if(gameArr[i][j] > 0)
                        figureArray[gameArr[i][j] - 1].create();
               }
         }
         else if(b[0] > -1){
            for(let i = 0; i < col; i++){   
               figureArray[gameArr[b[0]][i] - 1].ctx.clearRect( figureArray[gameArr[b[0]][i] - 1].posArr[0] , figureArray[gameArr[b[0]][i] - 1].posArr[1] , sideSize, sideSize);
               gameArr[b[0]][i] = 0;
            }
            createGameArea2(d, bgImage, width, height, sideSize, border, row, col);
            for(let i = 0; i < 8; i++)
               for(let j = 0; j < 12; j++){
                  if(gameArr[i][j] > 0)
                     figureArray[gameArr[i][j] - 1].create();
               }
            figureIterator++;
            fArr.push(new Shape(canv, [x + 1, y / 2 - sideSize / 2 - 1], [squareSideSize, squareSideSize], borderWeight, colorRandGenerator(), figureRandGenerator(), figureIterator));
            fArr[fArr.length - 1].create();
         }

         else if(b[1] > -1){
            for(let i = 0; i < row; i++){
               figureArray[gameArr[i][b[1]] - 1].ctx.clearRect(figureArray[gameArr[i][b[1]] - 1].posArr[0] , figureArray[gameArr[i][b[1]] - 1].posArr[1] , sideSize, sideSize);
               gameArr[i][b[1]] = 0;
            }
            createGameArea2(d, bgImage, width, height, sideSize, border, row, col);
            for(let i = 0; i < 8; i++)
                  for(let j = 0; j < 12; j++){
                     if(gameArr[i][j] > 0)
                        figureArray[gameArr[i][j] - 1].create();
            }
            figureIterator++;
            fArr.push(new Shape(canv, [x + 1, y / 2 - sideSize / 2 - 1], [squareSideSize, squareSideSize], borderWeight, colorRandGenerator(), figureRandGenerator(), figureIterator));
            fArr[fArr.length - 1].create();
         }            
      }   
   });
}

gameMainFunc(new Shape(canv, undefined, undefined, borderWeight, undefined, undefined, undefined), gameArr, bg, gameWidth, gameHeight, squareSideSize, borderWeight, rows, columns, figureArray);

// 
// figureArray[1].changeShapePos(canv.clientLeft + (sideSize + border), canv.clientTop + gameBanner + (sideSize + border));

// fArr[fArr.length - 1].changeShapePos(canv.clientLeft + r[0] * (sideSize + border), canv.clientTop + gameBanner + r[1] * (sideSize + border));
// fArr[fArr.length - 1].create();
// mainGameArr[r[1]][r[0]] = figureArray[figureArray.length - 1].id;
// figureIterator++;
// fArr.push(new Shape(canv, [x + 1, y / 2 - sideSize / 2 - 1], [squareSideSize, squareSideSize], borderWeight, colorRandGenerator(), figureRandGenerator(), figureIterator));
// fArr[fArr.length - 1].create();
// console.log("figureArray[figureArray.length - 1].left: " + figureArray[figureArray.length - 1].left);
// console.log("figureArray[arr[r[1]][r[0] - 1]].right: " + figureArray[mainGameArr[r[1]][r[0] - 1] - 1].right);
// console.log("arr[r[1]][r[0] - 1] " + mainGameArr[r[1]][r[0] - 1]); 


// function s(mainGameArr, fArr){
//    let a = [];
//    if(fArr.indexOf(fArr[mainGameArr[r[1]][r[0] + 1]]))
//       a.push(1);
//    else
//       a.push(0);
//    if(fArr.indexOf(fArr[mainGameArr[r[1] + 1][r[0]]]))
//       a.push(1);
//    else
//       a.push(0);
//    if(fArr.indexOf(fArr[mainGameArr[r[1]][r[0] - 1]]))
//       a.push(1);
//    else
//       a.push(0);
//    if(fArr.indexOf(fArr[mainGameArr[r[1] - 1][r[0]]]))
//       a.push(1);
//    else
//       a.push(0);

//    if(a[0] == 1 && a[1] == 0 && a[2] == 0 && a[3] == 0){
//       if(fArr[fArr.length - 1].right == fArr[mainGameArr[r[1]][r[0] + 1] - 1].left || fArr[mainGameArr[r[1]][r[0] + 1] - 1].left == 0 ||
//          fArr[fArr.length - 1].right == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1]][r[0] + 1] - 1].shapeNum)
//          return true;
//       else
//          return false;
//    }
  
//    if(a[0] == 0 && a[1] == 1 && a[2] == 0 && a[3] == 0){
//       if(fArr[fArr.length - 1].bottom == fArr[mainGameArr[r[1] + 1][r[0]] - 1].top || fArr[mainGameArr[r[1] + 1][r[0]] - 1].top == 0 ||
//          fArr[fArr.length - 1].bottom == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1] + 1][r[0]] - 1].shapeNum)
//          return true;
//       else
//          return false;
//    }

//    if(a[0] == 0 && a[1] == 0 && a[2] == 1 && a[3] == 0){
//       if(fArr[fArr.length - 1].left == fArr[mainGameArr[r[1]][r[0] - 1] - 1].right || fArr[mainGameArr[r[1]][r[0] - 1] - 1].right == 0 ||
//          fArr[fArr.length - 1].left == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1]][r[0] - 1] - 1].shapeNum)
//          return true;
//       else
//          return false;
//    }

//    if(a[0] == 0 && a[1] == 0 && a[2] == 0 && a[3] == 1){
//       if(fArr[fArr.length - 1].top == fArr[mainGameArr[r[1] - 1][r[0]] - 1].bottom || fArr[mainGameArr[r[1] - 1][r[0]] - 1].bottom == 0 ||
//          fArr[fArr.length - 1].top == 0 || fArr[fArr.length - 1].shapeNum == fArr[mainGameArr[r[1] - 1][r[0]] - 1].shapeNum)
//          return true;
//       else
//          return false;
//    }
// }


// if(r[0] - 1 >= 0 && mainGameArr[r[1]][r[0] - 1] != 0)
// setSide.push(a(fArr, mainGameArr, "left", r));
// else
// setSide.push(true);

// if(r[0] + 1 <= 11 && mainGameArr[r[1]][r[0] + 1] != 0)
// setSide.push(a(fArr, mainGameArr, "right", r));
// else
// setSide.push(true);

// if(r[1] - 1 >= 0 && mainGameArr[r[1] - 1][r[0]] != 0)
// setSide.push(a(fArr, mainGameArr, "top", r));
// else
// setSide.push(true);
