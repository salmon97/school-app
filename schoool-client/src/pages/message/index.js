import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../components/DashboardLayout";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {BiMessageDetail, RiVolumeVibrateLine} from "react-icons/all";
import {router} from "umi";
import button from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/button";

@connect(({messageModel, globalModel}) => ({messageModel, globalModel}))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'messageModel/studentTeaAndSub'
    })
  }

  render() {

    const {messageModel, dispatch, globalModel} = this.props;
    const {teacherAndSubject} = messageModel;
    const {lang, isOpenModal, teacherId} = globalModel;

    const openChat = (sentToId) => {

      dispatch({
        type: 'messageModel/updateState',
        payload: {sentToId}
      });
      router.push("/chat");
    };

    const rateModal = (teacherId) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {isOpenModal: !isOpenModal, teacherId}
      })
    };

    const getRateValue = (rate) => {
      this.setState({rate: rate})
    };

    const submitRate = () => {
      if (this.state.rate > 1) {
        dispatch({
          type: 'globalModel/rateTeacherAdd',
          payload: {teacherId, rate: this.state.rate}
        })
      }
      dispatch({
        type: 'globalModel/updateState',
        payload: {isOpenModal: false}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div>
              <div className="row">
                <div className="col-md-12">
                  <Table>
                    <thead>
                    <tr>
                      <th>№</th>
                      <th>{lang === 'uz' ? 'fan' : lang === 'ru' ? 'предмет' : 'subject'}</th>
                      <th>{lang === 'uz' ? 'o\'qituvchi' : lang === 'ru' ? 'учитель' : 'teacher'}</th>
                      <th>{lang === 'uz' ? 'o\'qituvchini baholash' : lang === 'ru' ? 'оцените учителя' : 'rate teacher'}</th>
                      <th>{lang === 'uz' ? 'habarlar' : lang === 'ru' ? 'сообщение' : 'message'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teacherAndSubject.map((item, i) =>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{lang === 'uz' ? item.subjectNameUz : lang === 'ru' ? item.subjectNameRu : item.subjectNameEng}
                        </td>
                        <td>{item.teacherName}</td>
                        <td><RiVolumeVibrateLine onClick={() => rateModal(item.teacherId2)}
                                                 style={{width: '30px', height: '30px'}}/></td>
                        <td><BiMessageDetail style={{width: '30px', height: '30px'}}
                                             className={item.noRead ? 'bg-danger' : ''}
                                             onClick={() => openChat(item.teacherId)}/></td>
                      </tr>
                    )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>

        <Modal className="ModalRate" isOpen={isOpenModal} toggle={rateModal}>
          <ModalHeader>
            {/*making {homeworkTrue === true ? 'homework' : 'rate'} by lesson*/}
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
