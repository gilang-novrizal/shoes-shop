import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

import { LogIn } from "../actions";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loginError: false,
    };
  }
  handlePass = () => {
    let show = this.state.showPassword;
    this.setState({ showPassword: !show });
  };
  login = () => {
    let username = this.username.value;
    let password = this.password.value;
    Axios.get(
      `http://localhost:2000/users?username=${username}&password=${password}`
    )
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({ loginError: true });
        } else {
          localStorage.setItem("id", res.data[0].id);

          this.props.LogIn(res.data[0]);

          console.log(this.state.user);
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { showPassword, loginError } = this.state;
    if (this.props.username) {
      return <Redirect to="/" />;
    }

    return (
      <div style={styles.root}>
        <Card style={styles.card} elevation={5}>
          <CardContent style={styles.content}>
            <Typography variant="h4">Login</Typography>
            <div style={styles.input}>
              <FormControl variant="outlined" style={styles.uname}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  inputRef={(username) => (this.username = username)}
                  type="text"
                  labelWidth={70}
                />
              </FormControl>
            </div>
            <div style={styles.input}>
              <FormControl style={{}} variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>

                <OutlinedInput
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  inputRef={(password) => (this.password = password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handlePass}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText style={styles.helper}>
                  {loginError ? "* username or password is invalid" : null}
                </FormHelperText>
              </FormControl>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={this.login}>
              Login
            </Button>
          </CardActions>
          <Link>
            <Button
              variant="contained"
              endIcon={<FacebookIcon />}
              style={{ textTransform: "none", margin: 10 }}
              color="primary"
            >
              <Typography>Sign in with Facebook</Typography>
            </Button>
          </Link>
          <Link style={styles.link} to="/register">
            <Typography>Register</Typography>
          </Link>
        </Card>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "url(https://images.unsplash.com/photo-1537476102677-80bac0ab1d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80) no-repeat center",
    backgroundSize: "cover",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 0,
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
  helper: { color: "red" },
};

const mapStateToProps = (state) => {
  return { username: state.user.username };
};

export default connect(mapStateToProps, { LogIn })(Login);
