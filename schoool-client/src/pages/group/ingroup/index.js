import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../../components/DashboardLayout";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import swal from "sweetalert";
import {router} from "umi";
import {AiFillCalculator, FaRegUserCircle, GrEdit, RiDeleteBin5Line} from "react-icons/all";
import {Tab, Tabs} from "react-bootstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import option from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/option";
import {API_PREFIX} from "../../../contants/contants";


@connect(({globalModel, groupModel}) => ({globalModel, groupModel}))
class Index extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'groupModel/getTimeTablesByGroup'
    })
  }

  render() {

    const {groupModel, globalModel, dispatch} = this.props;
    const {students, student, isOpenModal, timeTables, groupId, timeTable} = groupModel;
    const {allSubjects, teachers, weeks, lang} = globalModel;

    const addTimeTable = (item) => {
      if (!isOpenModal) {
        dispatch({
          type: 'globalModel/getWeeks'
        });
        dispatch({
          type: 'globalModel/getSubjects'
        });
        dispatch({
          type: 'globalModel/getTeacher'
        });
      }
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          isOpenModal: !isOpenModal,
          timeTable: item
        }
      })
    };

    const deleteStudent = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'groupModel/deleteStudent',
            payload: {id}
          })
        }
      });
    };

    const deleteTimeTable = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'groupModel/deleteTimeTable',
            payload: {id}
          })
        }
      });
    };

    const addStudent = (item) => {
      dispatch({
        type: 'groupModel/updateState',
        payload: {student: item}
      });
      router.push("/group/register");
    };

    const saveTimeTable = (e, v) => {
      dispatch({
        type: 'groupModel/addTimeTable',
        payload: {...v, groupId}
      })
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

    const downloadFile = (id) => {
      let file = document.createElement("a");
      file.href = `${API_PREFIX}file/getFile/${id}`;
      document.body.appendChild(file);
      file.target = "_blank";
      file.click();
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <Tabs className="nav-pills justify-content-center" defaultActiveKey="student"
                  id="uncontrolled-tab-example">
              <Tab eventKey="student"
                   title={<h6>{lang === 'uz' ? ' o\'quvchi' : lang === 'ru' ? ' студент' : ' students'}</h6>}>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-primary"
                            onClick={() => addStudent('')}>{lang === 'uz' ? ' o\'quvchi qo\'shish ' : lang === 'ru' ? ' добавить студента' : ' add student'}</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Table>
                      <thead>
                      <tr>
                        <th>№</th>
                        <th colSpan="2">{lang === 'uz' ? 'o\'quvchi' : lang === 'ru' ? 'студент' : 'student'}</th>
                        <th>{lang === 'uz' ? ' tel no\'mer' : lang === 'ru' ? ' тел. номер' : ' tel num'}</th>
                        <th colSpan="2">{lang === 'uz' ? ' harakat' : lang === 'ru' ? ' действие' : ' action'}</th>
                      </tr>
                      </thead>
                      <tbody>
                      {students.map((item, i) =>
                        <tr key={item.studentId}>
                          <td>{i + 1}</td>
                          <td>{item.studentPhotoId === null ? <FaRegUserCircle/> : <div style={{width: '50px'}}>
                            <img onClick={() => downloadFile(item.studentPhotoId)} className="img-fluid"
                                 src={API_PREFIX + "file/getFile/" + item.studentPhotoId} alt=""/>
                          </div>}</td>
                          <td onClick={() => getDiary(item.studentId)}>{item.firstName + " " + item.lastName}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            <AiFillCalculator style={{width: '20px', height: '20px'}}
                                              onClick={() => getCalculate(item.studentId)} className="mr-3"/>
                            <GrEdit onClick={() => addStudent(item)}/>
                          </td>
                          <td>
                            <RiDeleteBin5Line onClick={() => deleteStudent(item.studentId)}/>
                          </td>
                        </tr>
                      )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="timeTable"
                   title={<h6>{lang === 'uz' ? ' jadval' : lang === 'ru' ? ' pасписание' : ' timetable'}</h6>}>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-primary"
                            onClick={() => addTimeTable('')}>{lang === 'uz' ? ' jadvalni qo\'shing' : lang === 'ru' ? ' добавить расписание' : ' add timetable'}</button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <Table>
                      <thead>
                      </thead>
                      <tbody>
                      <tr>
                        {timeTables.map((item, i) =>
                          <th key={i}>
                            <span> {lang === 'uz' ? item.weekdaysNameUz : lang === 'ru' ? item.weekdaysNameRu : item.weekdaysNameEng}</span>
                            <hr/>
                            {item.resTimeTables.map((it, n) =>
                              <div key={it.timeTableId}>
                                <div
                                  className="mt-3">{lang === 'uz' ? it.subjectNameUz : lang === 'ru' ? it.subjectNameRu : it.subjectNameEng}<br/> {it.teacherName}
                                  <br/> {it.startHour} {it.endHour}
                                  <br/> {it.place}
                                  <div><GrEdit onClick={() => addTimeTable(it)}/>
                                    <RiDeleteBin5Line className="ml-4" onClick={() => deleteTimeTable(it.timeTableId)}/>
                                  </div>
                                </div>
                                <hr/>
                              </div>
                            )}
                          </th>
                        )}
                      </tr>
                      </tbody>
                    </Table>

                  </div>
                </div>

              </Tab>
            </Tabs>
          </div>
        </DashboardLayout>

        <Modal isOpen={isOpenModal} toggle={addTimeTable}>
          <AvForm onValidSubmit={saveTimeTable}>
            <ModalHeader>
              add group
            </ModalHeader>
            {/*{console.log(timeTable)}*/}
            <ModalBody className="text-right">
              <AvField name="timeTableId" className="d-none" value={timeTable ? timeTable.timeTableId : ''}/>
              <AvField type="select" name="subjectId" value={timeTable ? timeTable.subjectId : ''} required>
                <option value="" disabled={!timeTable}>{timeTable ? timeTable.subjectNameRu : 'select subject'}</option>
                {allSubjects.map(item =>
                  <option key={item.id}
                          value={item.id}>{lang === 'uz' ? item.nameUz : lang === 'ru' ? item.nameRu : item.nameEng}</option>
                )}
              </AvField>
              <AvField type="select" name="teacherId" required value={timeTable ? timeTable.teacherId : ''}>
                <option value="" disabled={!timeTable}>{timeTable ? timeTable.teacherName : 'select teacher'}</option>
                {teachers.map(item =>
                  <option key={item.id} value={item.id}>{item.firstName + " " + item.lastName.substring(0, 1)}</option>
                )}
              </AvField>
              <AvField type="select" name="weekDaysId" value={timeTable ? timeTable.weekDaysId : ''} required>
                <option value=""
                        disabled={!timeTable}>{timeTable ? timeTable.weekdaysNameRu : 'select weekDays'}</option>
                {weeks.map(item =>
                  <option key={item.id} value={item.id}>{lang === 'uz' ? item.nameUz : lang === 'ru' ? item.nameRu : item.nameEng}</option>
                )}
              </AvField>
              <div className="d-flex justify-content-around">
                <AvField type="number" name="startHour" placeholder="enter hour"
                         value={timeTable ? timeTable.hasOwnProperty("startHour") ? timeTable.startHour.substring(0, 2) : '' : ''}/>
                <AvField type="number" name="startHourMin" placeholder="enter min"
                         value={timeTable ? timeTable.hasOwnProperty("startHour") ? timeTable.startHour.substring(3) : '' : ''}/>
              </div>
              <div className="d-flex justify-content-around">
                <AvField type="number" name="endHour" placeholder="enter hour"
                         value={timeTable ? timeTable.hasOwnProperty("endHour") ? timeTable.endHour.substring(0, 2) : '' : ''}/>
                <AvField type="number" name="endHourMin" placeholder="enter min"
                         value={timeTable ? timeTable.hasOwnProperty("endHour") ? timeTable.endHour.substring(3) : '' : ''}/>
              </div>
              <AvField name="place" placeholder="enter place" value={timeTable ? timeTable.place : ''}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={() => addTimeTable('')}>close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

Index.propTypes = {};
export default Index;
