import React, {Component, Fragment} from 'react';

import Pagination from '../_/visitorlogPagination';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
   
   
    
  }
  render() {
    return (
      <Fragment>
        <Pagination {...this.props} view="employees"/>
      </Fragment>
    );
  }
}