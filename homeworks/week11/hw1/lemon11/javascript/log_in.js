/* eslint-disable no-undef */

document.querySelector('.header_nav').addEventListener('click', event => {
  // When LOG IN clicked
  if (event.target.classList.contains('header_login-btn')) {
    pageCover.innerHTML =
     `<form class="signup form" method="POST" action="./handler/handle_login.php">
    <label for="username">Username:</label>
    <input class="form_input username" type="text" name="username" placeholder="Username"></input>
    <label for="password1">Password:</label>
    <input class="form_input password" type="password" name="password" placeholder="Password"></input>
    <input class="form_submit" type="submit" value="LOG IN">
  </form>`

    document.querySelector('body').appendChild(pageCover)
  }
})

// Listen to event 'click' on 'submit'
document.querySelector('body').addEventListener('click', event => {
// Check if information entered.
  if (event.target.classList.contains('form_submit')) {
    const username = document.querySelector('.username').value
    if (username === '' || username.match(/[&<>"']/g).length !== 0) {
      document.querySelector('.username').placeholder = 'Please enter valid username.'
      event.preventDefault()
    }
    if (document.querySelector('.password').value === '') {
      document.querySelector('.password').placeholder = 'Please enter password.'
      event.preventDefault()
    }
  }
})
