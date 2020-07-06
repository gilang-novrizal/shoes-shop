import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormHelperText,
  useForkRef,
} from "@material-ui/core";
import Axios from "axios";

import { LogIn } from "../actions";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUserOpen: false,
      editEmailOpen: false,
      userError: false,
      userUsed: false,
      passwordError: false,
    };
  }
  editNama = () => {
    this.setState({ editUserOpen: true });
  };
  editEmail = () => {
    this.setState({ editEmailOpen: true });
  };
  handleClose = () => {
    this.setState({
      editUserOpen: false,
      editEmailOpen: false,
      userError: false,
      userUsed: false,
      passwordError: false,
      emailError: false,
      emailUsed: false,
    });
  };
  submitUsername = () => {
    let user = this.username.value;
    let password = this.password.value;
    let sym = /[!@#$%^&*;]/;

    let symtest = sym.test(user);

    this.passwordValidation(password);

    Axios.get(`http://localhost:2000/users?username=${user}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ userUsed: true });
        } else {
          if (!symtest && user.length > 5 && !this.state.passwordError) {
            this.setState({ userError: false });
            Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
              username: user,
            }).then((res) => {
              this.props.LogIn(res.data);
              this.setState({
                editUserOpen: false,
                userError: false,
                userUsed: false,
              });
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };
  emailValidation = (email) => {
    let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    let regtest = reg.test(email);

    this.setState({ emailError: regtest ? false : true });
  };
  passwordValidation = (password) => {
    Axios.get(
      `http://localhost:2000/users?id=${this.props.id}&password=${password}`
    ).then((res) => {
      this.setState({ passwordError: res.data.length ? false : true });
    });
  };
  submitEmail = () => {
    let email = this.email.value;
    let password = this.password.value;
    this.emailValidation(email);
    this.passwordValidation(password);
    Axios.get(`http://localhost:2000/users?email=${email}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ emailUsed: true });
        } else {
          if (!this.state.passwordError && !this.state.emailError) {
            Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
              email: email,
            }).then((res) => {
              this.props.LogIn(res.data);
              this.setState({
                editEmailOpen: false,
                emailError: false,
                emailUsed: false,
              });
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    const {
      editUserOpen,
      editEmailOpen,
      userError,
      userUsed,
      passwordError,
      emailError,
      emailUsed,
    } = this.state;
    return (
      <div style={styles.root}>
        <Card style={styles.card}>
          <div style={styles.left}>
            <Avatar>G</Avatar>
            <Button variant="contained">Pilih Foto</Button>
          </div>
          <div>
            <CardContent>
              <Typography>
                Nama: {this.props.username}
                <Button
                  size="small"
                  variant="contained"
                  onClick={this.editNama}
                >
                  Edit username
                </Button>
              </Typography>
              <Dialog
                open={editUserOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Change Name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Do you want your change your username?
                  </DialogContentText>
                  <TextField
                    label="Input your new username!"
                    inputRef={(username) => (this.username = username)}
                    error={userError || userUsed}
                    helperText={
                      userError
                        ? "Username minimal 6 characters & cannot contain symbol!"
                        : null
                    }
                    type="text"
                  />
                  <FormHelperText error>
                    {userUsed ? "Username used!" : null}
                  </FormHelperText>
                  <TextField
                    label="Input password!"
                    inputRef={(password) => (this.password = password)}
                    error={passwordError}
                    helperText={passwordError ? "Incorrect Password!" : null}
                    type="password"
                  />
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={this.submitUsername}>
                    Yes
                  </Button>
                  <Button variant="contained" onClick={this.handleClose}>
                    No
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography>
                Email: {this.props.email}
                <Button variant="contained" onClick={this.editEmail}>
                  Edit email
                </Button>
              </Typography>
              <Dialog
                open={editEmailOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Change Email</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Do you want your change your email?
                  </DialogContentText>
                  <TextField
                    label="Input your new email!"
                    inputRef={(email) => (this.email = email)}
                    // onChange={this.emailValidation(this.email.value || "")}
                    error={emailError}
                    helperText={emailError ? "Incorrect Email Format" : null}
                    type="text"
                  />
                  <FormHelperText error>
                    {emailUsed ? "Email used!" : null}
                  </FormHelperText>
                  <TextField
                    label="Input password!"
                    inputRef={(password) => (this.password = password)}
                    error={passwordError}
                    helperText={passwordError ? "Incorrect Password!" : null}
                    type="password"
                  />
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={this.submitEmail}>
                    Yes
                  </Button>
                  <Button variant="contained" onClick={this.handleClose}>
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
    padding: "2%",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
};
const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    id: state.user.id,
    email: state.user.email,
  };
};
export default connect(mapStateToProps, { LogIn })(UserProfile);
