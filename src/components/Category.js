import React from 'react';

const Category = (props) => {

  // to do: use filter function
  // if the current quote is same as the parent market, ignore it
  const listCategories = props.data.map((element) => {
    return (
      <li>{`${element.pm}`}</li>
    )
  })


  return (
    <ul>
      {listCategories}
    </ul>
  )
}

export default Category;
