import { escapeHTML } from './escapeHTML'
import $ from 'jquery'

export function apeFormTemplate(site_name) {
  const template = 
    `<div>
      <div class="container-sm pt-3 mb-5 col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
        <form class="${site_name} comment_ape rounded p-4 shadow">
          <div class="form-group">
            <input type="text" class="form-control" id="${site_name}-nickname" placeholder="Nickname">
          </div>
          <div class="form-group">
            <textarea class="form-control" id="${site_name}-comment" rows="2" placeholder="Comment"></textarea>
          </div>
          <button type="submit" class="${site_name} btn btn-secondary btn-block">Submit</button>
        </form>

        <div class="${site_name} comments containner-sm pt-3">
        </div>
        <button class="${site_name} load_more btn btn-secondary btn-block">Load More</button>
        <button class="back_to_top btn btn-light btn-block">Top</button>
      </div>
    </div>`
  return template
}

export function appendCommentCard(site_name, before, lastGet, data) {
  for (let i = 0; i < lastGet; i++) {
    const commentCard =
      `<div class="${site_name} card m-2 card-number-${before-i}">
        <div class="card-header d-flex justify-content-between px-2 py-1">
          <span class="d-inline-block mr-2">${escapeHTML(data.comments[i].nickname)}</span>
          <span class="d-inline-block col-4 p-0 text-right">${escapeHTML(data.comments[i].created_at)}</span>
        </div>
        <div class="card-body px-2 py-3">
          <p class="card-text">${escapeHTML(data.comments[i].content)}</p>
        </div>
      </div>`
    
    $(`.${site_name}.comments`).append(commentCard)
    $(`.${site_name}.card-number-${before-i}`).hide().fadeIn(499)
  }
}