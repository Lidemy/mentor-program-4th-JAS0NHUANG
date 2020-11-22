const API_URL = "http://lucky-jas0n.herokuapp.com"

const prizeName = document.querySelector('.prize__name')
const prizePhoto = document.querySelector('.prize__photo')

function sendRequest(requestUrl, prize) {
  return fetch(requestUrl, {
    method: 'GET'
  })
  .catch( error => {
    console.log(error)
  })
}

if (window.location.href === "http://lucky-jas0n.herokuapp.com/") {
  document.querySelector('.get__lucky__btn')
  .addEventListener("click", event => {
    prizeName.classList.add('hide')
    prizePhoto.classList.add('hide')
    prizeName.classList.remove('show')
    prizePhoto.classList.remove('show')
    sendRequest(`${API_URL}/get-lucky`, null)
    .then( response => {
      return response.text()
    })
    .then( text =>{
      showWonPrize(text)
    }).catch( error => {
      console.log(error)
      return
    })
  })
}

function showWonPrize(responseData) {
  let json
  try {
    json = JSON.parse(responseData)
  } catch (err) {
    console.log(err)
    return
  }
  prizeName.innerText = json.name
  prizePhoto.src = json.photo
  setTimeout( () => {
    prizeName.classList.add('show')
    prizePhoto.classList.add('show')
    prizeName.classList.remove('hide')
    prizePhoto.classList.remove('hide')
  }, 1000)
}

if (window.location.href === "http://lucky-jas0n.herokuapp.com/admin") {
  sendRequest(`${API_URL}/prize-list`, null)
  .then( response => {
    return response.text()
  })
  .then( text => {
    console.log(text)
    showPrizes(text)
  }).catch( error => {
    console.log(error)
    return
  })
}

function showPrizes(responseData) {
  let json
  try {
    json = JSON.parse(responseData)
  } catch (err) {
    console.log(err)
  return
  }
  for (let i = 0; i < json.length; i++){
    appendPrize(json[i])
  }
}

function appendPrize(prize){
  const prizeItem = 
    `<tr class="prize__item">
      <td class="prize__name">
        ${prize.name}
      </td>
      <td class="prize__photo">
        ${prize.photo}
      </td>
      <td class="prize__photo__preview">
        <img src="${prize.photo}">
      </td>
      <td class="prize__weight">
        ${prize.weight}
      </td>
      <td class="prize__edit">
        <a href="/edit-prize/${prize.id}">
          edit
        </a>
      </td>
      <td class="prize__delete">
        <a href="/handle-delete-prize/${prize.id}">
          delete
        </a>
      </td>
    </tr>`
  document.querySelector('.prize__list').innerHTML += prizeItem
}
