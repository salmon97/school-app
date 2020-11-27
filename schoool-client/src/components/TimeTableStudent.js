import React, {Component} from 'react';
import {Table} from "reactstrap";

class TimeTableStudent extends Component {
  render() {
    const {timeTable, lang} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table>
              <tbody>
              {/*{console.log(timeTable, 222222)}*/}
              <tr>
                {timeTable.map((item, i) =>
                  <th key={i}>
                    <span> {lang === 'uz' ? item.weekdaysNameUz : lang === 'ru' ? item.weekdaysNameRu : item.weekdaysNameEng}</span>
                    <hr/>
                    {item.resTimeTables.map((it, n) =>
                      <div key={it.timeTableId}>
                        <div className="mt-3">{lang === 'uz' ? it.subjectNameUz : lang === 'ru' ? it.subjectNameRu : it.subjectNameEng} <br/> {it.teacherName}
                          <br/> {it.startHour} {it.endHour}
                          <br/> {it.place}
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
      </div>
    );
  }
}

TimeTableStudent.propTypes = {};

export default TimeTableStudent;
