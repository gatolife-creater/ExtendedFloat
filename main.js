let num1 = '23765.03287165723450123';
let num2 = '2248907658023765.032874';
let num3 = '123.0';
let num4 = '1.2';
let num5 = '0.9';

// 小数点の位置を求める関数
function searchPoint(string) {
  return string.indexOf('.');
}

// 整数部分を求める関数
function getinteger(string) {
  let integer = '';
  let pointPlace = searchPoint(string);
  for (let i = 0; i < pointPlace; i++) {
    integer += string[i];
  }
  return integer;
}

// 少数部分を求める関数
function getDecimal(string) {
  let decimal = '';
  let pointPlace = searchPoint(string);
  for (let i = pointPlace + 1; i < string.length; i++) {
    decimal += string[i];
  }
  return decimal;
}

// 数を整数と少数に分ける関数
function devide(string) {
  return {
    integer: getinteger(string),
    decimal: getDecimal(string),
  };
}

// 小数点を挿入する関数
function insertPoint(string, index) {
  let newInteger = '';
  for (let i = 0; i < index; i++) {
    newInteger = newInteger + string[i];
  }
  let newDecimal = '';
}

// 前後に必要数だけ0をつける関数
function increase0(dvdString, digits) {
  let newString = dvdString;
  while (newString.integer.length < digits.integer) {
    newString.integer = '0' + newString.integer;
  }
  while (newString.decimal.length < digits.decimal) {
    newString.decimal += '0';
  }
  return {
    integer: newString.integer,
    decimal: newString.decimal,
  };
}

// 2数の大小関係を比較する関数
function compare(dvd0String1, dvd0String2) {
  let st1 = dvd0String1;
  let st2 = dvd0String2;

  let maxSt = st1;
  let minSt = st2;

  for (let i = 0; i < st1.integer.length; i++) {
    if (st1.integer[i] < st2.integer[i]) {
      maxSt = st2;
      minSt = st1;
      break;
    }
  }
  for (let i = 0; i < st1.decimal.length; i++) {
    if (st1.decimal[i] < st2.decimal[i]) {
      maxSt = st2;
      minSt = st1;
      break;
    }
  }

  return { min: minSt, max: maxSt };
}

// 小数点を抜く関数
function pullOutPoint(string) {
  let dvdSt = devide(string);
  return dvdSt.integer + dvdSt.decimal;
}

// 2数を加算をする関数
function addition(augend, addend) {
  let dvdAugend = devide(augend);
  let dvdAddend = devide(addend);
  let digits = {
    integer: Math.max(dvdAugend.integer.length, dvdAddend.integer.length),
    decimal: Math.max(dvdAugend.decimal.length, dvdAddend.decimal.length),
  };

  // console.log("整数部分: " + digits.integer + "桁");
  // console.log("少数部分: " + digits.decimal + "桁");
  let dvdOkAugend = increase0(dvdAugend, digits);
  let dvdOkAddend = increase0(dvdAddend, digits);

  let flg = 0;

  let newDecimal = '';
  for (let i = digits.decimal - 1; 0 <= i; i--) {
    let p =
      Number(dvdOkAugend.decimal[i]) + Number(dvdOkAddend.decimal[i]) + flg;
    newDecimal = (p % 10) + newDecimal;
    if (p >= 10) flg = 1;
    else flg = 0;
  }

  let newInteger = '';
  for (let i = digits.integer - 1; 0 <= i; i--) {
    let p =
      Number(dvdOkAugend.integer[i]) + Number(dvdOkAddend.integer[i]) + flg;
    newInteger = (p % 10) + newInteger;
    if (p >= 10) flg = 1;
    else flg = 0;
  }

  if (flg) newInteger = '1' + newInteger;

  console.log(dvdOkAugend.integer + '.' + dvdOkAugend.decimal);
  console.log('+');
  console.log(dvdOkAddend.integer + '.' + dvdOkAddend.decimal);
  console.log('=');

  return newInteger + '.' + newDecimal;
}

// 2数を減算する関数
function subtraction(minuend, subtrahend) {
  let dvdMinuend = devide(minuend);
  let dvdSubtrahend = devide(subtrahend);
  let digits = {
    integer: Math.max(dvdMinuend.integer.length, dvdSubtrahend.integer.length),
    decimal: Math.max(dvdMinuend.decimal.length, dvdSubtrahend.decimal.length),
  };

  // console.log("整数部分: " + digits.integer + "桁")
  // console.log("少数部分: " + digits.decimal + "桁");
  let dvdOkMinuend = increase0(dvdMinuend, digits);
  let dvdOkSubtrahend = increase0(dvdSubtrahend, digits);

  let comparedSt = compare(dvdOkMinuend, dvdOkSubtrahend);
  console.log(comparedSt);
  let inversionFlg = false;
  if (comparedSt) {
    let p = dvdOkMinuend;
    dvdOkMinuend = dvdOkSubtrahend;
    dvdOkSubtrahend = p;
    inversionFlg = true;
  }
  console.log(inversionFlg);

  let flg = 0;

  let newDecimal = '';
  for (let i = digits.decimal - 1; 0 <= i; i--) {
    let p =
      Number(dvdOkMinuend.decimal[i]) -
      Number(dvdOkSubtrahend.decimal[i]) +
      flg;
    newDecimal = ((10 + p) % 10) + newDecimal;
    if (p < 0) flg = -1;
    else flg = 0;
  }

  let newInteger = '';
  for (let i = digits.integer - 1; 0 <= i; i--) {
    let p =
      Number(dvdOkMinuend.integer[i]) -
      Number(dvdOkSubtrahend.integer[i]) +
      flg;
    newInteger = ((10 + p) % 10) + newInteger;
    if (p < 0) flg = -1;
    else flg = 0;
  }

  if (flg === -1) newInteger[0] = 0;

  console.log(dvdOkMinuend.integer + '.' + dvdOkMinuend.decimal);
  console.log('-');
  console.log(dvdOkSubtrahend.integer + '.' + dvdOkSubtrahend.decimal);
  console.log('=');

  let resolve = newInteger + '.' + newDecimal;
  if (inversionFlg) resolve = '-' + resolve;

  return resolve;
}

function division(dividend, divisor) {}

const { ExtendedFloat } = require('./MasterFloat');
let masterNumber = new ExtendedFloat('0.14');
let masterNumber2 = new ExtendedFloat('2.0');
console.log(masterNumber, masterNumber2);

console.log('add');
console.log(masterNumber.addition(masterNumber2));

masterNumber = masterNumber
  .addition(masterNumber2)
  .multiplication(masterNumber2)
  .addition(masterNumber2);
console.log(masterNumber);
