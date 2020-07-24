let lastClicked
document
  .querySelector('#faq__section')
  .addEventListener('click', evt => {
    if (closest(evt.target, 'faq__questions')) {
      const clicked = closest(evt.target, 'faq__questions').querySelector('.faq__message')
      clicked.classList.toggle('show__message')

      if (
        lastClicked !== undefined &&
        lastClicked !== clicked &&
        lastClicked.classList.length === 2
      ) {
        lastClicked.classList.toggle('show__message')
      }
      lastClicked = clicked
    }
  })

function closest(node, className) {
  while (node && node.classList) {
    if (node.classList.contains(className)) {
      return node
    }
    node = node.parentNode
  }
}
