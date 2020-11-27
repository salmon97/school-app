import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {connect} from "dva";
import {Button, Modal, ModalBody, ModalFooter, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {API_PREFIX} from "../../contants/contants";
import {RiDeleteBin5Line} from "react-icons/all";
import swal from "sweetalert";
import OurPaginations from "../../components/OurPaginations";
import option from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/option";
import {toast} from "react-toastify";
import button from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/button";


@connect(({globalModel, homeworkModel}) => ({globalModel, homeworkModel}))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'homeworkModel/getSubjectByGroup'
    });
    this.props.dispatch({
      type: 'homeworkModel/getTodayHomeWork'
    });
  }

  state = {
    text: ''
  };

  render() {
    const {globalModel, homeworkModel, dispatch} = this.props;
    const {subjects, today, fileId, homeWorks, subjectId, date, totalPages, totalElements, isOpenModal, comments, sizeComment, todayHomework} = homeworkModel;
    const {currentUser, isStudent, lang} = globalModel;
    const stateValue = (e) => {
      this.setState({text: e.target.value})
    };

    const openModel = () => {
      let date = new Date();
      // console.log(s.toISOString().split('T')[0]);
      // console.log(s.getHours());
      if (homeWorks.registerAt === date.toISOString().split('T')[0] && homeWorks.deadline >= date.getHours()) {
        dispatch({
          type: 'homeworkModel/updateState',
          payload: {isOpenModal: !isOpenModal}
        })
      } else {
        toast.error("deadline finish")
      }
    };

    const getHomeWork = (e, v) => {
      // console.log(v);
      dispatch({
        type: 'homeworkModel/getMyHomeWork',
        payload: {...v, page: 0}
      });
      dispatch({
        type: 'homeworkModel/updateState',
        payload: {subjectId: v.subjectId, date: v.date}
      })
    };

    const downloadFile = (id) => {
      let file = document.createElement("a");
      file.href = `${API_PREFIX}file/getFile/${id}`;
      document.body.appendChild(file);
      file.target = "_blank";
      file.click();
    };


    const changePage = (page) => {
      dispatch({
        type: 'homeworkModel/getMyHomeWork',
        payload: {
          subjectId, date,
          page: page - 1,
          size: 1
        }
      });
    };

    const upLoadFile = (e) => {
      dispatch({
        type: 'homeworkModel/upLoadFile',
        payload: {
          file: e.target.files[0]
        }
      })
    };

    const deleteFile = (id) => {
      swal({
        title: "are you sure delete?",
        buttons: ["no", "yes"],
      }).then((willDelete) => {
        if (willDelete) {
          dispatch({
            type: 'homeworkModel/deleteAnswerFile',
            payload: {id}
          })
        }
      });
    };

    const saveHomeWork = (e, v) => {
      dispatch({
        type: 'homeworkModel/addAnswerHomeWork',
        payload: {
          ...v,
          fileId,
          homeWorkId: homeWorks.homeWorkId
        }
      })
    };

    const sendComment = () => {
      if (this.state.text !== '') {
        dispatch({
          type: 'homeworkModel/addComment',
          payload: {text: this.state.text, homeWorkId: homeWorks.homeWorkId}
        });
        this.setState({text: ''})
      }
    };

    const showMore = () => {
      dispatch({
        type: 'homeworkModel/getComments',
        payload: {size: sizeComment + 20, homeWorkId: homeWorks.homeWorkId}
      })
    };

    const getHomeWorkId = (homeWorkId) => {
      dispatch({
        type: 'homeworkModel/getTodayHomeWorkId',
        payload: {homeWorkId}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <AvForm onValidSubmit={getHomeWork}>
                  <div className="row">
                    <div className="col-md-3 offset-2">
                      <AvField type="select" name="subjectId" required>
                        <option value="" disabled>select weekday</option>
                        {subjects.map(item =>
                          <option key={item.id} value={item.id}>{lang === 'uz' ? item.nameUz : lang === 'ru' ? item.nameRu : item.nameEng}</option>
                        )}
                      </AvField>
                    </div>
                    <div className="col-md-3">
                      <AvField type="date" name="date"/>
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-primary">{lang === 'uz' ? ' qidirmoq' : lang === 'ru' ? ' поиск' : ' search'}</button>
                    </div>
                  </div>
                </AvForm>
              </div>
            </div>

            <div className={!today ? 'd-none' : ' row'}>
              <div className="col-md-12 d-flex">
                {todayHomework.map((item, i) =>
                  <div key={i} className="card bg-success text-center ml-2">
                    <div className="card-header">
                      <p>{lang === 'uz' ? ' muddati' : lang === 'ru' ? ' срок' : ' deadline'} {item.registerAt + ' '}{item.deadline + ":00"}</p>
                    </div>
                    <div className="card-body ">
                      <h6 className="card-text" onClick={() => getHomeWorkId(item.homeWorkId)}>{lang === 'uz' ? item.subNameUz : lang === 'ru' ? item.subNameRu : item.subNameEng}</h6>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={today ? 'd-none' : ' row'}>
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>{lang === 'uz' ? ' fayl' : lang === 'ru' ? ' файл' : ' file'}</th>
                    <th>{homeWorks.resAnswerHomeWork != null ? homeWorks.resAnswerHomeWork.registerAt : ''}</th>
                    <th>
                      <button className={isStudent ? 'btn btn-primary' : 'd-none'} onClick={openModel}>{lang === 'uz' ? ' javob' : lang === 'ru' ? ' ответ' : ' answer'}</button>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {/*{console.log(homeWorks, 7777)}*/}
                  {homeWorks.resAnswerHomeWork ? homeWorks.resAnswerHomeWork.resFileHomeWorks.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{width: '50px'}}>
                          <img onClick={() => downloadFile(item.fileId)} className="img-fluid"
                               src={API_PREFIX + "file/getFile/" + item.fileId} alt=""/>
                        </div>
                      </td>
                      <td>{item.text}</td>
                      <td className={isStudent ? '' : 'd-none'}><RiDeleteBin5Line onClick={() => deleteFile(item.id)}/>
                      </td>
                    </tr>
                  ) : ''}
                  <tr className="text-center">
                    <th colSpan="3">{homeWorks.resAnswerHomeWork != null ?
                      <h5>{lang === 'uz' ? 'baho' : lang === 'ru' ? 'оценка' : 'rate'}{homeWorks.resAnswerHomeWork.rate}</h5> : ''}</th>
                  </tr>

                  <tr className="text-center bg-danger">
                    <th colSpan="4">
                      {lang === 'uz' ? ' tekshirilgan fayl uy ishi' : lang === 'ru' ? ' проверил файл домашней работы' : ' checked file home work'}</th>
                  </tr>
                  {/*{console.log(homeWorks)}*/}
                  {homeWorks.resAnswerHomeWork ? homeWorks.resAnswerHomeWork.checkedFileHomeWorks.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{width: '50px'}}>
                          <img onClick={() => downloadFile(item.fileId)} className="img-fluid"
                               src={API_PREFIX + "file/getFile/" + item.fileId} alt=""/>
                        </div>
                      </td>
                      <td>{item.text}</td>
                      {/*<td><RiDeleteBin5Line onClick={() => deleteFile(item.id)}/></td>*/}
                    </tr>
                  ) : ''}

                  <tr className="bg-dark text-light">
                    <th>№</th>
                    <th>{lang === 'uz' ? ' fayl' : lang === 'ru' ? ' файл' : ' file'}</th>
                    <th><span>{lang === 'uz' ? ' muddat ' : lang === 'ru' ? ' срок ' : ' deadline '}</span>
                      {homeWorks.registerAt + ' ' + homeWorks.deadline + ":00"}</th>
                    <th>{lang === 'uz' ? ' asosiy uy vazifasi' : lang === 'ru' ? ' основное домашнее задание' : ' main homework'}</th>
                  </tr>
                  {homeWorks.resFileHomeWorks.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{width: '50px'}}>
                          <img onClick={() => downloadFile(item.fileId)} className="img-fluid"
                               src={API_PREFIX + "file/getFile/" + item.fileId} alt=""/>
                        </div>
                      </td>
                      <td>{item.text}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>

              </div>
            </div>
            <div className={today ? 'd-none' : ' row'}>
              <div className="col-md-12">
                <button className="btn btn-danger pb-4" onClick={showMore}
                        style={{width: '98%', height: '25px'}}>
                  {lang === 'uz' ? ' ko\'pro ko\'rsatish'  : lang === 'ru' ? ' показать больше' : ' show more'}
                </button>
                <div className="comment pl-3">
                  {comments.reverse().map((item, i) =>
                    <div key={i}>
                      <span>{item.username}</span>
                      <h6>{item.text}</h6>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <input name="comment" style={{width: '85%'}} className="rounded" value={this.state.text}
                       onChange={stateValue} placeholder="enter comment..."/>
                <button className="btn btn-primary ml-1" onClick={sendComment}>{lang === 'uz' ? ' jo\'natish' : lang === 'ru' ? ' Отправить' : ' send'}</button>
              </div>

            </div>
            <div className={today ? 'd-none' : ' row'}>
              <div className="col-md-12">
                <OurPaginations
                  activePage={0}
                  totalElements={totalElements}
                  size={1}
                  showPageCount={totalPages < 5 ? totalPages : 5}
                  changePage={changePage}
                />
              </div>
            </div>
          </div>
        </DashboardLayout>
        <Modal className="ModalRate" isOpen={isOpenModal} toggle={openModel}>
          <AvForm onValidSubmit={saveHomeWork}>
            <ModalBody className="text-center">
              <AvField name="fileId" label="file home work" type="file" onChange={upLoadFile}/>
              <AvField name="text" type="text" required/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModel}>Close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
