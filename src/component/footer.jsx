import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Typography } from "@material-ui/core";

export default () => {
  return (
    <div style={styles.root}>
      <div>
        <Typography>© Copyright 2020</Typography>{" "}
      </div>
      <div>
        <ul>
          <li style={styles.li}>
            <FacebookIcon />
          </li>
          <li style={styles.li}>
            <TwitterIcon />
          </li>
          <li style={styles.li}>
            <InstagramIcon />
          </li>
          <li style={styles.li}>
            <GitHubIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: 20,
    color: "white",
  },
  li: {
    display: "inline-block",
    marginLeft: 20,
  },
};
