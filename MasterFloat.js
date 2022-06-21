class ExtendedFloat {
  constructor(number) {
    this.number = number;
    this.integer = '';
    this.decimal = '';
    this.splitNum();
  }

  // 小数点の位置を求める関数
  searchPoint() {
    return this.number.indexOf('.');
  }

  // 数を整数と少数に分ける関数
  devide(string) {
    return {
      integer: getinteger(string),
      decimal: getDecimal(string),
    };
  }

  /**
   * 巨大な少数を少数部分と整数部分に分解する
   * @returns {object}
   */
  splitNum() {
    let periodPlace = this.searchPoint();

    for (let i = 0; i < periodPlace; i++) this.integer += this.number[i];

    for (let i = periodPlace + 1; i < this.number.length; i++)
      this.decimal += this.number[i];
  }

  // 2数を加算をする関数

  addition(addend) {
    // let dvdAugend = this;
    // let dvdAddend = addend;
    console.log(this);
    let digits = {
      integer: Math.max(this.integer.length, addend.integer.length),
      decimal: Math.max(this.decimal.length, addend.decimal.length),
    };

    // console.log("整数部分: " + digits.integer + "桁");
    // console.log("少数部分: " + digits.decimal + "桁");
    let dvdOkAugend = this.increase0(this, digits);
    let dvdOkAddend = this.increase0(addend, digits);

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

    return new ExtendedFloat(newInteger + '.' + newDecimal);
  }

  // 2数を減算する関数
  subtraction(subtrahend) {
    // let dvdMinuend = this;
    // let dvdSubtrahend = subtrahend;
    let digits = {
      integer: Math.max(this.integer.length, subtrahend.integer.length),
      decimal: Math.max(this.decimal.length, subtrahend.decimal.length),
    };

    // console.log("整数部分: " + digits.integer + "桁")
    // console.log("少数部分: " + digits.decimal + "桁");
    let dvdOkMinuend = increase0(this, digits);
    let dvdOkSubtrahend = increase0(subtrahend, digits);

    // console.log(dvdOkMinuend, dvdOkSubtrahend)

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

    console.log(newInteger[0]);
    if (flg === -1) newInteger[0] = 0;

    console.log(dvdOkMinuend.integer + '.' + dvdOkMinuend.decimal);
    console.log('-');
    console.log(dvdOkSubtrahend.integer + '.' + dvdOkSubtrahend.decimal);
    console.log('=');

    let resolve = newInteger + '.' + newDecimal;
    if (inversionFlg) resolve = '-' + resolve;

    return resolve;
  }

  // 小数点を挿入する関数
  insertPoint(string, index) {
    let newInteger = '';
    for (let i = 0; i < index; i++) {
      newInteger = newInteger + string[i];
    }
    let newDecimal = '';
  }

  // 前後に必要数だけ0をつける関数
  increase0(dvdString, digits) {
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
  compare(dvd0String1, dvd0String2) {
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
  pullOutPoint() {
    return this.integer + this.decimal;
  }

  // 2数を乗算する関数
  multiplication(st2) {
    let fusedSt1 = this.pullOutPoint();
    let fusedSt2 = st2.pullOutPoint();

    console.log(fusedSt1, fusedSt2);

    let results = [];
    for (let i = fusedSt2.length - 1; i >= 0; i--) {
      let flg = 0;
      results[i] = '';
      for (let j = fusedSt1.length - 1; j >= 0; j--) {
        let p = fusedSt2[i] * fusedSt1[j] + flg;
        results[i] = (p % 10) + results[i];
        if (p >= 10) flg = Math.floor(p / 10);
        else flg = 0;
      }
      if (flg) results[i] = String(flg) + results[i];
    }

    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < i; j++) {
        results[results.length - 1 - i] += '0';
      }
      results[results.length - 1 - i] += '.0';
    }
    console.log(results);

    while (results.length > 1) {
      console.log(results[0], results[1]);
      let result0 = new ExtendedFloat(results[0].toString());
      let result1 = new ExtendedFloat(results[1].toString());
      // results[1] = addition(results[0], results[1]);
      result1 = result0.addition(result1);
      results[1] = result1.number;
      // console.log(results[1])
      results.shift();
    }
    console.log('results:', results);

    results = results[0].replace('.0', '');
    console.log(results);

    console.log('count:' + this.decimal + ',' + st2.decimal);
    let decimalDigits = this.decimal.length + st2.decimal.length;
    console.log(decimalDigits);
    let newInteger = results.slice(0, results.length - decimalDigits);
    let newDecimal = results.slice(results.length - decimalDigits); // <=こいつをどうにかしたい
    let newResult = newInteger + '.' + newDecimal;
    // console.log(results);
    return newResult;
  }

  division(dividend, divisor) {}
}

module.exports.ExtendedFloat = ExtendedFloat;
