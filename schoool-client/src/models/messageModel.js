import {getMessage, getNoRead, sentMessage, studentTeaAndSub} from "../pages/service";

export default ({
  namespace: 'messageModel',
  state: {
    teacherAndSubject: [],
    sentToId: '',
    size: 20,
    messages: [],
    messagesNoRead: [],
  },
  subscriptions: {},
  effects: {
    // eslint-disable-next-line no-empty-pattern
    * studentTeaAndSub({}, {call, put}) {
      let res = yield call(studentTeaAndSub);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {teacherAndSubject: res.object},
        })
      }
    },
    * sentMsg({payload}, {call, put}) {
      let res = yield call(sentMessage, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            messages: res.object,
            size: res.size
          }
        })
      }
    },
    * getMessage({payload}, {call, put, select}) {
      let {sentToId, size} = yield select(_ => _.messageModel);
      payload = {sentToId, size};
      let res = yield call(getMessage, payload);
      // console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            messages: res.object,
            size: res.size
          }
        })
      }
    },
    * getNoRead({}, {call, put}) {
      let res = yield call(getNoRead);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {messagesNoRead: res.object}
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
