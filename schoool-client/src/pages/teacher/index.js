import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "dva";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {GrEdit, RiDeleteBin5Line} from "react-icons/all";
import swal from "sweetalert";

@connect(({globalModel, teacherModel}) => ({globalModel, teacherModel}))
class Teacher extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'teacherModel/getTeacher'
    })
  }

  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  render() {

    const {dispatch, globalModel, teacherModel} = this.props;
    const {teachers, teacher, isOpenModal} = teacherModel;
    const {lang, teacherId} = globalModel;

    const saveTeacher = (e, v) => {
      if (this.state.edit) {
        dispatch({
          type: 'teacherModel/editTeacher',
          payload: {...v}
        })
      } else {
        dispatch({
          type: 'teacherModel/saveTeacher',
          payload: {...v, roleName: 'TEACHER'}
        })
      }
    };

    const openModal = (item, edit) => {
      this.setState({edit: edit});
      dispatch({
        type: 'teacherModel/updateState',
        payload: {teacher: item, isOpenModal: !isOpenModal}
      })
    };

    const deleteTeacher = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'teacherModel/deleteTeacher',
            payload: {id}
          })
        }
      });
    };

    const getTeacherRates = (teacherId) => {
      dispatch({
        type: 'globalModel/rateTeacherGet',
        payload: {teacherId,page:0,size:10}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <button className="btn btn-primary"
                        onClick={() => openModal('', false)}>{lang === 'uz' ? ' o\'qituvchi qo\'shish' : lang === 'ru' ? ' Добавить учитель' : ' add teacher'}</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>{lang === 'uz' ? ' o\'qituvchi' : lang === 'ru' ? ' учитель' : ' teacher'}</th>
                    <th>{lang === 'uz' ? ' tel no\'mer' : lang === 'ru' ? ' тел. номер' : ' tel num'}</th>
                    <th colSpan="2">{lang === 'uz' ? ' harakat' : lang === 'ru' ? ' действие' : ' action'}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {teachers.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td onClick={() => getTeacherRates(item.id)}>{item.firstName + " " + item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <GrEdit onClick={() => openModal(item, true)}/>
                      </td>
                      <td>
                        <RiDeleteBin5Line onClick={() => deleteTeacher(item.id)}/>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </DashboardLayout>

        <Modal isOpen={isOpenModal} toggle={openModal}>
          <AvForm onValidSubmit={saveTeacher}>
            <ModalHeader>
              add group
            </ModalHeader>
            <ModalBody className="text-right">
              <AvField name="id" className="d-none" value={teacher ? teacher.id : ''}/>
              <AvField name="firstName" placeholder="enter firs name" value={teacher ? teacher.firstName : ''}/>
              <AvField name="lastName" placeholder="enter last name" value={teacher ? teacher.lastName : ''}/>
              <AvField name="username" placeholder="enter username" value={teacher ? teacher.username : ''}/>
              <AvField name="phoneNumber" placeholder="enter tel number" value={teacher ? teacher.phoneNumber : ''}/>
              <AvField name="password" type="password" placeholder="enter password" required/>
              <AvField name="prePassword" type="password" placeholder="enter Pre password" required/>
              <AvField name="address" placeholder="enter address" value={teacher ? teacher.address : ''}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={() => openModal('', false)}>close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

Teacher.propTypes = {};

export default Teacher;
