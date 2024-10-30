function loadGameOptions() {
    fetch('/api/game/options/')
        .then(response => response.json())
        .then(data => {
            initi(data.playerName, data.barSize, data.gamePoints, data.ballSize); // qui va devenir la fonction init qui aura donc des parametres
        })
        .catch(error => console.error('Erreur:', error));
}

function resetGame() {
    game.reset();
}

function eraseGameWhilePlaying() {
    if (!(game.scorePlayer1 == game.winValue || game.scorePlayer2 == game.winValue)) {
        game.clearLayer(game.playersBallLayer);
        document.body.removeChild(game.playersBallLayer.canvas);
        game.clearLayer(game.scoreLayer);
        document.body.removeChild(game.scoreLayer.canvas);
        game.clearLayer(game.groundLayer);
        document.body.removeChild(game.groundLayer.canvas);
    }
}

function launchGame() {
    // const gameMode = localStorage.getItem('gameMode');
    // const playerName = localStorage.getItem('playerName');
    // const gameBackground = localStorage.getItem('gameBackground');
    // const gamePoints = localStorage.getItem('gamePoints');
    // const ballSize = localStorage.getItem('ballSize');
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

        if (game.winCondition() == false) {
            requestAnimId = window.requestAnimationFrame(main);
        }
    };

    initiate();
}