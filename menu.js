function menuMobile(){
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav.nav-mobi');
    nav.classList.toggle('active');
}
document.querySelector(".menu-toggle").addEventListener("click", menuMobile);