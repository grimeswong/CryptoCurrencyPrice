// A component to display the cryptocurrency details

import React from 'react';
import limitDigit from './limitDigit.js';

const CoinDetail = (props) => {

  /* Dynamic styling value */
  const changeClass = parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2) >= 0 ? "positive" : "negative";
  const lastpriceClass = props.element.c-props.element.o > 0 ? "positive" : "negative";

  const radio = props.radioSelection==='option1' ? /* option1 is 24h Change(formula=c-o/o), option2 is 24h Volume(qv)
  /* Fixed in 2 decimal number with plus or minus sign prefix comparing with open price */
  <td className={changeClass}>
    {`${parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2) >= 0 ? "+" : ""}${parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2)}%`}
  </td> :
  /* Fixed in two decimal number */
  <td>{props.element.qv.toFixed(2)}</td>


  return(
    <tr key={props.element.s}>
      {/* Pair */}
      <td><span className="coinDetail-base">{`${props.element.b}`}</span><span className="coinDetail-quote">/{`${props.element.q}`}</span></td>
      {/* Last Price */}
      <td className={lastpriceClass}>{limitDigit((props.element.c),8)}</td>
      {/* Open Price */}
      <td className="coinDetail-open mobile-hide">{limitDigit((props.element.o),8)}</td>
      {/* 24h High Price */}
      <td className="coinDetail-highest mobile-hide tablet-hide">{limitDigit((props.element.h),8)}</td>
      {/* 24h High Price */}
      <td className="coinDetail-lowest mobile-hide tablet-hide">{limitDigit((props.element.l),8)}</td>
      {/* 24h Change or Volume */}
      {radio}
    </tr>
  )
}

export default CoinDetail;
