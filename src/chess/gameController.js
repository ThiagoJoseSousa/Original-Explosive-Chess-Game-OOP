export default function gameController (){

    class Gameboard {
        constructor (){
            this.board=[new Array(8),new Array(8),new Array(8),new Array(8),
            new Array(8),new Array(8),new Array(8),new Array(8)];    
            this.players=[]
            }

            getBoard(){
                return this.board;
            }
            render() {
                let table=document.getElementById("board")
                for (let x=0; x<8; x++) {
                    let tableRow=document.createElement("tr")
                    tableRow.setAttribute("class","tableRow")
                        for(let y=0;y<8; y++) {
                            let cell = document.createElement("td");
                            cell.setAttribute(`data-coords`, `${x}${y}`);
                            tableRow.appendChild(cell);
                    }
                    table.appendChild(tableRow);
                }
            }

            checkForWin(){
                
            }
            setTurn (){

            }
            
        }
        class Players {
            constructor(color,pieces) {
                this.color=color
                this.human=false;
            }
            addToGame(board){
                board.players.push(this)
            }
            chooseSide (){
                this.human=true;
            }
            createPieces(){
                this.pieces=[]
            }
            displayPossibilities(){

            }
            clearPossibilities(){

            }

            move() {

            }
            chooseAttack() {

            }
        }
        class Pieces{
            constructor(type,color) {
                this.type=type;
                this.color=color;
                this.image=`../../public/images/pieces/${color} ${type}.png`;
            }
            getPossibleMoves(){

            }
            explode(){

            }
            
        }
        class Pawn extends Pieces {
            constructor() {
                super()
            }

            promote (){

            }
        }

    
        return {Gameboard}
    }