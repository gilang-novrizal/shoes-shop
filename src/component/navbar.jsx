import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Profile from "./profile";

import {
  AppBar,
  Toolbar,
  Typography,
  Popover,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Logo } from "../assets/index";

class NavbarMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  handlePopOver = (e) => {
    console.log(e.currentTarget);
    this.setState({ anchorEl: e.currentTarget });
  };
  closePopOver = () => {
    this.setState({ anchorEl: null });
  };
  renderPopOver = () => {
    return (
      <Popover
        id="simple-popover"
        open={Boolean(this.state.anchorEl)}
        anchorEl={this.state.anchorEl}
        onClose={this.closePopOver}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {this.props.cart.length === 0 ? (
          <div>
            <Typography variant="h6">Cart is empty</Typography>
          </div>
        ) : (
          <div>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {this.props.cart.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ display: "flex", width: "100%", padding: "2%" }}
                  >
                    <CardMedia height="50px">
                      <img src={item.image} alt="" height="50px" />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="body2">
                        {item.name} size {item.size}
                      </Typography>
                      <Typography variant="body2">qty: {item.qty}</Typography>
                      <Typography variant="body2">
                        Rp. {item.total.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </div>
                );
              })}
              <Link to="/cart" style={{ margin: "2%" }}>
                <Button type="button" variant="contained">
                  Go to Cart
                </Button>
              </Link>
            </Card>
          </div>
        )}
      </Popover>
    );
  };

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
            <div onClick={(e) => this.handlePopOver(e)}>
              <Badge
                style={styles.menuButton}
                badgeContent={this.props.cart.length}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </div>
            {this.renderPopOver()}
            <Typography variant="h6">
              Rp.
              {this.props.cart.length === 0
                ? 0
                : this.props.cart
                    .map((item) => item.total)
                    .reduce((a, b) => a + b)
                    .toLocaleString()}
            </Typography>
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
    cursor: "pointer",
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
