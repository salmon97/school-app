import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DashboardSidebar from "./DashboardSidebar";

class DashboardLayout extends Component {
  render() {

    return (
      <div className="catalog">
        <DashboardSidebar pathname={this.props.pathname}/>
        {this.props.children}
      </div>
    );
  }
}

DashboardLayout.propTypes = {};

export default DashboardLayout;
