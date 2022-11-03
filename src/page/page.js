const hamburguer = document.querySelector(".hamburguer");
const navList= document.querySelector(".nav-list")

hamburguer.addEventListener("click", ()=>{
    hamburguer.classList.toggle("active");
    navList.classList.toggle("active");
})