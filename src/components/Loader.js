import React from 'react';

export default (props) => {
  return(
    <div className={props.loading===true ? "loader" : "loader loader-hide"}>
      <button className="btn btn-dark" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </div>
  );
}
