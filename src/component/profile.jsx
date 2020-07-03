import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { LogOut } from "../actions";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logout = () => {
    localStorage.clear();
    this.props.LogOut();
    this.handleClose();
  };

  render() {
    return (
      <div style={{ marginLeft: "1rem" }}>
        <IconButton
          onClick={(e) => this.handleClick(e)}
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          {this.props.username ? (
            <Avatar>{this.props.username.charAt(0).toUpperCase()}</Avatar>
          ) : (
            <AccountCircleIcon fontSize="large" style={{ color: "#f2f2f2" }} />
          )}
        </IconButton>
        <div>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            getContentAnchorEl={null}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "tops",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {this.props.id ? (
              this.props.role === "user" ? (
                <div>
                  <Link to="/userprofile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link to="/userhistory">
                    <MenuItem>History</MenuItem>
                  </Link>

                  <Link to="/cart">
                    <MenuItem>Cart</MenuItem>
                  </Link>
                  <Link to="/login" onClick={this.logout}>
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link>
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link to="/history">
                    <MenuItem>History</MenuItem>
                  </Link>
                  <Link to="/login" onClick={this.logout}>
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </div>
              )
            ) : (
              <div>
                <Link to="/login" onClick={this.handleClose}>
                  <MenuItem>Login</MenuItem>
                </Link>
                <Link to="/register" onClick={this.handleClose}>
                  <MenuItem>Register</MenuItem>
                </Link>
              </div>
            )}
          </Menu>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    id: state.user.id,
    role: state.user.role,
  };
};

export default connect(mapStateToProps, { LogOut })(Profile);
