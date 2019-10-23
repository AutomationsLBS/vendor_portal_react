import React, {Component, Fragment} from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel
} from '@material-ui/core';
import Pagination from '../_/pagination';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    console.log("props at ListComponent", props);
  }
  render() {
    return (
      <Fragment>
        <Pagination {...this.props} view="employees"/>
      </Fragment>
    );
  }
}