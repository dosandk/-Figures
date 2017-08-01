/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var playground = exports.playground = document.querySelector('.playground');
var startBtn = exports.startBtn = document.querySelector('.start-btn');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialArr = exports.startNewGame = undefined;

var _domElements = __webpack_require__(0);

var _gameplay = __webpack_require__(5);

var size = 9;
var initialArr = [];

function startNewGame() {
    _domElements.playground.innerHTML = '';
    generatePlayground();
    _domElements.playground.addEventListener('touchstart', _gameplay.handler);
}

function generatePlayground() {
    var template = '';
    exports.initialArr = initialArr = randomizer(size);
    initialArr.forEach(function (item, i) {
        return template += card(item, i);
    });
    _domElements.playground.insertAdjacentHTML("beforeend", template);
}

function randomizer(n) {
    var arr = new Array(n).fill(true).map(function (item, i) {
        return i;
    });
    return arr.sort(function (a, b) {
        return Math.random() - 0.5;
    });
}

var card = function card(num, index) {
    if (num === 0) {
        return '<div class="cell" id="cell-' + (index + 1) + '"></div>';
    } else {
        return '<div class="cell" id="cell-' + (index + 1) + '"><div class="card" id=' + num + '>' + num + '</div></div>';
    }
};

exports.startNewGame = startNewGame;
exports.initialArr = initialArr;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(4);

var _domElements = __webpack_require__(0);

var _playgroundGenerating = __webpack_require__(1);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
        return navigator.serviceWorker.ready;
    }).then(function (registration) {
        console.log('Registration success', registration);
    }).catch(function (error) {
        console.error('Registration error', error);
    });
}

(0, _playgroundGenerating.startNewGame)();
_domElements.startBtn.addEventListener('click', _playgroundGenerating.startNewGame);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "71cf47ef3775ddcf318faecb3ab7bbd6.ico";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handler = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _domElements = __webpack_require__(0);

var _playgroundGenerating = __webpack_require__(1);

var _utils = __webpack_require__(6);

function handler(event) {
    var _event$targetTouches = _slicedToArray(event.targetTouches, 1),
        targetEvent = _event$targetTouches[0];

    var target = targetEvent.target;


    if (!target.classList.contains('playground')) {
        while (target && !target.classList.contains('card')) {
            target = target.parentNode;
        }
        var emptyInd = _playgroundGenerating.initialArr.indexOf(0);
        var cardInd = _playgroundGenerating.initialArr.indexOf(parseInt(target.id, 10));
        var direction = (0, _utils.getDirection)(cardInd, emptyInd);
        if (direction) {
            var moveAt = function moveAt(e) {
                var _e$targetTouches = _slicedToArray(e.targetTouches, 1),
                    firstTouch = _e$targetTouches[0];

                var newLeft = void 0,
                    newTop = void 0;

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
            };

            var endMove = function endMove() {
                if (direction === 'down' && parseInt(this.style.top, 10) > height / 2 || direction === 'up' && parseInt(this.style.top, 10) < -height / 2 || direction === 'right' && parseInt(this.style.left, 10) > width / 2 || direction === 'left' && parseInt(this.style.left, 10) < -width / 2) {
                    (0, _utils.move)(this, _playgroundGenerating.initialArr);
                    if ((0, _utils.detectEndOfGame)(_playgroundGenerating.initialArr)) {
                        endGame();
                    };
                }

                this.classList.remove('draggable');
                this.style = {};
                this.removeEventListener('touchmove', moveAt);
                this.removeEventListener('touchend', endMove);
            };

            target.classList.add('draggable');

            var _target$getBoundingCl = target.getBoundingClientRect(),
                left = _target$getBoundingCl.left,
                top = _target$getBoundingCl.top,
                width = _target$getBoundingCl.width,
                height = _target$getBoundingCl.height;

            var shiftX = targetEvent.pageX;
            var shiftY = targetEvent.pageY;

            target.addEventListener('touchmove', moveAt);
            target.addEventListener('touchend', endMove);
        }
    }
}

function endGame() {
    var template = '<div class="game-end-popup">Well Done!</div>';
    _domElements.playground.insertAdjacentHTML('beforeend', template);
    _domElements.playground.removeEventListener('touchstart', handler);
}

exports.handler = handler;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getDirection(cardIndex, emptyIndex) {
    if (cardIndex - emptyIndex === 1 && Math.floor(cardIndex / 3) === Math.floor(emptyIndex / 3)) return 'left';
    if (emptyIndex - cardIndex === 1 && Math.floor(cardIndex / 3) === Math.floor(emptyIndex / 3)) return 'right';
    if (cardIndex - emptyIndex === 3) return 'up';
    if (emptyIndex - cardIndex === 3) return 'down';
    return false;
}

function move(el, arr) {
    var emptyIndex = arr.indexOf(0);
    var elId = parseInt(el.id, 10);
    var elIndex = arr.indexOf(elId);
    var emptyId = 'cell-' + (emptyIndex + 1);
    var emptyCell = document.getElementById(emptyId);
    el.parentNode.removeChild(el);
    emptyCell.appendChild(el);
    arr[elIndex] = 0;
    arr[emptyIndex] = elId;
}

function detectEndOfGame(arr) {
    var resultArr = arr.map(function (num, i) {
        if (num !== 0) {
            return num === i + 1;
        } else {
            return i === arr.length - 1;
        }
    });

    var result = resultArr.every(function (num) {
        return num === true;
    });
    return result;
}

exports.getDirection = getDirection;
exports.move = move;
exports.detectEndOfGame = detectEndOfGame;

/***/ })
/******/ ]);