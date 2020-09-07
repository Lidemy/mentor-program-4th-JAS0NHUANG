/* eslint no-unused-vars: 'off', no-undef: 'off', camelcase: 'off' */
$(document).ready(() => {
  const navBar = $('.todo__options')
  const selected_tab = ''

  // add selected class when div clicked
  navBar.delegate('div', 'click', event => {
    if ($(event.target).hasClass('todo__all') ||
      $(event.target).hasClass('todo__active') ||
      $(event.target).hasClass('todo__completed')
    ) {
      $('.selected').removeClass('selected')
      $(event.target).addClass('selected')
    }
  })

  // different behavior for different div
  navBar.delegate('.todo__all', 'click', event => {
    $('.todo__wrapper').removeClass('hide')
  })
  navBar.delegate('.todo__active', 'click', event => {
    $('.completed').addClass('hide')
    $('.todo__wrapper').not('.completed').removeClass('hide')
  })
  navBar.delegate('.todo__completed', 'click', event => {
    $('.completed').removeClass('hide')
    $('.todo__wrapper').not('.completed').addClass('hide')
  })
  navBar.delegate('.todo__clear', 'click', event => {
    $('.completed').remove()
  })

  navBar.delegate('.todo__save', 'click', event => {
    const todoArray = [...$('.todo__wrapper')]
    let todos = []
    for (const i in todoArray) {
      todoObject = {
        isCompleted: todoArray[i].classList.contains('completed'),
        todoContent: todoArray[i].querySelector('.todo__content').innerText
      }
      todos.push(todoObject)
    }
    const selected_tab = document.querySelector('.selected').classList[0]
    $.ajax({
      method: 'POST',
      url: `${t0d0_api_URL}save_T0D0_api.php`,
      // 把 todos 陣列轉成字串傳給後端
      data: { list_id, list_content: JSON.stringify(todos), selected_tab }
    })
      .done(data => {
        let responseData = JSON.parse(data)
        let message = ''
        if (responseData.status !== 4) {
          message = 
            `Your "list_id" is ${responseData.message}.\nYour will be redirected to your list link.\n` +
            `Add the link to "My Favorite" to save it. ^_^`
          alert(message)
          window.location.href = `${t0d0_URL}?list_id=${responseData.message}`
        } else {
          message = `${responseData.message}`
          alert(message)
        }
      })
  })
})
