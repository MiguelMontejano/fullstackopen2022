const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 es impreso
console.log(rest)          // [3, 4 ,5] es impreso