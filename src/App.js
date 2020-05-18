import React from 'react';
import './styles/main.scss';

function App() {
  return (
    <main className="App">
      <div className="container">
        <h1>Cryptocurrency Price</h1>
        <div className="list-wrapper">
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
        </div>
      </div>
    </main>
  );
}

export default App;
