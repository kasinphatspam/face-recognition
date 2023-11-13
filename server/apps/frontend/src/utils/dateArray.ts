export default function dayArray(month: number, year: number): Array<number> {
  let number: Array<number> = [];
  if (month === 2 && year % 4 === 0) {
    for (let i = 1; i < 29; i++) {
      number.push(i);
    }
  } else if (month === 2) {
    for (let i = 1; i < 28; i++) {
      number.push(i);
    }
  }
  else if ([1,3,5,7,8,10,12].includes(month)) {
    for (let i = 1; i < 31; i++) {
      number.push(i);
    }
  } else {
    for (let i = 1; i < 30; i++) {
      number.push(i);
    }
  }
  return number;
}