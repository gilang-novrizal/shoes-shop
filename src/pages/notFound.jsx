import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">Oops, page not found!</Typography>
        <Link style={styles.button} to="/">
          <Button variant="contained">Back to Home</Button>
        </Link>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "2rem",
  },
};
export default NotFound;
