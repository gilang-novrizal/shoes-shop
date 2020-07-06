import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      userValid: false,
      emailValid: false,
      passwordValid: false,
      showHelperUser: false,
      showHelperEmail: false,
      showHelperPassword: false,
      user: [],
      usernameUsed: false,
      emailUsed: false,
    };
  }
  register = () => {
    let username = this.username.value;
    let email = this.email.value;
    let password = this.password.value;
    let role = "user";

    Axios.get(`http://localhost:2000/users?username=${username}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          this.setState({ usernameUsed: true, userValid: false });
          return;
        } else {
          Axios.get(`http://localhost:2000/users?email=${email}`).then(
            (res) => {
              if (res.data.length > 0) {
                this.setState({ emailUsed: true, emailValid: false });
                return;
              } else {
                if (
                  this.state.userValid &&
                  this.state.emailValid &&
                  this.state.passwordValid
                ) {
                  Axios.post("http://localhost:2000/users", {
                    username,
                    password,
                    role,
                    email,
                    cart: [],
                  })
                    .then((res) => {
                      if (res.data.length !== 0)
                        this.setState({ user: res.data });
                      this.setState({
                        showHelperUser: false,
                        showHelperEmail: false,
                        showHelperPassword: false,
                        usernameUsed: false,
                        emailUsed: false,
                      });
                    })
                    .catch((err) => console.log(err));
                } else {
                  this.setState({
                    showHelperUser: true,
                    showHelperEmail: true,
                    showHelperPassword: true,
                    usernameUsed: true,
                    emailUsed: true,
                  });
                }
              }
            }
          );
        }
      })
      .catch((err) => console.log(err));
  };
  handleCloseDialog = () => {
    console.log(this.state.users);
    this.setState({ usernameUsed: false });
  };

  handlePass = () => {
    let show = this.state.showPassword;
    this.setState({ showPassword: !show });
  };

  handleUserInput = () => {
    this.setState({ showHelperUser: true });

    let user = this.username.value;
    let sym = /[!@#$%^&*;]/;

    let symtest = sym.test(user);
    if (!symtest && user.length > 5) {
      this.setState({ userValid: true });
    } else {
      this.setState({ userValid: false });
    }
    console.log(this.state.userValid);
  };
  handleEmailInput = () => {
    this.setState({ showHelperEmail: true });
    let email = this.email.value;
    let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    let regtest = reg.test(email);
    this.setState({ emailValid: regtest ? true : false });
  };

  handlePasswordInput = () => {
    this.setState({ showHelperPassword: true });

    let password = this.password.value;
    let sym = /[!@#$%^&*;]/;
    let num = /[0-9]/;

    let symtest = sym.test(password);
    let numtest = num.test(password);

    if (symtest && numtest && password.length > 5) {
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordValid: false });
    }
    console.log(this.state.passwordValid);
  };

  handleInput = (username, email, password) => {
    let usernameError = username ? false : true;
    let emailError = email ? false : true;
    let passwordError = password ? false : true;
    let sym = /[!@#$%^&*;]/;
    let num = /[0-9]/;

    if (usernameError || emailError || passwordError) {
      return [usernameError, emailError, passwordError];
    }

    if (sym.test(username) && username.length > 5) {
      return [true, emailError, passwordError];
    }
    if (sym.test(password) && num.test(password) && password.length > 5) {
      return [usernameError, emailError, true];
    }
    return [false, false, false];
  };

  render() {
    const {
      showPassword,
      user,
      userValid,
      emailValid,
      passwordValid,
      showHelperUser,
      showHelperEmail,
      showHelperPassword,
      usernameUsed,
      emailUsed,
    } = this.state;
    if (user.length !== 0) return <Redirect to="/login" />;

    return (
      <div style={styles.root}>
        <Card style={styles.card} elevation={5}>
          <CardContent style={styles.content}>
            <Typography variant="h4">Register</Typography>

            <div style={styles.input}>
              <FormControl variant="outlined" style={styles.uname}>
                <InputLabel
                  htmlFor="username"
                  error={userValid || !showHelperUser ? false : true}
                >
                  Username
                </InputLabel>
                <OutlinedInput
                  error={userValid || !showHelperUser ? false : true}
                  id="username"
                  type="text"
                  inputRef={(username) => (this.username = username)}
                  labelWidth={70}
                  onChange={this.handleUserInput}
                />
                <FormHelperText style={styles.helper}>
                  {userValid || !showHelperUser
                    ? null
                    : "* Username minimal 6 characters & cannot include symbol"}
                </FormHelperText>
                <FormHelperText style={styles.helper}>
                  {!usernameUsed || !showHelperUser
                    ? null
                    : "* Username already used!"}
                </FormHelperText>
              </FormControl>
            </div>

            <div style={styles.input}>
              <FormControl
                variant="outlined"
                error={emailValid || !showHelperEmail ? false : true}
                style={styles.uname}
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  error={emailValid || !showHelperEmail ? false : true}
                  id="email"
                  type="text"
                  inputRef={(email) => (this.email = email)}
                  labelWidth={70}
                  onChange={this.handleEmailInput}
                />
                <FormHelperText style={styles.helper}>
                  {emailValid || !showHelperEmail
                    ? null
                    : "* This is required!"}
                </FormHelperText>
                <FormHelperText style={styles.helper}>
                  {!emailUsed || !showHelperUser
                    ? null
                    : "* Email already used!"}
                </FormHelperText>
              </FormControl>
            </div>

            <div style={styles.input}>
              <FormControl variant="outlined" style={styles.uname}>
                <InputLabel
                  htmlFor="password"
                  error={passwordValid || !showHelperPassword ? false : true}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  error={passwordValid || !showHelperPassword ? false : true}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  inputRef={(password) => (this.password = password)}
                  endAdornment={
                    <InputAdornment>
                      <IconButton onClick={this.handlePass}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  onChange={this.handlePasswordInput}
                />
                <FormHelperText style={styles.helper}>
                  {passwordValid || !showHelperPassword
                    ? null
                    : "* Password minimal 6 character, include symbol & number"}
                </FormHelperText>
              </FormControl>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={this.register}>
              Register
            </Button>
          </CardActions>
        </Card>
        {/* <Dialog
          open={usernameUsed}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>Username or email used!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="small"
              onClick={this.handleCloseDialog}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}
export default Register;

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "url(https://images.unsplash.com/photo-1499202977705-65f436dac18a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80) no-repeat center",
    backgroundSize: "cover",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  link: {
    color: "blue",
  },
  input: {
    width: "100%",
    margin: "10px 0",
  },
  uname: {
    width: "100%",
  },
  helper: {
    color: "red",
  },
};
