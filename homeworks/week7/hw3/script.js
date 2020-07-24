// 選取節點
const addTodo = document.querySelector('.add__todo__form')
const todoUl = document.querySelector('.todo__ul')
const toggleButton = document.querySelector('.button')

let todoArray = []

// 換顏色
let currentColor = 'blue'
let changeToColor = 'green'
function toggler(currentColor, changeToColor, element) {
  const currentColorAndElement = `${currentColor}__${element}`
  const changeToColorAndElement = `${changeToColor}__${element}`
  const current = document.querySelectorAll(`.${currentColorAndElement}`)
  for (const i in [...current]) {
    current[i].classList.add(changeToColorAndElement)
    current[i].classList.remove(currentColorAndElement)
  }
}

// 換顏色按鈕
toggleButton.addEventListener('click', evt => {
  toggler(currentColor, changeToColor, 'color')
  toggler(currentColor, changeToColor, 'background')
  toggler(currentColor, changeToColor, 'light')
  toggler(currentColor, changeToColor, 'done')
  toggler(currentColor, changeToColor, 'button')
  toggler(currentColor, changeToColor, 'checked')
  if (currentColor === 'blue') {
    currentColor = 'green'
    changeToColor = 'blue'
  } else {
    currentColor = 'blue'
    changeToColor = 'green'
  }
})

// 表單提交監聽器
addTodo.addEventListener('submit', evt => {
  evt.preventDefault()
  if (
    // addTodo[0] 可以選到 input 標籤
    addTodo[0].value !== '' &&
    // 確認 todoArray 裡還沒有輸入的條目
    !todoArray.includes(addTodo[0].value)
  ) {
    // 新增條目
    todoArray.push(escapeHtml(addTodo[0].value))
    const newLi = document.createElement('li')
    newLi.classList.add(`${currentColor}__background`)
    todoUl.appendChild(newLi)
    newLi.innerHTML =
      `<input type="checkbox" />
      <div class="checkbox__replace"></div>
      <div class="todo__content">${escapeHtml(addTodo[0].value)}</div>
      <div class="delete">X</div>
      `
  }
  // 清空表單內容
  addTodo[0].value = ''
})

// 在整個 todo list 上加監聽器
todoUl.addEventListener('click', evt => {
  const p = evt.target.parentNode
  // 按下刪除鍵，先刪掉條目，再用 filter 把 todoArray 裡的條目刪掉
  if (evt.target.className === 'delete') {
    p.remove()
    todoArray = todoArray.filter(item => {
      return item !== p.children[2].innerHTML
    })
    return
  }
  // 按下 checkbox
  if (evt.target.type === 'checkbox') {
    if (evt.target.checked === true) {
      p.classList.add(`${currentColor}__done`)
      evt.target.nextElementSibling.classList.add(`${currentColor}__checked`)
    } else {
      p.classList.remove(`${currentColor}__done`)
      evt.target.nextElementSibling.classList.remove(`${currentColor}__checked`)
    }
  }
})

// 取代字符
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
