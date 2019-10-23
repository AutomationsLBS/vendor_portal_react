import React, {Component, Fragment} from 'react';
import * as d3 from "d3";
import {select} from 'd3-selection';
import pieData from './data.json';

export default class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    };
    this.createBubbleChart = this
      .createBubbleChart
      .bind(this);
    console.log("Pid Data", pieData);
  }

  componentDidMount() {
    this.createBubbleChart()
  }

  componentDidUpdate() {
    this.createBubbleChart()
  }

  createBubbleChart() {
    const node = this.node;
    const data = this.state.data;
    const format = d3.format(",d");
    const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal([
      "#98abc5",
      "#8a89a6",
      "#7b6888",
      "#6b486b",
      "#a05d56",
      "#d0743c",
      "#ff8c00"
    ]);

    const pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return +d.population;
      });

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    d3.json("./data.json", function (d) {
      d.population = +d.population;
      return d;
    }, function (data, error) {
      console.log("Data", data);
      if (error) 
        throw error;
      
      var arc = g
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arc
        .append("path")
        .attr("d", path)
        .attr("fill", function (d) {
          return color(d.data.age);
        });

      arc
        .append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .attr("dy", "0.35em")
        .text(function (d) {
          return d.data.age;
        });
    });

  }

  render() {
    return (
      <Fragment>
        <svg ref={node => this.node = node} width={500} height={500}></svg>
      </Fragment>
    )
  }
}