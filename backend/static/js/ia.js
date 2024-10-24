game.ia = {
    margeCenter : 10,
    margeFollow : 30,
    player : null,
    ball : null,
    setPlayerAndBall : function(player, ball) {
        this.player = player;
        this.ball = ball;
    },
    move : function(){
        if (this.ball.directionX == 1){
            if (this.player.originalPosition == "left" )
            {
                this.goCenter();
            }
            if (this.player.originalPosition == "right" && this.ball.posX >= game.groundWidth / 2)
            {
                this.followBall();
            }
        }
        else
        {
            if (this.player.originalPosition == "left" && this.ball.posX <= game.groundWidth / 2)
            {
                this.followBall();
            }
            if (this.player.originalPosition == "right")
            {
                this.goCenter();
            }
        }
    },

    goCenter : function(){
        if (this.player.originalPosition == "left")
        {
            game.playerOne.goDown = false;
            game.playerOne.goUp = false;
            if (this.player.posY + this.player.height / 2 > game.groundHeight / 2 + this.margeCenter)
                game.playerOne.goUp = true;
            else if (this.player.posY + this.player.height / 2 < game.groundHeight / 2 - this.margeCenter)
                game.playerOne.goDown = true;
        }
        if (this.player.originalPosition == "right")
        {
            game.playerTwo.goDown = false;
            game.playerTwo.goUp = false;
            if (this.player.posY + this.player.height / 2 > game.groundHeight / 2 + this.margeCenter)
                game.playerTwo.goUp = true;
            else if (this.player.posY + this.player.height / 2 < game.groundHeight / 2 - this.margeCenter)
                game.playerTwo.goDown = true;
        }
    },

    followBall : function(){
        if (this.player.originalPosition == "left")
        {
            game.playerOne.goDown = false;
            game.playerOne.goUp = false;
            if (this.player.posY > this.ball.posY + this.ball.height / 2 + this.margeFollow)
                game.playerOne.goUp = true;
            else if (this.player.posY < this.ball.posY - this.ball.height / 2 - this.margeFollow)
                game.playerOne.goDown = true;
        }
        if (this.player.originalPosition == "right")
        {
            game.playerTwo.goDown = false;
            game.playerTwo.goUp = false;
            if (this.player.posY > this.ball.posY + this.ball.height / 2 + this.margeFollow)
                game.playerTwo.goUp = true;
            else if (this.player.posY < this.ball.posY - this.ball.height / 2 - this.margeFollow)
                game.playerTwo.goDown = true;
        }
    }
    
}