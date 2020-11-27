import {rateTeacherAdd, rateTeacherGet} from "../service";

export default ({
  namespace: 'rateTeacherModel',
  state: {
    ratesTeacher: [],
    page: 0,
    size: 10,
    totalElements: '',
    totalPages: ''
  },
  subscriptions: {},
  effects: {
    * rateTeacherGet({payload}, {call, put, select}) {
      let res = yield call(rateTeacherGet, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            ratesTeacher: res.object,
            page: res.page,
            size: res.size,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        })
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
