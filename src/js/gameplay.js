import {playground} from './domElements';
import {initialArr} from './playgroundGenerating';

const getBoundaries = field => {
    const {offsetTop, offsetLeft, clientHeight, clientWidth, clientTop, clientLeft} = field;

    const minLeft = offsetLeft + clientLeft;
    const maxLeft = offsetLeft + clientWidth;
    const minTop = offsetTop + clientTop;
    const maxTop = offsetTop + clientHeight;

    return {minLeft, maxLeft, minTop, maxTop};
}

const {minLeft, maxLeft, minTop, maxTop} = getBoundaries(playground);

 playground.addEventListener('touchstart', event => {
    const [targetEvent] = event.targetTouches;
    let {target} = targetEvent;

    if (!target.classList.contains('playground')) {
        while (target && !target.classList.contains('card')) {
            target = target.parentNode;
        }
        const emptyInd = initialArr.indexOf(0);
        const cardInd = initialArr.indexOf(parseInt(target.id, 10));

        if(getDirection(cardInd, emptyInd)){
            target.classList.add('draggable');
            const {left, top} = target.getBoundingClientRect();
            const shiftX = targetEvent.pageX;
            const shiftY = targetEvent.pageY;

            target.addEventListener('touchmove', moveAt);
            target.addEventListener('touchend', endMove);
            

            function moveAt (e) {
                const [firstTouch] = e.targetTouches;
                let newLeft = firstTouch.pageX - shiftX;
                let newTop = firstTouch.pageY - shiftY;

                this.style.left = newLeft + 'px';
                this.style.top = newTop + 'px';

                if (newLeft <= minLeft) {
                    newLeft = 0;
                }
                if (newLeft >= maxLeft ){
                    newLeft = clientWidth - this.offsetWidth;
                }
                if (newTop <= minTop){
                    newTop = 0;
                }
                if (newTop >= maxTop ){
                    newTop = clientHeight - this.offsetHeight;
                }
            }

            function endMove () {
                this.classList.remove('draggable');
                this.style = {};
                move(this);
                if(detectEndOfGame()) {
                    endGame()
                };
                this.removeEventListener('touchmove', moveAt);
                this.removeEventListener('touchend', endMove);
            }
        }
    }
 });

 function move (el) {
     const emptyIndex = initialArr.indexOf(0);
     const elId = parseInt(el.id, 10);
     const elIndex = initialArr.indexOf(elId);
     const emptyId = `cell-${emptyIndex+1}`;
     const emptyCell = document.getElementById(emptyId);
     console.dir(emptyCell);
    console.log(initialArr);
     el.parentNode.removeChild(el);
     emptyCell.appendChild(el);
    initialArr[elIndex] = 0;
    initialArr[emptyIndex] = elId;
    console.log(initialArr);
 }

 function getDirection (cardIndex, emptyIndex){
     if((cardIndex-emptyIndex) === 1 && (Math.floor(cardIndex/3) === Math.floor(emptyIndex/3))) return 'left';
     if((emptyIndex-cardIndex) === 1 && (Math.floor(cardIndex/3) === Math.floor(emptyIndex/3))) return 'right';
     if(((cardIndex-emptyIndex)===3)) return 'up';
     if(((emptyIndex-cardIndex)===3)) return 'down';
     return false;
 }

function detectEndOfGame(){
    const resultArr = initialArr.map((num, i) =>{
        if (num !== 0){
            return num === i+1;     
        }else{
            return i === initialArr.length-1;
        }
     })
    const verdict = resultArr.every(num => num === true);
    return verdict;
 }

function endGame () {
    const template = '<div class="game-end-popup">Well Done!</div>';
    playground.insertAdjacentHTML('beforeend', template);
}
