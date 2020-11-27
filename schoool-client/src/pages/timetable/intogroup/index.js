import React, {Component} from 'react';
import DashboardLayout from "../../../components/DashboardLayout";
import {connect} from "dva";
import {Button, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {
  AiFillCalculator,
  BiMessageDetail,
  BsFillChatDotsFill,
  FaRegUserCircle,
  HiOutlineHome,
  IoIosSettings,
  MdDone,
  MdDoNotDisturbOn,
  RiDeleteBin5Line
} from "react-icons/all";
import {Tab, Tabs} from "react-bootstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import button from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/button";
import {API_PREFIX} from "../../../contants/contants";
import OurPaginations from "../../../components/OurPaginations";
import swal from 'sweetalert';
import {router} from "umi";

@connect(({globalModel, timeTableModel, messageModel}) => ({globalModel, timeTableModel, messageModel}))
class IntoGroup extends Component {
  constructor() {
    super();
    this.state = {
      rate: 0,
      file: false
    };
    this.customInputSwitched.bind(this);
    this.customInputSwitchedNotCome.bind(this);
  }

  customInputSwitched(student, e) {
    const {dispatch, timeTableModel} = this.props;
    const {students} = timeTableModel;
    // eslint-disable-next-line array-callback-return
    students.map(item => {
      if (item.studentId === student.studentId) {
        if (e.target.checked) {
          student.attendType = 'CAME'
        } else {
          student.attendType = null
        }
      }
    });
    dispatch({
      type: 'timeTableModel/updateState',
      payload: {
        students: students
      }
    });
  };

  customInputSwitchedNotCome(student, e) {
    const {dispatch, timeTableModel} = this.props;
    const {students} = timeTableModel;
    // eslint-disable-next-line array-callback-return
    students.map(item => {
      if (item.studentId === student.studentId) {
        if (e.target.checked) {
          student.attendType = 'NOT_COME'
        } else {
          student.attendType = null
        }
      }
    });
    dispatch({
      type: 'timeTableModel/updateState',
      payload: {
        students: students
      }
    });
  };

  render() {
    const {dispatch, globalModel, timeTableModel} = this.props;
    const {comments, sizeComment, students, timeTableId, isOpenModal, isHomeOpenModal, student, fileId, homeWorks, totalElements, totalPages, page, sizeHomeWork} = timeTableModel;
    const {lang} = globalModel;


    const startLesson = () => {
      let o = [];
      students.map(item =>
        o.push({
          studentId: item.studentId,
          attendType: item.attendType,
          timeTableId
        })
      );
      dispatch({
        type: 'timeTableModel/makeAttend',
        payload: o
      })
    };
    const rateModal = (item) => {
      dispatch({
        type: 'timeTableModel/updateState',
        payload: {isOpenModal: !isOpenModal, student: item}
      })
    };
    const makeHomeWork = (e, v) => {

      if (this.state.file) {
        dispatch({
          type: 'timeTableModel/addFileHomeW',
          payload: {
            ...v,
            fileId,
            homeWorkId: homeWorks.homeWorkId
          }
        })
      } else {
        dispatch({
          type: 'timeTableModel/saveHomeWork',
          payload: {
            ...v,
            fileId,
            timeTableId
          }
        })
      }
    };
    const homeWorkModal = (file) => {
      this.setState({file: file});
      dispatch({
        type: 'timeTableModel/updateState',
        payload: {isHomeOpenModal: !isHomeOpenModal}
      })
    };
    const upLoadFile = (e) => {
      dispatch({
        type: 'timeTableModel/upLoadFile',
        payload: {
          file: e.target.files[0]
        }
      })
    };
    const getRateValue = (rate) => {
      this.setState({rate: rate})
    };
    const submitRate = () => {
      if (this.state.rate > 1) {
        dispatch({
          type: 'timeTableModel/makeRate',
          payload: {attendanceId: student.attendanceId, rate: this.state.rate}
        })
      }
    };

    const handleSelect = (key) => {
      if (key === 'homeWork') {
        dispatch({
          type: 'timeTableModel/getHomeWoks',
        })
      }
    };

    const changePage = (page) => {
      dispatch({
        type: 'timeTableModel/getHomeWoks',
        payload: {
          timeTableId,
          page: page - 1,
          sizeHomeWork: 1
        }
      });
    };

    const deleteFile = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'timeTableModel/deleteFile',
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

    const checkAnswerHomeWork = (answerId) => {
      dispatch({
        type: 'timeTableModel/getAnswerHomeWorks',
        payload: {id: answerId}
      });
      dispatch({
        type: 'timeTableModel/updateState',
        payload: {answerId}
      })
    };

    const openChat = (sentToId) => {
      // alert(sentToId)
      dispatch({
        type: 'messageModel/updateState',
        payload: {sentToId}
      });
      router.push("/chat/teacher");
    };

    const sendComment = () => {
      dispatch({
        type: 'timeTableModel/addComment',
        payload: {text: this.state.text, homeWorkId: homeWorks.homeWorkId}
      });
      this.setState({text: ''})
    };

    const showMore = () => {
      dispatch({
        type: 'timeTableModel/getComments',
        payload: {size: sizeComment + 20, homeWorkId: homeWorks.homeWorkId}
      })
    };

    const stateValue = (e) => {
      this.setState({text: e.target.value})
    };

    const getDiary = (studentId) => {
      dispatch({
        type: 'globalModel/resDiary',
        payload: {studentId, size: 10, page: 0}
      });
      dispatch({
        type: 'globalModel/updateState',
        payload: {studentId}
      })
    };

    const getCalculate = (studentId) => {
      dispatch({
        type: 'globalModel/getCalculate',
        payload: {studentId}
      });
      dispatch({
        type: 'globalModel/updateState',
        payload: {studentId}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <Tabs className="nav-pills justify-content-center" onSelect={handleSelect} defaultActiveKey="home"
                  id="uncontrolled-tab-example">
              <Tab eventKey="home"
                   title={<h6>{lang === 'uz' ? ' jurnal' : lang === 'ru' ? ' журнал' : ' journal'}</h6>}>
                <div className="row">
                  <div className="col-md-12">
                    <Table>
                      <thead>
                      <tr>
                        <th>№</th>
                        <th colSpan="2">{lang === 'uz' ? ' o\'quvchi' : lang === 'ru' ? 'студент' : 'student'}</th>
                        <th>{lang === 'uz' ? 'qatnashidi' : lang === 'ru' ? 'посещать' : 'attend'}</th>
                        <th>{lang === 'uz' ? 'harakat' : lang === 'ru' ? 'действие' : 'action'}</th>
                        <th>{lang === 'uz' ? 'chat ota-ona' : lang === 'ru' ? 'чат родитель' : 'chatparent'}</th>
                      </tr>
                      </thead>
                      <tbody>
                      {/*{console.log(students)}*/}
                      {students.map((item, i) =>
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.studentPhotoId === null ? <FaRegUserCircle/> : <div style={{width: '50px'}}>
                            <img onClick={() => downloadFile(item.studentPhotoId)} className="img-fluid"
                                 src={API_PREFIX + "file/getFile/" + item.studentPhotoId} alt=""/>
                          </div>}</td>
                          <td onClick={() => getDiary(item.studentId)}>{item.firstName + " " + item.lastName}</td>
                          <td>
                            <CustomInput type="checkBox" checked={item.attendType === 'CAME'} className="bg-danger"
                                         onChange={this.customInputSwitched.bind(this, item)} id={'switch' + i + 1}/>
                            <span><MdDone/></span>
                            <br/>
                            <CustomInput type="checkBox" checked={item.attendType === 'NOT_COME'} className="checkBoxT"
                                         onChange={this.customInputSwitchedNotCome.bind(this, item)}
                                         id={'switch' + i + 2}/>
                            <span><MdDoNotDisturbOn/></span>
                          </td>
                          <td><IoIosSettings onClick={() => rateModal(item)} style={{width: '20px', height: '20px'}}/>
                            <BiMessageDetail className="ml-2" onClick={() => openChat(item.userId)}/>
                            <AiFillCalculator style={{width: '20px', height: '20px'}}
                                              onClick={() => getCalculate(item.studentId)} className="ml-3"/>
                          </td>
                          <td>
                            <BsFillChatDotsFill className="ml-2" onClick={() => openChat(item.parentUserId)}/>
                          </td>
                        </tr>
                      )}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 offset-5">
                    <button className="btn btn-success"
                            onClick={startLesson}>{lang === 'uz' ? ' boshlash' : lang === 'ru' ? ' Начало' : ' start'}</button>
                  </div>
                  <div className="col-md-1 offset-4">
                    {/*{console.log(students)}*/}
                    <button className={students[0].attendanceId == null ? 'd-none' : 'btn btn-success'}
                            onClick={() => homeWorkModal(false)}><HiOutlineHome/></button>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="homeWork"
                   title={<h6>{lang === 'uz' ? ' uy ishi' : lang === 'ru' ? ' д/задание' : ' homework'}</h6>}>
                <div className={homeWorks.resAnswerHomeWorks.length > 0 ? 'row' : 'd-none'}>
                  <div className="col-md-12">
                    <Table>
                      <thead>
                      <tr>
                        <th>№</th>
                        <th>{lang === 'uz' ? ' o\'quvchi' : lang === 'ru' ? ' студент' : ' student'}</th>
                        <th>{lang === 'uz' ? ' o\'quvchi' : lang === 'ru' ? ' студент' : ' student'}</th>
                        <th>{homeWorks.registerAt}</th>
                      </tr>
                      </thead>
                      <tbody>
                      {/*{console.log(homeWorks)}*/}
                      {homeWorks.resAnswerHomeWorks.map((item, i) =>
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.studentPhotoId === null ? <FaRegUserCircle/> : <div style={{width: '50px'}}>
                            <img onClick={() => downloadFile(item.fileId)} className="img-fluid"
                                 src={API_PREFIX + "file/getFile/" + item.fileId} alt=""/>
                          </div>}</td>
                          <td>{item.student}</td>
                          <td>{item.answerHomeWorkId == null ?
                            <button className="btn btn-danger"><MdDoNotDisturbOn/></button> :
                            <button className="btn btn-success"
                                    onClick={() => checkAnswerHomeWork(item.answerHomeWorkId)}><MdDone/>
                            </button>}</td>
                        </tr>
                      )}
                      <tr>
                        <th>№</th>
                        <th>{lang === 'uz' ? ' fayl' : lang === 'ru' ? ' файл' : ' file'}</th>
                        <th>{lang === 'uz' ? ' matn' : lang === 'ru' ? ' текст' : ' text'}</th>
                        <th>
                          <button className="btn btn-primary" onClick={() => homeWorkModal(true)}><b>+</b></button>
                        </th>
                      </tr>
                      {homeWorks.resFileHomeWorks.map((item, i) =>
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
                <div className={homeWorks.resAnswerHomeWorks.length > 0 ? 'row' : 'd-none'}>
                  <div className="col-md-12">
                    <button className="btn btn-danger pb-4" onClick={showMore}
                            style={{width: '98%', height: '25px'}}>
                      {lang === 'uz' ? ' ko\'pro ko\'rsatish' : lang === 'ru' ? ' показать больше' : ' show more'}
                    </button>
                    <div className="comment pl-3">
                      {comments.reverse().map((item, i) =>
                        <div key={i}>
                          <span>{item.username}</span>
                          <h6>{item.text}</h6>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <input name="comment" style={{width: '85%'}} className="rounded" value={this.state.text}
                           onChange={stateValue} placeholder="enter comment..."/>
                    <button className="btn btn-primary ml-1"
                            onClick={sendComment}>{lang === 'uz' ? ' jo\'natish' : lang === 'ru' ? ' Отправить' : ' send'}</button>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-12">
                    <OurPaginations
                      activePage={0}
                      totalElements={totalElements}
                      size={sizeHomeWork}
                      showPageCount={totalPages < 5 ? totalPages : 5}
                      changePage={changePage}
                    />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </DashboardLayout>
        <Modal className="ModalRate" isOpen={isOpenModal} toggle={rateModal}>
          <ModalHeader>
            {/*making {homeworkTrue === true ? 'homework' : 'rate'} by lesson*/}
          </ModalHeader>
          <ModalBody className="text-center">
            {/*{console.log(student)}*/}
            {student.attendanceId == null || student.attendType !== 'CAME' ?
              <h5>can not rate</h5>
              :
              <div>
                <button className="btn buttonRate2 mr-2 " onClick={() => getRateValue(2)}><h3>2</h3></button>
                <button className="btn buttonRate3 mr-2 " onClick={() => getRateValue(3)}><h3>3</h3></button>
                <button className="btn buttonRate4 mr-2 " onClick={() => getRateValue(4)}><h3>4</h3></button>
                <button className="btn buttonRate5 " onClick={() => getRateValue(5)}><h3>5</h3></button>
              </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" type="button" onClick={rateModal}>Close</Button>
            <Button color="success" onClick={submitRate}>save</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={isHomeOpenModal} toggle={homeWorkModal}>
          <ModalHeader>
            {/*making {homeworkTrue === true ? 'homework' : 'rate'} by lesson*/}
          </ModalHeader>
          <AvForm onValidSubmit={makeHomeWork}>
            <ModalBody className="text-center">
              <AvField name="fileId" label="file home work" type="file" onChange={upLoadFile}/>
              <AvField name="text" type="text" required/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={homeWorkModal}>Close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

IntoGroup.propTypes = {};

export default IntoGroup;


