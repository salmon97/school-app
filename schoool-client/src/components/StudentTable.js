import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {
  AiOutlineDislike,
  AiOutlineHome,
  AiOutlineLike,
  RiCheckboxIndeterminateLine,
  RiCheckboxLine
} from "react-icons/all";

class StudentTable extends Component {

  render() {
    const {currentUser, homeWorkModal, resMayDetails, homeWorkModalShow, homeWorkText} = this.props;
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            {resMayDetails.map((item, i) => <div key={i + "div"}>
                <Table>
                  <thead className="bg-dark text-light">
                  <tr>
                    <th>дата</th>
                    <th>сегодня на уроке</th>
                    <th>отношение к уроку</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr key={i + "$3s"}>
                    <td>{item.createdAt}</td>
                    <td>{item.todayInLesson ? <RiCheckboxLine className="icon-todayLesson"/> :
                      <RiCheckboxIndeterminateLine className="icon-todayLesson"/>}</td>
                    <td>{item.relationToLesson ? <AiOutlineLike className="icon-todayLesson"/> :
                      <AiOutlineDislike className="icon-todayLesson"/>}</td>
                  </tr>
                  <tr>
                    <th>предмет</th>
                    <th>оценка</th>
                    <th>домашнее задание</th>
                  </tr>
                  {item.hasOwnProperty("resRateHomeWorks") ? item.resRateHomeWorks.map((item, i) =>
                    <tr key={i}>
                      <td>{item.subjectName}</td>
                      <td>{item.rate}</td>
                      <td>
                        <AiOutlineHome style={{width: '30px', height: '30px'}}
                                       onClick={() => homeWorkModal(item.homeWork != null ? item.homeWork : '')}/>
                      </td>
                    </tr>
                  ) : ''}
                  </tbody>
                </Table>

              </div>
            )}
          </div>
        </div>

        <Modal isOpen={homeWorkModalShow} toggle={homeWorkModal}>
          <ModalHeader>
            homeWork
          </ModalHeader>
          <ModalBody className="text-center">
            <h5>{homeWorkText}</h5>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={homeWorkModal}>close</button>
          </ModalFooter>
        </Modal>
        {/*<div className="row">*/}
        {/*  <div className="col-md-12">*/}
        {/*    <ion-icon name="arrow-back-outline"/>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

StudentTable.propTypes = {};

export default StudentTable;
