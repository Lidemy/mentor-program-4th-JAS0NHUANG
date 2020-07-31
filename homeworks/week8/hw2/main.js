// global variables
const API_URL = 'https://api.twitch.tv/kraken'
const clientId = 'ucau5lz6swwaed1ecwemy0ewrcvjva'
const request = new XMLHttpRequest()

// other variables
let topGameOffset = 0
let streamDivNum
let streamOffset = 0
let lastSelectedGame
let selectedGame

// escape html
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// send request function
function sendRequest(requestUrl, selectedGame, callback) {
  request.open('GET', requestUrl, true)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.setRequestHeader('Client-ID', clientId)
  request.onerror = () => console.log('error')
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      callback(request.response)
    }
  }
  request.send()
}

sendRequest(`${API_URL}/games/top?limit=6&offset=${topGameOffset}`, null, showTopGames)

// top game section
function showTopGames(responseData) {
  let json
  try {
    json = JSON.parse(responseData)
  } catch (err) {
    console.log(err)
    return
  }
  if (document.querySelector('.placeholder__selected')) {
    document.querySelector('.placeholder__selected').classList.remove('placeholder__selected')
    lastSelectedGame = ''
    selectedGame = ''
  }
  for (let i = 0; i < 5; i++) {
    const gameNum = document.querySelector(`.main__top${Number(i) + 1}`)
    gameNum.querySelector(
      '.placeholder'
    ).style.background = `url(${json.top[i].game.box.large}) center/cover no-repeat`
    gameNum.querySelector('.title').innerHTML = json.top[i].game.name
  }
  topGameOffset += 5
}

function clearPreview() {
  for (let i = 0; i < 5; i++) {
    const gameNum = document.querySelector(`.main__top${Number(i) + 1}`)
    gameNum.querySelector(
      '.placeholder'
    ).style.background = ''
    gameNum.querySelector('.title').innerHTML = ''
  }
}

// create new empty stream divs
function createDivs() {
  if (streamOffset === -1) return
  const mainStreamsDiv = document.querySelector('.main__streams')
  if (!mainStreamsDiv.querySelector('h1')) {
    const gameTitleH1 = document.createElement('h1')
    mainStreamsDiv.appendChild(gameTitleH1)
  }
  const afterStreams =
    `<div class="empty"></div>
    <div class="empty"></div>
    <div class="linebreaker"></div>
    <button class="load__more">Load More</button>`

  if (document.querySelectorAll('.empty').length > 0) {
    const removeAfterStreams = document.querySelector('.main__streams').innerHTML.replace(afterStreams, '')
    document.querySelector('.main__streams').innerHTML = removeAfterStreams
  }
  for (let i = 0; i < 20; i++) {
    streamDivNum = `stream__${streamOffset + 1}`
    const streamDiv =
      `<div class="stream__container ${streamDivNum}">
        <a href="" target="_blank">
          <div class="stream__preview">
          </div>
          <div class="stream__info">
            <div class="stream__avatar">
            </div>
            <div class="stream__title">
            </div>
          </div>
        </a>
      </div>`
    document.querySelector('.main__streams').innerHTML += streamDiv
    streamOffset += 1
  }
  document.querySelector('.main__streams').innerHTML += afterStreams
}

// streams
function showStreams(responseData) {
  let streamData
  try {
    streamData = JSON.parse(responseData)
  } catch (err) {
    console.log(err)
    return
  }
  document.querySelector('.main__streams').querySelector('h1').innerHTML = escapeHtml(selectedGame)
  // 如果抓到的實況筆數不被 20 整除，或等於 0，刪除多餘的空實況卡片。
  if ((streamData.streams.length % 20) !== 0 || streamData.streams.length === 0) {
    const streamOffsetHolder = streamOffset
    for (let i = streamOffset - 20 + streamData.streams.length + 1; i <= streamOffsetHolder; i++) {
      const uselessDiv = document.querySelector(`.stream__${i}`)
      const streamsDiv = document.querySelector('.main__streams')
      streamsDiv.removeChild(uselessDiv)
      streamOffset -= 1
    }
  }
  let newOffsetNum
  // 將資料放入空的實況卡片裡。
  for (const i in streamData.streams) {
    const streamDataI = streamData.streams[i]
    newOffsetNum = streamOffset - streamData.streams.length + Number(i)
    const container = document.querySelector(`.stream__${newOffsetNum + 1}`)
    container.querySelector('a').href = streamDataI.channel.url
    container.querySelector('.stream__preview').style.background =
      `url(${streamDataI.preview.medium}) center/cover no-repeat`
    container.querySelector('.stream__avatar').style.background =
      `url(${streamDataI.channel.logo}) center/cover no-repeat`
    container.querySelector('.stream__title').innerHTML =
      `<p>${streamDataI.channel.description.length ? streamDataI.channel.description : '<br>'}</p>
      <p>${streamData.streams[i].channel.display_name}</p>`
  }
  if (streamOffset % 20 !== 0 || newOffsetNum === streamOffset || streamData.streams.length === 0) {
    streamOffset = -1
    document.querySelector('.load__more').classList.add('hide')
  }
}

// 以上為所有的 Function

// 以下為所有的 eventListener
document.querySelector('.main__games').addEventListener('click', evt => {
  // when left/right clicked
  if (evt.target.classList.contains('main__games__carousel')) {
    if (evt.target.classList.contains('left')) {
      if (topGameOffset <= 5) return
      topGameOffset -= 10
    }
    clearPreview()
    sendRequest(`${API_URL}/games/top?limit=6&offset=${topGameOffset}`, null, showTopGames)
  }

  // When game clicked
  if (evt.target.classList.contains('placeholder')) {
    if (!lastSelectedGame || lastSelectedGame !== evt.target) {
      document.querySelector('.main__streams').innerHTML = ''
      streamOffset = 0
      evt.target.classList.add('placeholder__selected')
      if (lastSelectedGame) {
        lastSelectedGame.classList.remove('placeholder__selected')
      }
      lastSelectedGame = evt.target
      selectedGame = evt.target.nextElementSibling.innerText
    }
    createDivs()
    sendRequest(
      `${API_URL}/streams/?game=${encodeURIComponent(selectedGame)}&limit=20&offset=${streamOffset - 20}`
      , selectedGame, showStreams)
  }
})

// Search for game
document.querySelector('.search__btn').addEventListener('click', evt => {
  evt.preventDefault()
  const searchedGame = evt.target.parentNode.querySelector('.search__input').value
  evt.target.parentNode.querySelector('.search__input').value = ''
  document.querySelector('.main__streams').innerHTML = ''
  streamOffset = 0
  if (lastSelectedGame) {
    lastSelectedGame.classList.remove('placeholder__selected')
  }
  selectedGame = searchedGame
  createDivs()
  sendRequest(
      `${API_URL}/streams/?game=${encodeURIComponent(selectedGame)}&limit=20&offset=${streamOffset - 20}`
      , selectedGame, showStreams)
})

document.querySelector('.main__streams').addEventListener('click', evt => {
  if (evt.target.innerHTML === 'Load More') {
    createDivs()
    sendRequest(
      `${API_URL}/streams/?game=${encodeURIComponent(selectedGame)}&limit=20&offset=${streamOffset - 20}`
      , selectedGame, showStreams)
  }
})

document.querySelector('.back-to-top').addEventListener('click', evt => {
  window.scrollTo(0, 0)
})
