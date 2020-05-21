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
    sortedCategories.push({Category: type, symbols: groups});
  }

  console.log(sortedCategories); //debugger

  // Load the Category list and with button groups
  // const listCategories = types.sort().map((element) => {
  //   return (
  //     <li key={element}>{`${element}`}</li>
  //   )
  // });

  return (
    <ul>
      {}
    </ul>
  )
}

export default Category;
