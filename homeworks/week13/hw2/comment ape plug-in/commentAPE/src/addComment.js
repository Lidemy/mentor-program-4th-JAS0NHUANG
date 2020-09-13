import $ from 'jquery'

// add comment request
export function addComment(api_URL, site_name, nickname, comment, callback) {
  // send post request
  $.ajax({
    method: 'POST',
    url: `${api_URL}add_comment_api.php`,
    data: {
      site_name: site_name,
      nickname: nickname,
      content: comment
    }
  }).done(result => {
       callback(result)
    })
  }