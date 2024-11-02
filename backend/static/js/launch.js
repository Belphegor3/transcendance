function loadGameOptions() {
    fetch('/api/game/options/')
        .then(response => response.json())
        .then(data => {
            initi(data.playerName, data.barSize, data.gamePoints, data.ballSize); // qui va devenir la fonction init qui aura donc des parametres
        })
        .catch(error => console.error('Erreur:', error));
}

function eraseGame() {
    game.clearLayer(game.playersBallLayer);
    document.body.removeChild(game.playersBallLayer.canvas);
    game.clearLayer(game.scoreLayer);
    document.body.removeChild(game.scoreLayer.canvas);
    game.clearLayer(game.groundLayer);
    document.body.removeChild(game.groundLayer.canvas);
}

function eraseGameWhilePlaying(){
    if (game.scorePlayer1 != game.winValue && game.scorePlayer2 != game.winValue)
    {
        game.windowChange = true;
    }
}

function launchGame() {
    let requestAnimId;

    let initiate = function() {
        game.reset();
        game.init();
        requestAnimId = window.requestAnimationFrame(main);
    };

    let main = function() {
        game.clearLayer(game.playersBallLayer);
        if (game.playerTwo.aiOption == true)
            game.ia.moveIa(game.playerTwo, game.ball);
        game.movePlayers();
        game.displayPlayers();
        game.moveBall();
        game.collideBallWithPlayersAndAction();
        game.playerScoring();

        if (game.winCondition() == false && game.windowChange == false) {
            requestAnimId = window.requestAnimationFrame(main);
        }
        if (game.winCondition() == true){
            sessionStorage.setItem('victory', game.winnerGame);
            alert(game.winnerGame + " won!");
            eraseGame();
            return;
        }
        if (game.windowChange == true)
        {
            this.eraseGame();
        }
    };

    initiate();
}

function launchTournament(onGameEnd) {
    let requestAnimId;

    let initiate = function() {
        game.reset();
        game.init();
        requestAnimId = window.requestAnimationFrame(main);
    };

    let main = function() {
        game.clearLayer(game.playersBallLayer);
        if (game.playerTwo.aiOption == true)
            game.ia.moveIa(game.playerTwo, game.ball);
        game.movePlayers();
        game.displayPlayers();
        game.moveBall();
        game.collideBallWithPlayersAndAction();
        game.playerScoring();

        if (game.winCondition() == false && game.windowChange == false) {
            requestAnimId = window.requestAnimationFrame(main);
        }
        else if (game.winCondition() == true) {
            window.cancelAnimationFrame(requestAnimId);
            sessionStorage.setItem('victory', game.winnerGame);

            if (typeof onGameEnd === 'function') {
                onGameEnd();
            }
            eraseGame();
        }
        else if (game.windowChange == true) {
            this.eraseGame();
        }
    };

    initiate();
}
