## Promise

Another example of promise base web api:
`navigator.clipboard.readText()`

## Create my own promise
```
const myPromise = new Promise((resolve, reject) => {
  if (err) {
    reject(999)
  }
  resolve(3)
})

myPromise
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
```

- One promise can only be resolved or rejected. Its' state will not change after resolved/rejected.

## Play with promise

```
function sleep(ms) {
  const myPromise = new Promise(resolve =>{
    setTimeout(resolve, ms)
  })
  return myPromise
}

sleep(3000).then(data => {
  console.log(data)
})
```

simplification 1:
```
function sleep(ms) {
  return new Promise(resolve =>{
    setTimeout(resolve, ms)
  })
}
```

Arrow functionification XD :
```
const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
```

One line!!

```
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
```
## Async Await

Write ASYNCHRONOUS code in SYNCHRONOUS style.
```
const response = await fetch(XXX)
console.log(response)
```

### How do we actually use it
```
async function main() {
  await sleep(1000)
  const result = await getData()
  console.log(result)
}

main()
```

And now we can use `try...catch` with it.
```
try {
  const result = await getData()
} catch(error) {
  console.log(error)
}

console.log(result)
```

### await must be followed by a promise