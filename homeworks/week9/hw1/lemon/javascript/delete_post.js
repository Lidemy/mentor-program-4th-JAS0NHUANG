/* eslint-disable no-undef */

document.querySelector('.main').addEventListener('click', event => {
  if (event.target.className === 'main_post_delete-btn') {
    const postId = event.target.parentNode.querySelector('.main_post_id').innerHTML
    pageCover.innerHTML =
     `<form class="form" method="POST" action="./handler/handle_delete_post.php">
      <div>Delete this post?</div>
      <input type="text" class="form_input" name="post_id" value=${postId} readonly></input>
      <br>
      <input class="form_submit" type="submit" value="DELETE">
      </form>`
    document.querySelector('body').appendChild(pageCover)
  }
})

document.querySelector('body').addEventListener('click', event => {
  // Remove form when user click outside the form.
  if (event.target.classList.contains('page-cover')) {
    event.target.remove()
  }
})
