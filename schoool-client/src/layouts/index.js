// import AdminNavigation from "@/components/AdminNavigation";
import {ToastContainer} from 'react-toastify';
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {connect} from "dva";
import AdminNavigation from "../components/AdminNavigation";

@connect(({globalModel}) => ({globalModel}))
class BasicLayout extends React.Component {


  render() {
    const {globalModel} = this.props;
    const {isStaff, isTeacher, isStudent} = globalModel;
    return (
      <div>
        <ToastContainer/>
        <AdminNavigation/>
        {this.props.children}
      </div>
    );
  }
}

export default BasicLayout;
