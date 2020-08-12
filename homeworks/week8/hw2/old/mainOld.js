const API_URL = 'https://api.twitch.tv/kraken'
const clientId = 'ucau5lz6swwaed1ecwemy0ewrcvjva'

const header = document.querySelector('.header')
const mainGames = document.querySelector('.main__games')

const request = new XMLHttpRequest()

let topGameOffset = 0

function getTopGamesRequest () {
  request.onload = () => {
    const json = JSON.parse(request.response)
    console.log(json)

    if (document.querySelector('.placeholder__selected')) {
      document
        .querySelector('.placeholder__selected')
        .classList.remove('placeholder__selected')
      lastSelected = ''
      selectedGameTitle = ''
    }
    console.log(json.top)
    for (let i = 0; i < 5; i++) {
      const gameNum = mainGames.querySelector(`.main__top${Number(i) + 1}`)
      gameNum.querySelector(
        '.placeholder'
      ).style.background = `url(${json.top[i].game.box.large}) center/cover no-repeat`
      gameNum.querySelector('.title').innerHTML = json.top[i].game.name
    }
  }
  console.log(`${API_URL}/games/top?limit=5&offset=${topGameOffset}`)
  request.open(
    'GET',
    `${API_URL}/games/top?limit=6&offset=${topGameOffset}`,
    true
  )
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.setRequestHeader('Client-ID', clientId)
  request.onerror = () => console.log('error')
  request.send()
  topGameOffset += 5
}
getTopGamesRequest()

// when > clicked
document.querySelector('.right').addEventListener('click', evt => {
  getTopGamesRequest()
})

document.querySelector('.left').addEventListener('click', evt => {
  console.log(topGameOffset)
  if (topGameOffset <= 5) return
  topGameOffset -= 10
  console.log(topGameOffset)
  getTopGamesRequest()
})

let lastSelected
let selectedGameTitle

mainGames.addEventListener('click', evt => {
  if (evt.target.classList.contains('placeholder')) {
    if (!lastSelected || lastSelected !== evt.target) {
      document.querySelector('.main__streams').innerHTML = ''
      offsetNum = 0
      evt.target.classList.toggle('placeholder__selected')
      if (lastSelected) {
        lastSelected.classList.toggle('placeholder__selected')
      }
      lastSelected = evt.target
      selectedGameTitle = evt.target.nextElementSibling.innerHTML
      console.log(selectedGameTitle)
    }

    header.classList.add('streaming')
    header.querySelector('.header__wraper').classList.add('streaming')
    header.querySelector('.header__logo').classList.add('streaming')
    header.querySelector('.header__logo img').classList = 'streaming'
    header.querySelector('.header__title').classList.add('streaming')
    createDivs()
    showStreams(selectedGameTitle)
  }
})

// streams
let streamNum
let offsetNum = 0

function createDivs () {
  if (document.querySelectorAll('.empty').length > 0) {
    const emptyDivArray = [...document.querySelectorAll('.empty')]
    emptyDivArray[0].remove()
    emptyDivArray[1].remove()
  }
  if (document.querySelector('.linebreaker')) {
    document.querySelector('.linebreaker').remove()
  }
  if (document.querySelector('button')) {
    document.querySelector('button').remove()
  }
  for (let i = 0; i < 20; i++) {
    streamNum = `stream__${offsetNum + 1}`
    const streamDiv = document.createElement('div')
    streamDiv.classList = 'stream__container'
    streamDiv.innerHTML = `<div class="stream__preview">
                </div>
               <div class="stream__info">
                      <div class="stream__avatar">
                    </div>
                        <div class="stream__title">
                        </div>
                    </div>`
    streamDiv.classList.add(streamNum)
    document.querySelector('.main__streams').appendChild(streamDiv)
    offsetNum += 1
  }
  const emptyDiv1 = document.createElement('div')
  const emptyDiv2 = document.createElement('div')
  const lineBreaker = document.createElement('div')
  emptyDiv1.classList = 'empty'
  emptyDiv2.classList = 'empty'
  lineBreaker.classList = 'linebreaker'
  document.querySelector('.main__streams').appendChild(emptyDiv1)
  document.querySelector('.main__streams').appendChild(emptyDiv2)
  document.querySelector('.main__streams').appendChild(lineBreaker)
  const loadMoreBtn = document.createElement('button')
  loadMoreBtn.innerHTML = 'Load More'
  document.querySelector('.main__streams').appendChild(loadMoreBtn)
}

function showStreams (gameTitle) {
  let streamData
  request.onload = () => {
    streamData = JSON.parse(request.response)
    console.log(streamData.streams[1])
    for (const i in streamData.streams) {
      const streamDataI = streamData.streams[i]
      const newOffsetNum = offsetNum - 20 + Number(i)
      const streamContainer = document.querySelector(
        `.stream__${newOffsetNum + 1}`
      )
      streamContainer.querySelector(
        '.stream__preview'
      ).style.background = `url(${streamDataI.preview.medium}) center/cover no-repeat`
      streamContainer.querySelector(
        '.stream__avatar'
      ).style.background = `url(${streamDataI.channel.logo}) center/cover no-repeat`
      const channelDesc = streamDataI.channel.description.length
        ? streamDataI.channel.description
        : '<br>'
      streamContainer.querySelector(
        '.stream__title'
      ).innerHTML = `<p>${channelDesc}</p>
              <p>${streamData.streams[i].channel.display_name}</p>`
    }
  }
  request.open(
    'GET',
    `${API_URL}/streams/?game=${gameTitle}&limit=20&offset=${offsetNum}`,
    true
  )
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.setRequestHeader('Client-ID', clientId)
  request.onerror = () => console.log('error')
  request.send()
}

document.querySelector('.main__streams').addEventListener('click', evt => {
  if (evt.target.innerHTML === 'Load More') {
    createDivs()
    showStreams(selectedGameTitle)
  }
})
document.querySelector('.back-to-top').addEventListener('click', evt => {
  window.scrollTo(0, 0)
})
