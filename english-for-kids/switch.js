function toggleTrainPlayMode(state) {
    console.log('function setTrainState');

    if (state.currentPage === 'main') {
        const modeToggleOnCards = document.querySelectorAll('.cards__mode');
        console.log('state.currentPage ' + state.currentPage);
        modeToggleOnCards.forEach(item => item.classList.toggle('play'));
    }
}


export { toggleTrainPlayMode };