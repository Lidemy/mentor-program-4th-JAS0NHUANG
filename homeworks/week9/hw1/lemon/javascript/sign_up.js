/* eslint-disable no-undef */

document.querySelector('.header_nav').addEventListener('click', event => {
// When SIGN UP clicked
  if (event.target.classList.contains('header_signup-btn')) {
    pageCover.innerHTML =
       `<form class="signup form" method="POST" action="./handler/handle_signup.php">
        <label for="username">Username:</label>
        <input class="form_input username" type="text" name="username" placeholder="Username"></input>
        <label for="nickname">Nickname:</label>
        <input class="form_input nickname" type="text" name="nickname" placeholder="Nickname"></input>
        <label for="password">Password:</label>
        <input class="form_input password" type="password" name="password" placeholder="Password"></input>
        <p class="signup_warning">
          This site is under construction and unsecured. 
          Do not sign up using real-life username or password.
        </p>
        <input class="form_submit" type="submit" value="SIGN UP">
      </form>`

    document.querySelector('body').appendChild(pageCover)
  }
})

// Listen to event 'click' on 'submit'
document.querySelector('body').addEventListener('click', event => {
// Check if information entered.
  if (event.target.classList.contains('form_submit')) {
    const username = document.querySelector('.username').value
    const nickname = document.querySelector('.nickname').value
    if (username === '' || username.match(/[&<>"']/g).length !== 0) {
      document.querySelector('.username').placeholder = 'Please enter valid username.'
      event.preventDefault()
    }
    if (document.querySelector('.password').value === '') {
      document.querySelector('.password').placeholder = 'Please enter password.'
      event.preventDefault()
    }
    if (nickname === '' || nickname.match(/[&<>"']/g).length !== 0) {
      document.querySelector('.nickname').placeholder = 'Please enter valid nickname.'
      event.preventDefault()
    }
  }
})
