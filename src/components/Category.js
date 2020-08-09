import React from 'react';
import { Dropdown, DropdownButton, ButtonGroup, Button } from 'react-bootstrap';

const Category = (props) => {
  // Process the Category list with groups
  const types = {};
  for (let i = 0; i < props.data.length; i++) {
    let typeName = props.data[i].pm;
    if (!types[typeName]) {
        types[typeName] = [];
    }
    types[typeName].push(props.data[i].q);
    // console.log(types)
  }

  // Remove duplicate elements in group
  const sortedCategories = [];
  for (const type in types) {
    let groups = types[type].filter((item, index) => {
      return types[type].indexOf(item) === index;
    });
    sortedCategories.push([type,...groups.sort()]);
  }


  // Function for sorting data by providing symbol
  const sortData = (a, b) => {
    if(a[0] < b[0]){
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return 0;
    }
  }

  // Sorting array by its first element (symbol or the category which come first)
  sortedCategories.sort(sortData);
  // Now the first element will be used for the group name and follow by the child currencies
  // console.log(sortedCategories) // debugger: the first element is the group name, can check the elements in the groups

  /* customise group name or elements from here */
  sortedCategories.unshift(["All"]);  // can display of the cryptocurrencies
  sortedCategories[sortedCategories.length-1][0] = "FLATS";   // Swap the group name to "FLATS" that regarding the cryptocurrencies related to currency
  console.log(sortedCategories);


  // Load the Category list and with button groups
  const displayCategory = sortedCategories.map((element) => {
    if(element.length >2) {

      const items = [];
      for (let i=1; i<element.length; i++) {
        items.push(<Dropdown.Item key={element[i]} onClick={()=>props.currentSelection(element[i])}>{element[i]}</Dropdown.Item>)
      }
      return (
        <DropdownButton key={element[0]} variant="dark" as={ButtonGroup} title={element[0]} id="dropdown-basic">
          {items}
        </DropdownButton>
      )
    }
    else {
      return (
        <Button key={element[0]} variant="dark" onClick={()=>props.currentSelection(element[0]=== "All" ? "" : element[0])}>{element[0]}</Button>
      )
    }
  })
  return (
    <ButtonGroup>
      {displayCategory}
    </ButtonGroup>
  )
}

export default Category;
