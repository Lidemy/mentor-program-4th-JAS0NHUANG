const currentLang = 'zh_tw'

function changLang(lang) {
  document.querySelector('.article_title').innerText = window.I18N[lang].title
  document.querySelector('.article_excerpt').innerText = window.I18N[lang].content
}

changLang(currentLang)
