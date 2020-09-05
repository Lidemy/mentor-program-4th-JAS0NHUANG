/* eslint-disable camelcase,  no-undef */
const site_name = 'aaa'
const host_URL = 'http://mentor-program.co/mtr04group6/JAS0NHUANG/comment%20APE/Comment%20APE%20API/'

// globle variables
let totalComments
let loaded = 0
let before
let lastGet

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// show comments and set load more btn
function showComments(data) {
  // append comments into dom
  for (let i = 0; i < lastGet; i++) {
    const comment_card = `<div class="card m-2 card-number-${before - i}">
        <div class="card-header d-flex justify-content-between px-2 py-1">
          <span class="d-inline-block mr-2">${escapeHtml(data.comments[i].nickname)}</span>
          <span class="d-inline-block col-4 p-0 text-right">${escapeHtml(data.comments[i].created_at)}</span>
        </div>
        <div class="card-body px-2 py-3">
          <p class="card-text">${escapeHtml(data.comments[i].content)}</p>
        </div>
      </div>`
    $('.comments').append(comment_card)
    $(`.card-number-${before - i}`).hide().fadeIn(500)
  }
  // set load more btn
  if (totalComments - loaded <= 0) {
    $('.load_more').hide()
  } else {
    $('.load_more').show()
  }
}

// get comments request
function getComments(callback) {
  let requestUrl = `${host_URL}get_comments_api.php?site_name=${site_name}`
  // check for the before cursor
  if (before) {
    requestUrl += `&before=${before}`
  }
  // request
  $.ajax({
    url: requestUrl
  }).done(responseData => {
    // set values
    totalComments = responseData.cursor_info[0].total_comments
    lastGet = responseData.cursor_info[0].last_get
    loaded += lastGet
    before = responseData.cursor_info[0].new_before

    callback(responseData)
    $('.load_more').unbind().click(event => {
      getComments(showComments)
    })
  })
}

// on page loaded
$(() => {
  // get comments
  getComments(showComments)

  // on form submitted
  $('#comment_ape').submit(event => {
    event.preventDefault()
    const nickname = $('#nickname').val()
    const comment = $('#comment').val()
    if (comment === '') {
      $('#comment')[0].placeholder = 'Please insert comment.'
    } else {
      // send post request
      $.ajax({
        method: 'POST',
        url: `${host_URL}add_comment_api.php`,
        data: {
          site_name: site_name,
          nickname: nickname,
          content: comment
        }
      }).done(result => {
        $('#nickname').val('')
        $('#comment').val('')
        $('.comments').empty()

        loaded = 0
        before = null
        lastGet = null

        getComments(showComments)
      })
    }
  })

  // To Top
  $('.back_to_top').click(event => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})
