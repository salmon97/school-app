import {OPEN_PAGES, OPEN_PAGES2, TOKEN_NAME} from "../contants/contants";
import router from "umi/router";
import {toast} from "react-toastify";
import {
  addSubject,
  deleteSubject,
  getCalculate,
  getCalculateByDate,
  getCalculateForSt,
  getSubjects,
  getTeacher,
  getTimeTable,
  getWeeks,
  login,
  rateTeacherAdd,
  rateTeacherGet,
  resDiary,
  resDiaryStudent,
  savePhotoStudent,
  uploadFile,
  userMe
} from "../pages/service";

export default ({
  namespace: 'globalModel',
  state: {
    todayInLesson: false,
    currentUser: '',
    isAdmin: false,
    isTeacher: false,
    isStudent: false,
    isDirector: false,
    isParent: false,
    studentCount: 0,
    groupsCount: 0,
    isOpenModal: false,
    allSubjects: [],
    subject: '',
    isMenu: true,
    teachers: [],
    timeTables: [],
    weeks: [],
    resDiary: [],
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
    studentId: '',
    calculateRate: [],
    lang: 'uz',
    fileId: '',
    isOpenUploadPhoto: '',
    teacherId: '',
    ratesTeacher: []
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen((location) => {
        if (!OPEN_PAGES.includes(location.pathname)) {
          dispatch({
            type: 'userMe',
            payload: {
              pathname: location.pathname
            }
          })
        }
      })
    }
  },
  effects: {
    * userMe({payload}, {call, put}) {
      const res = yield call(userMe);
      if (!res.success) {
        console.log(payload.pathname);
        console.log(payload.pathname.split('/'));
        console.log(OPEN_PAGES2.includes(`/${payload.pathname.split('/')[1]}`));
        if (!OPEN_PAGES2.includes(payload.pathname)
          && !OPEN_PAGES2.includes('/' + payload.pathname.split('/')[1])) {
          localStorage.removeItem(TOKEN_NAME);
          router.push('/auth/login')
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            currentUser: res,
            isAdmin: !!res.roles.filter(item => item.roleName === 'ROLE_ADMIN').length,
            isTeacher: !!res.roles.filter(item => item.roleName === 'ROLE_TEACHER').length,
            isStudent: !!res.roles.filter(item => item.roleName === 'ROLE_STUDENT').length,
            isDirector: !!res.roles.filter(item => item.roleName === 'ROLE_DIRECTOR').length,
            isParent: !!res.roles.filter(item => item.roleName === 'ROLE_PARENT').length,
          }
        })
      }
    },
    * login({payload}, {call, put}) {
      const res = yield call(login, payload);
      if (res.success) {
        localStorage.setItem(TOKEN_NAME, res.tokenType + res.token);
        router.push('/cabinet');
        // window.location.reload();
      } else {
        toast.error("неверный логин или парол");
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getWeeks({}, {call, put}) {
      let res = yield call(getWeeks);

      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {weeks: res._embedded.list}
        })
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getSubjects({}, {call, put}) {
      const res = yield call(getSubjects);
      if (res.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {allSubjects: res.object}
        })
      }
    },
    * addSubject({payload}, {call, put}) {
      const res = yield call(addSubject, payload);
      // console.log(res);
      if (res.statusCode === 200) {
        yield put({
          type: 'getSubjects',
          // payload: {
          //   allSubjects: res.object
          // }
        })
      }
    },
    * deleteSubject({payload}, {call, put}) {
      const res = yield call(deleteSubject, payload);
      if (res.success) {
        yield put({
          type: 'getSubjects',
        })
      }
    },
    * getTimeTables({payload}, {call, put}) {
      let res = yield call(getTimeTable, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            timeTables: res.object
          }
        });
        router.push("/timetable")
      }
    },
    * getTeacher({}, {call, put}) {
      let res = yield call(getTeacher);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {teachers: res.object}
        })
      }
    },
    * resDiary({payload}, {call, put}) {
      let res = yield call(resDiary, payload);
      // console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            resDiary: res.object,
            size: res.size,
            page: res.page,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        });
        router.push("/student")
      }
    },
    * resDiaryStudent({payload}, {call, put, select}) {
      if (!payload) {
        const {page, size} = yield select(_ => _.globalModel);
        payload = {page, size}
      }
      let res = yield call(resDiaryStudent, payload);
      // console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            resDiary: res.object,
            size: res.size,
            page: res.page,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        });
      }
    },
    * getCalculate({payload}, {call, put}) {
      let res = yield call(getCalculate, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {calculateRate: res.object}
        });
        router.push("/calculate")
      }
    },
    * getCalculateByDate({payload}, {call, put}) {
      let res = yield call(getCalculateByDate, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {calculateRate: res.object}
        })
      }
    },
    * getCalculateForSt({}, {call, put}) {
      let res = yield call(getCalculateForSt);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            studentId: res.message,
            calculateRate: res.object
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
    * saveHomePhotoStudent({payload}, {call, put}) {
      let res = yield call(savePhotoStudent, payload);
      if (res.success) {

      }
    },
    * rateTeacherAdd({payload}, {call, put, select}) {
      const lang = yield select(_ => _.globalModel.lang);
      let res = yield call(rateTeacherAdd, payload);
      if (res.success) {
      } else {
        // eslint-disable-next-line default-case
        switch (lang) {
          case 'uz':
            toast.error("oyiga atigi bir marta baho berishingiz mumkin");
            break;
          case 'ru':
            toast.error("только раз в месяц вы можете оценить");
            break;
          case 'eng':
            toast.error("only once a month you can rate");
            break
        }
      }
    },
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
        });
        router.push("rateteacher");
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
});
