let lastClicked
document
  .querySelector('#faq__section')
  .addEventListener('click', evt => {
    if (evt.target.closest('.faq__questions')) {
      const clicked = evt.target.closest('.faq__questions').querySelector('.faq__message')
      clicked.classList.toggle('show__message')

      if (
        lastClicked !== clicked &&
        lastClicked !== undefined &&
        lastClicked.classList.length === 2
      ) {
        lastClicked.classList.toggle('show__message')
      }
      lastClicked = clicked
    }
  })
