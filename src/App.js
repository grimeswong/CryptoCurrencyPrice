import React, { Component } from 'react';
import './styles/main.scss';
import Category from './components/Category.js';
import CoinList from './components/CoinList.js';
import processUpdateDetails from './components/processUpdateDetails.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: [],   // the cryptocurrency data including updated data via web socket
      sortType: "b",
      searchStr: "",
      searchState: "search",
      currentSelection: "",   // the current selected currency in categories
      websocketState: false,
      websocketData: [],
    }
  }

  // property of this class
  ws = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');

  componentDidMount() {
    this.callAPI();
    // this.websocketListener();  // disable for avoid data confusion
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
    this.ws.close(1000, "Force to disconnet handshake for this App");
  }

  reconnectServer = () => {
    setTimeout(this.connectServer, 5000); // reconnect server after 5 seconds
  }

  updateDetails = (newUpdateData) => {
    let data = [...this.state.data];
    newUpdateData.map((element) => {
      let foundObj = data.find((foundElement) => {
        return foundElement.s === element.s;
      })
      if(foundObj !== undefined || typeof foundObj !== "undefined") {
        foundObj.c = element.c;
        foundObj.h = element.h;
        foundObj.l = element.l;
        foundObj.o = element.o;
        foundObj.v = element.v;
      }
    })

    // Update the database with the updated symbol's details
    this.setState(
      { dataLoaded: true,
        data: data
      }, this.updateList(this.state.searchState==="search"?this.state.searchStr:this.state.searchState), // keep the current search screen (selection of buttons or search result)
    );
    return null;
  }

  websocketListener() {
    this.ws.onmessage = (message) => {
      const trimmedData = JSON.parse(message.data);
      delete trimmedData.stream; // delete the unused column
      this.updateDetails(processUpdateDetails(trimmedData.data));
    }

    // Listeners
    this.ws.onopen = (state) => {
      console.log("Connected Server!!!");   //logger
      this.setState({websocketState: !this.state.websocketState});
    };

    this.ws.onclose = (e) => {
      console.log(`Connection is closed, wasClean=${e.wasClean}, code=${e.code}!!!`);    //logger
      this.setState({websocketState: false})
    };

    this.ws.onerror = (err) => {
      console.error(`Connection encountered error ${err}, closing connection!!!`);     //logger
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
          data: res.data
    }))
  }

  querySelection = (symbol) => {
    this.setState({
      searchStr: "",
      searchState: symbol
    }, this.updateList(symbol))

  }

  currentSelection = (currency) => {
    this.setState({
      currentSelection: currency
    })
  }

  updateList(str) {
    // console.log(`this.state.searchStr=${this.state.searchStr}`);
    if(str === "") {
      console.log("str ===\"\"");
      this.setState({
        searchStr: str,
        searchState: "search",
        displayData: this.state.data
      })
    } else {
      console.log("not empty");
      this.setState({
        searchStr: str,
        searchState: "search",
        displayData: this.state.data.filter((element) => element.q === str.toUpperCase() || element.b === str.toUpperCase())
      })
    }
  }

  // updateInput = (e) => {
  //   this.setState({
  //     searchStr: e.target.value,
  //     searchState: "search"
  //   }, this.updateList(e.target.value));
  // }

  render() {
    console.log("rendering!!!") // debugger
    return(
      <main className="App">
        <div className="container">
          <h1>Cryptocurrency Price</h1>
          <div className="connection-wrapper">
            <p>status: <span className={this.state.websocketState? "connected" : "disconnected"}>{this.state.websocketState ? "connected" : "disconnected"}</span></p>
            <button className="btn btn-light" onClick={this.state.websocketState ? this.closeServer : this.connectServer }>{!this.state.websocketState ? "connect" : "stop"}</button>
          </div>
          <div className="section category-wrapper col-sm-12">
            <Category data={this.state.data} currentSelection={this.currentSelection}/>
          </div>
          <div className="section selection-wrapper">
            <div className="search-wrapper col-sm-6">
              <h2>{this.state.searchStr}</h2> {/* Debugger: for testing typing search keyword */}
              <input className="form-control" type="text" placeholder="Search a symbol eg. BTC" aria-label="Search" onChange={(e)=>this.updateList(e.target.value)} value={this.state.searchStr}/>
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
                  <th scope="col">Pair (Quote/Base)</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              <tbody>
                <CoinList data={this.state.data} currentSelection={this.state.currentSelection} dataLoaded={this.state.dataLoaded} sortType={this.state.sortType}/>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

}

export default App;
