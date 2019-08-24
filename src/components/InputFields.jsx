import React, { Component } from 'react';

export default class InputFields extends Component {
  bubbleDataToApp = e => {
    this.props.handleDataChange(e.target.value);
  };

  bubblePeriodToApp = e => {
    const value = e.target.value;
    if (value >= 0 && value <= this.props.appState.data.length) {
      this.props.handlePeriodChange(value);
    } else {
      this.props.handlePeriodChange(this.props.appState.period);
    }
  };

  handleToEnd = () => {
    this.props.handleEndpointChange(this.props.appState.data.length);
  };

  render() {
    return (
      <div>
        <div className="w-100">
          <textarea
            className="w-75 p-2 rounded border"
            id="data"
            name="data"
            rows="4"
            placeholder="Enter numeric data (seperate with commas)"
            onChange={this.bubbleDataToApp}
          />
          <div className="my-3">
            Data length: <strong>{this.props.appState.data.length}</strong>
          </div>
        </div>

        <div>
          <label className="mr-4">Period: </label>
          <input
            className="custom-range w-50 align-middle"
            type="range"
            name="period"
            min="1"
            value={this.props.appState.period}
            max={this.props.appState.data.length}
            onChange={this.bubblePeriodToApp}
          />
          <input
            className="m-2 text-center border"
            type="number"
            name="periodNum"
            min="1"
            value={this.props.appState.period}
            max={this.props.appState.data.length}
            onChange={this.bubblePeriodToApp}
          />
        </div>
      </div>
    );
  }
}
