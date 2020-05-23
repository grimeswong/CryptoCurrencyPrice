import React, { Component } from 'react';
import './styles/main.scss';
import Category from './components/Category.js';
import CoinDetails from './components/CoinDetails.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: [],
      sortType: "q",
      searchStr: "",
      displayData: [],
      websocketState: false,
      websocketData: [],
      intervalID: ""
    }
  }

  // property of this class
  ws = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');

  componentDidMount() {
    this.websocketListener();
    this.callAPI();
  }

  componentWillUnmount() {
    this.closeServer();
  }

  connectServer = () => {
    console.log("Reconnect server!!!");
    this.ws = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');
    this.websocketListener();
  }

  closeServer = () => {
    console.log("Close button clicked");
    this.ws.close(1000, "Force to disconnet handshake for this App");
  }

  reconnectServer = () => {
    setTimeout(this.connectServer, 5000); // reconnect server after 5 seconds
  }

  websocketListener() {
    // Need to setInterval, otherwise server keep send message for every second
    this.ws.onmessage = (message) => {
      // console.log(message.data);
      // console.log(typeof(message.data));
      // set data to state
      // this.setState({
      //   dataLoaded: true,
      //   data: message.data,
      //   displayData: message.data
      // })
    }

    // Listeners
    this.ws.onopen = (state) => {
      console.log("connected WebSocket");
      this.setState({websocketState: !this.state.websocketState});
    };

    this.ws.onclose = (e) => {
      console.log(`Connection is closed, wasClean=${e.wasClean}, code=${e.code}`);
      this.setState({websocketState: false})
    };

    this.ws.onerror = (err) => {
      console.error(`Socket encoutered error ${err} Closing socket`);
      this.ws.close();
      this.setState(
        {websocketState: false},
        this.reconnectServer
      );
    }
  }

  callAPI() {
    fetch(`/exchange-api/v1/public/asset-service/product/get-products`)
    .then(res => res.json())
    .then(res => this.setState({
          dataLoaded: true,
          data: res.data,
          displayData: res.data
    }))
  }

  querySelection = (symbol) => {
    this.updateList(symbol);
  }

  updateList(str) {
    if(str === "") {
      this.setState({
        displayData: this.state.data
      })
    } else {
      this.setState({
        displayData: this.state.data.filter((element) => element.q === str.toUpperCase() || element.b === str.toUpperCase())
      })
    }
  }

  async updateInput(e) {
    await this.setState({
      searchStr: e.target.value
    })
    this.updateList(this.state.searchStr);
  }

  render() {

    // if(this.state.dataLoaded === true) {console.log(this.state.data)} // debugger: the first render hasn't got the data yet

    return(
      <main className="App">
        <div className="container">
          <h1>Cryptocurrency Price</h1>
          <h2>Server Connection: {this.state.websocketState ? "connected" : "disconnected"}</h2>
          <button className="btn btn-light" onClick={this.state.websocketState ? this.closeServer : this.connectServer }>{!this.state.websocketState ? "connect" : "close connection"}</button>
          <div className="section category-wrapper col-sm-12">
            <Category data={this.state.data} querySelection={this.querySelection}/>
          </div>
          <div className="section selection-wrapper">
            <div className="search-wrapper col-sm-6">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(e) => this.updateInput(e)} value={this.state.searchStr}/>
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
                <CoinDetails data={this.state.displayData} dataLoaded={this.state.dataLoaded} sortType={this.state.sortType}/>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

}

export default App;
