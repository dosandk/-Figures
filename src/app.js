import './main.scss';
import {startBtn} from './js/domElements';
import {startNewGame} from './js/playgroundGenerating';

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('serviceWorker.js')
    .then(registration => navigator.serviceWorker.ready)
    .then(registration => {
        console.error('Registration success', registration);
    })
    .catch(error => {
        console.error('Registration error', error);
    });
}

startNewGame();
startBtn.addEventListener('click', startNewGame);
