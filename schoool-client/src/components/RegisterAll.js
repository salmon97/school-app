import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Button} from "reactstrap";
import {router} from "umi";

class RegisterAll extends Component {
  render() {
    const {register, getRegionId, regions, districts, isDirector, isStaff} = this.props;
    const cabinet = () => {
      router.push("/cabinet")
    };
    return (
      <div className="container">
        <AvForm onValidSubmit={register}>
          <div className="row">
            <div className="col-md-4">
              <AvField name="firstName" label="first name" placeholder="enter your first name" required/>
              <AvField name="email" label="email" placeholder="enter email"/>
              <AvField name="phoneNumbers" label="home phone number" placeholder="enter your home phone number"/>
              <AvField name="regionId" label="region" onChange={getRegionId} type="select">
                <option value="" disabled>select region...</option>
                {regions.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </AvField>
            </div>
            <div className="col-md-4">
              <AvField name="lastName" label="last name" placeholder="enter your last name"/>
              <AvField name="phoneNumber" label="phone number" placeholder="enter your phone number"/>
              <AvField type="password" name="password" label="password" placeholder="enter password"/>
              <AvField name="districtId" label="district" type="select">
                <option value="" disabled>select district...</option>
                {districts.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </AvField>
            </div>
            <div className="col-md-4">
              <AvField type="date" name="birthDate" label="birthdate"/>
              <AvField name="identificationCode" label="identification number"
                       placeholder="enter your identification number"/>
              <AvField type="password" name="prePassword" label="pre password" placeholder="enter pre password"/>
              <AvField name="address" label="address" placeholder="enter your address"/>
            </div>
          </div>
          <div className="row">
            <div className={isDirector || isStaff ? "col-md-2 d-block" : 'd-none'}>
              <Button color="warning" onClick={cabinet}>cabinet</Button>
            </div>
            <div className="col-md-2 text-right offset-8">
              <Button color="success">submit</Button>
            </div>
          </div>
        </AvForm>
      </div>
    );
  }
}

RegisterAll.propTypes = {};

export default RegisterAll;
