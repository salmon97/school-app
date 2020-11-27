import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../components/DashboardLayout";
import {Table} from "reactstrap";
import {router} from "umi";
import {IoMdArrowRoundBack} from "react-icons/all";
import {AvField, AvForm} from 'availity-reactstrap-validation'

@connect(({globalModel}) => ({globalModel}))
class Index extends Component {

  componentDidMount() {
    const {isStudent, isParent} = this.props.globalModel;
    if (isStudent || isParent) {
      this.props.dispatch({
        type: 'globalModel/getCalculateForSt'
      })
    }
  }

  render() {
    const {globalModel, dispatch} = this.props;
    const {calculateRate, isStudent, isParent, isTeacher, studentId,lang} = globalModel;

    const back = () => {
      if (isTeacher) {
        router.push("/timetable/intogroup")
      } else {
        router.push("/group/ingroup")
      }
    };

    const getByDate = (e, v) => {
      dispatch({
        type: 'globalModel/getCalculateByDate',
        payload: {...v, studentId}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">

            <AvForm onValidSubmit={getByDate}>
              <div className="row">
                <div className="col-md-1">
                  <button type="button" onClick={back}
                          className={isStudent || isParent ? 'd-none' : 'btn btn-success'}><IoMdArrowRoundBack/>
                  </button>
                </div>
                <div className="col-md-3">
                  <AvField name="from" type="date" required/>
                </div>
                <div className="col-md-3">
                  <AvField name="to" type="date" required/>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary">{lang === 'olmoq' ? '' : lang === 'ru' ? 'получить' : 'get'}</button>
                </div>
              </div>
            </AvForm>

            <div className="row">
              <div className="col-md-12">
                <Table className="table-row-cell">
                  <thead>
                  <tr>
                    <th>{lang === 'uz' ? 'fan' : lang === 'ru' ? 'предмет' : 'jubject'}</th>
                    <th>5</th>
                    <th>4</th>
                    <th>3</th>
                    <th>2</th>
                    <th>{lang === 'uz' ? 'foiz' : lang === 'ru' ? 'процентов' : 'percent'}</th>
                  </tr>
                  </thead>

                  <tbody>
                  {calculateRate.map((item, i) =>
                    <tr key={i}>
                      <td>{lang === 'uz' ? item.subNameUz : lang === 'ru' ? item.subNameRu : item.subNameEng}</td>
                      <td>{item.countRate5}</td>
                      <td>{item.countRate4}</td>
                      <td>{item.countRate3}</td>
                      <td>{item.countRate2}</td>
                      <td>{item.percent + ' %'}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
