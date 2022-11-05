/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chess/gameController.js":
/*!*************************************!*\
  !*** ./src/chess/gameController.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction gameController (){\r\n\r\n    class Gameboard {\r\n        constructor (){\r\n            this.board=[new Array(8),new Array(8),new Array(8),new Array(8),\r\n            new Array(8),new Array(8),new Array(8),new Array(8)];    \r\n            this.players=[]\r\n            this.table=document.getElementById(\"board\")\r\n            }\r\n\r\n            clean(){\r\n                while (this.table.firstChild) {\r\n                    this.table.removeChild(this.table.firstChild);\r\n                  }\r\n            }\r\n            render() {\r\n                \r\n                let isGreen=false;\r\n                for (let x=0; x<8; x++) {\r\n                    let tableRow=document.createElement(\"tr\")\r\n                    tableRow.setAttribute(\"class\",\"tableRow\")\r\n                        for(let y=0;y<8; y++) {\r\n                            let cell = document.createElement(\"td\");\r\n                            cell.setAttribute(`data-coords`, `${x}${y}`);\r\n                            cell.classList.add('board-square')\r\n                            //changing color\r\n                            if (!isGreen) {\r\n                                cell.classList.add('white')\r\n                                isGreen=true;\r\n                            } else {\r\n                                cell.classList.add('green')\r\n                                isGreen=false;\r\n                            }\r\n                            //toggling colors\r\n                            tableRow.appendChild(cell);\r\n                        }\r\n                    isGreen= !isGreen;\r\n                    this.table.appendChild(tableRow);\r\n                }\r\n            }\r\n\r\n            checkForWin(){\r\n                \r\n            }\r\n            setTurn (){\r\n\r\n            }\r\n            \r\n        }\r\n        class Players {\r\n            constructor(color,pieces) {\r\n                this.color=color\r\n                this.human=false;\r\n            }\r\n            addToGame(board){\r\n                board.players.push(this)\r\n            }\r\n            chooseSide (){\r\n                this.human=true;\r\n            }\r\n            createPieces(){\r\n                this.pieces=[]\r\n            }\r\n            displayPossibilities(){\r\n\r\n            }\r\n            clearPossibilities(){\r\n\r\n            }\r\n\r\n            placePiece() {\r\n\r\n            }\r\n            chooseAttack() {\r\n\r\n            }\r\n        }\r\n        class Pieces{\r\n            constructor(type,color) {\r\n                this.type=type;\r\n                this.color=color;\r\n                this.image=`../../public/images/pieces/${color} ${type}.png`;\r\n            }\r\n            getPossibleMoves(){\r\n\r\n            }\r\n            explode(){\r\n\r\n            }\r\n            \r\n        }\r\n        class Knight extends Pieces {\r\n            constructor(type,color) {\r\n            super (type,color)\r\n            }\r\n            getPossibleMoves (coords,board) {\r\n                \r\n                let x = parseInt(coords[0], 10);\r\n                let y = parseInt(coords[1], 10);\r\n                let possibilities = [[x+1, y+2],[x+2,y+1],[x-1,y+2], [x-2,y+1], [x+1,y-2],[x+2,y-1], [x-2, y-1], [x-1,y-2]];\r\n                //validating moves\r\n                return possibilities.reduce((moves,possibility)=> {\r\n                    //check if move possibility is inside bounds.\r\n                    if (possibility[0] <= 7 && possibility[0]>=0 && possibility[1]<=7 && possibility[1]>=0){\r\n                        //checks if square is empty or with enemy piece\r\n                        if (board[possibility[0]][possibility[1]]===undefined || (\r\n                            board[[possibility[0]]][[possibility[1]]]!==undefined &&\r\n                            board[possibility[0]][possibility[1]].color!==this.color\r\n                        )) {\r\n                            moves.push(possibility)\r\n                        } \r\n                    }\r\n                    return moves;\r\n                },[])\r\n\r\n            }\r\n        }\r\n\r\n        class King extends Pieces {\r\n            constructor(type,color) {\r\n                super (type,color)\r\n                this.start=true;\r\n            }\r\n            getPossibleMoves (coords,board) {\r\n                let x = parseInt(coords[0], 10);\r\n                let y = parseInt(coords[1], 10);\r\n                let possibilities = [[x+1, y], [x+1, y+1], [x,y-1], [x-1,y], [x-1, y+1], [x-1, y-1], [x, y+1], [x, y-1]];\r\n\r\n                //validating moves\r\n                let legalMoves= possibilities.reduce((moves,possibility)=> {\r\n                    //check if move possibility is inside bounds.\r\n                    if (possibility[0] <= 7 && possibility[0]>=0 && possibility[1]<=7 && possibility[1]>=0){\r\n                        //checks if square is empty or with enemy piece\r\n                        if (board[possibility[0]][possibility[1]]===undefined || (\r\n                            board[[possibility[0]]][[possibility[1]]]!==undefined &&\r\n                            board[possibility[0]][possibility[1]].color!==this.color\r\n                        )) {\r\n                            moves.push(possibility)\r\n                        } \r\n                    }\r\n                    return moves;\r\n                },[])\r\n                //checking if space between king/rook is empty and adding castle possibility\r\n                if (board[x+2][y]===undefined && board[x+1][y]===undefined && this.start && board[x + 3][y]!==undefined && board[x + 3][y].start) {\r\n                    legalMoves.push([x+3,y])\r\n                }\r\n                if (board[x-1][y] && board[x-2][y] && board[x-3][y] && this.start && board[x - 4][y]!==undefined && board[x -4][y].start) {\r\n                    legalMoves.push([x-4,y])\r\n                }\r\n                return legalMoves;\r\n            }\r\n        }\r\n\r\n        class Rook extends Pieces {\r\n            constructor(type, color){\r\n                super (type,color) \r\n            }\r\n            getPossibleMoves (coords,board) {\r\n                let x = parseInt(coords[0], 10);\r\n                let y = parseInt(coords[1], 10);\r\n                let possibilities=[];\r\n                //going up\r\n                for (let i=1; y+i<8; i++) {\r\n                    //stop loop and dont push after seing an ally piece\r\n                    board[x][y+i]!==undefined && board[x][y+i].color===this.color?i=8:possibilities.push([x, y+i])\r\n                    //after pushing stop loop if piece is the enemy\r\n                    if (board[x][y+i]!==undefined && board[x][y+i].color!==this.color) {\r\n                        i=8;\r\n                    }\r\n                }\r\n                //going down\r\n                for (let i=1; y-i>-1; i++) {\r\n                     board[x][y-i]!==undefined && board[x][y-i].color===this.color?i=8:possibilities.push([x, y-i])\r\n                    if (board[x][y-i]!==undefined && board[x][y-i].color!==this.color) {\r\n                        i=8;\r\n                    }\r\n                }\r\n                //going right\r\n                for (let i=1; x+i<8; i++) {\r\n                    board[x+i][y]!==undefined && board[x+1][y].color===this.color?i=8:possibilities.push([x+i, y])\r\n                   if (board[x+i][y]!==undefined && board[x][y-i].color!==this.color) {\r\n                       i=8;\r\n                   }\r\n               }\r\n               //going left\r\n               for (let i=1; x-i>-1; i++) {\r\n                    board[x-i][y]!==undefined && board[x-1][y].color===this.color?i=8:possibilities.push([x-i, y])\r\n                   if (board[x-i][y]!==undefined && board[x-i][y].color!==this.color) {\r\n                       i=8;\r\n                   }\r\n               }\r\n                 return possibilities\r\n            }\r\n        }\r\n\r\n        class Pawn extends Pieces {\r\n            constructor() {\r\n                super(type,color)\r\n            }\r\n\r\n            promote (){\r\n\r\n            }\r\n        }\r\n    \r\n        return {Gameboard,Knight,King, Rook}\r\n    }\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);\n\n//# sourceURL=webpack://original-oop-explosive-chess-game/./src/chess/gameController.js?");

/***/ }),

/***/ "./src/page/page.js":
/*!**************************!*\
  !*** ./src/page/page.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chess_gameController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chess/gameController.js */ \"./src/chess/gameController.js\");\n\r\n\r\n// IIFE for hamburguer layout\r\n(function (){\r\nconst hamburguer = document.querySelector(\".hamburguer\");\r\nconst navList= document.querySelector(\".nav-list\")\r\n\r\nhamburguer.addEventListener(\"click\", ()=>{\r\n    hamburguer.classList.toggle(\"active\");\r\n    navList.classList.toggle(\"active\");\r\n})\r\n}());\r\n\r\n//IIFE for displaying different pages when clicking on navbar/homepage buttons.\r\n(function (){\r\n    const navItems= document.getElementsByClassName('nav-item');\r\n    const sections=document.querySelectorAll('section');\r\n    //loop for adding listeners\r\n    for (let i=0; i<navItems.length; i++) {\r\n        navItems[i].addEventListener('click', displayClicked)\r\n    }\r\n    //this will add notcurrent to all classes and remove the one clicked.\r\n    function displayClicked(e) {\r\n        for (let i=0; i<sections.length; i++) {\r\n            sections[i].classList.add('notcurrent')\r\n        }\r\n        sections[e.target.dataset.page].classList.remove('notcurrent')\r\n    }\r\n}());\r\n\r\n// should above be an object for reuse?\r\n// I don't think so, It loads just one time + just by creating a new section/button It'll be rendered. \r\n//It's up for extension if someone creates a func\r\n\r\n//button to decide which side you'll play on single player\r\n(function (){\r\n    const whiteStart=document.getElementById('white-start')\r\n    const blackStart=document.getElementById('black-start')\r\n    const chooseSide=document.getElementById('chooseSide')\r\n\r\nwhiteStart.addEventListener('click', startGame)\r\nblackStart.addEventListener('click', startGame)\r\n\r\nfunction startGame(e) {\r\n    chooseSide.classList.add('hidden');\r\n    console.log(e.target.id.slice(0,5) + ' is human')\r\n    \r\n    let game= (0,_chess_gameController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\r\n    let gameboard= new game.Gameboard()\r\n    gameboard.render()\r\n    let knight = new game.Knight('knight','white')\r\n    console.log(knight.getPossibleMoves('33',gameboard.board))\r\n    let king = new game.King('king','white')\r\n    console.log(king.getPossibleMoves('33',gameboard.board))\r\n    let rook= new game.Rook('rook','white')\r\n    console.log(rook.getPossibleMoves('33',gameboard.board))\r\n}\r\n}())\n\n//# sourceURL=webpack://original-oop-explosive-chess-game/./src/page/page.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/page/page.js");
/******/ 	
/******/ })()
;