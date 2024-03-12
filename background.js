export class Background{
    picture = new Image();
    constructor(ctx, position, imageSrc){
        this.ctx = ctx;
        this.position = position;
        this.picture.src = imageSrc;
        console.log(this.ctx);
        console.log(this.position);
        console.log(imageSrc);
        console.log(this.picture);
    }

    draw(){
        this.ctx.drawImage(this.picture, this.position[0], this.position[1], this.position[2], this.position[3]);
        console.log();
    }
}




//this.Picture.src = '/img01.jpg';
// this.Picture.onload = function(){
//     this.ctx.drawImage(this.Picture,0,0);   
// }