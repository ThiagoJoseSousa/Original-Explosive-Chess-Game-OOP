function gameController (){

    class Gameboard {
        constructor (){
            this.board=[new Array(8),new Array(8),new Array(8),new Array(8),
            new Array(8),new Array(8),new Array(8),new Array(8)];    
            this.players=[]
            this.table=document.getElementById("board")
            }

            cleanDOM(){
                while (this.table.firstChild) {
                    this.table.removeChild(this.table.firstChild);
                  }
            }
            render() {
                
                let isGreen=false;
                for (let x=0; x<8; x++) {
                    let tableRow=document.createElement("tr")
                    tableRow.setAttribute("class","tableRow")
                        for(let y=0;y<8; y++) {
                            let cell = document.createElement("td");
                            cell.setAttribute(`data-coords`, `${x}${y}`);
                            cell.classList.add('board-square')
                            //changing color
                            if (!isGreen) {
                                cell.classList.add('white')
                                isGreen=true;
                            } else {
                                cell.classList.add('green')
                                isGreen=false;
                            }
                            //toggling colors
                            tableRow.appendChild(cell);
                        }
                    isGreen= !isGreen;
                    this.table.appendChild(tableRow);
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

            placePiece() {

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
            move() {
                
            }
            explode(){

            }
            
        }
        class Knight extends Pieces {
            constructor(type,color) {
            super (type,color)
            }
            getPossibleMoves (coords,board) {
                
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities = [[x+1, y+2],[x+2,y+1],[x-1,y+2], [x-2,y+1], [x+1,y-2],[x+2,y-1], [x-2, y-1], [x-1,y-2]];
                //validating moves
                return possibilities.reduce((moves,possibility)=> {
                    //check if move possibility is inside bounds.
                    if (possibility[0] <= 7 && possibility[0]>=0 && possibility[1]<=7 && possibility[1]>=0){
                        //checks if square is empty or with enemy piece
                        if (board[possibility[0]][possibility[1]]===undefined || (
                            board[[possibility[0]]][[possibility[1]]]!==undefined &&
                            board[possibility[0]][possibility[1]].color!==this.color
                        )) {
                            moves.push(possibility)
                        } 
                    }
                    return moves;
                },[])

            }
        }

        class King extends Pieces {
            constructor(type,color) {
                super (type,color)
                this.start=true;
            }
            getPossibleMoves (coords,board) {
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities = [[x+1, y], [x+1, y+1], [x,y-1], [x-1,y], [x-1, y+1], [x-1, y-1], [x, y+1], [x, y-1]];

                //validating moves
                let legalMoves= possibilities.reduce((moves,possibility)=> {
                    //check if move possibility is inside bounds.
                    if (possibility[0] <= 7 && possibility[0]>=0 && possibility[1]<=7 && possibility[1]>=0){
                        //checks if square is empty or with enemy piece
                        if (board[possibility[0]][possibility[1]]===undefined || (
                            board[[possibility[0]]][[possibility[1]]]!==undefined &&
                            board[possibility[0]][possibility[1]].color!==this.color
                        )) {
                            moves.push(possibility)
                        } 
                    }
                    return moves;
                },[])
                //checking if space between king/rook is empty and adding castle possibility
                if (board[x+2][y]===undefined && board[x+1][y]===undefined && this.start && board[x + 3][y]!==undefined && board[x + 3][y].start) {
                    legalMoves.push([x+3,y])
                }
                if (board[x-1][y] && board[x-2][y] && board[x-3][y] && this.start && board[x - 4][y]!==undefined && board[x -4][y].start) {
                    legalMoves.push([x-4,y])
                }
                return legalMoves;
            }
        }

        class Rook extends Pieces {
            constructor(type, color){
                super (type,color) 
            }
            //static to reuse It on Queen
            static getPossibleMoves (coords,board) {
                //must create 4 loops for each rook direction

                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities=[];
                //going up
                for (let i=1; y+i<8; i++) {
                    //stop loop and dont push after seing an ally piece
                    board[x][y+i]!==undefined && board[x][y+i].color===this.color?i=8:possibilities.push([x, y+i])
                    //after pushing stop loop if piece is the enemy
                    if (board[x][y+i]!==undefined && board[x][y+i].color!==this.color) {
                        i=8;
                    }
                }
                //going down
                for (let i=1; y-i>-1; i++) {
                     board[x][y-i]!==undefined && board[x][y-i].color===this.color?i=8:possibilities.push([x, y-i])
                    if (board[x][y-i]!==undefined && board[x][y-i].color!==this.color) {
                        i=8;
                    }
                }
                //going right
                for (let i=1; x+i<8; i++) {
                    board[x+i][y]!==undefined && board[x+1][y].color===this.color?i=8:possibilities.push([x+i, y])
                   if (board[x+i][y]!==undefined && board[x][y-i].color!==this.color) {
                       i=8;
                   }
               }
               //going left
               for (let i=1; x-i>-1; i++) {
                    board[x-i][y]!==undefined && board[x-1][y].color===this.color?i=8:possibilities.push([x-i, y])
                   if (board[x-i][y]!==undefined && board[x-i][y].color!==this.color) {
                       i=8;
                   }
               }
                 return possibilities
            }
            // our instance also must have above func!
            getPossibleMoves(coords,board) {
                return Rook.getPossibleMoves(coords,board)
            }
        }

        class Bishop extends Pieces{
            constructor(type,color){
                super(type,color)
            }
            //static to reuse It on Queen
            static getPossibleMoves(coords,board){
                //same logic as rook
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities=[];
                //up-right
                for (let i=0; x+i<8 && y+i<8; i++) {
                    board[x+i][y+i]!==undefined && board[x+i][y+i].color===this.color?i=8:possibilities.push([x+i, y+i])
                    if (board[x+i][y+i]!==undefined && board[x+i][y+i].color!==this.color) {
                        i=8;
                    }
                }
                //down-right
                for (let i=0; x+i<8 && y-i>-1; i++) {
                    board[x+i][y-i]!==undefined && board[x+i][y-i].color===this.color?i=8:possibilities.push([x+i, y-i])
                    if (board[x+i][y-i]!==undefined && board[x+i][y-i].color!==this.color) {
                        i=8;
                    }
                }

                //up-left
                for (let i=0; x-i>-1 && y+i<8; i++) {
                    board[x-i][y+i]!==undefined && board[x-i][y+i].color===this.color?i=8:possibilities.push([x-i, y+i])
                    if (board[x-i][y+i]!==undefined && board[x-i][y+i].color!==this.color) {
                        i=8;
                    }
                }
                //down-left
                for (let i=0; x-i>-1 && y-i>-1; i++) {
                    board[x-i][y-i]!==undefined && board[x-i][y-i].color===this.color?i=8:possibilities.push([x-i, y-i])
                    if (board[x-i][y-i]!==undefined && board[x-i][y-i].color!==this.color) {
                        i=8;
                    }
                }
                return possibilities;
            }
            // our instance also must have above func!
            getPossibleMoves(coords,board){
                return Bishop.getPossibleMoves(coords,board)
            }
        }
        class Queen extends Pieces {
            constructor(type,color) {
                super(type,color)
            }
            getPossibleMoves(coords,board) {
                let legalMoves=[]
                Rook.getPossibleMoves(coords,board).forEach((item)=>{
                    legalMoves.push(item)
                })
                Bishop.getPossibleMoves(coords,board).forEach((item)=>{
                    legalMoves.push(item)
                })
                return legalMoves;
            }
        }

        class Pawn extends Pieces {
            constructor(type,color) {
                super(type,color)
                this.start=true;
            }
            getPossibleMoves(coords,board){
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities = {
                    //first and second elements from arraylist have a extra element for special rules (en pasant and 2 square move)
                    white: [[x+1,x-1,y+1],[x,y+2, y+1],[x,y+1],[x+1,y+1],[x-1,y+1]],
                    black: [[x+1,x-1,y-1],[x,y-2, y-1],[x,y-1],[x+1,y-1],[x-1,y-1]]
                };
                return possibilities[this.color].reduce(
                    (prev,curr,i)=> {
                        //checking if inside board
                        if (curr[0]>-1 && curr[0]<8 && curr[1]>-1 && curr[1]<8){
                            //en pasant rule
                            if (i===0 && board[curr[0]][y] && board[curr[0]][y].enpasant && board[curr[0]][y].color!==this.color){
                                prev.push([curr[0],curr[2]])
                            } else if (i===0 && board[curr[1]][y] && board[curr[1]][y].enpasant && board[curr[1]][y].color!==this.color){
                                prev.push([curr[1],curr[2]])
                            }
                            //2 squares move
                            if (i===1 && this.start && !board[curr[0]][curr[1]] && !board[curr[0]][curr[2]]){
                                prev.push([curr[0],curr[1]])
                            }
                            //checking if can go straight
                            if (i===2 && !board[curr[0]][curr[1]]){
                                prev.push(curr)
                             } 
                             //checking if can attack
                            if (board[curr[0]][curr[1]]!==undefined && board[curr[0]][curr[1]]!==this.color) {
                                prev.push(curr)
                            }
                        }
                        return prev
                    },[]
                )
            }

            promote (){

            }
        }
    
        return {Gameboard,Knight,King, Rook, Bishop, Queen,Pawn}
    }

export default gameController;