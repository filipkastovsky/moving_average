import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Hammer from 'hammerjs';
// eslint-disable-next-line no-unused-vars
import zoom from 'chartjs-plugin-zoom';

export default class Table extends Component {
  render() {
    return (
      <div className="col-sm-12 col-lg-9 mx-auto p-sm-1 p-lg-5 bg-white rounded border">
        <Line
          id="canvas"
          options={{
            responsive: true,
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  drag: true,
                  mode: 'x',
                  speed: 30
                },
                zoom: {
                  enabled: true,
                  drag: false,
                  mode: 'x',
                  sensitivity: 0.00001,
                  speed: 0.1,

                  limits: {
                    max: 1000,
                    min: 0.5
                  },
                  rangeMin: {
                    x: 1,
                    y: 0.5
                  },
                  rangeMax: {
                    x: 1000,
                    y: 1
                  }
                }
              }
            }
          }}
          data={this.props.appState.chartData}
        />
      </div>
    );
  }
}
