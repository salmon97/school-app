import {deleteTeacher, editTeacher, getTeacher, register} from "../service";
import {toast} from "react-toastify";

export default ({
  namespace: 'teacherModel',
  state: {
    teachers: [],
    teacher: {},
    isOpenModal: false,
  },
  subscriptions: {},
  effects: {
    * getTeacher({}, {call, put}) {
      let res = yield call(getTeacher);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {teachers: res.object}
        })
      }
    },
    * saveTeacher({payload}, {call, put}) {
      let res = yield call(register, payload);
      if (res.success) {
        yield put({
          type: 'getTeacher'
        });
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      }else {
        toast.error(res.message)
      }
    },
    * editTeacher({payload}, {call, put}) {
      let res = yield call(editTeacher, payload);
      if (res.success) {
        yield put({
          type: 'getTeacher'
        });
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      }else {
        toast.error(res.message)
      }
    },
    * deleteTeacher({payload}, {call, put}) {
      let res = yield call(deleteTeacher, payload);
      if (res.success) {
        yield put({
          type: 'getTeacher'
        })
      }
    }
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
