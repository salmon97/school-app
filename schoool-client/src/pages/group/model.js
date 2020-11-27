import {
  addTimeTable,
  deleteGroup,
  deleteStudent,
  deleteTimeTable,
  getGroup,
  getGroups,
  getGroupsStudent,
  getTimeTables,
  saveGroup,
  saveStudentEdit
} from "../service";
import {router} from "umi";
import {toast} from "react-toastify";

export default ({
  namespace: 'groupModel',
  state: {
    isOpenModal: false,
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    groups: [],
    teachers: [],
    group: {},
    timeTables: [],
    students: [],
    student: {},
    groupId: '',
    timeTable: {startHour: '', endHour: ''},
  },
  subscriptions: {},
  effects: {
    * getGroupAll({payload}, {call, put, select}) {
      if (!payload) {
        let page = yield select(_ => _.groupModel.page);
        let size = yield select(_ => _.groupModel.size);
        payload = {page, size}
      }
      let res = yield call(getGroup, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            groups: res.object,
            page: res.page,
            size: res.size,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        })
      }
    },
    * getGroups({}, {call, put}) {
      let res = yield call(getGroups);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            groups: res.object
          }
        })
      }
    },
    * saveGroup({payload}, {call, put, select}) {
      let res = yield call(saveGroup, payload);
      if (res.success) {
        yield put({
          type: 'getGroupAll',
        });
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      }
    },
    * deleteGroup({payload}, {call, put}) {
      let res = yield call(deleteGroup, payload);
      if (res.success) {
        if (res.success) {
          yield put({
            type: 'getGroupAll',
          });
        }
      }
    },
    * getGroupsStudent({payload}, {call, put}) {
      let res = yield call(getGroupsStudent, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {students: res.object}
        })
      }
    },
    * saveStudent({payload}, {call, put, select}) {
      let groupId = yield select(_ => _.groupModel.groupId);
      let res = yield call(saveStudentEdit, payload);
      if (res.success) {
        yield put({
          type: 'getGroupsStudent',
          payload: {groupId}
        });
        router.push("/group/ingroup")
      } else {
        toast.error(res.message);
      }
    },
    * deleteStudent({payload}, {call, put, select}) {
      let groupId = yield select(_ => _.groupModel.groupId);
      let res = yield call(deleteStudent, payload);
      if (res.success) {
        yield put({
          type: 'getGroupsStudent',
          payload: {groupId}
        });
        // router.push("/group/ingroup")
      }
    },
    * addTimeTable({payload}, {call, put, select}) {
      let groupId = yield select(_ => _.groupModel.groupId);
      let res = yield call(addTimeTable, payload);
      if (res.success) {
        yield put({
          type: 'getTimeTablesByGroup',
          payload: {groupId}
        });
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      } else {
        toast.error(res.message);
      }
    },
    * getTimeTablesByGroup({payload}, {call, put, select}) {
      let groupId = yield select(_ => _.groupModel.groupId);
      payload = {groupId};
      let res = yield call(getTimeTables, payload);
      // console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            timeTables: res.object
          }
        });
      }
    },
    * deleteTimeTable({payload}, {call, put, select}) {
      let groupId = yield select(_ => _.groupModel.groupId);
      let res = yield call(deleteTimeTable, payload);
      if (res.success) {
        yield put({
          type: 'getTimeTablesByGroup',
          payload: {groupId}
        });
      }
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})
