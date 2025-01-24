
function toggleMenu (){
  const sidebar = document.querySelector('.sidebar-navigation');
  if (sidebar.style.display === 'none' || sidebar.style.display === '') {
    sidebar.style.display = 'flex';
  } else {
    sidebar.style.display = 'none';
  }
}

document.querySelector('.menu-icon-image').addEventListener('click', toggleMenu);

document.querySelector('.close-menu-bar').addEventListener('click', toggleMenu);

//second header with products