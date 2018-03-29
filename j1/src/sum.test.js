const sum = require('./sum');
let min = 0
let max = 1000
for (let i=0; i<100; i++) {
  let a = Math.round(Math.random() * (max - min) + min);
  let b = Math.round(Math.random() * (max - min) + min);
  let c = a + b
  test(`Test ${i} - ${a}+${b}=${c}`, () => {
    let min = 0
    let max = 1000

      let a = Math.random() * (max - min) + min;
      let b = Math.random() * (max - min) + min;
      let c = a + b

      expect(sum(a, b)).toBe(c);

  });
}
