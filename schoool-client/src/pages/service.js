import axios from "axios";
import {API_PREFIX} from "../contants/contants";
import request from "./utils";


export function uploadFile(data) {
  let obj = new FormData();
  obj.append("file", data.file);
  return axios.post(API_PREFIX + 'file/upload', obj)
    .then(res => {
      return res;
    }).catch(err => err)
}

export function register(data) {
  return request({
    url: 'auth/register',
    method: 'post',
    data
  })
}

export function counts() {
  return request({
    url: `cabinet/counts`
  })
}

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function userMe() {
  return request({
    url: 'auth/userMe'
  })
}

export function getSubjects() {
  return request({
    url: 'subject/get'
  })
}

export function addSubject(data) {
  return request({
    url: 'subject/addEdit',
    method: 'post',
    data
  })
}

export function deleteSubject(data) {
  return request({
    url: 'subject/delete/' + data,
    method: 'delete'
  })
}

export function getWeeks() {
  return request({
    url: 'weekdays'
  })
}


export function getUsers(data) {
  return request({
    url: `auth/users/?roleName=${data.roleName}`
  })
}

export function deleteUser(data) {
  return request({
    url: `auth/delete/${data.id}`,
    method: 'delete'
  })
}

export function getTimeTable(data) {
  return request({
    url: `timeTable/getByGroup/${data.groupId}`
  })
}

//groups student
export function getStudentByGr(data) {
  return request({
    url: `student/getStudentByGr/${data.timeTableId}`
  })
}

export function makeAttend(data) {
  return request({
    url: `attendance/add`,
    method: 'post',
    data
  })
}

export function makeRate(data) {
  return request({
    url: `attendance/rate`,
    method: 'post',
    data
  })
}

export function saveHomeWork(data) {
  return request({
    url: `homeWork/add`,
    method: 'post',
    data
  })
}

export function getHomeWork(data) {
  return request({
    url: `homeWork/all/${data.timeTableId}?page=${data.page}&size=${data.sizeHomeWork}`
  })
}

export function deleteFile(data) {
  return request({
    url: `homeWork/deleteFile/${data.id}`,
    method: 'delete'
  })
}

export function addFileHomeW(data) {
  return request({
    url: `homeWork/add/file`,
    method: 'post',
    data
  })
}

//teacher
export function getTeacher() {
  return request({
    url: `teacher/get`,
  })
}

export function editTeacher(data) {
  return request({
    url: 'teacher/edit',
    method: 'put',
    data
  })
}

export function deleteTeacher(data) {
  return request({
    url: 'teacher/delete/' + data.id,
    method: 'delete'
  })
}

//admin
export function getAdmin() {
  return request({
    url: `auth/admins`,
  })
}

export function deleteAdmin(data) {
  return request({
    url: 'auth/delete/' + data.id,
    method: 'delete'
  })
}

export function editAdmin(data) {
  return request({
    url: 'auth/edit',
    method: 'put',
    data
  })
}

//groups
export function saveGroup(data) {
  return request({
    url: 'group/addEdit',
    method: 'post',
    data
  })
}

export function deleteGroup(data) {
  return request({
    url: 'group/delete/' + data.id,
    method: 'delete',
  })
}

//for admin,director
export function getGroup(data) {
  return request({
    url: `group/all/?page=${data.page}&size=${data.size}`
  })
}

//for teacher
export function getGroups() {
  return request({
    url: `group/getGroups`
  })
}

export function getGroupsStudent(data) {
  return request({
    url: `student/getStudentByGroup/${data.groupId}`
  })
}

//student
export function saveStudentEdit(data) {
  return request({
    url: `student/add`,
    method: 'post',
    data
  })
}

export function deleteStudent(data) {
  return request({
    url: `student/delete/${data.id}`,
    method: 'delete'
  })
}

//timetable
export function addTimeTable(data) {
  return request({
    url: `timeTable/add`,
    method: 'post',
    data
  })
}

//for Admin
export function getTimeTables(data) {
  return request({
    url: `timeTable/getTimeTable/${data.groupId}`
  })
}

//for student
export function getTimeTableForStudent() {
  return request({
    url: `timeTable/get`
  })
}

export function deleteTimeTable(data) {
  return request({
    url: `timeTable/delete/${data.id}`,
    method: 'delete'
  })
}

//for Student
export function getSubjectByGroup() {
  return request({
    url: `subject/getGroup`
  })
}

//forStudent getHomeWorks
export function getMyHomeWork(data) {
  return request({
    url: `homeWork/getmyhomework/?page=${data.page}&subjectId=${data.subjectId}&date=${data.date}`
  })
}

//for Student
export function addAnswerHomeWork(data) {
  return request({
    url: `answer/add`,
    method: 'post',
    data
  })
}

//for student
export function deleteAnswerFile(data) {
  return request({
    url: `answer/deleteFile/${data.id}`,
    method: 'delete',
  })
}

//for teacher
export function deleteAnswerFileCheck(data) {
  return request({
    url: `answer/deleteFileCheck/${data.id}`,
    method: 'delete',
  })
}

//for teacher
export function resAnswerHomework(data) {
  return request({
    url: `answer/check/${data.id}`
  })
}

//for teacher
export function addCheckAnswer(data) {
  return request({
    url: `answer/addCheckFile`,
    method: 'post',
    data
  })
}

//for student
export function studentTeaAndSub() {
  return request({
    url: `student/getTeacher`
  })
}

//for message
export function sentMessage(data) {
  return request({
    url: `message/sent`,
    method: 'post',
    data
  })
}

//for getMsg
export function getMessage(data) {
  return request({
    url: `message/get/?size=${data.size}&sentToId=${data.sentToId}`
  })
}

//for teacher
export function getNoRead() {
  return request({
    url: `message/getNoRead`
  })
}

export function addComment(data) {
  return request({
    url: `homeWork/comment/add`,
    method: 'post',
    data
  })
}

export function getComment(data) {
  return request({
    url: `homeWork/comment/get/?size=${data.size}&homeWorkId=${data.homeWorkId}`
  })
}

//answer home work rate
export function answerHomeWorRate(data) {
  return request({
    url: 'answer/rate/?answerId=' + data.answerId + '&rate=' + data.rate
  })
}

//res diary
export function resDiary(data) {
  return request({
    url: 'attendance/resDiary/' + data.studentId + '/?page=' + data.page + '&size=' + data.size
  })
}

//res diary for student and parent
export function resDiaryStudent(data) {
  return request({
    url: 'attendance/resDiarySt/?page=' + data.page + '&size=' + data.size
  })
}

//calculate rate all
export function getCalculate(data) {
  return request({
    url: 'attendance/calculate/?studentId=' + data.studentId
  })
}

// by date
export function getCalculateByDate(data) {
  return request({
    url: 'attendance/calculate/date/?studentId=' + data.studentId + '&from=' + data.from + '&to=' + data.to
  })
}

// calculate for st
export function getCalculateForSt() {
  return request({
    url: 'attendance/calculateforst'
  })
}

// get today home work
export function getTodayHomeWork() {
  return request({
    url: 'homeWork/homeWorkToday'
  })
}

// get today home work id
export function getTodayHomeWorkId(data) {
  return request({
    url: 'homeWork/getmyhomeworkId/?homeWorkId=' + data.homeWorkId,
  })
}

// savePhoto
export function savePhotoStudent(data) {
  return request({
    url: 'student/savePhoto/?fileId=' + data.fileId,
    method: 'post'
  })
}

// save post
export function savePost(data) {
  return request({
    url: `poster`,
    method: 'post',
    data
  })
}

// get post
export function getPost(data) {
  return request({
    url: `poster/?page=${data.page}&size=${data.size}`
  })
}

// delete post
export function deletePost(data) {
  return request({
    url: `poster/delete/${data.id}`,
    method: 'delete'
  })
}

// teacher rate add
export function rateTeacherAdd(data) {
  return request({
    url: `rateTeacher`,
    method: 'post',
    data
  })
}

// teacher rate get
export function rateTeacherGet(data) {
  return request({
    url: `rateTeacher/get/${data.teacherId}/?page=${data.page}&size=${data.size}`
  })
}
