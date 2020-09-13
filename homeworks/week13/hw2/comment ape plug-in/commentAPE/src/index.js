import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import { getComments } from './getComments'
import { addComment } from './addComment'
import { apeFormTemplate, appendCommentCard } from './templates'

export function init(options){
  let site_name = options.site_name
  let api_URL = options.api_URL
  let ape_division = $(options.ape_division)

  // globle variables
  let totalComments
  let loaded = 0
  let before
  let lastGet

  function setVariables (data) {
    // set variables' values
    totalComments = data.cursor_info[0].total_comments
    lastGet = data.cursor_info[0].last_get
    loaded += lastGet
    before = data.cursor_info[0].new_before
  }

  ape_division.append(apeFormTemplate(site_name)) 
  console.log()
  getComments(api_URL, site_name, before, data => {
    console.log(data)
    setVariables(data)
    showComments(data)

    $(`.${site_name}.load_more`).unbind().click(event => {
      getComments(api_URL, site_name, before, data => {
        setVariables(data)
        showComments(data)
      })
    })
  })

  // show comments and set load more btn
  function showComments(data) {
    // append comments into dom
    appendCommentCard(site_name, before, lastGet, data)
    // set load more btn
    console.log(totalComments, loaded)
    if (totalComments - loaded <= 0) {
      console.log(totalComments, loaded)
      $(`.${site_name}.load_more`).hide()
    } else {
      $(`${site_name}.load_more`).show()
    }
  }

  // on form submitted
  $(`.${site_name}.comment_ape`).submit(event => {
    event.preventDefault()
    const nickname = $(`#${site_name}-nickname`).val()
    const comment = $(`#${site_name}-comment`).val()
    
    if (comment === '') {
      $(`#${site_name}-comment`)[0].placeholder = "Please insert comment."
    } else {
      addComment(api_URL, site_name, nickname, comment, data => { 
        $(`#${site_name}-nickname`).val('')
        $(`#${site_name}-comment`).val('')
        $(`.${site_name}.comments`).empty()

        loaded = 0
        before = null
        lastGet = null

        getComments(api_URL, site_name, before, data => {
          // set values
          totalComments = data.cursor_info[0].total_comments
          lastGet = data.cursor_info[0].last_get
          loaded += lastGet
          before = data.cursor_info[0].new_before
  
          $(`${site_name}.load_more`).unbind().click(event => {
            getComments(api_URL, site_name, before, totalComments, lastGet, loaded, callback)
          })
        showComments(data)
        })
      })
    }

  })
  
  // To Top
  $('.back_to_top').click( event => {
    window.scrollTo({top: -1, behavior: 'smooth'})
  })

}