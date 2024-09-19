const game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor : "#FFFFFF",

    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,
    scorePlayer1 : 0,
    scorePlayer2 : 0,
    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,

    ball : {
        width : 12,
        height : 12,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        posRecX : 0,
        posRecY : 0,
        radius : 6,
        directionX : 0.5,
        directionY : -0.5,
        speed : 2,
        start : function() {
            this.posX = game.groundWidth / 2;
            this.posY = game.groundHeight / 2;
            this.posRecX = this.posX - this.radius;
            this.posRecY = this.posY - this.radius;
            this.height = this.width = this.radius * 2;
        },
        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
            this.posRecX = this.posX - this.radius;
            this.posRecY = this.posY - this.radius;
        },
        bounce : function() {
            if (this.posRecX > game.groundWidth - this.width|| this.posRecX < 0)
                this.directionX = -this.directionX;
            if (this.posRecY > game.groundHeight - this.height || this.posRecY < 0)
                this.directionY = -this.directionY;
        },
        collide : function(anotherItem){
            if (!(this.posRecX >= anotherItem.posX + anotherItem.width || this.posRecX <= anotherItem.posX - this.width || this.posRecY >= anotherItem.posY + anotherItem.height || this.posRecY <= anotherItem.posY - this.height)) {
                return true;
            }
            return false;
        }
    },

    playerOne : {
        width : 10,
        height : 80,
        color : "#FFFFFF",
        posX : 10,
        posY : 200,
        goUp : false,
        goDown : false,
        start : function(){
            this.posY = game.groundHeight / 2 - this.height / 2;
            this.goUp = false;
            this.goDown = false;
        }

    },

    playerTwo : {
        width : 10,
        height : 80,
        color : "#FFFFFF",
        posX : 680,
        posY : 200,
        goUp : false,
        goDown : false,
        start : function(){
            this.posY = game.groundHeight / 2 - this.height / 2;
            this.goUp = false;
            this.goDown = false;
        }
    },

    init : function() {
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined , 0, 0);
        game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FF0000", 10, 10);
        this.displayScore();

        this.playersBallLayer = game.display.createLayer("playerBall", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);
        game.display.drawTextInLayer(this.playersBallLayer, "PLAYERBALL", "10px Arial", "#FF0000", 100, 100);
        this.initialPosition();
        this.displayBall();
        this.displayPlayers();
        this.initKeyboard(game.controle.onKeyPush, game.controle.onKeyPull);
    },

    displayScore : function() {
        //game.display.drawCircleInLayer(this.scoreLayer, "blue", 60, 50, 6);
        game.display.drawTextInLayer(this.scoreLayer, this.scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, this.scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    displayBall : function() {
        //game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
        game.display.drawCircleInLayer(this.playersBallLayer, this.ball.color, this.ball.posX, this.ball.posY, this.ball.radius);
    },

    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },

    moveBall : function(){
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
    },

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    movePlayers : function() {
        if (game.playerOne.goUp && game.playerOne.posY > 0){
            game.playerOne.posY -= 5;
        }
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height){
            game.playerOne.posY += 5;
        }
        if (game.playerTwo.goUp && game.playerTwo.posY > 0){
            game.playerTwo.posY -= 5;
        }
        else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height){
            game.playerTwo.posY += 5;
        }
    },

    collideBallWithPlayersAndAction : function() {
        if (this.ball.collide(game.playerOne)) {
            game.ball.directionX = -game.ball.directionX;
        }
        if (this.ball.collide(game.playerTwo)) {
            game.ball.directionX = -game.ball.directionX;
        }
    },

    initialPosition : function(){
        this.ball.start();
        this.playerOne.start();
        this.playerTwo.start();
    },

    playerScoring : function() {
        if (this.ball.posRecX <= 0){
            this.clearLayer(this.scoreLayer);
            this.scorePlayer2 += 1;
            game.initialPosition()
            game.displayScore(this.scorePlayer1, this.scorePlayer2);
            game.ball.directionX = 1;
        }
        else if (this.ball.posRecX >= game.groundWidth - this.ball.width){
            this.clearLayer(this.scoreLayer);
            this.scorePlayer1 += 1;
            game.initialPosition();
            game.displayScore(this.scorePlayer1, this.scorePlayer2);
            game.ball.directionX = -1;
        }
    },

    winCondition : function(){
        if (this.scorePlayer1 == 5 || this.scorePlayer2 == 5)
            return (true);
        return(false);
    }
};