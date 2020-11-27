import {
  addCheckAnswer,
  addComment,
  addFileHomeW,
  answerHomeWorRate,
  deleteAnswerFileCheck,
  deleteFile,
  getComment,
  getHomeWork,
  getStudentByGr,
  getTimeTableForStudent,
  makeAttend,
  makeRate,
  resAnswerHomework,
  saveHomeWork,
  uploadFile
} from "../service";
import {router} from "umi";
import {toast} from "react-toastify";

export default ({
  namespace: 'timeTableModel',
  state: {
    isOpenModal: false,
    page: 0,
    size: 10,
    sizeHomeWork: 1,
    totalElements: 0,
    totalPages: 0,
    students: [{attendanceId: null}],
    timeTableId: '',
    student: {},
    fileId: '',
    isHomeOpenModal: false,
    homeWorks: {homeWorkId:'',resAnswerHomeWorks: [], resFileHomeWorks: [], registerAt: ''},
    timeTable: [],
    answerHomeWorks: {resFileHomeWorks: [], checkedFileHomeWorks: []},
    answerId: '',
    comments: [],
    sizeComment: 20,
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
    * addCheckAnswer({payload}, {call, put}) {
      let res = yield call(addCheckAnswer, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {answerHomeWorks: res.object, isOpenModal: false}
        });
      }
    },
    * getAnswerHomeWorks({payload}, {call, put}) {
      let res = yield call(resAnswerHomework, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {answerHomeWorks: res.object}
        });
        router.push("/timetable/check")
      }
    },
    * getTimeTableForStudent({payload}, {call, put}) {
      let res = yield call(getTimeTableForStudent);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {timeTable: res.object}
        })
      }
    },
    * getStudents({payload}, {call, put}) {
      let res = yield call(getStudentByGr, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            students: res.object
          }
        });
      }
    },
    * makeAttend({payload}, {call, put}) {
      let res = yield call(makeAttend, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            students: res.object
          }
        });
      }
    },
    * makeRate({payload}, {call, put}) {
      let res = yield call(makeRate, payload);
      if (res.success) {
        // console.log(res);
        yield put({
          type: 'updateState',
          payload: {
            isOpenModal: false
          }
        });
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
    * saveHomeWork({payload}, {call, put}) {
      let res = yield call(saveHomeWork, payload);
      // console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {isHomeOpenModal: false}
        })
      }
    },
    * getHomeWoks({payload}, {call, put, select}) {
      if (!payload) {
        let {page, sizeHomeWork, timeTableId} = yield select(_ => _.timeTableModel);
        payload = {page, sizeHomeWork, timeTableId}
      }
      let res = yield call(getHomeWork, payload);
      // console.log(res.object[0]);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            homeWorks: res.object.length === 0 ? {
              resAnswerHomeWorks: [],
              resFileHomeWorks: [],
              registerAt: ''
            } : res.object[0],
            page: res.page,
            sizeHomeWork: res.size,
            totalElements: res.totalElements,
            totalPages: res.totalPages,
            comments: res.object.length !== 0 ? res.object[0].resComments : [],
          }
        })
      }
    },
    * deleteFile({payload}, {call, put, select}) {
      let res = yield call(deleteFile, payload);
      let homeWorks = yield select(_ => _.timeTableModel.homeWorks);
      // console.log(res);
      if (res.success) {
        homeWorks.resFileHomeWorks.splice(homeWorks.resFileHomeWorks.findIndex(value => value.id.toString() === res.message.toString()), 1);
        yield put({
          type: 'updateState',
          payload: {homeWorks: homeWorks}
        })
      }
    },
    * addFileHomeW({payload}, {call, put, select}) {
      let res = yield call(addFileHomeW, payload);
      let homeWorks = yield select(_ => _.timeTableModel.homeWorks);
      // console.log(res);
      if (res.success) {
        homeWorks.resFileHomeWorks.push(res.object);
        yield put({
          type: 'updateState',
          payload: {homeWorks: homeWorks, isHomeOpenModal: false}
        })
      }
    },
    * deleteFileCheck({payload}, {call, put, select}) {
      let res = yield call(deleteAnswerFileCheck, payload);
      let answerHomeWorks = yield select(_ => _.timeTableModel.answerHomeWorks);
      // console.log(res);
      if (res.success) {
        answerHomeWorks.checkedFileHomeWorks.splice(answerHomeWorks.checkedFileHomeWorks.findIndex(value => value.id.toString() === res.message.toString()), 1);
        yield put({
          type: 'updateState',
          payload: {answerHomeWorks}
        })
      }
    },
    * answerHomeWorRate({payload}, {call, put, select}) {
      let answerHomeWorks = yield select(_ => _.timeTableModel.answerHomeWorks);
      let res = yield call(answerHomeWorRate, payload);
      if (res.success) {
        answerHomeWorks.rate = payload.rate;
        yield put({
          type: 'updateState',
          payload: {isHomeOpenModal: false, answerHomeWorks}
        });
        toast.success(res.message);
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
