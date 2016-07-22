'use strict';

const main = require('../main/main1');

describe('postnet1', () => {

  describe('checkoutZipcode', () => {

    it('5位', () => {

      const zipcode = main.checkoutZipcode('45056');

      expect(zipcode).toEqual(true);
    });

    it('9位', () => {

      const zipcode = main.checkoutZipcode('450561234');

      expect(zipcode).toEqual(true);
    });

    it('10位', () => {

      const zipcode = main.checkoutZipcode('45056-1234');

      expect(zipcode).toEqual(true);
    });

    it('wrong zipcode', () => {

      const zipcode = main.checkoutZipcode('23-njo');

      expect(zipcode).toEqual(false);
    });
  });

  it('addCheckDigit', () => {

    const zipcodeNumbers = main.addCheckDigit('450561234');

    expect(zipcodeNumbers).toEqual([4, 5, 0, 5, 6, 1, 2, 3, 4, 0]);
  });

  it('getBarcode', () => {

    const allDigits = {
      0: '||:::', 1: ':::||', 2: '::|:|', 3: '::||:', 4: ':|::|',
      5: ':|:|:', 6: ':||::', 7: '|:::|', 8: '|::|:', 9: '|:|::'
    };

    const barcode = main.getBarcode([4, 5, 0, 5, 6, 1, 2, 3, 4, 0], allDigits);

    const expectBarcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

    expect(barcode).toEqual(expectBarcode);

  });

  describe('zipcode', () => {

    const allDigits = {
      0: '||:::', 1: ':::||', 2: '::|:|', 3: '::||:', 4: ':|::|',
      5: ':|:|:', 6: ':||::', 7: '|:::|', 8: '|::|:', 9: '|:|::'
    };

    it('should print correct barcode', () => {
      spyOn(console, 'log');

      main.printBarcode('45056-1234', allDigits);

      const expectBarcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

      expect(console.log).toHaveBeenCalledWith(expectBarcode);
    });

    it('should print correct barcode', () => {
      spyOn(console, 'log');

      main.printBarcode('450561234', allDigits);

      const expectBarcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

      expect(console.log).toHaveBeenCalledWith(expectBarcode);
    });

    it('should print correct barcode', () => {
      spyOn(console, 'log');

      main.printBarcode('45056', allDigits);

      const expectBarcode = '|:|::|:|:|:||::::|:|::||::||:::|';

      expect(console.log).toHaveBeenCalledWith(expectBarcode);
    });

    it('should print correct barcode', () => {
      spyOn(console, 'log');

      main.printBarcode('12-:cd', allDigits);

      expect(console.log).toHaveBeenCalledWith('输入不合法！');
    });
  });
});