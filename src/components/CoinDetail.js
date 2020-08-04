// A component to display the cryptocurrency details

import React from 'react';
import limitDigit from './limitDigit.js';

const CoinDetail = (props) => {
  return(
    <tr key={props.element.s}>
      <td><span className="coinDetail-base">{`${props.element.b}`}</span><span className="coinDetail-quote">/{`${props.element.q}`}</span></td>
      <td>{limitDigit((props.element.c),8)}</td>
      <td className={parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2) >= 0 ? "positive" : "negative"}>
        {`${parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2) >= 0 ? "+" : ""}${parseFloat(((props.element.c - props.element.o) / props.element.o) * 100).toFixed(2)}%`}
      </td>
    </tr>
  )
}

export default CoinDetail;
