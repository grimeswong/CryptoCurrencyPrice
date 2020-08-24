/**
 *   A function to limit to 8 decimal points and remove unused zero after decimal point after round up
 *   arguments: (1st arg) - allows the type of string and number as argument, (2nd arg) - number of desired digits
 *   return: a string of converted number
 **/


const limitDigit = (num, fixedDigit) => {
    let fixedNum, temp;
    if(typeof(num)==="number") { // for the normal number or scientific notation (eg. 10.12345678 or 2.3e-5 )
      fixedNum = num.toFixed(fixedDigit);
      temp = fixedNum.toString().replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    } else {  // for the string of number (eg. "10.12345678")
      fixedNum = parseFloat(num).toFixed(fixedDigit);
      temp = fixedNum.toString().replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    }
    return temp;
}

export default limitDigit;
