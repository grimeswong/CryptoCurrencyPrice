import React from 'react';

export default (props) => {
  return(
    <div className={props.loading===true ? "loader loading" : "loader"}>
      <button className="btn btn-primary" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </div>
  );
}
