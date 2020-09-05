/* eslint-disable no-undef */

document.querySelector('.header_nav').addEventListener('click', event => {
  if (event.target.classList.contains('header_post-btn')) {
    pageCover.innerHTML =
      `<form class="form" method="POST" action="./handler/handle_add_edit_post.php">
      <textarea class="form_textarea" name="content" placeholder="i love you!" maxlength="200"></textarea><br>
      <p class="form_charCalc">200 characters left.</p>
      <input class="form_submit" type="submit" value="POST">
      </form>`
    document.querySelector('body').appendChild(pageCover)
  }
})

// Listen to edit click event
document.querySelector('.main').addEventListener('click', event => {
  if (event.target.className === 'main_post_edit-btn') {
    const postContent = event.target.parentNode.querySelector('.main_post_content').innerText
    const postId = event.target.parentNode.querySelector('.main_post_id').innerHTML
    pageCover.innerHTML =
      `<form class="form" method="POST" action="./handler/handle_add_edit_post.php">
      <textarea class="form_textarea" name="content" placeholder="i love you!" maxlength="200"}>${postContent}</textarea><br>
      <p class="form_charCalc">200 characters left.</p>
      <input type="text" class="form_input" name="post_id" value=${postId} readonly></input>
      <input class="form_submit" type="submit" value="POST">
      </form>`
    document.querySelector('body').appendChild(pageCover)
  }
})

// Calculate the content length and show info to user. (not acurate number)
const maxContentLength = 200
document.querySelector('body').addEventListener('keydown', event => {
  if (event.target.className === 'form_textarea') {
    const enteredLength = charCalculator(event.target.value)
    if (maxContentLength - enteredLength === 0 && event.keyCode !== 8) {
      event.preventDefault()
    }
    document.querySelector('.form_charCalc').innerHTML = `About ${maxContentLength - enteredLength} characters left`
  }
})

// Listen to event 'click' on 'page-cover' and 'submit'
document.querySelector('body').addEventListener('click', event => {
  if (event.target.classList.contains('page-cover')) {
    event.target.remove()
  }
  if (event.target.classList.contains('form_submit')) {
    if (maxContentLength - charCalculator(document.querySelector('.form_textarea').value) < 0) {
      document.querySelector('.form_textarea').placeholder = 'Please enter message.'
      event.preventDefault()
    }
    if (document.querySelector('.form_textarea').value === '') {
      document.querySelector('.form_textarea').placeholder = 'Please enter message.'
      event.preventDefault()
    }
  }
})
