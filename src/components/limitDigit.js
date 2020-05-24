// function to limit to 8 decimal points and remove unused zero after decimal point
// this fucntion allows the type of string and number as argument

const limitDigit = (num, fixedDigit) => {
    let fixedNum, temp;
    if(typeof(num)==="number") {
      fixedNum = num.toFixed(fixedDigit);
      temp = fixedNum.toString().replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    } else {
      fixedNum = parseFloat(num).toFixed(fixedDigit);
      temp = fixedNum.toString().replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    }
    return temp;
}

export default limitDigit;
