import {playground} from './domElements';
import {handler} from './gameplay';
import {isStartPositionSolvable} from './utils';

const size = 9;
let initialArr = [];

function startNewGame(){
    playground.innerHTML = '';
    generatePlayground();
    playground.addEventListener('touchstart', handler);
}

function generatePlayground(){
    let template = '';
    initialArr = randomizer(size);
    while (!isStartPositionSolvable(initialArr)) {
        initialArr = randomizer(size);
    }
    initialArr.forEach((item, i) => template += card(item, i));
    playground.insertAdjacentHTML("beforeend", template);
}

function randomizer(n){
    const arr = new Array(n).fill(true).map((item, i) => i);
    return arr.sort((a, b) => Math.random() - 0.5);
}

const card = (num, index)=> {
    if (num === 0){
        return `<div class="cell" id="cell-${index+1}"></div>`
    }else {
        return `<div class="cell" id="cell-${index+1}"><div class="card" id=${num}>${num}</div></div>`
    }
}

export {
    startNewGame,
    initialArr
}
