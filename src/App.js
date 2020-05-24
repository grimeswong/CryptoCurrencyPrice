import React, { Component } from 'react';
import './styles/main.scss';
import Category from './components/Category.js';
import CoinDetails from './components/CoinDetails.js';
import processUpdateDetails from './components/processUpdateDetails.js';

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
    this.callAPI();
    this.websocketListener();
  }

  componentWillUnmount() {
    this.closeServer();
  }

  connectServer = () => {
    console.log("Reconnecting server!!!");   // logger:
    this.ws = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');
    this.websocketListener();
  }

  closeServer = () => {
    console.log("Close server called");   // debugger:
    this.ws.close(1000, "Force to disconnet handshake for this App");
  }

  reconnectServer = () => {
    setTimeout(this.connectServer, 5000); // reconnect server after 5 seconds
  }

  updateDetails = (newUpdateData) => {
    let data = [...this.state.data];  // 1. shallow copy of the current database
    newUpdateData.map((element) => {
      let foundObj = data.find((foundElement) => { // 2. find the object[key: s] of old data
        return foundElement.s === element.s;
      })
      console.log(foundObj);    // debugger:
      console.log(element);     // debugger:
      foundObj.s = element.s;   // 3. replace the updated symbol's details
      foundObj.c = element.c;
      foundObj.h = element.h;
      foundObj.l = element.l;
      foundObj.o = element.o;
      foundObj.v = element.v;
      console.log(foundObj);    // debugger:
    })

    // Update the symbol according these data
    this.setState(
      { dataLoaded: true,
        data: data,
        displayData: data
      },
      console.log("data has been update!!!")    // debugger:
    );
  }

  websocketListener() {
    this.ws.onmessage = (message) => {
      // console.log(JSON.parse(message.data));   // debugger
      const trimmedData = JSON.parse(message.data);
      delete trimmedData.stream; // delete the unused column
      console.log(trimmedData.data);    // debugger:
      this.updateDetails(processUpdateDetails(trimmedData.data));
    }

    // Listeners
    this.ws.onopen = (state) => {
      console.log("connected WebSocket");   //logger
      this.setState({websocketState: !this.state.websocketState});
    };

    this.ws.onclose = (e) => {
      console.log(`Connection is closed, wasClean=${e.wasClean}, code=${e.code}`);    //logger
      this.setState({websocketState: false})
    };

    this.ws.onerror = (err) => {
      console.error(`Socket encoutered error ${err} Closing socket`);     //logger
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
