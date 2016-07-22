'use strict';

function printBarcode(zipcode, allDigits) {
  if (checkoutZipcode(zipcode)) {
    const zipcodeAddCd = addCheckDigit(zipcode);
    const barcode = getBarcode(zipcodeAddCd, allDigits);
    console.log(barcode);
  } else {
    console.log('输入不合法！');
  }
}

function checkoutZipcode(zipcode) {
  const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];

  const lengthVerified = zipcode.length === 5 || zipcode.length === 9 || zipcode.length === 10;
  const charsVerified = zipcode.split('')
    .some(c => validChars.every(validChar => validChars !== c));

  return lengthVerified && charsVerified;
}

function addCheckDigit(zipcode) {
  const zippedNumbers = zipcode.split('')
    .filter(c => c !== '-')
    .map(c => parseInt(c));

  const sum = zippedNumbers.reduce((prev, next) => prev + next);

  if (sum % 10 === 0) {
    zippedNumbers.push(0);
  } else {
    zippedNumbers.push(10 - sum % 10);
  }

  return zippedNumbers;
}

function getBarcode(zippedNumbers, allDigits) {
  return `|${zippedNumbers.map(number => allDigits[number]).join('')}|`;
}

module.exports = {
  checkoutZipcode: checkoutZipcode,
  addCheckDigit: addCheckDigit,
  getBarcode: getBarcode,
  printBarcode: printBarcode
};