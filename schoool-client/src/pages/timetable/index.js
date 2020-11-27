import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {connect} from "dva";
import {router} from "umi";
import TimeTableTeacher from "../../components/TimeTableTeacher";
import TimeTableStudent from "../../components/TimeTableStudent";

@connect(({globalModel, timeTableModel}) => ({globalModel, timeTableModel}))
class TimeTable extends Component {

  componentDidMount() {
    if (this.props.globalModel.isStudent || this.props.globalModel.isParent) {
      this.props.dispatch({
        type: 'timeTableModel/getTimeTableForStudent'
      })
    }
  }

  render() {


    const {dispatch, globalModel, timeTableModel} = this.props;
    const {isAdmin, isDirector, isStudent, isTeacher, timeTables,lang} = globalModel;
    const {isOpenModal, timeTable} = timeTableModel;

    const getStudents = (timeTableId) => {
      dispatch({
        type: 'timeTableModel/getStudents',
        payload: {timeTableId}
      });
      dispatch({
        type: 'timeTableModel/updateState',
        payload: {timeTableId}
      });
      router.push("timetable/intogroup");
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          {isTeacher ?
            <TimeTableTeacher
              lang={lang}
              getStudents={getStudents}
              timeTables={timeTables}
            /> :
            <TimeTableStudent lang={lang} timeTable={timeTable}/>
          }
        </DashboardLayout>
      </div>
    );
  }
}

TimeTable.propTypes = {};

export default TimeTable;
