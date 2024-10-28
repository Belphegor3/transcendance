function saveOptionsB() {
    const barSize = document.getElementById('barSize').value;
    const gamePoints = document.getElementById('gamePoints').value;
    const ballSize = document.getElementById('ballSize').value;

    sessionStorage.setItem('playerTwoName', 'Bot');
    sessionStorage.setItem('barSize', barSize);
    sessionStorage.setItem('gamePoints', gamePoints);
    sessionStorage.setItem('ballSize', ballSize);
    sessionStorage.setItem('gameMode', 1);
    // const gameOptions = {
    //     playerName: playerName,
    //     barSize: barSize,
    //     gamePoints: gamePoints,
    //     ballSize: ballSize,
    // };

    // fetch('/api/game/options/save/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(gameOptions),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => console.error('Erreur:', error));
}

function saveOptionsP() {

    let playerName = document.getElementById('playerName').value;
    const barSize = document.getElementById('barSizeP').value;
    const gamePoints = document.getElementById('gamePointsP').value;
    const ballSize = document.getElementById('ballSizeP').value;

    sessionStorage.setItem('playerTwoName', playerName);
    sessionStorage.setItem('barSize', barSize);
    sessionStorage.setItem('gamePoints', gamePoints);
    sessionStorage.setItem('ballSize', ballSize);
    sessionStorage.setItem('gameMode', 2);
    // const gameOptions = {
    //     playerName: playerName,
    //     barSize: barSize,
    //     gamePoints: gamePoints,
    //     ballSize: ballSize,
    // };

    // fetch('/api/game/options/save/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(gameOptions),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => console.error('Erreur:', error));
}

function saveOptionsM() {

    let player1Name = document.getElementById('player1Name').value;
    let player2Name = document.getElementById('player2Name').value;
    let player3Name = document.getElementById('player3Name').value;
    let player4Name = document.getElementById('player4Name').value;
    const barSize = document.getElementById('barSizeM').value;
    const gamePoints = document.getElementById('pointsM').value;
    const ballSize = document.getElementById('ballSizeM').value;

    if (!player4Name) {
        sessionStorage.setItem('gameMode', 3);
        player4Name = "Bot";
    }
    else
        sessionStorage.setItem('gameMode', 4);
    sessionStorage.setItem('playerOneName', player1Name);
    sessionStorage.setItem('playerTwoName', player2Name);
    sessionStorage.setItem('playerThreeName', player3Name);
    sessionStorage.setItem('playerFourName', player4Name);
    sessionStorage.setItem('barSize', barSize);
    sessionStorage.setItem('gamePoints', gamePoints);
    sessionStorage.setItem('ballSize', ballSize);

    // const gameOptions = {
    //     player1Name: player1Name,
    //     player2Name: player2Name,
    //     player3Name: player3Name,
    //     player4Name: player4Name,
    //     barSize: barSize,
    //     gamePoints: gamePoints,
    //     ballSize: ballSize,
    // };

    // fetch('/api/game/options/save/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(gameOptions),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => console.error('Erreur:', error));
}