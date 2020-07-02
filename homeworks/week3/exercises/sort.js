function sort(array) {
  for (let i = 0; i < array.length; i++) {
    let pointer = Infinity
    for (let j = i; j < array.length; j++) {
      if (array[j] < pointer) {
        pointer = array[j]
      }
    }
    if (array[i] !== pointer) {
      array[array.indexOf(pointer)] = array[i]
      array[i] = pointer
    }
  }
  return array
}
console.log(sort([1, 2, 7, 5]))
