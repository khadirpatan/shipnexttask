import React, { Component } from "react";
class Header extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid" id="headerTitle">
        SHIPNEXT <img src={require("../images/logo.jpg")} id="logo" alt="" />
      </div>
    );
  }
}

export default Header;
