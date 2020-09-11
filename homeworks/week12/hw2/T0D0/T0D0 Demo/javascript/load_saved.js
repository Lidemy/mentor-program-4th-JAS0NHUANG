/* eslint no-unused-vars: 'off', no-undef: 'off', camelcase: 'off' */
let list_id = null
$(document).ready(() => {
  const pageUrl = window.location.search.substring(1)
  const searchParams = new URLSearchParams(pageUrl)
  if (searchParams.get('list_id') !== null) {
    list_id = searchParams.get('list_id')
    $.get(
      `${t0d0_api_URL}get_T0D0_api.php?list_id=${list_id}`,
      data => {
        const listContent = data.todos.list_content
        for (const i in listContent) {
          const isC = listContent[i].isCompleted
          $('.todo').append(
            `<div class="todo__wrapper ${isC ? 'completed' : ''}">
            <div class="todo__check-box ${isC ? 'checked' : ''}"> -[${isC ? 'X' : ' '}] </div>
            <div class="todo__content ${isC ? 'line-through' : ''}">${escapeHtml(listContent[i].todoContent)}</div>
            <div class="todo__delete"> X </div>
          </div>`
          )
        }
        const selected_tab = `.${data.todos.selected_tab}`
      })
  }
})
