function gameController (){

    class Gameboard {
        constructor (){
            this.board=[new Array(8),new Array(8),new Array(8),new Array(8),
            new Array(8),new Array(8),new Array(8),new Array(8)];    
            this.board.parent=this;
            this.table=document.getElementById("board")
            this.players=[]
            this.turn=0;// 0 is white
            }
            cleanDOM(){
                while (this.table.firstChild) {
                    this.table.removeChild(this.table.firstChild);
                  }
            }
            start () {
                let whitePlayer= new Players('white',this.board)
                this.players.push(whitePlayer)
                let blackPlayer= new Players('black',this.board)
                this.players.push(blackPlayer)
                
                // instructions to create repeating pieces
                let pipe= [[Bishop,'bishop'],[Knight,'knight'],[Rook,'rook']]
                
                //creating pieces for each player
                this.players.forEach((player,i)=>{
                    let y=i?6:1; // toggles y depending on which player to place pawn, 0 is false

                    for (let i=0, x=0; i<8; i++){
                        let pawn=player.createPiece(Pawn,'pawn')
                        placePiece(pawn,x+i,y,this.board)
                    }
                    y= i?7:0; // toggles y value to place other pieces
                    let king=player.createPiece(King,'king')
                    placePiece(king,4,y,this.board)

                    let queen=player.createPiece(Queen,'queen')
                    placePiece(queen,3,y,this.board) 

                    // Queen left side pieces
                    let x=2; 
                        pipe.reduce((prev,creator,i)=>{
                            let piece =player.createPiece(creator[0],creator[1])
                            placePiece(piece,x-i,y,this.board)
                        },[]) 
                    // King right side pieces
                    x=5;
                        pipe.reduce((prev,creator,i)=>{
                        let piece =player.createPiece(creator[0],creator[1])
                        placePiece(piece,x+i,y,this.board)
                    },[]) 
                })
                setTimeout(()=> {this.changeTurn()},0);
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
            checkForEnd(){
                if (this.players[0].pieces[8].dead || this.players[1].pieces[8].dead) {
                    return true
                }

            }
            changeTurn (){
                if(this.turn===1) {
                    this.players[1].humanCanClick(this.board)
                    this.turn=0
                }else{
                    this.turn=1
                    this.players[0].humanCanClick(this.board)

                }
            }
            
        }
        class Players {
            constructor(color) {
                this.color=color
                this.human=false;
                this.pieces=[]
            }

            humanCanClick(board){
                    this.pieces.forEach((item)=>{
                    if (!item.dead) {

                        let piece=document.querySelector(`[data-coords="${item.coords[0]}${item.coords[1]}"]`)
                        piece.classList.add('clickablePiece')
                        piece.addEventListener('click', ()=>{
                            console.log(item)
                            // It'd be easier to get the element clicked by using e.target
                            this.displayPossibilities(item,board)
                        })
                    }
                })
            }
            displayPossibilities(item,board){
                //clear previous attacks display.
                this.clearPossibilities();
                //remembers which piece you clicked to display
                this.displaying=item;
                // add grey marker and play listener for each possible move
                let coords=`${item.coords[0]}${item.coords[1]}`
                let possibleMoves=item.getPossibleMoves(coords,board)
                    for (let i=0; i<possibleMoves.length;i++){
                        let coord=possibleMoves[i]
                        let square=document.querySelector(`[data-coords="${coord[0]}${coord[1]}"]`);
                        square.addEventListener('click', (e)=> {
                            play.call(this,e,board)
                        } )
                        let grey= document.createElement('div');
                        grey.classList.add('grey');
                        square.appendChild(grey)
                    }
                
            }
            clearPossibilities(){
                //clear attacks display
                let possible=document.querySelectorAll('.grey')
                for (let i =0; i<possible.length; i++){
                    //removing grey without removing img by setting cloneNode deep to true
                    let square=possible[i].parentElement
                    square.removeChild(possible[i])
                    // cloning the element so it gets the play listener removed
                    const dup=square.cloneNode(true)
                    square.replaceWith(dup)
                    console.log(dup, ' do i have img?')
                }
            }
            createPiece(Class,type){
                let newPiece= new Class(type,this.color)
                this.pieces.push(newPiece)
                return newPiece
            }
            attackChoice(newX,newY,board,promoting=false) {
                //UI to display attack choice
                const square=document.querySelector(`[data-coords="${newX}${newY}"]`)
                square.classList.add('dying-square')
                
                const choiceBox=document.createElement('div');
                choiceBox.setAttribute('id','choiceBox')

                const normalAttack=document.createElement('button');
                normalAttack.textContent="SWORD ATTACK!"
                normalAttack.addEventListener('click',(e) => {
                    if (promoting){

                        this.displaying.coords=[newX,newY]
                        console.log(board[newX][newY], 'new square')

                        otherCanPlay(board)
                    } else {
                        board[newX][newY].dead=true;
                        board[newX][newY]=this.displaying;
                        this.displaying.coords=[newX,newY]
                        otherCanPlay(board)
                    }
                    e.stopPropagation() // click cant bubble
                }
                )
                const normalAttackImg =document.createElement('img');
                normalAttackImg.setAttribute('src','../../public/images/sword.png')
                

                const explodeAttack= document.createElement('button');
                explodeAttack.textContent= "DYNAMITE ATTACK!"
                explodeAttack.addEventListener('click', (e) => {
                    this.displaying.dead=true;
                    board[newX][newY].dead=true;
                    explode(newX,newY,board)
                    e.stopPropagation();
                    otherCanPlay(board);
                    document.querySelector(`[data-coords="${newX}${newY}"]`).classList.add('exploding')
                })
                const explodeAttackImg =document.createElement('img');
                explodeAttackImg.setAttribute('src',`../../public/images/dynamite.png`)

                normalAttack.appendChild(normalAttackImg);
                explodeAttack.appendChild(explodeAttackImg)

                choiceBox.appendChild(normalAttack);
                choiceBox.appendChild(explodeAttack);
                square.appendChild(choiceBox);
            }
            normalAttack(newX,newY,board){
                board[newX][newY].dead=true;
                board[newX][newY]=this.displaying 
                this.displaying.coords=[newX,newY]
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
                console.log(this.color,board[x][y].color)
                return board[x][y].color!==this.color?true:false;               
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
                let possibilities = [[x+1, y], [x+1, y+1], [x,y-1], [x-1,y], [x-1, y+1], [x-1, y-1], [x, y+1], [x+1, y-1]];
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
                    legalMoves.push([x+2,y])
                }
                if (this.start && this.checkIfEmpty(x-1,y,board) && this.checkIfEmpty(x-2,y,board) && this.checkIfEmpty(x-3,y,board) && board[x - 4][y]!==undefined && board[x -4][y].start) {
                    legalMoves.push([x-2,y])
                }
                return legalMoves;
            }
        }

        class Rook extends Pieces {
            constructor(type, color){
                super (type,color) 
                this.start=true;
            }

             getPossibleMoves (coords,board) {
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities=[];
                //going up
                for (let i=1; y+i<8; i++) {
                     if (this.checkIfEmpty(x,y+i,board)) {
                        possibilities.push([x, y+i])
                    } else if (this.checkIfEnemy(x,y+i,board)){
                        possibilities.push([x, y+i]);
                        //after pushing stop loop if piece is the enemy
                        i=8
                    } else {i=8;}
                    //stop loop and dont push after seing an ally piece
                }
                //going down
                for (let i=1; y-i>-1; i++) {
                    if (this.checkIfEmpty(x,y-i,board)) {
                        possibilities.push([x, y-i])
                    } else if (this.checkIfEnemy(x,y-i,board)){
                        possibilities.push([x, y-i]);
                        i=8
                    } else {i=8;}
                }

                //going right
                for (let i=1; x+i<8; i++) {
                    if (this.checkIfEmpty(x+i,y,board)) {
                        possibilities.push([x+i, y])
                    } else if (this.checkIfEnemy(x+i,y,board)){
                        possibilities.push([x+i, y]);
                        i=8
                    } else {i=8;}
                }
               //going left
               for (let i=1; x-i>-1; i++) {
                if (this.checkIfEmpty(x-i,y,board)) {
                    possibilities.push([x-i, y])
                } else if (this.checkIfEnemy(x-i,y,board)){
                    possibilities.push([x-i, y]);
                     i=8
                } else {i=8;}
            }
                 return possibilities
            }
        }

        class Bishop extends Pieces{
            constructor(type,color){
                super(type,color)
            }

             getPossibleMoves(coords,board){
                //same logic as rook
                let x = parseInt(coords[0], 10);
                let y = parseInt(coords[1], 10);
                let possibilities=[];
                //up-right
                for (let i=1; x+i<8 && y+i<8; i++) {
                    if (this.checkIfEmpty(x+i,y+i,board)) {
                        possibilities.push([x+i,y+i])
                    } else if (this.checkIfEnemy(x+i,y+i,board)){
                        possibilities.push([x+i,y+i]);
                        //after pushing stop loop if piece is the enemy
                        i=8
                    } else {
                        //stop loop and dont push after seing an ally piece
                        i=8;}
                }
                //down-right
                for (let i=1; x+i<8 && y-i>-1; i++) {
                    if (this.checkIfEmpty(x+i,y-i,board)) {
                        possibilities.push([x+i,y-i])
                    } else if (this.checkIfEnemy(x+i,y-i,board)){
                        possibilities.push([x+i,y-i]);
                    i=8
                    } else {
                                                i=8;}
                }
            
                //up-left
                for (let i=1; x-i>-1 && y+i<8; i++) {
                    if (this.checkIfEmpty(x-i,y+i,board)) {
                        possibilities.push([x-i,y+i])
                    } else if (this.checkIfEnemy(x-i,y+i,board)){
                        possibilities.push([x-i,y+i]);
                    i=8
                    } else {
                                                i=8;}
                }
                //down-left
                for (let i=1; x-i>-1 && y-i>-1; i++) {
                    if (this.checkIfEmpty(x-i,y-i,board)) {
                        possibilities.push([x-i,y-i])
                    } else if (this.checkIfEnemy(x-i,y-i,board)){
                        possibilities.push([x-i,y-i]);
                    i=8
                    } else {
                                                i=8;}
                }
                return possibilities;
            }

        }
        class Queen extends Pieces {
            constructor(type,color) {
                super(type,color)
                this.rookMoves=Rook.prototype.getPossibleMoves;
                this.bishopMoves=Bishop.prototype.getPossibleMoves;
            }
            getPossibleMoves(coords,board) {
                let legalMoves=[]
                //combine rook and bishop moves to make queen

                this.rookMoves(coords,board).forEach((item)=>{
                    legalMoves.push(item)
                })
                this.bishopMoves(coords,board).forEach((item)=>{
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
                    white: [[x,y+1],[x+1,y+1],[x-1,y+1]],
                    black: [[x,y-1],[x+1,y-1],[x-1,y-1]],
                };
                //basic moves, going straight into ++y or --y or capturing.
                let allMoves= possibilities[this.color].reduce((prev,coord,i)=>{
                    //check if in bounds
                    if (coord[0]<8 && coord[0]>-1 && coord[1]<8 && coord[1]>-1){
                        if (this.checkIfEmpty(coord[0],coord[1],board)) {
                            // pushing only if moving straight
                            if (i===0){prev.push([coord[0],coord[1]])}
                        }else if (i!==0 && this.checkIfEnemy(coord[0],coord[1],board)){
                            //if not empty, check if enemy, pushing if It is
                            prev.push([coord[0],coord[1]])
                        }
                    }
                    return prev
                },[])
                //special rules : 2 squares move
                if (this.start && this.color==='white' && this.checkIfEmpty(x,y+1,board) && this.checkIfEmpty(x,y+2,board)) {
                    allMoves.push([x,y+2])
                }
                if (this.start && this.color==='black' && this.checkIfEmpty(x,y-1,board) && this.checkIfEmpty(x,y-2,board)) {
                    allMoves.push([x,y-2])
                }
                //special rules : en pasant attack
                if (this.checkIfEnpasant(x+1,y,board)) {
                    allMoves.push([])
                }


                return allMoves
            }

            checkIfEnpasant(x,y,board) {
                if (x>-1 && x<8 && y>-1 && y<8 && board[x][y]!== undefined && board[x][y].enpasant && board[x][y].color!==this.color){
                    return true
                }
                return false
            }

            promotingOrAttacking (newX,newY,board,player) {
                //if just promoting
                if (this.checkIfEmpty(newX,newY,board)) {
                    console.log(this, 'Im happening everytime')
                    placePiece(this,newX,newY,board)
                    this.promoteBox(board)
                } else {
                    // function must be async, promotebox is rendered, on click it re renders board, but with attackchoice
                    board[newX][newY].dead=true;
                    console.log (board[newX][newY], 'piece that is dead')
                    placePiece(this, newX, newY, board)
                    this.promoteBox(board,true,player);
                    // thought of bubbling up too.
                }
            }

            promoteBox(board,attacking=false,player){
                //UI creation
                const promotingSquare=document.querySelector(`[data-coords="${this.coords[0]}${this.coords[1]}"]`)
                const choiceBox= document.createElement('div');
                choiceBox.classList.add('promotingChoiceBox');
                // pieces which u can choose 
                const piecesOption= [
                    [Bishop,'bishop'],[Knight,'knight'],[Pawn,'pawn'],[Queen,'queen'],[Rook,'rook']
                ];
                for (let i=0; i<piecesOption.length; i++) {
                    const choiceImg=document.createElement('img');
                    choiceImg.setAttribute('src', `../../public/images/pieces/${this.color} ${piecesOption[i][1]}.png`)
                    choiceImg.addEventListener('click', (e)=> {
                        e.stopPropagation()
                        this.promote(piecesOption[i][0],piecesOption[i][1],board);
                        // if attacking, display the attackChoice after promoting
                        if (attacking) {
                            board.parent.cleanDOM();
                            board.parent.render();
                            console.log(this.coords[0],this.coords[1],board, 'Im the arguemnts for attackchoice')
                            player.attackChoice(this.coords[0],this.coords[1],board,true)
                            console.log(board[this.coords[0]][this.coords[1]])
                        } else {
                            otherCanPlay(board)
                        }
                    })
                    choiceBox.appendChild(choiceImg)
                }
                promotingSquare.appendChild(choiceBox)
            }            
            promote (classOfPromotedPiece,type,board){
                console.log(this, 'Before creating a new obj')

                let promoted = new classOfPromotedPiece(type,this.color)
                let piece = this;
                // couldnt get rid of prototype :/ so had to put the new func as property
                piece.getPossibleMoves=promoted.getPossibleMoves
                piece.promoted=true;
                promoted.start=false;
                //copying properties, an object can't be replaced by reference.
                Object.assign(piece,promoted)
                console.log(this, 'After creating a new obj')

            }
        }
        function play (e,board){
            //cleaning previous listeners
            board.parent.cleanDOM();
            board.parent.render();
            console.log(e.target.dataset.coords) // gets destiny
            console.log(this)
            //the this of play is the instance of player, changed by using call().
            console.log(board, 'this is the board, does it have constructor?')
            const oldX= this.displaying.coords[0];
            const oldY=this.displaying.coords[1];
            const newX= Number(e.target.dataset.coords[0]);
            const newY= Number(e.target.dataset.coords[1]);
            //setting start position to false
            this.displaying.start=false;
            // add promotion condition
            //changes the old place pointer
            board[oldX][oldY]=undefined 


            //checks if It's a pawn and if promoting
            if (this.displaying.type==='pawn' && !this.displaying.promoted && (newY===0 || newY===7)) {
                console.log('I AM PROMOTING', this)
                this.displaying.promotingOrAttacking(newX,newY,board,this)
            } else if (this.displaying.checkIfEmpty(newX,newY,board)){
                placePiece(this.displaying,newX,newY,board)
                otherCanPlay(board)
            } else{ 
                //normal attack

                this.attackChoice(newX,newY,board)
                console.log('the this i want ', this)
                }
        }
        function otherCanPlay(board){
            board.parent.cleanDOM()
            board.parent.render()
            if (board.parent.checkForEnd()) {
                alert('game has ended')
                return
            }
            board.parent.changeTurn()
        }
        function explode (newX,newY,board){
            const possibleExploding=[[newX,newY],[newX+1,newY],[newX+1,newY+1],[newX+1,newY-1],[newX,newY+1],[newX,newY-1],[newX-1,newY+1],[newX-1,newY],[newX-1,newY-1]]
            //check if inside board
            let legalExploding= possibleExploding.filter((item) => {
                return item[0]>-1 && item[0]<8 && item[1]>-1 && item[1]<8
            })
            //set piece to dead and take out of the board
            for (let i=0; i<legalExploding.length; i++) {
                let acessedSquare= board[legalExploding[i][0]][legalExploding[i][1]];
                if (acessedSquare!==undefined) {
                    acessedSquare.dead=true;
                    //changing board pointer
                    board[legalExploding[i][0]][legalExploding[i][1]]=undefined;
                }

            }
        }
        function placePiece(piece,x,y,board) {
            piece.coords=[x,y]
            board[x][y]=piece
        }


        return {Gameboard,Knight,King, Rook, Bishop, Queen,Pawn}
    }

export default gameController;