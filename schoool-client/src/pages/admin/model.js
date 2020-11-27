import {deleteTeacher, deleteUser, editAdmin, editTeacher, getAdmin, getTeacher, register} from "../service";
import {toast} from "react-toastify";

export default ({
  namespace: 'adminModel',
  state: {
    admins: [],
    admin: {},
    isOpenModal: false,
  },
  subscriptions: {},
  effects: {
    * getAdmin({}, {call, put}) {
      let res = yield call(getAdmin);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {admins: res.object}
        })
      }
    },
    * saveAdmin({payload}, {call, put}) {
      let res = yield call(register, payload);
      if (res.success) {
        yield put({
          type: 'getAdmin'
        });
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      }else {
        toast.error(res.message)
      }
    },
    * editAdmin({payload}, {call, put}) {
      let res = yield call(editAdmin, payload);
      if (res.success) {
        yield put({
          type: 'getAdmin'
        });
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      }else {
        toast.error(res.message)
      }
    },
    * deleteAdmin({payload}, {call, put}) {
      let res = yield call(deleteUser, payload);
      if (res.success) {
        yield put({
          type: 'getAdmin'
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
