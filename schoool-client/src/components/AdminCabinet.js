import React, {Component} from 'react';
import {AiOutlineFileText, BsFillPeopleFill, GrEdit, RiDeleteBin5Line} from "react-icons/all";
import {connect} from "dva";
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import OurPaginations from "./OurPaginations";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@connect(({globalModel}) => ({globalModel}))
class AdminCabinet extends Component {

  state = {
    text: ''
  };

  render() {
    const {
      changePage,
      deletePoster,
      studentCount, groupCount, teacherCount, size, page, totalElements, totalPages, notices, notice, isOpenModal, openModal, saveEdit
    } = this.props;

    const {lang} = this.props.globalModel;


    return (

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 ml-4 ">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span
                  className="font-weight-bold"> {lang === 'uz' ? ' o\'quvchilar ' : lang === 'ru' ? ' ученики' : ' students'}</span>
                <div className="d-flex justify-content-around mt-2 ">
                  <BsFillPeopleFill className="iconDashboard"/>
                  <h2 className="font-weight-bold">{studentCount}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span
                  className="font-weight-bold">{lang === 'uz' ? ' gruxlar' : lang === 'ru' ? ' группы' : ' groups'}</span>
                <div className="d-flex justify-content-around mt-2">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{groupCount}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span
                  className="font-weight-bold">{lang === 'uz' ? ' o\'qituvchilar' : lang === 'ru' ? ' учителя' : ' teachers'}</span>
                <div className="d-flex justify-content-around mt-2">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{teacherCount}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-dark"
              onClick={() => openModal('')}>{lang === 'uz' ? 'e\'lon' : lang === 'ru' ? 'объявление' : 'notice'}</button>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-md-12 d-flex flex-wrap">
            {
              notices.map((item, i) =>
                <div key={i} className="card bg-success text-center d-flex justify-content-center mb-2 ml-2">
                  <div className="">
                    <span>{item.registerAt}</span>
                    <p>{item.title}</p>
                  </div>
                    <div dangerouslySetInnerHTML={{__html: item.text}} className="card-body card-notice"/>
                  <div>
                 <span className="mr-4">
                    <GrEdit onClick={() => openModal(item)}/>
                  </span>
                    <span>
                    <RiDeleteBin5Line onClick={() => deletePoster(item.id)}/>
                  </span>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className={notices.length > 0 ? 'row pt-3' : 'd-none'}>
          <div className="col-md-4 offset-1">
            <OurPaginations
              activePage={0}
              totalElements={totalElements}
              size={size}
              showPageCount={totalPages < 5 ? totalPages : 5}
              changePage={changePage}
            />
          </div>
        </div>
        <Modal isOpen={isOpenModal} toggle={openModal}>
          <AvForm onValidSubmit={saveEdit}>
            <ModalBody className="text-center">
              <AvField name="id" className="d-none" value={notice ? notice.id : ''}/>
              <AvField name="title" type="text" placeholder="enter title" value={notice ? notice.title : ''} required/>
              <AvField name="text" type="text" className="d-none" value={notice ? notice.text : this.state.text}/>
              <CKEditor
                editor={ClassicEditor}
                data={notice ? notice.text : ''}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  // console.log( 'Editor is ready to use!', editor );
                }}
                onChange={(event, editor) => {
                  let data = editor.getData();
                  // data = data.replace(/<[^>]+>/g, '');
                  this.setState({text: data});
                  // console.log(data, editor);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  // console.log( 'Blur.', editor );
                }}
                onFocus={(event, editor) => {
                  // console.log( 'Focus.', editor );
                }}
              />

            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={()=>openModal('')}>Close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

AdminCabinet.propTypes = {};

export default AdminCabinet;
