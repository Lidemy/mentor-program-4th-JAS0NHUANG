/* eslint-disable no-undef */

document.querySelector('.header_nav').addEventListener('click', event => {
// When SIGN UP clicked
  if (event.target.classList.contains('header_signup-btn')) {
    pageCover.innerHTML =
       `<form class="signup form" method="POST" action="./handler/handle_signup.php">
        <label for="username">Username:</label>
        <input class="form_input username" type="text" name="username" placeholder="Username"></input>
        <div class="warning_username hide">Please enter valid username.</div>
        <label for="nickname">Nickname:</label>
        <input class="form_input nickname" type="text" name="nickname" placeholder="Nickname"></input>
        <div class="warning_nickname hide">Please enter valid nickname.</div>
        <label for="password">Password:</label>
        <input class="form_input password" type="password" name="password" placeholder="Password"></input>
        <div class="warning_password hide">Please enter valid password.</div>
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
    const password = document.querySelector('.password').value
    const nickname = document.querySelector('.nickname').value
    if (username.length < 3) {
      document.querySelector('.warning_username').classList.remove('hide')
      event.preventDefault()
    } else {
      document.querySelector('.warning_username').classList.add('hide')
    }
    if (nickname.length < 3) {
      document.querySelector('.warning_nickname').classList.remove('hide')
      event.preventDefault()
    } else {
      document.querySelector('.warning_nickname').classList.add('hide')
    }
    if (password.length < 8) {
      document.querySelector('.warning_password').classList.remove('hide')
      event.preventDefault()
    } else {
      document.querySelector('.warning_password').classList.add('hide')
    }
  }
})
