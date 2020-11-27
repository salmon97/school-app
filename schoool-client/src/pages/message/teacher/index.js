import React, {Component} from 'react';
import {Table} from "reactstrap";
import DashboardLayout from "../../../components/DashboardLayout";
import {connect} from "dva";
import {BiMessageDetail} from "react-icons/all";
import {router} from "umi";

@connect(({messageModel}) => ({messageModel}))
class Index extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'messageModel/getNoRead'
    })
  }

  render() {
    const {dispatch, messageModel} = this.props;
    const {messagesNoRead} = messageModel;

    const openChat = (sentToId) => {
      dispatch({
        type: 'messageModel/updateState',
        payload: {sentToId}
      });
      router.push("/chat/teacher");

    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div>
              <div className="row">
                <div className="col-md-12">
                  <Table>
                    <thead>
                    <tr>
                      <th>№</th>
                      <th>name</th>
                      <th>messages</th>
                    </tr>
                    </thead>
                    <tbody>
                    {messagesNoRead.map((item, i) =>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.sentFromUserName}</td>
                        <td><BiMessageDetail style={{width: '30px', height: '30px'}} className="bg-danger"
                                             onClick={() => openChat(item.sentFromId)}/></td>
                      </tr>
                    )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
