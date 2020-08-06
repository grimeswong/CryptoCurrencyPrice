// A component to display the cryptocurrency details

import React from 'react';
import limitDigit from './limitDigit.js';

const CoinDetail = (props) => {

  /* Dynamic styling value */
  const changeClass = parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2) >= 0 ? "positive" : "negative";
  const lastpriceClass = props.element.c-props.element.o > 0 ? "positive" : "negative";

  const radio = props.radioSelection==='option1' ?
  /* Fixed in 2 decimal number with plus or minus sign prefix comparing with open price */
  <td className={changeClass}>
    {`${parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2) >= 0 ? "+" : ""}${parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2)}%`}
  </td> :
  /* Fixed in no decimal number */
  <td>{props.element.qv.toFixed(0)}</td>


  return(
    <tr key={props.element.s}>
      <td><span className="coinDetail-base">{`${props.element.b}`}</span><span className="coinDetail-quote">/{`${props.element.q}`}</span></td>
      <td>{limitDigit((props.element.o),8)}</td>
      <td className={lastpriceClass}>{limitDigit((props.element.c),8)}</td>
      {radio}
    </tr>
  )
}

export default CoinDetail;
