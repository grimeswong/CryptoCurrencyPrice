import React from 'react';

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
  // const displayCategory = sortedCategories.sort(sortData).map((element) => {
  //   return (<li key={element.category}>{element.category}</li>);
  // })

  return (
    <ul>
      {}
    </ul>
  )
}

export default Category;
