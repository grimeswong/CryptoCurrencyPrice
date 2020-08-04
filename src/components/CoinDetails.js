import React, { useState } from 'react';
import limitDigit from './limitDigit.js';

const CoinDetails = (props) => {

  console.log(props.data);  // debugger:

  const [sortType] = useState(props.sortType);

  // Function for sorting data by providing sorting reference or method (eg. b=base, q=quote)
  const sortData = (a, b) => {
    if(a[sortType] < b[sortType]){
      return -1;
    } else if (a[sortType] > b[sortType]) {
      return 1;
    } else {
      return 0;
    }
  }

  // Confirm the data is loaded, otherwise return null
  if(props.data === "" || props.data ==="undefined") {
    return null;
  } else {
    const sortedData = props.data.sort(sortData);
    return sortedData.map((element) => {
      return (
        <tr key={element.s}>
          <td><span className="coinDetail-quote">{`${element.q}`}</span><span className="coinDetail-base">/{`${element.b}`}</span></td>
          <td>{limitDigit((element.c),8)}</td>
          <td className={parseFloat(((element.c - element.o) / element.o) * 100).toFixed(2) >= 0 ? "positive" : "negative"}>
            {`${parseFloat(((element.c - element.o) / element.o) * 100).toFixed(2) >= 0 ? "+" : ""}${parseFloat(((element.c - element.o) / element.o) * 100).toFixed(2)}%`}
          </td>
        </tr>
      )
    });
  }
}

export default CoinDetails;
