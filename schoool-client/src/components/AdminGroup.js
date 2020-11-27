import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {GrEdit, RiDeleteBin5Line} from "react-icons/all";
import OurPaginations from "./OurPaginations";

class AdminGroup extends Component {

  render() {

    const {groups, group,lang, getGroupsStudent,saveGroup, deleteGroup, isOpenModel, openModal, size, totalPages, totalElements, changePage} = this.props;

    return (
      <div className="container ">
        <div className="row">
          <div className="col-md-6">
            <button className='btn-primary btn' onClick={() => openModal('')}>{lang === 'uz' ? ' grux qo\'shish' : lang === 'ru' ? ' Добавить группу' : ' add group'}</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Table>
              <thead>
              <tr>
                <th>№</th>
                <th colSpan="3">{lang === 'uz' ? ' grux' : lang === 'ru' ? ' группa' : ' group'}</th>
                <th colSpan="2">{lang === 'uz' ? ' harakat' : lang === 'ru' ? ' действие' : ' action'}</th>
              </tr>
              </thead>
              <tbody>
              {groups.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><h6 onClick={()=>getGroupsStudent(item.id)}>{item.nameUz}</h6></td>
                  <td>{item.nameRu}</td>
                  <td>{item.nameEng}</td>
                  <td>
                    <GrEdit onClick={() => openModal(item)}/>
                  </td>
                  <td>
                    <RiDeleteBin5Line onClick={() => deleteGroup(item.id)}/>
                  </td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
          <div className="col-md-12">
            <OurPaginations
              activePage={0}
              totalElements={totalElements}
              size={size}
              showPageCount={totalPages < 5 ? totalPages : 5}
              changePage={changePage}
            />
          </div>
        </div>
        <Modal isOpen={isOpenModel} toggle={openModal}>
          <AvForm onValidSubmit={saveGroup}>
            <ModalHeader>
              add group
            </ModalHeader>
            <ModalBody className="text-right">
              <AvField name="id" className="d-none" value={group ? group.id : ''}/>
              <AvField name="nameUz" placeholder="enter group name uz" value={group ? group.nameUz : ''}/>
              <AvField name="nameRu" placeholder="enter group name Ru" value={group ? group.nameRu : ''}/>
              <AvField name="nameEng" placeholder="enter group name Eng" value={group ? group.nameEng : ''}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={() => openModal('')}>close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

AdminGroup.propTypes = {};

export default AdminGroup;
