import $ from 'jquery'

// get comments request
export function getComments(api_URL, site_name, before, callback) {
    let requestUrl = `${api_URL}get_comments_api.php?site_name=${site_name}`
    // check for the before cursor
    if (before) {
      requestUrl += `&before=${before}`
    }
    // request
    $.ajax({
      url: requestUrl
    }).done(responseData => {
       callback(responseData)
    })
  }