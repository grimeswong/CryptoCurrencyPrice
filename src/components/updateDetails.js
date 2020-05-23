// This function is for convert correct format prior to updating the symbols details to the current one
import limitDigit from './limitDigit.js';

const updateDetails = (array) => {
  const temp = [];
  array.map((element) => {
    temp.push({
      E:element.E,
      s:element.s,
      c:limitDigit(element.c, 8),
      h:limitDigit(element.h, 8),
      l:limitDigit(element.l, 8),
      o:limitDigit(element.o, 8),
      q:limitDigit(element.q, 8),
      v:limitDigit(element.v, 8)
    })
  })
  console.log(temp);
  return temp;
}

export default updateDetails;
