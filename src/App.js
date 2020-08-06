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
      websocketState: false,
      websocketData: [],
      sortType: "b",
      searchStr: "",    // the current search string in searching box
      currentSelection: "",   // the current selected currency in categories
      radioSelection: "option1" // the current selected radio value
    }
  }

  // property of this class
  ws = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');

  componentDidMount() {
    this.callAPI();
    // this.websocketListener();  // disable for default that avoid data confusion
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
    // console.log(newUpdateData); // debugger: list update data
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
      return null; // silent the dev tools checker
    })

    // Update the database
    this.setState(
      { dataLoaded: true,
        data: data
      }
    );
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

  // the current query in searching box
  querySelection = (string) => {
    this.setState({
      searchStr: string
    })
  }

  // the current selected currency in categories
  currentSelection = (currency) => {
    this.setState({
      currentSelection: currency
    })
  }

  // the current selected radio value
  radioSelection = (changeEvent) => {
    this.setState({
      radioSelection: changeEvent.target.value
    })
  }

  render() {
    // console.log("rendering!!!") // debugger
    return(
      <main className="App">
        <div className="container">
          <h1>Cryptocurrency Portfolio</h1>

          {/* Connection Status */}
          <div className="connection-wrapper">
            <p>status: <span className={this.state.websocketState? "connected" : "disconnected"}>{this.state.websocketState ? "connected" : "disconnected"}</span></p>
            <button className="btn btn-light" onClick={this.state.websocketState ? this.closeServer : this.connectServer }>{!this.state.websocketState ? "connect" : "stop"}</button>
          </div>

          {/* Cryptocurrency Categories */}
          <div className="section category-wrapper col-sm-12">
            <Category data={this.state.data} currentSelection={this.currentSelection}/>
          </div>
          <div className="section selection-wrapper">
            <div className="search-wrapper col-sm-6">
              <input className="form-control" type="text" placeholder="Search a base symbol" aria-label="Search" onChange={(e)=>this.querySelection(e.target.value)} value={this.state.searchStr}/>
            </div>

            {/* Radio Selection */}
            <div className="form-wrapper col-sm-6">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" checked={this.state.radioSelection === 'option1'} value="option1" onChange={this.radioSelection}/>
                <label className="form-check-label">
                  Change
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" checked={this.state.radioSelection === 'option2'} value="option2" onChange={this.radioSelection}/>
                <label className="form-check-label">
                  Volume
                </label>
              </div>
            </div>
          </div>

          {/* Cryptocurrency Listing */}
          <div className="section list-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Pair (Base/Quote)</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Open Price</th>
                  <th scope="col">High Price</th>
                  <th scope="col">Low Price</th>
                  <th scope="col">{this.state.radioSelection==='option1' ? "Change" : "Volume"} </th>
                </tr>
              </thead>
              <tbody>
                <CoinList data={this.state.data}
                          currentSelection={this.state.currentSelection}
                          querySelection={this.state.searchStr}
                          radioSelection={this.state.radioSelection}
                          dataLoaded={this.state.dataLoaded}
                          sortType={this.state.sortType}
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

}

export default App;
