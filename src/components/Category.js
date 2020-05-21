import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

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

  console.log(types); //debugger

  // Remove duplicate elements in group
  const sortedCategories = [];
  for (const type in types) {
    let groups = types[type].filter((item, index) => {
      return types[type].indexOf(item) === index;
    });
    sortedCategories.push([type,...groups]);
  }

  console.log(sortedCategories); //debugger

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

  console.log(sortedCategories.sort(sortData));

  // Load the Category list and with button groups
  const displayCategory = sortedCategories.map((element) => {
    if(element.length >2) {
      return (
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {element[0]}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">{element[1]}</Dropdown.Item>
            <Dropdown.Item href="#/action-2">{element[2]}</Dropdown.Item>
            <Dropdown.Item href="#/action-3">{element[3]}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      )
    }
    else {
      return (<Button variant='secondary'>{element[0]}</Button>)
    }
  })

  return (
    <ul>
      {displayCategory}
    </ul>
  )
}

export default Category;
