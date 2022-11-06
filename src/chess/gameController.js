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
            start () {
                let whitePlayer= new Players('white')
                this.players.push(whitePlayer)
                let blackPlayer= new Players('black')
                this.players.push(blackPlayer)
                //creating pieces for each player
                this.players.forEach((player,i)=>{
                    let y=i?6:1; // toggles y depending on which player to place pawn
                    for (let i=0, x=0; i<8; i++){
                        let pawn=player.createPiece(Pawn,'pawn')
                        player.placePiece(pawn,x+i,y,this.board)
                    }
                    y= i?7:0; // toggles y value to place other pieces
                    let king=player.createPiece(King,'king')
                    player.placePiece(king,4,y,this.board)

                    let queen=player.createPiece(Queen,'queen')
                    player.placePiece(queen,3,y,this.board) 

                    // left/right side of queen/king
                    for (let x=0, i=0;i<2;i++, x=5){
                        let bishop=player.createPiece(Bishop,'bishop');
                        player.placePiece(bishop,x+2,y,this.board)
                        
                        let knight=player.createPiece(Knight,'knight');
                        player.placePiece(knight,x+1,y,this.board) 
                        
                        let rook=player.createPiece(Rook,'rook');
                        player.placePiece(rook,x,y,this.board)
                    }
                    

                })
                
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
                            //displaying piece image
                            if (this.board[x][y]) {
                                let img=document.createElement('img');
                                img.setAttribute('src',this.board[x][y].image)
                                img.classList.add('pieceImg')
                                cell.appendChild(img)
                            }
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
            constructor(color) {
                this.color=color
                this.human=false;
                this.pieces=[]
            }
            addToGame(board){
                board.players.push(this)
            }

            createPiece(Class,type){
                let newPiece= new Class(type,this.color)
                this.pieces.push(newPiece)
                return newPiece
            }
            placePiece(piece,x,y,board) {
                board[x][y]=piece
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
            checkIfEmpty (x,y, board) {
                return board[x][y]===undefined?true: false;
            }
            checkIfEnemy (x,y,board) {
                return board[x][y].color!==this.color?true:false;               
            }
            displayPossibilities(){
    
            }
            clearPossibilities(){
    
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

                        if (this.checkIfEmpty(possibility[0],possibility[1],board) || 
                            this.checkIfEnemy(possibility[0],possibility[1],board)) {
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
                        if (this.checkIfEmpty(possibility[0],possibility[1],board) || (
                            this.checkIfEnemy(possibility[0],possibility[1],board)
                        )) {
                            moves.push(possibility)
                        } 
                    }
                    return moves;
                },[])
                //checking if space between king/rook is empty and adding castle possibility
                if (this.start && this.checkIfEmpty(x+2,y,board) && this.checkIfEmpty(x+1,y,board) && board[x + 3][y] && board[x + 3][y].start) {
                    legalMoves.push([x+3,y])
                }
                if (this.start && this.checkIfEmpty(x-1,y,board) && this.checkIfEmpty(x-2,y,board) && this.checkIfEmpty(x-3,y,board) && board[x - 4][y]!==undefined && board[x -4][y].start) {
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
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities=[];
                //going up
                for (let i=1; y+i<8; i++) {
                     if (this.prototype.checkIfEmpty(x,y+i,board)) {
                        possibilities.push([x, y+i])
                    } else if (this.prototype.checkIfEnemy(x,y+i,board)){
                        possibilities.push([x, y+i]);
                        //after pushing stop loop if piece is the enemy
                        i=8
                    } else {i=8;}
                    //stop loop and dont push after seing an ally piece
                }
                //going down
                for (let i=1; y-i>-1; i++) {
                    if (this.prototype.checkIfEmpty(x,y-i,board)) {
                        possibilities.push([x, y-i])
                    } else if (this.prototype.checkIfEnemy(x,y-i,board)){
                        possibilities.push([x, y-i]);
                        i=8
                    } else {i=8;}
                }

                //going right
                for (let i=1; x+i<8; i++) {
                    if (this.prototype.checkIfEmpty(x+i,y,board)) {
                        possibilities.push([x+i, y])
                    } else if (this.prototype.checkIfEnemy(x+i,y,board)){
                        possibilities.push([x+i, y]);
                        i=8
                    } else {i=8;}
                }
               //going left
               for (let i=1; x-i>-1; i++) {
                if (this.prototype.checkIfEmpty(x-i,y,board)) {
                    possibilities.push([x-i, y])
                } else if (this.prototype.checkIfEnemy(x-i,y,board)){
                    possibilities.push([x-i, y]);
                     i=8
                } else {i=8;}
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
                    if (this.prototype.checkIfEmpty(x+i,y+i,board)) {
                        possibilities.push([x+i,y+i])
                    } else if (this.prototype.checkIfEnemy(x+i,y+i,board)){
                        possibilities.push([x+i,y+i]);
                        //after pushing stop loop if piece is the enemy
                        i=8
                    } else {
                        //stop loop and dont push after seing an ally piece
                        i=8;}
                }
                //down-right
                for (let i=0; x+i<8 && y-i>-1; i++) {
                    if (this.prototype.checkIfEmpty(x+i,y-i,board)) {
                        possibilities.push([x+i,y-i])
                    } else if (this.prototype.checkIfEnemy(x+i,y-i,board)){
                        possibilities.push([x+i,y-i]);
                    i=8
                    } else {
                                                i=8;}
                }
            
                //up-left
                for (let i=0; x-i>-1 && y+i<8; i++) {
                    if (this.prototype.checkIfEmpty(x-i,y+i,board)) {
                        possibilities.push([x-i,y+i])
                    } else if (this.prototype.checkIfEnemy(x-i,y+i,board)){
                        possibilities.push([x-i,y+i]);
                    i=8
                    } else {
                                                i=8;}
                }
                //down-left
                for (let i=0; x-i>-1 && y-i>-1; i++) {
                    if (this.prototype.checkIfEmpty(x-i,y-i,board)) {
                        possibilities.push([x-i,y-i])
                    } else if (this.prototype.checkIfEnemy(x-i,y-i,board)){
                        possibilities.push([x-i,y-i]);
                    i=8
                    } else {
                                                i=8;}
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