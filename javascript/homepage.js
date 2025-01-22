/*const toggleMenu = () => {
  const menu = document.querySelector('.sidebar-navigation');
  if (menu.style.display === 'none') {
	menu.style.display = 'float';
  } else {
	menu.style.display = 'none';
  }
};

document.querySelector('.show-Menu-Icon').addEventListener('click', toggleMenu);
*/

function toggleMenu (){
  const menu = document.querySelector('.sidebar-navigation');
  if (menu.style.display === 'none') {
  menu.style.display = 'flex';
  } else {
  menu.style.display = 'none';
  }
}

document.querySelector('.menu-toggle-button').addEventListener('click', toggleMenu);