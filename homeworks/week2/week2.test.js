// 所有要求「印出」的作業，測資就直接寫在作業裡面了
// hw2 測試
const hw2 = require('./hw2.js')

describe('hw2: 首字母大寫', function () {
  test('nick => Nick', function () {
    expect(hw2.capitalize('nick')).toBe('Nick')
  })
  test('Nick => Nick', function () {
    expect(hw2.capitalizeAdv('Nick')).toBe('Nick')
  })
  test(',hello => ,hello', function () {
    expect(hw2.capitalizeArrow(',hello')).toBe(',hello')
  })
  test('just another test! => Just another test!', function () {
    expect(hw2.capitalizeArrow('just another test!')).toBe('Just another test!')
  })
})

// hw5 測試
const hw5 = require('./hw5.js')

describe('hw5: join', function () {
  test(`['a'], '!' => a`, function () {
    expect(hw5.join(['a'], '!')).toBe('a')
  })
  test(`[1, 2, 3], '' => 123`, function () {
    expect(hw5.join([1, 2, 3], '')).toBe('123')
  })
  test(`['a', 'b', 'c'], '!' => 'a!b!c'`, function () {
    expect(hw5.join(['a', 'b', 'c'], '!')).toBe('a!b!c')
  })
  test(`['a', 1, 'b', 2, 'c', 3], ',' => 'a,1,b,2,c,3'`, function () {
    expect(hw5.join(['a', 1, 'b', 2, 'c', 3], ',')).toBe('a,1,b,2,c,3')
  })
  test(`['aaa', 'bb', 'c', 'dddd'], ',,' => 'aaa,,bb,,c,,dddd'`, function () {
    expect(hw5.join(['aaa', 'bb', 'c', 'dddd'], ',,')).toBe('aaa,,bb,,c,,dddd')
  })
  test(`[], '!!' => ''`, function () {
    expect(hw5.join([], '!!')).toBe('')
  })
 })

describe('hw5: repeat', function () {
  test(`'a', 5 => 'aaaaa'`, function () {
    expect(hw5.repeat('a', 5)).toBe('aaaaa')
  })
  test(`'yoyo', 2 => 'yoyoyoyo'`, function () {
    expect(hw5.repeat('yoyo', 2)).toBe('yoyoyoyo')
  })
  test(`'', 100 => ''`, function () {
    expect(hw5.repeat('', 100)).toBe('')
  })
})
