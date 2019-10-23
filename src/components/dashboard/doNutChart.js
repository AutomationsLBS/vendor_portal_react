import React, {Component, Fragment} from 'react';
import {Grid, Typography} from '@material-ui/core';

class DonutChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="countItem">
          <span className="countValue">{this.props.data}</span>
        </div>
        <div className="countTitle">
          <Typography variant="title">{this.props.label}</Typography>
        </div>
      </Fragment>
    )
  }
}

export default DonutChart;