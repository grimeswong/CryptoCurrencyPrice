import React, { Component } from 'react';
import './styles/main.scss';
import CoinDetails from './components/CoinDetails.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: []
    }
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch(`/exchange-api/v1/public/asset-service/product/get-products`)
    .then(res => res.json())
    .then(res => this.setState({
          dataLoaded: true,
          data: res.data
    }))
    // .then(res => console.log(res.data[0]))
  }

  render() {
    if(this.state.dataLoaded === true) {console.log(this.state.data[0])} // the first render hasn't got the data yet
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
                <CoinDetails data={this.state.data} dataLoaded={this.state.dataLoaded}/>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

}

export default App;
