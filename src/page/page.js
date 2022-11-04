import gameController from "../chess/gameController.js"

// IIFE for hamburguer layout
(function (){
const hamburguer = document.querySelector(".hamburguer");
const navList= document.querySelector(".nav-list")

hamburguer.addEventListener("click", ()=>{
    hamburguer.classList.toggle("active");
    navList.classList.toggle("active");
})
}());

//IIFE for displaying different pages when clicking on navbar/homepage buttons.
(function (){
    const navItems= document.getElementsByClassName('nav-item');
    const sections=document.querySelectorAll('section');
    //loop for adding listeners
    for (let i=0; i<navItems.length; i++) {
        navItems[i].addEventListener('click', displayClicked)
    }
    //this will add notcurrent to all classes and remove the one clicked.
    function displayClicked(e) {
        for (let i=0; i<sections.length; i++) {
            sections[i].classList.add('notcurrent')
        }
        sections[e.target.dataset.page].classList.remove('notcurrent')
    }
}());

// should above be an object for reuse?
// I don't think so, It loads just one time + just by creating a new section/button It'll be rendered. 
//It's up for extension if someone creates a func

//button to decide which side you'll play on single player
(function (){
    const whiteStart=document.getElementById('white-start')
    const blackStart=document.getElementById('black-start')
    const chooseSide=document.getElementById('chooseSide')

whiteStart.addEventListener('click', startGame)
blackStart.addEventListener('click', startGame)

function startGame(e) {
    chooseSide.classList.add('hidden');
    console.log(e.target.id.slice(0,5) + ' is human')
    
    let game= gameController()
    let gameboard= new game.Gameboard()
    gameboard.render()
}
}())