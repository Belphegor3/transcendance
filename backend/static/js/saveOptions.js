function saveOptions(event) {
    event.preventDefault();

    let playerName = document.getElementById('playerName').value;
    const barSize = document.getElementById('gameBackground').value;
    const gamePoints = document.getElementById('gamePoints').value;
    const ballSize = document.getElementById('ballSize').value;

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
