import React, {Component} from 'react';
import {connect} from "dva";

import {AvField, AvForm} from 'availity-reactstrap-validation'
import DashboardLayout from "../../../components/DashboardLayout";
import {router} from "umi";
import {IoMdArrowRoundBack} from "react-icons/all";

@connect(({globalModel, messageModel}) => ({globalModel, messageModel}))
class Index extends Component {

  componentDidMount() {
    this.get();
    this.timerId = setInterval(() => this.get(), 30000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  get() {
    this.props.dispatch({
      type: 'messageModel/updateState',
      payload: {size: 20}
    });
    this.props.dispatch({
      type: 'messageModel/getMessage',
    });
  }

  state = {
    text: ''
  };

  render() {

    const {messageModel, dispatch, globalModel} = this.props;
    const {sentToId, messages, size} = messageModel;
    const {currentUser, lang,isParent,isStudent,isTeacher} = globalModel;

    const sentMsg = () => {
      dispatch({
        type: 'messageModel/sentMsg',
        payload: {text: this.state.text, sentToId}
      });
      this.setState({text: ''})
    };
    const stateValue = (e) => {
      this.setState({text: e.target.value})
    };

    const moreData = () => {
      dispatch({
        type: 'messageModel/updateState',
        payload: {size: size + 20}
      });
      dispatch({
        type: 'messageModel/getMessage'
      })
    };

    const back = () => {
      if (isTeacher) {
        router.push("/timetable/intogroup")
      } else {
        router.push("/group/ingroup")
      }
    };

    return (

      <div>
        <DashboardLayout pathname={this.props.pathname}>

          <div className="container">
            <div className="row">
              <div className="col-md-1">
                <button onClick={back} className={isParent || isStudent ? 'd-none' :'btn btn-success'}><IoMdArrowRoundBack/></button>
              </div>
              <div className="col-md-8">
                <button className="btn-danger btn showMore pb-4 pt-0"
                        onClick={moreData}>{lang === 'uz' ? ' ko\'pro ko\'rsatish' : lang === 'ru' ? ' показать больше' : ' show more'}</button>
                <div className="chat ">
                  {messages.reverse().map((item, i) =>
                    <div key={i}>
                      {item.sentFromUserName === currentUser.username ?
                        <div className="from">
                          <b>{item.sentFromName}</b>
                          <p>{item.message}</p>
                        </div>
                        :
                        <div className="sent">
                          <b>{item.sentFromName}</b>
                          <p>{item.message}</p>
                        </div>
                      }
                    </div>
                  )}
                </div>


              </div>
            </div>
            <AvForm>
              <div className="row">
                <div className="col-md-7 offset-1">
                  <AvField name="text" id="textMsg" value={this.state.text} onChange={stateValue}
                           placeholder="enter message ..."/>
                </div>
                <div className="col-md-1">
                  <button className="btn btn-primary" onClick={sentMsg}>{lang === 'uz' ? ' jo\'natish' : lang === 'ru' ? ' Отправить' : ' send'}</button>
                </div>
              </div>
            </AvForm>
          </div>
        </DashboardLayout>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
