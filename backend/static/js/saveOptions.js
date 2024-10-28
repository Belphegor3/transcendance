function saveOptionsB() {

    let playerName = 'Bot';
    const barSize = document.getElementById('barSize').value;
    const gamePoints = document.getElementById('points').value;
    const ballSize = document.getElementById('ballSize').value;

    
    const gameOptions = {
        playerName: playerName,
        barSize: barSize,
        gamePoints: gamePoints,
        ballSize: ballSize,
    };

    fetch('/api/game/options/save/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameOptions),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Erreur:', error));
}

function saveOptionsP() {

    let playerName = document.getElementById('playerName').value;
    const barSize = document.getElementById('barSizeP').value;
    const gamePoints = document.getElementById('pointsP').value;
    const ballSize = document.getElementById('ballSizeP').value;

    if (!playerName) {
        playerName = "Bot";
    }

    const gameOptions = {
        playerName: playerName,
        barSize: barSize,
        gamePoints: gamePoints,
        ballSize: ballSize,
    };

    fetch('/api/game/options/save/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameOptions),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Erreur:', error));
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
        player4Name = "Bot";
    }

    const gameOptions = {
        player1Name: player1Name,
        player2Name: player2Name,
        player3Name: player3Name,
        player4Name: player4Name,
        barSize: barSize,
        gamePoints: gamePoints,
        ballSize: ballSize,
    };

    fetch('/api/game/options/save/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameOptions),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Erreur:', error));
}