class Player {
    #FIRST_CONFIG ={
        NAME: "PLAYER", 
        LIVE: 10,
        SCORE: 0,
        HIGH_SCORE: 0,
        TIME: 0,
    };

    POINT = 10;
    
    constructor(name = this.#FIRST_CONFIG.NAME){
        this.Name = name;
        this.Live = this.#FIRST_CONFIG.LIVE;
        this.Score = this.#FIRST_CONFIG.SCORE;
        this.HighScore =  this.#FIRST_CONFIG.HIGH_SCORE;
        this.Time = this.#FIRST_CONFIG.TIME;
    }

    addPoint = (multiplier = 1) => {
        this.Score += this.POINT * multiplier;
    }

    addTime = () =>{
        this.Time += 1;
    }

    /////////////////////////////////////////////////////////////

    deductLive = () => {
        if(this.Live > 0)
            this.Live--;
    } 

    /////////////////////////////////////////////////////////////

    saveScore = () => {
        this.HighScore = this.Score; 
    }

    /////////////////////////////////////////////////////////////

    getPoint = () => {
        return this.Score;
    }

    getLive = () => {
        return this.Live;
    }

    getTime = () => {
        return this.Time;
    }

    /////////////////////////////////////////////////////////////

    reset = () =>{
        this.saveScore();
        this.Live = this.#FIRST_CONFIG.LIVE;
        this.Score = this.#FIRST_CONFIG.SCORE;
        this.Time = this.#FIRST_CONFIG.TIME;
    }

}