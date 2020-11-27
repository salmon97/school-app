import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../components/DashboardLayout";
import AdminCabinet from "../../components/AdminCabinet";
import CabinetCompanent from "../../components/CabinetCompanent";
import swal from "sweetalert";


@connect(({globalModel, cabinetModel}) => ({globalModel, cabinetModel}))
class Cabinet extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'cabinetModel/counts'
    });
    this.props.dispatch({
      type: 'cabinetModel/getPoster'
    })
  }

  render() {
    const {globalModel, cabinetModel, dispatch} = this.props;
    const {isAdmin, isDirector, isTeacher, isStudent, lang} = globalModel;
    const {isOpenModal, studentCount, groupCount, teacherCount, size, page, totalElements, totalPages, notices, notice} = cabinetModel;

    const openModal = (item) => {
      dispatch({
        type: 'cabinetModel/updateState',
        payload: {
          isOpenModal: !isOpenModal,
          notice: item
        }
      })
    };
    const saveEdit = (e, v) => {
      // console.log(v);
      dispatch({
        type: 'cabinetModel/addPoster',
        payload: {...v}
      });
      dispatch({
        type: 'cabinetModel/updateState',
        payload: {
          isOpenModal: false
        }
      })
    };

    const changePage = (page) => {
      dispatch({
        type: 'cabinetModel/getPoster',
        payload: {
          page: page - 1,
          size: 10
        }
      });
    };

    const deletePoster = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'cabinetModel/deletePoster',
            payload: {id}
          })
        }
      });
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          {isAdmin || isDirector ?
            <AdminCabinet
              changePage={changePage}
              deletePoster={deletePoster}
              studentCount={studentCount}
              groupCount={groupCount}
              teacherCount={teacherCount}
              saveEdit={saveEdit}
              openModal={openModal}
              notices={notices}
              isOpenModal={isOpenModal}
              size={size}
              page={page}
              totalElements={totalElements}
              totalPages={totalPages}
              notice={notice}
            />
            : <CabinetCompanent
              lang={lang}
              changePage={changePage}
              notices={notices}
              size={size}
              page={page}
              totalElements={totalElements}
              totalPages={totalPages}
              notice={notice}
            />
          }
        </DashboardLayout>
      </div>
    );
  }
}

Cabinet.propTypes = {};

export default Cabinet;
