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
        const footerToggle = document.querySelectorAll('.front-footer');
        const imageSizeChange = document.querySelectorAll('.front-image');

        footerToggle.forEach(item => item.classList.toggle('none'));
        imageSizeChange.forEach(item => item.classList.toggle('size100'));
    }
};

function switchStateMenu(body, mainMenu, burgerMenuButton) {
    body.classList.toggle('stop-scroll');
    mainMenu.classList.toggle('show');
    burgerMenuButton.classList.toggle('open');
}
export { toggleTrainPlayMode, switchStateMenu };