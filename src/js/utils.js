function getDirection (cardIndex, emptyIndex){
     if((cardIndex-emptyIndex) === 1 && (Math.floor(cardIndex/3) === Math.floor(emptyIndex/3))) return 'left';
     if((emptyIndex-cardIndex) === 1 && (Math.floor(cardIndex/3) === Math.floor(emptyIndex/3))) return 'right';
     if(((cardIndex-emptyIndex)===3)) return 'up';
     if(((emptyIndex-cardIndex)===3)) return 'down';
     return false;
 }

function move (el, arr) {
    const emptyIndex = arr.indexOf(0);
    const elId = parseInt(el.id, 10);
    const elIndex = arr.indexOf(elId);
    const emptyId = `cell-${emptyIndex+1}`;
    const emptyCell = document.getElementById(emptyId);
    el.parentNode.removeChild(el);
    emptyCell.appendChild(el);
    arr[elIndex] = 0;
    arr[emptyIndex] = elId;
}

function detectEndOfGame(arr){
    const resultArr = arr.map((num, i) =>{
        if (num !== 0){
            return num === i+1;     
        }else{
            return i === arr.length-1;
        }
     })
    
    const result = resultArr.every(num => num === true);
    return result;
}

export {
    getDirection,
    move,
    detectEndOfGame,
}
