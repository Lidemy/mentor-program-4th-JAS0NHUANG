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
        $('.todo').append(data.todos.list_content)
        const selected_tab = `.${data.todos.selected_tab}`
        $(selected_tab).addClass('selected')
      })
  }
})
