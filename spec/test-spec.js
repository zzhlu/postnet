const main = require('../main/main.js');

describe('main', () => {
  it('can work', () => {
    expect(main.main()).toBe('Hello!');
  });
});