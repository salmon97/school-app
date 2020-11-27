import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {GrEdit, RiDeleteBin5Line} from "react-icons/all";
import OurPaginations from "./OurPaginations";

class CabinetCompanent extends Component {
  render() {
    const {changePage,size, page, totalElements, totalPages, notices, notice,lang} = this.props;
    return (
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-4 offset-4">
            <h4>{lang === 'uz' ? 'e\'lonlar' : lang === 'ru' ?'Объявления':'notices'}</h4>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-md-12 d-flex flex-wrap">
            {notices.map((item, i) =>
              <div key={i} className="card bg-success text-center mb-2 ml-2">
                <div>
                  <span>{item.registerAt}</span>
                  <p>{item.title}</p>
                </div>
                <div className="card-body card-notice">
                  <h6 className="card-text">
                    {item.text}
                  </h6>
                </div>
              </div>
            )}
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
      </div>
    );
  }
}

CabinetCompanent.propTypes = {};

export default CabinetCompanent;
