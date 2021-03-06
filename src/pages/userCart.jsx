import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { LogIn } from "../actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Redirect } from "react-router-dom";

class userCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      toHome: false,
      passwordError: false,
      editrow: null,
      count: 0,
    };
  }
  checkout = () => {
    if (this.props.cart.length !== 0) this.setState({ alert: true });
  };

  handleClose = () => {
    this.setState({ alert: false });
  };

  handleYes = () => {
    console.log("ok");
    let history = {
      userID: this.props.id,
      date: new Date().toLocaleString(),
      total: this.props.cart.map((item) => item.total).reduce((a, b) => a + b),
      products: this.props.cart,
    };
    let password = this.password.value;

    Axios.get(
      `http://localhost:2000/users?id=${this.props.id}&password=${password}`
    )
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({ passwordError: true });
        } else {
          Axios.post("http://localhost:2000/transaction_history", history).then(
            (res) => {
              Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
                cart: [],
              }).then((res) => {
                this.reduceStock();
                Axios.get(`http://localhost:2000/users/${this.props.id}`).then(
                  (res) => {
                    this.props.LogIn(res.data);
                    this.setState({ toHome: true });
                  }
                );
              });
            }
          );
        }
      })
      .catch((err) => console.log(err));
  };

  reduceStock = () => {
    this.props.cart.map((item) => {
      this.props.product.map((value, index) => {
        value.stock.map((test) => {
          if (item.size === test.code && item.id === value.id) {
            return (
              (test.total -= item.qty),
              console.log(test.total),
              this.handlePatch(index)
            );
          }
        });
      });
    });

    console.log(this.props.product);
  };

  handlePatch = (index) => {
    Axios.patch(
      `http://localhost:2000/products/${this.props.product[index].id}`,
      { stock: this.props.product[index].stock }
    );
  };

  delete = (index) => {
    let tempCart = this.props.cart;
    tempCart.splice(index, 1);

    Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
      cart: tempCart,
    })
      .then((res) => {
        Axios.get(`http://localhost:2000/users/${this.props.id}`).then((res) =>
          this.props.LogIn(res.data)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  edit = (index) => {
    this.setState({ editrow: index, count: this.props.cart[index].qty });
  };
  plus = (index) => {
    let countedit = this.state.count;
    countedit++;
    this.setState({ count: countedit });
  };
  minus = (index) => {
    let countedit = this.state.count;
    countedit--;
    this.setState({ count: countedit });
    if (countedit === 0) {
      this.delete(index);
      this.setState({ editrow: null });
    }
  };
  save = (index) => {
    let tempCart = this.props.cart;
    tempCart[index].qty = this.state.count;
    tempCart[index].total = tempCart[index].price * tempCart[index].qty;
    Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
      cart: tempCart,
    })
      .then((res) => {
        Axios.get(`http://localhost:2000/users/${this.props.id}`).then(
          (res) => {
            this.props.LogIn(res.data);
            this.setState({ editrow: null });
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  cancel = (index) => {
    this.setState({ editrow: null });
  };
  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Brand</TableCell>
        <TableCell>Color</TableCell>
        <TableCell>Size</TableCell>
        <TableCell>Qty</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    console.log(this.props.product);
    console.log(this.props.cart);
    return this.props.cart.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <img src={item.image} alt="product image" width="100px" />
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.brand}</TableCell>
          <TableCell>{item.color}</TableCell>
          <TableCell>{item.size}</TableCell>
          <TableCell>
            {index === this.state.editrow ? (
              <div style={{ display: "flex" }}>
                <IconButton onClick={() => this.minus(index)}>
                  <RemoveIcon />
                </IconButton>

                <Typography>{this.state.count}</Typography>
                <IconButton onClick={() => this.plus(index)}>
                  <AddIcon />
                </IconButton>
              </div>
            ) : (
              <div>{item.qty}</div>
            )}
          </TableCell>
          <TableCell>Rp.{item.total.toLocaleString()}</TableCell>
          <TableCell>
            {index === this.state.editrow ? (
              <div>
                <IconButton onClick={() => this.save(index)}>
                  <CheckCircleIcon />
                </IconButton>
                <IconButton onClick={() => this.cancel(index)}>
                  <CancelIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                <IconButton onClick={() => this.delete(index)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => this.edit(index)}>
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const { alert, toHome, passwordError } = this.state;
    if (toHome) return <Redirect to="/" />;
    return (
      <div style={styles.root}>
        <div>
          <h1>Cart</h1>

          <Table style={styles.table} aria-label="simple table">
            <TableHead>{this.renderTableHead()}</TableHead>
            <TableBody>{this.renderTableBody()}</TableBody>
          </Table>

          <Button
            style={styles.button}
            variant="contained"
            type="button"
            onClick={this.checkout}
          >
            Checkout
          </Button>
          <Dialog
            open={alert}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>Continue to payment?</DialogContentText>
              <TextField
                label="Input password to confirm!"
                inputRef={(password) => (this.password = password)}
                error={passwordError}
                helperText={passwordError ? "Incorrect password!" : null}
                type="password"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={this.handleYes}>
                Yes
              </Button>
              <Button variant="contained" onClick={this.handleClose}>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    width: "70vw",
  },
  button: {
    backgroundColor: "#333",
    color: "#fff",
    alignSelf: "start",
  },
};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    cart: state.user.cart,

    product: state.product,
  };
};

export default connect(mapStateToProps, { LogIn })(userCart);
