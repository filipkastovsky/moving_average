import React, { Component } from 'react';
import Table from './components/Table';
import InputFields from './components/InputFields';
import { SMA, EMA } from './moving_average';

class App extends Component {
  state = {
    data: [],
    period: 2,
    chartData: {
      labels: [],
      datasets: []
    }
  };

  handleDataChange = inputData => {
    this.parseData(inputData);
  };

  parseData = data => {
    data = data.split(',').map(stringData => parseFloat(stringData));

    this.setState({ data });
  };

  handlePeriodChange = period => {
    period = parseInt(period);
    this.setState({ period });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.data !== this.state.data ||
        prevState.period !== this.state.period) &&
      this.state.period
    ) {
      const array = this.state.data;
      const period = this.state.period;

      const labels = (size => {
        let arr = [];
        for (let i = 1; i <= size; i++) {
          arr.push(i.toString());
        }
        return arr;
      })(array.length);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'SMA',
            borderColor: 'rgb(113,194,133)',
            backgroundColor: 'rgba(0,0,0,0)',
            data: (arr => {
              let temp = [];
              for (let i = 0; i < arr.length; i++) {
                temp[i] = SMA(arr, i, period);
              }
              return temp;
            })(array)
          },
          {
            label: 'EMA',
            borderColor: 'rgb(242,156,31)',
            backgroundColor: 'rgba(0,0,0,0)',
            data: EMA(array, period)
          },
          {
            label: 'Data',
            backgroundColor: 'rgba(31,152,242,0.5)',
            borderColor: 'rgba(255,255,0,0.01)',
            data: array
          }
        ]
      };

      this.setState({ chartData });
    }
  }

  reset = () => {
    this.setState({ data: [], period: 2 }, () => {
      document.querySelector('#data').value = '';
    });
  };

  render() {
    return (
      <div className="col-sm-12 col-md-8 mx-auto mt-5 jumbotron bg-light text-center px-md-5">
        <div className="col-md-10 mx-auto">
          <h2 className="mb-5">What is a moving average?</h2>
          <div>
            <p className="text-justify">
              In statistics, a moving average (rolling average or running
              average) is a calculation to analyze data points by creating a
              series of averages of different subsets of the full data set. It
              is also called a moving mean (MM) or rolling mean and is a type of
              finite impulse response filter.
            </p>
            <a href="#read-more">Read more</a>
          </div>

          <h3 id="demo" className="m-5">
            Demo:
          </h3>
          <InputFields
            handleDataChange={this.handleDataChange}
            handlePeriodChange={this.handlePeriodChange}
            appState={this.state}
          />
          <button onClick={this.reset} className="btn btn-danger mb-5">
            X
          </button>
          <Table appState={this.state} />
          <div className="mt-5">
            <h3 id="read-more" className="mt-5 table-dark py-3 rounded">
              SMA
            </h3>
            <p className="mt-5">
              a.k.a <strong>Simple Moving Average</strong> is the unweighted
              mean of the previous <em>n</em> data.
            </p>
            <h3 className="mt-5">How is it calculated?</h3>

            <h5 className="mt-5">
              <strong>
                SMA<sub>n</sub> = (price<sub>1</sub> + price<sub>2</sub> + ... +
                price
                <sub>n</sub>) / n
              </strong>
            </h5>
            <p>
              SMA graph can be drawn after calculating the SMA for all points of
              interest.
            </p>
            <h3 className="mt-5">How is it useful?</h3>
            <p className="mt-5 text-justify">
              SMAs are often used to determine trend direction. If the SMA is
              moving up, the trend is up. If the SMA is moving down, the trend
              is down. A longer period SMA is common for determining the long
              term trend. Shorter period SMAs can be used to determine shorter
              term trends.
            </p>
          </div>
          <div className="mt-5">
            <h3 className="mt-5 table-dark py-3 rounded">EMA</h3>
            <p className="mt-5">
              a.k.a <strong>Exponential Moving Average</strong> is the
              exponentially weighted mean of the previous <em>n</em> data.
            </p>
            <h3 className="mt-5">How is it calculated?</h3>

            <h5 className="mt-5">
              <strong>
                EMA<sub>n</sub> = (EMA<sub>n-1</sub> + k (price<sub>n</sub> -
                EMA
                <sub>n-1</sub> )), k = 2 / (period + 1)
              </strong>
            </h5>
            <p>
              EMA graph can be drawn after calculating the EMA for all points of
              interest.
            </p>
            <h3 className="mt-5">How is it useful?</h3>
            <p className="mt-5 text-justify">
              EMAs are also used to determine trend direction. Although unlike
              SMAs, EMAs are more reactive to shifts in prices since the latest
              points are of more value.
            </p>
          </div>
          <h3 className="mt-5 table-dark py-3 rounded">SMA or EMA</h3>
          <p className="mt-5 text-justify">
            SMAs are often used by traders, who seek long term profit, as they
            are more stable and difficult to throw off. On the other hand the
            SMAs are slow to react and this is where EMAs come into play. None
            is strictly better than the other and what you use is your choice
            nevertheless. Feel free to explore moving averages in the
            interactive demo <a href="#demo">above</a>.
          </p>
        </div>
      </div>
    );
  }
}
export default App;
