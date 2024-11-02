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

        // 1/4 final
        const uniquePairs = generateUniquePairs();

        const winner1 = await playMatch(players[uniquePairs[0][0] - 1], players[uniquePairs[0][1] - 1]);
        alert(winner1 + " won!");
        const winner2 = await playMatch(players[uniquePairs[1][0] - 1], players[uniquePairs[1][1] - 1]);
        alert(winner2 + " won!");
        const winner3 = await playMatch(players[uniquePairs[2][0] - 1], players[uniquePairs[2][1] - 1]);
        alert(winner3 + " won!");
        const winner4 = await playMatch(players[uniquePairs[3][0] - 1], players[uniquePairs[3][1] - 1]);
        alert(winner4 + " won!");
        alert("Let's begin semi-finals!");

        // 1/2 final
        const winner5 = await playMatch(winner1, winner2);
        alert(winner5 + " won!");
        const winner6 = await playMatch(winner3, winner4);
        alert(winner6 + " won!");

        // Final
        alert("Here is the final");
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

