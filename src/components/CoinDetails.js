import React from 'react';

const CoinDetails = (props) => {
  
  return !props.dataLoaded ? null :

    <>
      <tr>
        <td>{`${props.data[0].b}/${props.data[0].q}`}</td>
        <td>{props.data[0].c}</td>
        <td>{`${parseFloat(props.data[0].c / props.data[0].o).toFixed(2) >= 0 ? "+" : null}${parseFloat(props.data[0].c / props.data[0].o).toFixed(2)}%`}</td>
      </tr>
    </>
}

export default CoinDetails;
