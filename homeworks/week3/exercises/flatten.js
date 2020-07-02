const array = [1, [2, [3, [4]], 5], 6]

const newArray = []

function flatten(array) {
  for (const i in array) {
    if (typeof array[i] === 'object') {
      flatten(array[i])
    } else {
      newArray.push(array[i])
    }
  }
  return newArray
}

console.log(flatten(array))
