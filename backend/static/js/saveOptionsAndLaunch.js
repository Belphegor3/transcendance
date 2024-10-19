function saveOptionsAndLaunch(event) {
    event.preventDefault();
    customModal.hide();
    saveOptions();
    launchGame();
}