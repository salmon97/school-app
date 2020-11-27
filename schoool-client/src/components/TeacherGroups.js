import React, {Component} from 'react';
import {Table} from "reactstrap";
import {GrEdit, RiDeleteBin5Line} from "react-icons/all";

class TeacherGroups extends Component {
  render() {
    const {groups,intoGroup,lang} = this.props;
    return (
      <div className="container">
        {/*{alert(size)}*/}
        <div className="row">
          <div className="col-md-12">
            <Table>
              <thead>
              <tr>
                <th>№</th>
                <th>{lang === 'uz' ? ' grux' : lang === 'ru' ? ' группа' : ' group'}</th>
                <th colSpan="2">{lang === 'uz' ? ' harakat' : lang === 'ru' ? ' действие' : ' action'}</th>
              </tr>
              </thead>
              <tbody>
              {groups.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><h6 onClick={()=>intoGroup(item.id)}>{lang === 'uz' ? item.nameUz : lang === 'ru' ? item.nameRu : item.nameEng}</h6></td>
                  {/*<td><IoIosSettings onClick={() => intoStudent(item)} style={{width: '20px', height: '20px'}}/></td>*/}
                  <td>
                    <GrEdit/>
                  </td>
                  <td>
                    <RiDeleteBin5Line/>
                  </td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

TeacherGroups.propTypes = {};

export default TeacherGroups;
