import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {connect} from "dva";
import {Table} from "reactstrap";
import {IoMdArrowRoundBack, RiCheckboxIndeterminateLine, RiCheckboxLine} from "react-icons/all";
import OurPaginations from "../../components/OurPaginations";
import {router} from "umi";

@connect(({globalModel}) => ({globalModel}))
class Index extends Component {
  componentDidMount() {
    const {isStudent, isParent} = this.props.globalModel;
    if (isStudent || isParent) {
      this.props.dispatch({
        type: 'globalModel/resDiaryStudent'
      })
    }
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {resDiary, size, page, totalElements, totalPages, studentId, isTeacher,isStudent,isParent,lang} = globalModel;

    const changePage = (page) => {
      dispatch({
        type: 'timeTableModel/getHomeWoks',
        payload: {
          studentId,
          page: page - 1,
          size: size
        }
      });
    };

    const back = () => {
      if (isTeacher) {
        router.push("/timetable/intogroup")
      } else {
        router.push("/group/ingroup")
      }
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <button onClick={back} className={isParent || isStudent ? 'd-none' :'btn btn-success'}><IoMdArrowRoundBack/></button>
              </div>
              <div className="col-md-12">
                {/*{console.log(resDiary)}*/}
                <Table>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>{lang === 'uz' ? ' qatnashidi' : lang === 'ru' ? ' посещать' : ' attend'}</th>
                    <th>{lang === 'uz' ? ' baho' : lang === 'ru' ? ' оценка' : ' rate'}</th>
                    <th>{lang === 'uz' ? ' sana' : lang === 'ru' ? ' Дата' : ' date'}</th>
                    <th>{lang === 'uz' ? ' fan' : lang === 'ru' ? ' предмет' : ' subject'}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {resDiary.map((item, i) =>
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.attendType === 'CAME' ? <RiCheckboxLine style={{width: '20px', height: '20px'}}/> :
                        <RiCheckboxIndeterminateLine style={{width: '20px', height: '20px'}}/>}</td>
                      <td>{item.attendRate != null ? item.attendRate : ''}{" | "}{item.homeworkRate != null ? item.homeworkRate : ''}</td>
                      <td>{item.registerAt}</td>
                      <td>{item.subjectNameEng}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
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
