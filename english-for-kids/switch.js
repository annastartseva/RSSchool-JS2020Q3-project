function toggleTrainPlayMode(state, cardsContainer) {
    console.log('function setTrainState');
    const modeToggleOnCards = document.querySelectorAll('.cards__mode');
    const resultContainer = document.querySelector('.play__result');
    const panelStartGame = document.querySelector('.panel_start-game');

    console.log('state.currentPage ' + state.currentPage);

    modeToggleOnCards.forEach(item => item.classList.toggle('play'));
    resultContainer.classList.toggle('none');
    panelStartGame.classList.toggle('open');

    if (cardsContainer.firstChild) {
        const card = document.querySelectorAll('.cards__theme');
        const footerToggle = document.querySelectorAll('.front-footer');
        const imageSizeChange = document.querySelectorAll('.front-image');

        card.forEach(item => item.classList.remove('correct'));
        footerToggle.forEach(item => item.classList.toggle('none'));
        imageSizeChange.forEach(item => item.classList.toggle('size100'));
    }
};

function switchStateMenu(body, mainMenu, burgerMenuButton, menuBlackout) {
    body.classList.toggle('stop-scroll');
    mainMenu.classList.toggle('show');
    burgerMenuButton.classList.toggle('open');
    menuBlackout.classList.toggle('active');

}

function startGameButtonToggle(startGameButton, repeatAudioButton) {
    startGameButton.classList.toggle('none');
    repeatAudioButton.classList.toggle('none');
};

export { toggleTrainPlayMode, switchStateMenu, startGameButtonToggle };