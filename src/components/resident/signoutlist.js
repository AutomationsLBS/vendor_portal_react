import React, {Component, Fragment} from 'react';

import Pagination from '../_/signioutPaginagtion';

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