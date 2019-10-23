import React, {
    Component,
    Fragment
}from 'react';
import {Grid} from '@material-ui/core';
import * as d3 from "d3";
import {
    scaleBand,
    scaleLinear
} from 'd3-scale';
import {
    tsvParse
} from 'd3-dsv';
import {
    max
} from 'd3-array';
import {
    axisBottom,
    axisLeft
} from 'd3-axis';
import {
    select
} from 'd3-selection';
import './barGraph.scss';



// <BarChart/>
export default class BarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgWidth: 500,
            svgHeight: 500,
            margin : {top: 10, right: 10, bottom: 10, left: 10},
        };
    }

    render() {
        const { svgHeight, svgWidth, margin } = this.state;
        const {data} = this.props;

        const width = svgWidth + (margin.left + margin.right);
        const height = svgHeight + (margin.top + margin.bottom); 
        
        return(
            <Fragment>
            graph Goes here<br />
            {JSON.stringify(data)}
            </Fragment>
        )
    }
};