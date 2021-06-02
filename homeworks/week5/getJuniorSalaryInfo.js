const request = require('request')

// 設定變數
const API_URL = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2'
const OAUTH_URL = 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token'

let oauth2Token

// 設定請求 OAuth Token 需要用到的 request 資料
const oauthOptions = {
  method: 'POST',
  url: `${OAUTH_URL}`,
  headers: {
    'Content-Type': 'application/json'
  },
  form: {
    realm: 'partenaire',
    grant_type: 'client_credentials',
    client_id: XX,
    client_secret: XX,
    // 文件裡提到所有的 scope 都要加上，不然拿到的 Token 無效
    scope: 'application_PAR_jibtest_7888d6c5583211b145efa656041088277cfc57ffbeafd104c9d7a1eae0855e88 api_offresdemploiv2 o2dsoffre'
  }
}

// 請求 OAuth 2 Token
request(oauthOptions, (err, res, body) => {
  if (err) {
    console.log(err)
    return
  }
  const bodyData = JSON.parse(body)
  oauth2Token = bodyData.access_token
  // 拿到 Token 後直接傳到 options 裡面讓之後的 get request 使用
  const options = {
    url: `${API_URL}/offres/search?tempsPlein=true&experience=1&motsCles=${process.argv[2]}`,
    headers: {
      Authorization: `Bearer ${oauth2Token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  request(options, (err, res, body) => {
    if (err) {
      console.log(err)
      return
    }
    let bodyData
    try {
      bodyData = JSON.parse(body)
    } catch (err) {
      console.log(err)
      return
    }
    // console.log(bodyData)
    const [haveSalaire, haveInternSalaire, totalSalaire, noSalaire] = getSalaireInfo(bodyData)
    console.log('-----')
    console.log(`共 ${haveSalaire} 家公司提供最低薪資資訊`)
    console.log(`共 ${haveInternSalaire} 家公司提供實習薪資資訊`)
    console.log(`平均最低月薪約 ${Math.floor(totalSalaire / haveSalaire)}`)
    console.log(`薪資另議或未提供: ${noSalaire}`)
  })
})

// 取得薪資資訊函式
function getSalaireInfo(bodyData) {
  let haveSalaire = 0
  let haveInternSalaire = 0
  let totalSalaire = 0
  let noSalaire = 0
  const dash = '-'

  for (let i = 0; i < bodyData.resultats.length; i++) {
    const resultData = bodyData.resultats[i]
    // console.log(resultData.salaire)
    if (resultData.salaire !== undefined && resultData.salaire.libelle !== undefined) {
      const salaireRawData = resultData.salaire.libelle
      const salaire = Number(salaireRawData.split(' ')[2].split(',')[0])
      if (salaireRawData.includes('Mensuel')) {
        if (salaire >= 1540) {
          if (salaire > 3800) {
            console.log('error')
          } else {
            let companyName
            if (resultData.contact !== undefined && resultData.contact.nom !== undefined) {
              companyName = resultData.contact.nom
            } else {
              companyName = '(Company Name Not Provided)'
            }
            console.log(
              `公司名稱： ${companyName} ${dash.repeat(70 - companyName.length)} 月薪： ${salaire}`
            )
            totalSalaire += salaire
            haveSalaire += 1
          }
        } else {
          haveInternSalaire += 1
        }
      } else if (salaireRawData.includes('Horaire')) {
        if (salaire >= 10) {
          if (salaire > 25) {
            console.log('error')
          } else {
            let companyName
            if (resultData.contact !== undefined && resultData.contact.nom !== undefined) {
              companyName = resultData.contact.nom
            } else {
              companyName = '(Company Name Not Provided)'
            }
            console.log(
              `公司名稱： ${companyName} ${dash.repeat(70 - companyName.length)} 月薪： ${salaire * 151}`
            )
            totalSalaire += salaire * 151
            haveSalaire += 1
          }
        } else {
          haveInternSalaire += 1
        }
      } else if (salaireRawData.includes('Annuel')) {
        if (salaire / 12 > 1540) {
          if (salaire / 12 > 3800) {
            console.log('error')
          } else {
            let companyName
            if (resultData.contact !== undefined && resultData.contact.nom !== undefined) {
              companyName = resultData.contact.nom
            } else {
              companyName = '(Company Name Not Provided)'
            }
            console.log(
              `公司名稱： ${companyName} ${dash.repeat(70 - companyName.length)} 月薪： ${Math.floor(salaire / 12)}`
            )
            totalSalaire += Math.floor(salaire / 12)
            haveSalaire += 1
          }
        } else {
          haveInternSalaire += 1
        }
      }
    } else {
      noSalaire += 1
    }
  }
  return [haveSalaire, haveInternSalaire, totalSalaire, noSalaire]
}
