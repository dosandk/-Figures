import {domElements} from './domElements';
export {
    startNewGame
}

const size = 9;

function startNewGame(){
    domElements.playground.innerHTML = '';
    generatePlayground();
}

function generatePlayground(){
    const orderedNums = randomizer(size);
    let template = '';
    orderedNums.forEach(item => template += card(item));
    domElements.playground.insertAdjacentHTML("beforeend", template);
}

function randomizer(n){
    const arr = new Array(n).fill(true).map((item, i) => i);
    return arr.sort((a, b) => Math.random() - 0.5);
}

const card = num => {
    if (num === 0){
        return `<div class="card empty"></div>`
    }else {
        return `<div class="card number"><p>${num}</p></div>`
    }
}