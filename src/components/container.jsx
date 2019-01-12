import React, { Component } from "react";
import axios from "axios";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      postsData: [],
      rightContainer: this.resizeWindow(),
      singleUserData: [],
      showRightContainer: false,
      displayClose: false,
      showModal: false,
      viewButtonText:"View Profile"
    };
  }

  async componentDidMount() {
    const data = await axios.get("http://jsonplaceholder.typicode.com/users");
    this.setState({ userData: data.data });

    window.addEventListener("resize", this.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  resizeWindow = () => {
    let rightContainer = "";
    let displayClose = false;
    let viewButtonText="";
    if (window.innerWidth <= 768) {
      rightContainer = "mobileview";
      displayClose = true;
    } else if (window.innerWidth > 768) {
      rightContainer = "rightContainer";
      displayClose = false;
    }
    (window.innerWidth <= 400) ? viewButtonText= "view" : viewButtonText="View Profile" ; 
    
    this.setState({ rightContainer, displayClose,viewButtonText });

    return rightContainer;
  };
  handleClick = async data => {
    this.setState({ showRightContainer: true });
    const msgsData = await axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    let msgsArray = msgsData.data;
    let newMsgArray = [];
    msgsArray.map(msgObject => {
      if (msgObject.userId === data.id) {
        newMsgArray.push(msgObject);
      }
    });
    this.setState({ postsData: newMsgArray });
    this.setState({ singleUserData: data });
    if (this.state.rightContainer === "mobileview") {
      this.setState({ displayClose: true });
    }
  };

  handleClose = data => {
    this.setState({ showRightContainer: false });
  };

  handleModalClose = data => {
    this.setState({ showModal: false });
  };
  handleProfileClick = data => {
    this.setState({ showModal: true });
  };
  getUserDetailsTable() {
    const { userData = [] } = this.state;
    return (
      <table className="table table-striped green" id="userTable">
        <tbody>
          {userData.map(data => (
            <tr
              key={data.id}
              onClick={e => this.handleClick(data)}
              style={{ cursor: "pointer" }}
            >
              <td id="username">
                {" "}
                <img
                  src={require("../images/profile.png")}
                  id="profilepic"
                  alt=""
                />{" "}
                &nbsp;&nbsp;&nbsp;
                {data.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  getRightContainer() {

    const {singleUserData=[],displayClose=false,postsData=[],viewButtonText } =this.state;
    return (
    <div className="col-md-8" id={this.state.rightContainer}>
      <div>
        <div className="container-fluid" id="rightProfile">
          <div className="row" id="rightProfileHeader">
            <div className="col-6 col-sm-8">
              <img
                src={require("../images/profile.png")}
                id="rightprofilepic"
                alt=""
              />{" "}
              &nbsp;&nbsp;&nbsp;
              <strong>{singleUserData.username}</strong>
            </div>
            <div className="col-6  col-sm-4" id="viewButton">
              <button
                id="viewProfile"
                className="btn"
                onClick={e => this.handleProfileClick(e)}
              >
              
                {viewButtonText }
               
              </button>{" "}
              &nbsp;&nbsp;
              {displayClose ? (
                <span onClick={e => this.handleClose(e)}>
                  <i
                    className="fa fa-share"
                    id="backIcon"
                  />
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <br />
        {postsData.map(data => (
          <div key={data.id}>
            <p id="postTitle"> {data.title}</p>
            <p id="postBody">{data.body}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>);
  }

  getModalWindow(){
    return(
    <div className="container-fluid" id="modal">
              <div className="container" id="modalContent">
                <div className="row" id="modalTop">
                  <div className="col">
                    <img
                      src={require("../images/profile.png")}
                      id="profilepic"
                      alt=""
                    />{" "}
                    &nbsp;&nbsp;&nbsp;
                    <strong> {this.state.singleUserData.username}</strong>
                    {this.state.showModal ? (
                      <span
                        style={{ float: "right" }}
                        onClick={e => this.handleModalClose(e)}
                      >
                        <i
                          className="fa fa-close"
                          id="closeIcon"
                        />
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="row" id="modalBody" >
                  <table className="table">
                    <thead />
                    <tbody>
                      <tr>
                        <td>Name :</td>
                        <td>{this.state.singleUserData.name}</td>
                      </tr>
                      <tr>
                        <td>Email :</td>
                        <td>{this.state.singleUserData.email}</td>
                      </tr>
                      <tr>
                        <td>Phone :</td>
                        <td>{this.state.singleUserData.phone}</td>
                      </tr>
                      <tr>
                        <td>Website :</td>
                        <td>{this.state.singleUserData.website}</td>
                      </tr>

                      <tr>
                        <td>Company Details:</td>
                        <td>
                          {this.state.singleUserData.company.name}
                          <br />
                          catchPhrase :{" "}
                          {this.state.singleUserData.company.catchPhrase}
                          <br />
                          Bs : {this.state.singleUserData.company.bs}
                          <br />
                        </td>
                      </tr>

                      <tr>
                        <td>Address:</td>
                        <td>
                          {this.state.singleUserData.address.street}
                          <br />
                          {this.state.singleUserData.address.suite}
                          <br />
                          {this.state.singleUserData.address.zipcode}
                          <br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4" id="leftContainer">
            {this.getUserDetailsTable()}
          </div>

          {this.state.showRightContainer ? this.getRightContainer() : null}

          {this.state.showModal ? (
            this.getModalWindow()
          ) : null}
        </div>
      </div>
    );
  }
}

export default Container;
