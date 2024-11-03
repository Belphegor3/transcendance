function generateUniquePairs() {
    const pairs = [];
    const usedNumbers = new Set();

    while (pairs.length < 4) {
        let num1 = Math.floor(Math.random() * 8) + 1;
        let num2 = Math.floor(Math.random() * 8) + 1;

        while (num1 === num2 || usedNumbers.has(num1) || usedNumbers.has(num2)) {
            num1 = Math.floor(Math.random() * 8) + 1;
            num2 = Math.floor(Math.random() * 8) + 1;
        }
        usedNumbers.add(num1);
        usedNumbers.add(num2);
        pairs.push([num1, num2]);
    }

    return pairs;
}

function setSessionTournament(){
    sessionStorage.setItem('ballSize', 'medium');
    sessionStorage.setItem('barSize', 'medium');
    sessionStorage.setItem('gamePoints', 5);
    sessionStorage.setItem('gamePoints', 5);
}

function handleTournament() {
    (async () => {
        const players = [
            document.getElementById('player1').value,
            document.getElementById('player2').value,
            document.getElementById('player3').value,
            document.getElementById('player4').value,
            document.getElementById('player5').value,
            document.getElementById('player6').value,
            document.getElementById('player7').value,
            document.getElementById('player8').value
        ];
        setSessionTournament();
        const uniquePairs = generateUniquePairs();

        const winner1 = await playMatch(players[uniquePairs[0][0] - 1], players[uniquePairs[0][1] - 1]);
        alert(winner1 + " won (" + game.scorePlayer1 + "-" + game.scorePlayer2 + ")!");
        const winner2 = await playMatch(players[uniquePairs[1][0] - 1], players[uniquePairs[1][1] - 1]);
        alert(winner2 + " won (" + game.scorePlayer1 + "-" + game.scorePlayer2 + ")!");
        const winner3 = await playMatch(players[uniquePairs[2][0] - 1], players[uniquePairs[2][1] - 1]);
        alert(winner3 + " won (" + game.scorePlayer1 + "-" + game.scorePlayer2 + ")!");
        const winner4 = await playMatch(players[uniquePairs[3][0] - 1], players[uniquePairs[3][1] - 1]);
        alert(winner4 + " won (" + game.scorePlayer1 + "-" + game.scorePlayer2 + ")!\nLet's begin semi-finals!");

        const winner5 = await playMatch(winner1, winner2);
        alert(winner5 + " won (" + game.scorePlayer1 + "-" + game.scorePlayer2 + ")!");
        const winner6 = await playMatch(winner3, winner4);
        alert(winner6 + " won (" + game.scorePlayer1 + "-" + game.scorePlayer2 + ")!\nHere is the final");

        const tournamentWinner = await playMatch(winner5, winner6);
        alert(tournamentWinner + " won the Tournament, Congratulations!");
    })();
}

async function playMatch(playerOneName, playerTwoName) {
    return new Promise((resolve) => {
        sessionStorage.setItem('playerOneName', playerOneName);
        sessionStorage.setItem('playerTwoName', playerTwoName);
        sessionStorage.setItem('gameMode', 2);

        launchTournament(() => {
            const winner = sessionStorage.getItem('victory');
            resolve(winner);
        });
    });
}

