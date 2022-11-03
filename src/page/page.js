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

