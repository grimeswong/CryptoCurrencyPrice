// This function is for convert correct format prior to updating the symbols details to the current one
import limitDigit from './limitDigit.js';

const processUpdateDetails = (array) => {
  const temp = array.map((element) => {
    return ({
      s:element.s,
      c:limitDigit(element.c, 8),
      h:limitDigit(element.h, 8),
      l:limitDigit(element.l, 8),
      o:limitDigit(element.o, 8),
      v:limitDigit(element.v, 8)
    })
  })
  console.log(temp);  // debugger: display the result of processed data
  return temp;
}

export default processUpdateDetails;
