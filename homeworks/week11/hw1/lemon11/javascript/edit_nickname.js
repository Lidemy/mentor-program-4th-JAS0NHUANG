/* eslint-disable no-undef */

document.querySelector('.header_nav').addEventListener('click', event => {
// When SIGN UP clicked
  if (event.target.classList.contains('header_edit_nickname-btn')) {
    pageCover.innerHTML =
       `<form class="signup form" method="POST" action="./handler/handle_edit_nickname.php">
        <label for="nickname">Nickname:</label>
        <input class="form_input nickname" type="text" name="nickname" placeholder="Nickname"></input>
        <input class="form_submit" type="submit" value="EDIT">
      </form>`

    document.querySelector('body').appendChild(pageCover)
  }
})

// Listen to event 'click' on 'submit'
document.querySelector('body').addEventListener('click', event => {
// Check if information entered.
  if (event.target.classList.contains('form_submit')) {
    const nickname = document.querySelector('.nickname').value
    if (nickname === '' || nickname.match(/[&<>"']/g).length !== 0) {
      document.querySelector('.nickname').placeholder = 'Please enter valid nickname.'
      event.preventDefault()
    }
  }
})
