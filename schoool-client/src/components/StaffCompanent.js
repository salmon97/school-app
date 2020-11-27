import React, {Component} from 'react';
import {AiOutlineFileText, BsFillPeopleFill} from "react-icons/all";

class StaffCompanent extends Component {
  render() {
    return (

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 ml-4 ">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span className="font-weight-bold">Umumiy Xodimlar Soni</span>
                <div className="d-flex justify-content-around mt-2 ">
                  <BsFillPeopleFill className="iconDashboard"/>
                  <h2 className="font-weight-bold">{0}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span className="font-weight-bold">Umumiy Studentlar soni</span>
                <div className="d-flex justify-content-around mt-2">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{0}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span className="font-weight-bold">umumiy gruhlar Soni</span>
                <div className="d-flex justify-content-around mt-2">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{0}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3 ml-4 ">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span className="font-weight-bold">Yo'pilgan 0 soni</span>
                <div className="d-flex justify-content-around mt-2 ">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{0}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span className="font-weight-bold">Yo'pilmagan 0 soni</span>
                <div className="d-flex justify-content-around mt-2">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{0}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="cardd">
              <div className="card-class" id="adminTotalClients">
                <span className="font-weight-bold">Ko'rilyotgan  Soni</span>
                <div className="d-flex justify-content-around mt-2">
                  <AiOutlineFileText className="iconDashboard"/>
                  <h2 className="font-weight-bold">{0}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StaffCompanent.propTypes = {};

export default StaffCompanent;
