import './main.scss';
import {startBtn} from './js/domElements';
import {startNewGame} from './js/playgroundGenerating';

startNewGame();
startBtn.addEventListener('click', startNewGame);