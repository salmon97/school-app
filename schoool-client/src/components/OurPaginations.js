import React, {Component} from 'react';
import Pagination from "react-js-pagination"

require("bootstrap/dist/css/bootstrap.css");

// require("bootstrap/dist/css/bootstrap.min.css");

class OurPaginations extends Component {
  render() {
    const {activePage, totalElements, size, showPageCount, changePage} = this.props;
    return (
      <div>
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          itemsCountPerPage={size}
          totalItemsCount={totalElements}
          pageRangeDisplayed={showPageCount}
          onChange={changePage.bind(this)}
        />
      </div>
    );
  }
}

OurPaginations.propTypes = {};

export default OurPaginations;
