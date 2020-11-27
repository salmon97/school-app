import React, {Component} from 'react';
// import {Form, Nav, Navbar} from "reactstrap";
import {connect} from "dva";
import router from "umi/router";
import {TOKEN_NAME} from "../contants/contants";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FiMenu} from "react-icons/all";

@connect(({globalModel}) => ({globalModel}))
class AdminNavigation extends Component {


  constructor() {
    super();
    this.state = {
      isOpen: false,
      d: false
    }
  }

  render() {

    const toggle = () => {
      this.setState({isOpen: !this.state.isOpen});
    };

    const {globalModel, dispatch} = this.props;
    const {isMenu, lang} = globalModel;

    const openMenu = () => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          isMenu: !isMenu
        }
      });
    };


    const logOut = () => {
      localStorage.removeItem(TOKEN_NAME);
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          currentUser: '',
          isStaff: false,
          isTeacher: false,
          isStudent: false,
          isDirector: false
        }
      });
      router.push("/auth/login");
    };

    const language = (lang) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {lang: lang}
      })
    };

    return (
      <div>

        <Navbar bg="warning" expand="lg">
          <Navbar.Brand><FiMenu onClick={openMenu}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <button className="btn btn-dark"
                    onClick={logOut}>{lang === 'uz' ? 'chiqish' : lang === 'ru' ? 'выйти' : 'logout'}</button>
            <NavDropdown title={lang} id="basic-nav-dropdown">
              <h6 onClick={() => language('uz')}>uz</h6>
              <h6 onClick={() => language('ru')}>ru</h6>
              <h6 onClick={() => language('eng')}>eng</h6>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>

      </div>
    );
  }
}

AdminNavigation.propTypes = {};
export default AdminNavigation;


// <Navbar color="warning" light expand="md">
//   <NavbarBrand className={window.location.pathname.length < 2 ? 'd-none' : 'd-block'}>
//     <FiMenu
//       onClick={openMenu}/></NavbarBrand>
//   <NavbarToggler onClick={toggle}/>
//   <Collapse isOpen={this.state.isOpen} navbar>
//     <Nav className="mr-auto" navbar>
//     </Nav>
//
//   </Collapse>
// </Navbar>
