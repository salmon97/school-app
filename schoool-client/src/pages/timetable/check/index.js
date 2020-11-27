import React, {Component} from 'react';
import DashboardLayout from "../../../components/DashboardLayout";
import {connect} from "dva";
import {API_PREFIX} from "../../../contants/contants";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import swal from "sweetalert";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {RiDeleteBin5Line} from "react-icons/all";
import button from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/button";

@connect(({globalModel, timeTableModel}) => ({globalModel, timeTableModel}))
class Index extends Component {

  state = {
    rate: 0
  };

  render() {

    const {dispatch, globalModel, timeTableModel} = this.props;
    const {answerHomeWorks, isOpenModal, answerId, fileId, isHomeOpenModal} = timeTableModel;
    const {lang} = globalModel;

    const upLoadFile = (e) => {
      dispatch({
        type: 'timeTableModel/upLoadFile',
        payload: {
          file: e.target.files[0]
        }
      })
    };

    const openModal = () => {
      if (answerId !== '') {
        dispatch({
          type: 'timeTableModel/updateState',
          payload: {isOpenModal: !isOpenModal}
        })
      }
    };

    const deleteFile = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'timeTableModel/deleteFileCheck',
            payload: {id}
          })
        }
      });
    };

    const downloadFile = (id) => {
      let file = document.createElement("a");
      file.href = `${API_PREFIX}file/getFile/${id}`;
      document.body.appendChild(file);
      file.target = "_blank";
      file.click();
    };

    const makeAnswerHomeWorkCheck = (e, v) => {
      dispatch({
        type: 'timeTableModel/addCheckAnswer',
        payload: {
          ...v,
          fileId,
          answerHomeWorkId: answerId
        }
      })
    };

    const rateModal = () => {
      if (answerId !== '') {
        dispatch({
          type: 'timeTableModel/updateState',
          payload: {isHomeOpenModal: !isHomeOpenModal}
        })
      }
    };

    const getRateValue = (rate) => {
      this.setState({rate: rate})
    };

    const submitRate = () => {
      if (this.state.rate > 1) {
        dispatch({
          type: 'timeTableModel/answerHomeWorRate',
          payload: {rate: this.state.rate, answerId}
        })
      }
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>{lang === 'uz' ? ' student uy ishi' : lang === 'ru' ? 'домашняя работа студента' : 'stuednt home work'}</th>
                    <th>{answerHomeWorks.registerAt != null ? answerHomeWorks.registerAt : ''}</th>
                    <th>
                      <button className="btn btn-success"
                              onClick={rateModal}>{lang === 'uz' ? 'baho' : lang === 'ru' ? 'оценка' : 'rate'}</button>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {answerHomeWorks.resFileHomeWorks.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{width: '50px'}}>
                          <img onClick={() => downloadFile(item.fileId)} className="img-fluid"
                               src={API_PREFIX + "file/getFile/" + item.fileId} alt=""/>
                        </div>
                      </td>
                      <td>{item.text}</td>
                    </tr>
                  )}
                  <tr className="bg-dark text-light">
                    <td>{lang === 'uz' ? 'baho' : lang === 'ru' ? 'оценка' : 'rate'}{answerHomeWorks.rate != null ? answerHomeWorks.rate : ''}</td>
                  </tr>
                  <tr>
                    <th>№</th>
                    <th colSpan="2">{lang === 'uz' ? 'tekshirilgan javob uy vazifasi' : lang === 'ru' ? 'проверил ответ на домашнее задание' : 'checked answer home work'}</th>
                    <th>
                      <button className="btn btn-primary" onClick={openModal}><b>+</b></button>
                    </th>
                  </tr>
                  {answerHomeWorks.checkedFileHomeWorks.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{width: '50px'}}>
                          <img onClick={() => downloadFile(item.fileId)} className="img-fluid"
                               src={API_PREFIX + "file/getFile/" + item.fileId} alt=""/>
                        </div>
                      </td>
                      <td>{item.text}</td>
                      <td><RiDeleteBin5Line onClick={() => deleteFile(item.id)}/></td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </DashboardLayout>

        <Modal isOpen={isOpenModal} toggle={openModal}>
          <ModalHeader>
            {/*making {homeworkTrue === true ? 'homework' : 'rate'} by lesson*/}
          </ModalHeader>
          <AvForm onValidSubmit={makeAnswerHomeWorkCheck}>
            <ModalBody className="text-center">
              <AvField name="fileId" label="file home work" type="file" onChange={upLoadFile}/>
              <AvField name="text" type="text" required/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModal}>Close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal className="ModalRate" isOpen={isHomeOpenModal} toggle={rateModal}>
          <ModalHeader>
          </ModalHeader>
          <ModalBody className="text-center">
            <div>
              <button className="btn buttonRate2 mr-2 " onClick={() => getRateValue(2)}><h3>2</h3></button>
              <button className="btn buttonRate3 mr-2 " onClick={() => getRateValue(3)}><h3>3</h3></button>
              <button className="btn buttonRate4 mr-2 " onClick={() => getRateValue(4)}><h3>4</h3></button>
              <button className="btn buttonRate5 " onClick={() => getRateValue(5)}><h3>5</h3></button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" type="button" onClick={rateModal}>Close</Button>
            <Button color="success" onClick={submitRate}>save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
