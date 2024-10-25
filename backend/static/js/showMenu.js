function showMenu(option) {
    document.getElementById('menu-options').classList.add('hidden');
    if (option === 'player') {
        history.pushState({ section: section }, null, `#vsPlayer`);
        document.getElementById('player-options').classList.remove('hidden');
    } else if (option === 'bot') {
        history.pushState({ section: section }, null, `#vsBot`);
        document.getElementById('bot-options').classList.remove('hidden');
    }
}