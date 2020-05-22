import React from 'react';
import { Dropdown } from 'react-bootstrap';

const Category = (props) => {

  // props.data.map((element)=> console.log(`quote=${element.q}, pm=${element.pm}`)); //debugger

  // Process the Category list with groups
  const types = {};
  for (let i = 0; i < props.data.length; i++) {
    let typeName = props.data[i].pm;
    if (!types[typeName]) {
        types[typeName] = [];
    }
    types[typeName].push(props.data[i].q);
  }

  // console.log(types); //debugger

  // Remove duplicate elements in group
  const sortedCategories = [];
  for (const type in types) {
    let groups = types[type].filter((item, index) => {
      return types[type].indexOf(item) === index;
    });
    sortedCategories.push([type,...groups.sort()]);
  }

  // console.log(sortedCategories); //debugger

  // Sort the Categories by number of its symbols
  // function for sorting data by providing symbol
  const sortData = (a, b) => {
    if(a[0] < b[0]){
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return 0;
    }
  }

  // Sorting array by its first element (symbol or the category)
  sortedCategories.sort(sortData);

  // Load the Category list and with button groups
  const displayCategory = sortedCategories.map((element) => {
    if(element.length >2) {

      const items = [];
      for (let i=1; i<element.length; i++) {
        items.push(<Dropdown.Item key={element[i]} onClick={()=>props.querySelection(element[i])}>{element[i]}</Dropdown.Item>)
      }

      return (
        <Dropdown key={element[0]}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {element[0]}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {items}
          </Dropdown.Menu>
        </Dropdown>
      )
    }
    else {
      return (
        <Dropdown key={element[0]} className="removeArrow">
            <Dropdown.Item key={element[0]} onClick={()=>props.querySelection(element[0])}>{element[0]}</Dropdown.Item>
        </Dropdown>
      )
    }
  })

  return (
    <ul>
      {displayCategory}
    </ul>
  )
}

export default Category;
