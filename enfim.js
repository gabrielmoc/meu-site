var menuIcon = document.querySelector('.menu-icon');
var menu = document.querySelector('nav ul');

menuIcon.addEventListener('click', function() {
    // Alterna a classe 'active' no menu
    menu.classList.toggle('active');
});
  