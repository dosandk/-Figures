import './main.scss';
import './favicon.ico';
import {startBtn} from './js/domElements';
import {startNewGame} from './js/playgroundGenerating';

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('serviceWorker.js')
    .then(registration => navigator.serviceWorker.ready)
    .then(registration => {
        console.log('Registration success', registration);
    })
    .catch(error => {
        console.error('Registration error', error);
    });
}

startNewGame();
startBtn.addEventListener('click', startNewGame);
