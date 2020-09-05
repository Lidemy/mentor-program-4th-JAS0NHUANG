/* eslint-disable no-undef */

document.querySelector('.header_nav').addEventListener('click', event => {
  // When LOG OUT clicked
  if (event.target.classList.contains('header_logout-btn')) {
    pageCover.innerHTML =
     `<form class="form" action="./handler/handle_logout.php">
      <div>Logout?</div>
      <input class="form_submit" type="submit" value="LOG OUT">
      </form>`
    document.querySelector('body').appendChild(pageCover)
  }
})
