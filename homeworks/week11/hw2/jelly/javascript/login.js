document
  .querySelector('.header_admin')
  .addEventListener('click', function(event) {
    if (event.target.classList.contains('header_admin_login')) {
      event.preventDefault()
      document.querySelector('.page-cover').classList.toggle('hide')
    }
  })

document
  .querySelector('.page-cover')
  .addEventListener('click', function(event) {
    if (event.target.classList.contains('page-cover')) {
      document.querySelector('.page-cover').classList.toggle('hide')
      document.querySelector('.warning').innerText = ''
    }
  })

document
  .querySelector('form')
  .addEventListener('click', function(event) {
    if (event.target.classList.contains('login-btn')) {
      const username = document.querySelector('input[type="text"]').value
      const password = document.querySelector('input[type="password"]').value
      if (username === '' || password === '') {
        event.preventDefault()
        document.querySelector('.warning').innerText = 'Please enter username and password'
      }
    }
  })
