import React, {Component} from 'react';
import {connect} from "dva";
import TeacherGroups from "../../components/TeacherGroups";
import DashboardLayout from "../../components/DashboardLayout";
import StudentGroup from "../../components/StudentCibinet";
import AdminGroup from "../../components/AdminGroup";
import swal from "sweetalert";
import {router} from "umi";

@connect(({globalModel, groupModel}) => ({globalModel, groupModel}))
class Group extends Component {

  componentDidMount() {
    if (this.props.globalModel.isStudent || this.props.globalModel.isTeacher) {
      this.props.dispatch({
        type: 'groupModel/getGroups'
      })
    } else {
      this.props.dispatch({
        type: 'groupModel/getGroupAll'
      })
    }
  }

  render() {

    const {dispatch, globalModel, groupModel} = this.props;
    const {isAdmin, isDirector, isStudent, isTeacher, lang} = globalModel;
    const {groups, teachers, isOpenModal, group, size, page, totalPages, totalElements, timeTables} = groupModel;

    const saveGroup = (e, v) => {
      dispatch({
        type: 'groupModel/saveGroup',
        payload: {...v}
      })
    };

    const openModal = (item) => {
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          isOpenModal: !isOpenModal,
          group: item
        }
      })
    };

    //get student by time table
    const intoGroup = (groupId) => {
      dispatch({
        type: 'globalModel/getTimeTables',
        payload: {groupId}
      });
    };

    const getGroupsStudent = (groupId) => {
      dispatch({
        type: 'groupModel/getGroupsStudent',
        payload: {groupId}
      });
      dispatch({
        type: 'groupModel/updateState',
        payload: {groupId}
      });
      router.push("/group/ingroup");
    };

    const changePage = (page) => {
      dispatch({
        type: 'groupModel/getGroupAll',
        payload: {
          page: page - 1,
          size: 10
        }
      });
    };

    const deleteGroup = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'groupModel/deleteGroup',
            payload: {id}
          })
        }
      });
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          {isAdmin || isDirector ?
            <AdminGroup
              lang={lang}
              getGroupsStudent={getGroupsStudent}
              deleteGroup={deleteGroup}
              group={group}
              totalPages={totalPages}
              totalElements={totalElements}
              isOpenModel={isOpenModal}
              openModal={openModal}
              groups={groups}
              saveGroup={saveGroup}
              teachers={teachers}
              size={size}
              changePage={changePage}
            /> :
            isTeacher ? <TeacherGroups
                lang={lang}
                intoGroup={intoGroup}
                groups={groups}
              /> :
              isStudent ? <StudentGroup/>
                : ''}
        </DashboardLayout>
      </div>
    );
  }
}

Group.propTypes = {};
export default Group;
