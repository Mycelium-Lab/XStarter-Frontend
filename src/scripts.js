var mainNav = document.querySelector('.xs-head-wrapper');
window.onscroll = function() {
	windowScroll();
};
function windowScroll() {
	mainNav.classList.toggle("scrolled", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}