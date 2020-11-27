import {
  addAnswerHomeWork,
  addComment,
  deleteAnswerFile,
  getComment,
  getMyHomeWork,
  getSubjectByGroup,
  getTodayHomeWork,
  getTodayHomeWorkId,
  uploadFile
} from "../service";
import {toast} from "react-toastify";

export default ({
  namespace: 'homeworkModel',
  state: {
    isOpenModal: false,
    subjects: [],
    todayHomework: [],
    today: false,
    homeWorks: {
      deadline: '',
      resFileHomeWorks: [],
      registerAt: '',
      resAnswerHomeWork: {registerAt: '', resFileHomeWorks: [], checkedFileHomeWorks: []}
    },
    page: 0,
    totalElements: 0,
    totalPages: 0,
    subjectId: '',
    date: '',
    fileId: '',
    comments: [],
    sizeComment: 20
  },
  subscriptions: {},
  effects: {
    * getComments({payload}, {call, put}) {
      let res = yield call(getComment, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {comments: res.object, sizeComment: res.size}
        });
      }
    },
    * addComment({payload}, {call, put}) {
      let res = yield call(addComment, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {comments: res.object, sizeComment: res.size}
        });
      }
    },
    * getSubjectByGroup({}, {call, put}) {
      let res = yield call(getSubjectByGroup);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {subjects: res.object}
        });
      }
    },
    * getMyHomeWork({payload}, {call, put}) {
      let res = yield call(getMyHomeWork, payload);
      // let {} = yield select(_ => _.homeworkModel);
      // console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            homeWorks: res.object.length == 0 ? {
              resFileHomeWorks: [],
              registerAt: '',
              resAnswerHomeWork: {registerAt: '', resFileHomeWorks: [], checkedFileHomeWorks: []}
            } : res.object[0],
            page: res.page,
            totalElements: res.totalElements,
            totalPages: res.totalPages,
            comments: res.object.length != 0 ? res.object[0].resComments : [],
            today: false
          }
        })
      }
    },
    * upLoadFile({payload}, {call, put}) {
      const res = yield call(uploadFile, payload);
      // console.log(res);
      if (res.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            fileId: res.data.message
          }
        })
      }
    },
    * addAnswerHomeWork({payload}, {call, put, select}) {
      const res = yield call(addAnswerHomeWork, payload);
      let homeWoks = yield select(_ => _.homeworkModel.homeWorks);
      // console.log(res);
      if (res.success) {
        // console.log(homeWoks);
        homeWoks.resAnswerHomeWork = res.object;
        yield put({
          type: 'updateState',
          payload: {isOpenModal: false}
        })
      } else {
        toast.error(res.message);
        // toast.error("ss");
      }
    },
    * deleteAnswerFile({payload}, {call, put, select}) {
      let homeWoks = yield select(_ => _.homeworkModel.homeWorks);
      let res = yield call(deleteAnswerFile, payload);
      if (res.success) {
        homeWoks.resAnswerHomeWork.resFileHomeWorks.splice(homeWoks.resAnswerHomeWork.resFileHomeWorks.findIndex(value => value.id.toString() === res.message.toString()), 1)
        yield put({
          type: 'updateState',
          payload: {homeWoks: homeWoks}
        })
      }
    },
    * getTodayHomeWork({}, {call, put}) {
      let res = yield call(getTodayHomeWork);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {todayHomework: res.object, today: true}
        });
      }
    },
    * getTodayHomeWorkId({payload}, {call, put}) {
      let res = yield call(getTodayHomeWorkId, payload);
      console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {homeWorks: res.object, today: false, comments: res.object.resComments}
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
