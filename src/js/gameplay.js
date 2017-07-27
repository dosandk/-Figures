import {playground} from './domElements';
import {initialArr} from './playgroundGenerating';
import {getDirection, move, detectEndOfGame} from './utils';

 playground.addEventListener('touchstart', event => {
    const [targetEvent] = event.targetTouches;
    let {target} = targetEvent;

    if (!target.classList.contains('playground')) {
        while (target && !target.classList.contains('card')) {
            target = target.parentNode;
        }
        const emptyInd = initialArr.indexOf(0);
        const cardInd = initialArr.indexOf(parseInt(target.id, 10));
        const direction = getDirection(cardInd, emptyInd);
        if(direction){
            target.classList.add('draggable');
            const {left, top, width, height} = target.getBoundingClientRect();
            const shiftX = targetEvent.pageX;
            const shiftY = targetEvent.pageY;

            target.addEventListener('touchmove', moveAt);
            target.addEventListener('touchend', endMove);
            
            function moveAt (e) {
                const [firstTouch] = e.targetTouches;
                let newLeft, newTop;

                if (direction === 'down') {
                    newLeft = 0;
                    newTop = Math.max(0, Math.min(firstTouch.pageY - shiftY, height));
                }

                if (direction === 'up') {
                    newLeft = 0;
                    newTop = Math.min(0, Math.max(firstTouch.pageY - shiftY, -height));
                }

                if (direction === 'right') {
                    newTop = 0;
                    newLeft = Math.max(0, Math.min(firstTouch.pageX - shiftX, width));
                }

                if (direction === 'left') {
                    newTop = 0;
                    newLeft = Math.min(0, Math.max(firstTouch.pageX - shiftX, -width));
                }

                this.style.left = newLeft + 'px';
                this.style.top = newTop + 'px';
            }

            function endMove () {
                if(
                    direction === 'down' && parseInt(this.style.top, 10) > height/2 ||
                    direction === 'up' && parseInt(this.style.top, 10) < -height/2 ||
                    direction === 'right' && parseInt(this.style.left, 10) > width/2 ||
                    direction === 'left' && parseInt(this.style.left, 10) < -width/2
                ){
                    move(this, initialArr);
                    if(detectEndOfGame(initialArr)) {
                        endGame()
                    };
                }
                
                this.classList.remove('draggable');
                this.style = {};
                this.removeEventListener('touchmove', moveAt);
                this.removeEventListener('touchend', endMove);
            }
        }
    }
 });

function endGame () {
    const template = '<div class="game-end-popup">Well Done!</div>';
    playground.insertAdjacentHTML('beforeend', template);
}
