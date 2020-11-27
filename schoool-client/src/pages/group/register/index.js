import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Button} from "reactstrap";
import {router} from "umi";
import {connect} from "dva";

@connect(({globalModel, groupModel}) => ({globalModel, groupModel}))
class Register extends Component {
  render() {

    const {groupModel, globalModel, dispatch} = this.props;
    const {student, groupId} = groupModel;
    const {lang} = globalModel;

    const back = () => {
      router.push("/group/ingroup")
    };

    const saveStudent = (e, v) => {
      // console.log(groupId,v);
      dispatch({
        type: 'groupModel/saveStudent',
        payload: {...v, groupId}
      })
    };

    return (
      <div className="container">
        <AvForm onValidSubmit={saveStudent}>
          <div className="row">
            <div className="col-md-4">
              <AvField name="id" className="d-none" value={student ? student.studentId : ''}/>
              <AvField name="firstName" label={lang === 'uz' ? 'ism' : lang === 'ru' ? 'имя' : 'first name'}
                       placeholder="enter your first name" value={student ? student.firstName : ''} required/>
              <AvField name="lastName" label={lang === 'uz' ? 'familiya' : lang === 'ru' ? 'фамилия' : 'last name'}
                       placeholder="enter your last name" value={student ? student.lastName : ''}/>
              <AvField name="phoneNumber"
                       label={lang === 'uz' ? 'telefon no\'mer' : lang === 'ru' ? 'телефонный номер' : 'phone number'}
                       placeholder="enter phone number"
                       value={student ? student.phoneNumber : ''}/>
              <AvField type="date" name="birthDate"
                       label={lang === 'uz' ? 'tug\'ilgan kun' : lang === 'ru' ? 'Дата рождения' : 'birthdate'}
                       value={student ? student.birthDate : ''}
                       required/>
            </div>
            <div className="col-md-4">
              <AvField name="username" label={lang === 'uz' ? 'foydalanuvchi nomi' : lang === 'ru' ? 'имя пользователя' : 'username'} placeholder="enter your username"
                       value={student ? student.username : ''} required/>
              <AvField type="password" name="password" label={lang === 'uz' ? 'parol' : lang === 'ru' ? 'пароль' : 'password'} placeholder="enter password"
                       validate={{
                         required: {value: true, errorMessage: 'Please enter a password'},
                         pattern: {
                           value: '^[A-Za-z0-9]+$',
                           errorMessage: 'Your name must be composed only with letter and numbers'
                         },
                         minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                         maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                       }}/>
              <AvField type="password" name="prePassword" label={lang === 'uz' ? 'Parolni qaytadan kiriting' : lang === 'ru' ? 'Повторите пароль' : 'repeat password'} placeholder="enter repeat password"
                       validate={{
                         required: {value: true, errorMessage: 'Please enter a password'},
                         pattern: {
                           value: '^[A-Za-z0-9]+$',
                           errorMessage: 'Your name must be composed only with letter and numbers'
                         },
                         minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                         maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                       }}/>
              <AvField name="address" label={lang === 'uz' ? 'manzil' : lang === 'ru' ? 'адрес' : 'address'} value={student ? student.address : ''}
                       placeholder="enter your address"/>
            </div>
            <div className="col-md-4">
              {console.log(student)}
              <AvField name="parentFirstName" label={lang === 'uz' ? 'ota-onaning ismi' : lang === 'ru' ? 'имя родителя' : 'parent first name'} placeholder="enter your first name"
                       value={student ? student.resParent.firstName : ''} required/>
              <AvField name="parentLastName" label={lang === 'uz' ? 'ota-ona familiyasi' : lang === 'ru' ? 'фамилия родителей' : 'parent last name'} placeholder="enter your last name"
                       value={student ? student.resParent.lastName : ''}/>
              <AvField name="parentUsername" label={lang === 'uz' ? 'ota-foydalanuvchi nomi' : lang === 'ru' ? 'родительское имя пользователя' : 'parent username'} placeholder="enter your username"
                       value={student ? student.resParent.username : ''}/>
              <AvField name="parentPhoneNumber" label={lang === 'uz' ? 'telefon no\'mer' : lang === 'ru' ? 'телефонный номер' : 'phone number'}
                       placeholder="enter your home phone number" value={student ? student.resParent.phoneNumber : ''}/>
              <AvField type="password" name="parentPassword" label={lang === 'uz' ? 'parol' : lang === 'ru' ? 'пароль' : 'password'} placeholder="enter password"
                       validate={{
                         required: {value: true, errorMessage: 'Please enter a password'},
                         pattern: {
                           value: '^[A-Za-z0-9]+$',
                           errorMessage: 'Your name must be composed only with letter and numbers'
                         },
                         minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                         maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                       }}/>
              <AvField type="password" name="parentPrePassword" label={lang === 'uz' ? 'Parolni qaytadan kiriting' : lang === 'ru' ? 'Повторите пароль' : 'repeat password'} placeholder="enter password"
                       validate={{
                         required: {value: true, errorMessage: 'Please enter a password'},
                         pattern: {
                           value: '^[A-Za-z0-9]+$',
                           errorMessage: 'Your name must be composed only with letter and numbers'
                         },
                         minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                         maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                       }}/>
            </div>
          </div>
          <div className="row">
            <div>
              <Button color="warning" onClick={back}>{lang === 'uz' ? 'orqaga' : lang === 'ru' ? 'назад' : 'back'}</Button>
            </div>
            <div className="col-md-2 text-right offset-8">
              <Button color="success">{lang === 'uz' ? 'saqlash' : lang === 'ru' ? 'сохранять' : 'save'}</Button>
            </div>
          </div>
        </AvForm>
      </div>
    );
  }
}

Register.propTypes = {};

export default Register;
