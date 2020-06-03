import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import MainBrand from './MainBrand';
import '../../components/Login&Signup/signup/signup.css';
class IsLinked extends Component {
  render() {
    return (
      <div>
        <MainBrand />
        <div style={{margin_top: '100px'}}>
          <h3 className="hint pass-massage islinked">
            we sent a link to your email Please checkyour inbox
          </h3>
        </div>
      </div>
    );
  }
}

 export default withRouter(IsLinked);
