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
