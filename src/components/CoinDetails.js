import React, { useState } from 'react';

const CoinDetails = (props) => {

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
    return (
        <tr key={element.s}>
          <td>{`${element.b}/${element.q}`}</td>
          <td>{element.c}</td>
          <td>{`${parseFloat(element.c / element.o).toFixed(2) >= 0 ? "+" : null}${parseFloat(element.c / element.o).toFixed(2)}%`}</td>
        </tr>
    )
  });

}

export default CoinDetails;
