function togglePlayerName() {
    const gameMode = document.getElementById('gameMode');
    const secondPlayer = document.getElementById('secondPlayer');
    
    if (!gameMode || !secondPlayer) {
        console.error('Elements not found in the DOM');
        return;
    }
    
    console.log('Selected game mode:', gameMode.value);
    
    if (gameMode.value === 'player') {
        secondPlayer.classList.remove('d-none');
    } else {
        secondPlayer.classList.add('d-none');
    }
}