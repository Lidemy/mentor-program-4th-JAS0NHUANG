/* eslint no-unused-vars: 'off', no-undef: 'off', camelcase: 'off' */

// global variables
const t0d0_URL = window.location.origin + window.location.pathname
const t0d0_api_URL = 'http://mentor-program.co/mtr04group6/JAS0NHUANG/T0D0/T0D0%20api/'

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// jQuery code
$(document).ready(() => {
  const addTodo = $('.todo__add__form')
  const todoList = $('.todo')

  $('.todo__title').click(event => {
    window.location.href = t0d0_URL
  })

  addTodo.submit(event => {
    event.preventDefault()
    const todoContent = escapeHtml($('.todo__add__input').val())
    if (todoContent !== '') {
      todoList.append(
        `<div class="todo__wrapper">
          <div class="todo__check-box"> -[ ] </div>
          <div class="todo__content">${todoContent}</div>
          <div class="todo__delete"> X </div>
        </div>`
      )
    }
    $('.todo__add__input').val('')
  })

  let isLineThrough = false
  todoList.delegate('.todo__content', 'click', event => {
    isLineThrough = $(event.target).hasClass('line-through')
    let content = $(event.target).text()
    $(event.target).replaceWith(`<input class="todo__edit" value=${content}>`)
    $('.todo__edit').focus()
  })

  todoList.delegate('.todo__edit', 'focusout', event=>{
    let content = $('.todo__edit').val()
    $(event.target).replaceWith(`<div class="todo__content ${ isLineThrough ? 'line-through' : '' }">${content}</div>`)
  })

  todoList.delegate('.todo__check-box', 'click', event => {
    if ($(event.target).hasClass('checked')) {
      $(event.target).html('-[ ]')
    } else {
      $(event.target).html('-[X]')
    }
    $(event.target).toggleClass('checked')
    $(event.target).parent().toggleClass('completed')
    $(event.target).next().toggleClass('line-through')
  })
  todoList.delegate('.todo__delete', 'click', event => {
    // 將 event.target 的 parent 存進變數
    const todoItem = $(event.target).parent()
    // 網上查到，fade out 之後再刪除的方法（沒辦法直接 .fadeOut().remove()）
    // 一定要 remove 元素才會真的被刪除，fade out 只是讓元素 bang 不見 XD
    // 感謝 ahwei777 同學幫忙抓蟲
    todoItem.fadeOut('normal', () => {
      todoItem.remove()
    })
  })
})
