import React, { useState } from 'react';
import limitDigit from './limitDigit.js';

const CoinDetails = (props) => {
  console.log(props);   // debugger: 
  const [sortType] = useState(props.sortType);

  // function for sorting data by providing symbol
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
  if(!props.dataLoaded) {return null}

  const sortedData = props.data.sort(sortData);

  return sortedData.map((element) => {
    // console.log(element);
    return (
        <tr key={element.s}>
          <td>{`${element.b}/${element.q}`}</td>
          <td>{limitDigit((element.c),8)}</td>
          <td className={parseFloat(((element.c - element.o) / element.o) * 100).toFixed(2) >= 0 ? "positive" : "negative"}>
            {`${parseFloat(((element.c - element.o) / element.o) * 100).toFixed(2) >= 0 ? "+" : ""}${parseFloat(((element.c - element.o) / element.o) * 100).toFixed(2)}%`}
          </td>
        </tr>
    )
  });

}

export default CoinDetails;
