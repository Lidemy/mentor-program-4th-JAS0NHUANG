const db = require('../models')
const Prize = db.Prize

const luckyController = {
  getLucky: (req, res) => {
    Prize.findAll()
    .then( prizes => {
      return prizeDraw(prizes)
    })
    .then( wonPrizeId => { 
      return Prize.findOne({
        where: {
          id: wonPrizeId 
        }
      })
    }).then( wonPrize => {
      res.status(200).json(wonPrize)
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  }
}

function prizeDraw(prizes) {
  let totalWeight = 0
  for (let i = 0; i < prizes.length; i++) {
    totalWeight += prizes[i].weight
  }
  const randomNum = Math.floor(Math.random() * totalWeight)
  let weightCount = 0
  for (let i = 0; i < prizes.length; i++) {
    weightCount += prizes[i].weight
    if (randomNum < weightCount) {
      return (prizes[i].id)
    }
  }
}

module.exports = luckyController
