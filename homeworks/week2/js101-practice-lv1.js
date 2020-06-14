console.log('印出一到九');
// for-----------------------------------------------------------------
console.log('for 版');
for (let i = 1; i <= 9; i += 1) {
  console.log(i);
}
// while----------------------------------------------------------------
console.log('while 版');
let i = 1;
while (i <= 9) {
  console.log(i);
  i += 1;
}
// --------------------------------------------------------------------
console.log('印出 1~n 的函式');
function printOneToN(n) {
  for (let j = 1; j <= n; j += 1) {
    console.log(j);
  }
}
printOneToN(5);
// -------------------------------------------------------------------
console.log('印出 n 個 * 的函式');
function star(n) {
  let starStr = '';
  for (let k = 0; k < n; k += 1) {
    starStr += '*';
  }
  console.log(starStr);
}
star(4);
// -------------------------------------------------------------------
console.log('回傳 n 個 * 的函式');
function returnStar(n) {
  let starStr = '';
  for (let k = 0; k < n; k += 1) {
    starStr += '*';
  }
  return starStr;
}
console.log(returnStar(5));
// --------------------------------------------------------------------
console.log('首字母是否為大寫');
function isUpperCase(str) {
  const charCode = str.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    return true;
  }
  return false;
  // 上面一段可以直接寫成：return charCode >= 65 && charCode <= 90
}
console.log(isUpperCase('abcd'));
console.log(isUpperCase('Abcd'));
console.log(isUpperCase('ABCD'));
console.log(isUpperCase('aBCD'));
// ----------------------------------------------------------------------
console.log('回傳第一個大寫字母及其 index');
function position(str) {
  for (let l = 0; l < str.length; l += 1) {
    if (str.charCodeAt(l) >= 65 && str.charCodeAt(l) <= 90) {
      return `${str[l]} ${l}`;
    }
  }
  return -1;
}
console.log(position('abcd'));
console.log(position('AbcD'));
console.log(position('abCD'));
// --------------------------------------------------------------------
console.log('回傳陣列中小於 n 的數之數量');
function findSmallCount(numArray, number) {
  let numCount = 0;
  for (let m = 0; m < numArray.length; m += 1) {
    if (numArray[m] < number) {
      numCount += 1;
    }
  }
  return numCount;
}
console.log(findSmallCount([1, 2, 3], 2));
console.log(findSmallCount([1, 2, 3, 4, 5], 0));
console.log(findSmallCount([1, 2, 3, 4], 100));
// -----------------------------------------------------------------
console.log('回傳陣列裡面所有小於 n 的數的總和');
function findSmallerTotal(numArray, number) {
  let numTotal = 0;
  for (let o = 0; o < numArray.length; o += 1) {
    if (numArray[o] < number) {
      numTotal += numArray[o];
    }
  }
  return numTotal;
}
console.log(findSmallerTotal([1, 2, 3], 3));
console.log(findSmallerTotal([1, 2, 3], 1));
console.log(findSmallerTotal([3, 2, 5, 8, 7], 999));
console.log(findSmallerTotal([3, 2, 5, 8, 7], 0));
// --------------------------------------------------------------
console.log('回傳陣列裡面所有小於 n 數的陣列');
function findAllSmall(numArray, number) {
  const allSmallArray = [];
  for (let p = 0; p < numArray.length; p += 1) {
    if (numArray[p] < number) {
      allSmallArray.push(numArray[p]);
    }
  }
  return allSmallArray;
}
console.log(findAllSmall([1, 2, 3], 10));
console.log(findAllSmall([1, 2, 3], 2));
console.log(findAllSmall([1, 3, 5, 4, 2], 4));
// -----------------------------------------------------------
console.log('回傳陣列總合');
function sum(numArray) {
  let sumNum = 0;
  for (let q = 0; q < numArray.length; q += 1) {
    sumNum += Number(numArray[q]);
  }
  return sumNum;
}
console.log(sum([1, 2, 3]));
console.log(sum([-1, 1, 2, -2, 3, -3]));
// 可以用 reduce
