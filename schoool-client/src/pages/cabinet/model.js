import {counts, deletePost, getPost, savePost} from "../service";

export default ({
  namespace: 'cabinetModel',
  state: {
    resCabinet: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    studentCount: 0,
    teacherCount: 0,
    groupCount: 0,
    notices: [],
    notice: {},
    isOpenModal: false
  },
  subscriptions: {},
  effects: {
    * counts({}, {call, put}) {
      let res = yield call(counts);

      if (res.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {groupCount: res[0], studentCount: res[1], teacherCount: res[2]}
        })
      }
    },
    * getPoster({payload}, {call, put, select}) {
      let {size, page} = yield select(_ => _.cabinetModel);
      if (!payload) {
        payload = {size, page}
      }
      let res = yield call(getPost, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            notices: res.object,
            size: res.size,
            page: res.page,
            totalPages: res.totalPages,
            totalElements: res.totalElements
          }
        })
      }
    },
    * addPoster({payload}, {call, put}) {
      let res = yield call(savePost, payload);
      if (res.success) {
        yield put({
          type: 'getPoster'
        })
      }
    },
    * deletePoster({payload}, {call, put}) {
      let res = yield call(deletePost, payload);
      if (res.success) {
        yield put({
          type: 'getPoster'
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
