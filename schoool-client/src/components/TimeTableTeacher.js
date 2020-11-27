import React, {Component} from 'react';
import {Table} from "reactstrap";

class TimeTableTeacher extends Component {
  render() {
    const {timeTables,getStudents,lang} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table>
              <thead>
              <tr>
                <th>{lang === 'uz' ? ' hafta kuni' : lang === 'ru' ? ' день недели' : ' weekday'}</th>
                <th>{lang === 'uz' ? ' fan' : lang === 'ru' ? ' предмет' : ' subject'}</th>
                <th>{lang === 'uz' ? ' o\'qituvchi' : lang === 'ru' ? ' учитель' : ' teacher'}</th>
                <th>{lang === 'uz' ? ' vaqt' : lang === 'ru' ? ' время' : ' time'}</th>
              </tr>
              </thead>
              <tbody>
              {timeTables.map((item, i) =>
                <tr key={i}>
                  <td>{item.weekdaysNameUz}</td>
                  <td onClick={() => getStudents(item.timeTableId)}>{item.subjectNameUz}</td>
                  <td>{item.teacherName}</td>
                  <td>{item.startHour + " " + item.endHour}</td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

TimeTableTeacher.propTypes = {};

export default TimeTableTeacher;
