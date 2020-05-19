import React, { Component } from 'react';
import './styles/main.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: ""
    }
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch(`/exchange-api/v1/public/asset-service/product/get-products`)
    .then(res => console.log(res))
    .then(res => this.setState({
          dataLoaded: true,
          data: res
    }))
  }

  render() {
    return(
      <main className="App">
        <div className="container">
          <h1>Cryptocurrency Price</h1>

          <div className="section selection-wrapper">
            <div className="search-wrapper col-sm-6">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </div>
            <div className="form-wrapper col-sm-6">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="radio" id="change" value="option1" checked/>
                <label className="form-check-label" htmlFor="change">
                  Change
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="radio" id="volume" value="option2" />
                <label className="form-check-label" htmlFor="volumn">
                  Volume
                </label>
              </div>
            </div>
          </div>

          <div className="section list-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ADA/BTC</td>
                  <td>0.00000617</td>
                  <td>-0.64</td>
                </tr>
                <tr>
                  <td>ADX/BTC</td>
                  <td>0.00001012</td>
                  <td>+1.10</td>
                </tr>
              </tbody>
            </table>
            <div>{this.state.data}</div>
          </div>
        </div>
      </main>
    )
  }

}

export default App;
