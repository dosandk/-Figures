import {playground} from './domElements';

const playgroundMetrics = {
    offsetTop: playground.offsetTop,
    offsetLeft: playground.offsetLeft,
    clientHeight: playground.clientHeight,
    clientWidth: playground.clientWidth,
    clientTop: playground.clientTop,
    clientLeft: playground.clientLeft
};

const minLeft = playgroundMetrics.offsetLeft + playgroundMetrics.clientLeft;
const maxLeft = playgroundMetrics.offsetLeft + playgroundMetrics.clientWidth;
const minTop = playgroundMetrics.offsetTop + playgroundMetrics.clientTop;
const maxTop = playgroundMetrics.offsetTop + playgroundMetrics.clientHeight;

 playground.addEventListener('touchstart', event => {
    let {target} = event.targetTouches[0];

    if (!target.classList.contains('playground')) {
        while (target && !target.classList.contains('number')) {
            target = target.parentNode;
        }
    
        target.classList.add('draggable');
        const {left, top} = target.getBoundingClientRect();
        const shiftX = event.targetTouches[0].pageX - left;
        const shiftY = event.targetTouches[0].pageY - top;
        target.addEventListener("touchmove", moveAt);
        target.addEventListener("touchend", endMove);
        
        function moveAt (e) {
            const calcPosition = (coords, shift) =>e.targetTouches[0][coords] - shift + 'px';
            
            this.style.left = calcPosition('pageX', shiftX);
            this.style.top = calcPosition('pageY', shiftY);
        }

        function endMove (e) {
            let newX = e.changedTouches[0].clientX - shiftX;
            let newY = e.changedTouches[0].clientY - shiftY;

            if (newX <= minLeft) {
                newX = 0;
            }
            if (newX >= maxLeft ){
                newX = playgroundMetrics.clientWidth - this.offsetWidth;
            }
            if (newY <= minTop){
                newY = 0;
            }
            if (newY >= maxTop ){
                newY = playgroundMetrics.clientHeight - this.offsetHeight;
            }
            this.style.left = newX + 'px';
            this.style.top = newY + 'px';

            this.removeEventListener('touchmove', moveAt);
            this.removeEventListener('touchend', endMove);
        }
    }
 });