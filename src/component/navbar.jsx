import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Profile from "./profile";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Logo } from "../assets/index";

class NavbarMaterial extends React.Component {
  render() {
    return (
      <AppBar position="fixed" style={styles.root}>
        <Toolbar>
          <div style={styles.menuButton}>
            <img src={Logo} alt="" width="100px" />
          </div>
          <div style={styles.title}>
            <Link to="/">
              <Typography variant="h6" style={styles.menuButton}>
                Home
              </Typography>
            </Link>

            <Link to="/category">
              <Typography variant="h6" style={styles.menuButton}>
                Category
              </Typography>
            </Link>

            <Link to="/profile">
              <Typography variant="h6" style={styles.menuButton}>
                Profile
              </Typography>
            </Link>
          </div>

          <div style={styles.right}>
            <Link to="/cart" style={styles.menuButton}>
              <Badge badgeContent={this.props.cart.length} color="primary">
                <ShoppingCartIcon style={{ color: "#f3f3f3" }} />
              </Badge>
            </Link>
            <Typography variant="h6">Rp. 0</Typography>
            <Profile />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuButton: {
    marginRight: "2rem",
    padding: 0,
    color: "white",
    textTransform: "none",
  },
  title: {
    flexGrow: 1,
    display: "flex",
  },
  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
const mapStateToProps = (state) => {
  return {
    cart: state.user.cart,
  };
};

export default connect(mapStateToProps)(NavbarMaterial);
