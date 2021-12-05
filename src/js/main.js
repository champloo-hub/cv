$(document).ready(function () {
  // Headeru Menu
  $('.header__menu-s').on('click', function () {
    $('.header__menu-s').toggleClass('header__menu-s--open');
    $('body').toggleClass('header-nav-open')
  });
});