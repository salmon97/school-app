import React, {Component} from 'react';
import {Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import {FaFileAlt, FaLayerGroup, FaUserEdit} from 'react-icons/fa';
import {FiMonitor} from 'react-icons/fi';
import {MdGroup} from 'react-icons/md';
import {AiFillDashboard, AiOutlineTeam} from 'react-icons/ai';
import {connect} from "dva";
import {AvField, AvForm} from "availity-reactstrap-validation";


@connect(({globalModel}) => ({globalModel}))
class DashboardSidebar extends Component {

  state = {
    isOpenModel: false
  };

  render() {
    const {globalModel, dispatch} = this.props;
    const {lang, currentUser, isAdmin, isDirector, isTeacher, isStudent, messageStuTeac, isMenu, isParent, fileId} = globalModel;

    const upLoadFile = (e) => {
      dispatch({
        type: 'globalModel/upLoadFile',
        payload: {
          file: e.target.files[0]
        }
      })
    };

    const openModel = () => {
      this.setState({isOpenModel: !this.state.isOpenModel})
    };

    const savePhoto = (e, v) => {
      dispatch({
        type: 'globalModel/saveHomePhotoStudent',
        payload: {fileId}
      });
      this.setState({isOpenModel: false})

    };

    return (
      <div style={{"width": isMenu ? "20%" : "0%"}} className="katalog-sidebar">
        <div style={{"width": isMenu ? "17%" : "0%"}} className="menuSidebar">
          <div className="userStatus text-center text-white">
            <h5 className="">{currentUser.firstName}</h5>
            <div className="m-auto w-25">
              <h6>Online</h6>
            </div>
          </div>
          <ListGroup className="">
            <ListGroupItem className="">
              <Link to="/cabinet"
                    className={window.location.pathname === "/cabinet" ? "active-catalog" : "nav-link"}>
                <AiFillDashboard
                  className="list-group-item-icon"/> {lang === 'uz' ? ' panel' : lang === 'ru' ? ' панель' : ' dashboard'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={!isStudent && !isParent ? "d-block" : "d-none"}>
              <Link to="/group"
                    className={window.location.pathname === "/group" ? 'active-catalog' : "nav-link"}>
                <FaLayerGroup
                  className="list-group-item-icon"/>{lang === 'uz' ? ' gruxlar' : lang === 'ru' ? ' группы' : ' Groups'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isDirector ? "d-block" : "d-none"}>
              <Link to="/admin"
                    className={window.location.pathname === "/staff" ? "active-catalog" : "nav-link"}>
                <MdGroup
                  className="list-group-item-icon"/>{lang === 'uz' ? ' adminlar' : lang === 'ru' ? ' админы' : ' admins'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin || isDirector ? "d-block" : "d-none"}>
              <Link to="/teacher"
                    className={window.location.pathname === "/teacher" ? "active-catalog" : "nav-link"}>
                <AiOutlineTeam
                  className="list-group-item-icon"/>{lang === 'uz' ? ' o\'qtuvchilar' : lang === 'ru' ? ' учителя' : ' Teachers'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isStudent || isParent ? "d-block" : "d-none"}>
              <Link to="/timetable"
                    className={window.location.pathname === "/timetable" ? "active-catalog" : "nav-link"}><FiMonitor
                className="list-group-item-icon"/>{lang === 'uz' ? ' jadval' : lang === 'ru' ? ' Расписание' : ' timetable'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isStudent || isParent ? "d-block" : "d-none"}>
              <Link to="/homework"
                    className={window.location.pathname === "/homework" ? "active-catalog" : "nav-link"}>
                <FaUserEdit
                  className="list-group-item-icon"/>{lang === 'uz' ? ' uy ishi' : lang === 'ru' ? ' д/задание' : ' homework'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isStudent || isParent ? "d-block" : "d-none"}>
              <Link to="/message"
                    className={window.location.pathname === "/message" ? "active-catalog" : "nav-link"}>
                <FaUserEdit
                  className="list-group-item-icon"/>{lang === 'uz' ? ' habarlar' : lang === 'ru' ? ' Сообщения' : ' messages'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isTeacher ? "d-block" : "d-none"}>
              <Link to="/message/teacher"
                    className={window.location.pathname === "/message/teacher" ? "active-catalog" : "nav-link"}>
                <FaUserEdit
                  className="list-group-item-icon"/>{lang === 'uz' ? ' habarlar' : lang === 'ru' ? ' Сообщения' : ' messages'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isStudent || isParent ? "d-block" : "d-none"}>
              <Link to="/student"
                    className={window.location.pathname === "/student" ? "active-catalog" : "nav-link"}>
                <FaUserEdit
                  className="list-group-item-icon"/>{lang === 'uz' ? ' kundalik' : lang === 'ru' ? ' дневник' : ' diary'}
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isStudent || isParent ? "d-block" : "d-none"}>
              <Link to="/calculate"
                    className={window.location.pathname === "/calculate" ? "active-catalog" : "nav-link"}>
                <FaUserEdit
                  className="list-group-item-icon"/>{lang === 'uz' ? ' baho xisoblash' : lang === 'ru' ? ' рассчитать ставку' : ' calculate rate'}
              </Link>
            </ListGroupItem>

            <ListGroupItem className={isStudent ? "d-block" : "d-none"}>
              <p onClick={openModel}
                  className={window.location.pathname === "/calcsas" ? "active-catalog" : "nav-link"}>
                <FaUserEdit
                  className="list-group-item-icon"/>{lang === 'uz' ? ' fotosuratni yuklash' : lang === 'ru' ? ' загрузить фото' : ' update photo'}
              </p>
            </ListGroupItem>

            {/*<ListGroupItem>*/}
            {/*  <Link to="/messageStuTeac"*/}
            {/*        className={window.location.pathname === "/messageStuTeac" ? "active-catalog" : "nav-link"}>*/}
            {/*    <FaUserEdit className="list-group-item-icon"/> Messages</Link>*/}
            {/*</ListGroupItem>*/}
            {/*<ListGroupItem className={isAdmin || isDirector ? "d-block" : "d-none"}>*/}
            {/*  <Link to="/student"*/}
            {/*        className={window.location.pathname === "/student" ? "active-catalog" : "nav-link"}>*/}
            {/*    <FaUsers className="list-group-item-icon"/> Students</Link>*/}
            {/*</ListGroupItem>*/}
            {/*<ListGroupItem className={isAdmin || isDirector ? "d-block" : "d-none"}>*/}
            {/*  <Link to=""*/}
            {/*        className={window.location.pathname === "/operator" ? "active-catalog" : "nav-link"}>*/}
            {/*    <MdContactMail className="list-group-item-icon"/>*/}
            {/*    {isAdmin || isDirector ? " Bog'lanish " : " Bildirishnoma "}*/}
            {/*    <Badge className="ml-sm-1 ml-md-1 " variant={!messageStuTeac ? "danger"*/}
            {/*      : "primary"}> {messageStuTeac}</Badge>*/}
            {/*  </Link>*/}
            {/*</ListGroupItem>*/}
            <ListGroupItem className={isAdmin || isDirector ? "d-block" : "d-none"}>
              <Link to="/subject"
                    className={window.location.pathname === "/subject" ? "active-catalog" : "nav-link"}>
                <FaFileAlt
                  className="list-group-item-icon"/> {lang === 'uz' ? ' fanlar' : lang === 'ru' ? ' предметы' : ' subjects'}
              </Link>
            </ListGroupItem>
          </ListGroup>
        </div>
        <Modal isOpen={this.state.isOpenModel} toggle={openModel}>
          <ModalHeader>
            {/*making {homeworkTrue === true ? 'homework' : 'rate'} by lesson*/}
          </ModalHeader>
          <AvForm onValidSubmit={savePhoto}>
            <ModalBody className="text-center">
              <AvField name="fileId" label="file home work" type="file" onChange={upLoadFile} required/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModel}>Close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

DashboardSidebar.propTypes = {};

export default DashboardSidebar;
