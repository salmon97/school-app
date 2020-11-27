import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "dva";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {GrEdit, RiDeleteBin5Line} from "react-icons/all";
import swal from "sweetalert";

@connect(({globalModel, adminModel}) => ({globalModel, adminModel}))
class Teacher extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'adminModel/getAdmin'
    })
  }

  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  render() {

    const {dispatch, globalModel, adminModel} = this.props;
    const {admins, admin, isOpenModal} = adminModel;
    const {lang} = globalModel;

    const saveAdmin = (e, v) => {
      if (this.state.edit) {
        dispatch({
          type: 'adminModel/editAdmin',
          payload: {...v}
        })
      } else {
        dispatch({
          type: 'adminModel/saveAdmin',
          payload: {...v, roleName: 'ADMIN'}
        })
      }
    };

    const openModal = (item, edit) => {
      this.setState({edit: edit});
      dispatch({
        type: 'adminModel/updateState',
        payload: {admin: item, isOpenModal: !isOpenModal}
      })
    };

    const deleteAdmin = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'adminModel/deleteAdmin',
            payload: {id}
          })
        }
      });
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <button className="btn btn-primary" onClick={() => openModal('', false)}>{lang === 'uz' ? ' admin q\'shish' : lang === 'ru' ? ' Добавить админ' : ' add admin'}</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>{lang === 'uz' ? ' admin' : lang === 'ru' ? ' админ' : ' admin'}</th>
                    <th>{lang === 'uz' ? ' tel no\'mer' : lang === 'ru' ? ' тел. номер' : ' tel num'}</th>
                    <th colSpan="2">{lang === 'uz' ? ' harakat' : lang === 'ru' ? ' действие' : ' action'}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {admins.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.firstName + " " + item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <GrEdit onClick={() => openModal(item, true)}/>
                      </td>
                      <td>
                        <RiDeleteBin5Line onClick={() => deleteAdmin(item.id)}/>
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
          <AvForm onValidSubmit={saveAdmin}>
            <ModalHeader>
              add group
            </ModalHeader>
            <ModalBody className="text-right">
              <AvField name="id" className="d-none" value={admin ? admin.id : ''}/>
              <AvField name="firstName" placeholder="enter firs name" value={admin ? admin.firstName : ''}/>
              <AvField name="lastName" placeholder="enter last name" value={admin ? admin.lastName : ''}/>
              <AvField name="username" placeholder="enter username" value={admin ? admin.username : ''}/>
              <AvField name="phoneNumber" placeholder="enter tel number" value={admin ? admin.phoneNumber : ''}/>
              <AvField name="password" type="password" placeholder="enter password" required/>
              <AvField name="prePassword" type="password" placeholder="enter Pre password" required/>
              <AvField name="address" placeholder="enter address" value={admin ? admin.address : ''}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={() => openModal('',false)}>close</Button>
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
