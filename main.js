import { Game } from "./game.js";
import { GameMobile } from "./gameMobile.js";

const canvas = document.querySelector('[data-canv]');

let game;

if(window.screen.width < 880){
    game = new GameMobile(canvas);
    
}

if(window.screen.width >= 880){
    game = new Game(canvas);
}


game.play();
