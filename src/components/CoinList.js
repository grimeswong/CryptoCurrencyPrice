// A component to display the list of cryptocurrency that can apply specified filtering and sorting

import React from 'react';
import CoinDetail from './CoinDetail.js';

const CoinList = (props) => {

  // console.log(props.data);  // debugger - list initial API data (don't delete it that frequently use)

  let filterData = props.data;

  // Function for sorting data by providing sorting reference or method (eg. b=base, q=quote)
  const sortData = (a, b) => {
    if(props.ascending ? a[props.sortType] < b[props.sortType] : a[props.sortType] > b[props.sortType]){
      return -1;
    } else if (props.ascending ? a[props.sortType] > b[props.sortType] : a[props.sortType] < b[props.sortType]) {
      return 1;
    } else {
      return 0;
    }
  }

  // Function for sorting data by the percentage of comparing the value (last price - open price / open price)
  const sortChange = (a, b) => {
    return props.ascending === true ? ((a.c-a.o)/a.o) - ((b.c-b.o)/b.o) : ((b.c-b.o)/b.o) - ((a.c-a.o)/a.o);
  }

  // Confirm the data is loaded, otherwise return null
  if(props.data === "" || props.data ==="undefined") {
    return null;
  } else {
    // Filter for categories that selected the current cryptocurrency
    if(props.currentSelection!=="") {
      filterData = props.data.filter(element=>element.q===props.currentSelection);
    }
    // Sorting according the user sorting type
    // Filter for matching the search keyword if typed, otherwise, the filter will ignore the case
    // Must change the search string to upper case for matching the base currency
    const sortedData = props.sortType === "change" ? filterData.sort(sortChange).filter(element=>element.b.includes(props.querySelection.toUpperCase())) :
    filterData.sort(sortData).filter(element=>element.b.includes(props.querySelection.toUpperCase()));
    return sortedData.map((element) => {
      return (
        <CoinDetail key={element.s} element={element} radioSelection={props.radioSelection}/>
      )
    });
  }
}

export default CoinList;
