import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {Table} from "reactstrap";
import {connect} from "dva";
import OurPaginations from "../../components/OurPaginations";

@connect(({globalModel}) => ({globalModel}))
class Index extends Component {
  render() {
    const {globalModel, dispatch} = this.props;
    const {lang, size, page, totalPages, totalElements, ratesTeacher, teacherId} = globalModel;


    const changePage = (page) => {
      dispatch({
        type: 'cabinetModel/getPoster',
        payload: {
          teacherId,
          page: page - 1,
          size: 10
        }
      });
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
                    <th>{lang === 'uz' ? 'sana' : lang === 'ru' ? 'Дата' : 'date'}</th>
                    <th>{lang === 'uz' ? 'baho' : lang === 'ru' ? 'оценка' : 'rate'}</th>
                    <th>{lang === 'uz' ? 'kim' : lang === 'ru' ? 'кто' : ' who'}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {ratesTeacher.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.rate}</td>
                      <td>{item.parentName}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className={ratesTeacher.length > 0 ? 'row pt-3' : 'd-none'}>
              <div className="col-md-4 offset-1">
                <OurPaginations
                  activePage={0}
                  totalElements={totalElements}
                  size={size}
                  showPageCount={totalPages < 5 ? totalPages : 5}
                  changePage={changePage}
                />
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
