import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { LogIn } from "../actions";

import {
  Typography,
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  OutlinedInput,
} from "@material-ui/core";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { Redirect } from "react-router-dom";

const URL = "http://localhost:2000/";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      image: 0,
      size: 0,
      stock: 0,
      selectedIndex: null,
      total: 0,
      toLogin: false,
      toCart: false,
    };
  }

  componentDidMount() {
    Axios.get(URL + `products${this.props.location.search}`)
      .then((res) => this.setState({ data: res.data[0] }))
      .catch((err) => console.log(err));
  }

  next = () => {
    let img = this.state.image;
    if (img < 5) {
      img++;
      this.setState({ image: img });
    }
  };
  prev = () => {
    let img = this.state.image;
    if (img > 0) {
      img--;
      this.setState({ image: img });
    }
  };
  showImage = (input) => {
    let img = input;
    this.setState({ image: img });
  };

  showStock = (stock, sizeinput, index) => {
    let sizestock = stock;
    let size = sizeinput;
    this.setState({
      stock: sizestock,
      size: size,
      selectedIndex: index,
      total: 0,
    });
  };

  handleInput = () => {
    let qty = parseInt(
      this.quantity.value > this.state.stock
        ? this.state.stock
        : this.quantity.value
    );
    this.setState({ total: qty });
  };

  addToCart = () => {
    const { total, data, size } = this.state;

    if (!this.props.id) {
      this.setState({ toLogin: true });
    } else {
      let cartData = {
        id: data.id,
        image: data.images[0],
        name: data.name,
        brand: data.brand,
        color: data.colour,
        price: data.price,
        size: size,
        qty: total,
        total: total * data.price,
      };

      console.log(cartData);
      let tempCart = this.props.cart;
      tempCart.push(cartData);

      Axios.patch(URL + `users/${this.props.id}`, { cart: tempCart })
        .then((res) => {
          console.log(res.data);
          Axios.get(URL + `users/${this.props.id}`).then((res) => {
            this.props.LogIn(res.data);
            this.setState({ toCart: true });
          });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const {
      data,
      image,
      stock,
      selectedIndex,
      total,
      toLogin,
      toCart,
    } = this.state;
    // console.log(data !== null ? data.images[0] : null);

    if (toLogin) {
      return <Redirect to="/login" />;
    } else if (toCart) {
      return <Redirect to="/cart" />;
    }
    return (
      <div style={styles.root}>
        <Card style={styles.content}>
          <CardActionArea>
            {data !== null ? (
              <div style={styles.mainImg}>
                <IconButton onClick={this.prev} style={styles.prev}>
                  <ArrowLeftIcon />
                </IconButton>
                <img src={data.images[image]} alt="" width="100%" />
                <IconButton onClick={this.next} style={styles.next}>
                  <ArrowRightIcon />
                </IconButton>
              </div>
            ) : (
              <></>
            )}
            <div style={styles.small}>
              {data !== null ? (
                data.images.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt=""
                      height="60px"
                      onClick={() => this.showImage(index)}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </CardActionArea>
          <div style={styles.right}>
            <CardContent style={styles.rightContent}>
              <Typography variant="h6">
                {data !== null ? data.name : null}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Rp. {data !== null ? data.price.toLocaleString() : null}
              </Typography>
              <Typography variant="subtitle1">
                {data !== null ? data.colour : null}
              </Typography>
              <Typography variant="body2">
                {data !== null ? data.description : null}
              </Typography>
              <div style={styles.button}>
                {data !== null ? (
                  data.stock.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        onClick={() =>
                          this.showStock(item.total, item.code, index)
                        }
                        variant="outlined"
                        style={{
                          backgroundColor:
                            index === selectedIndex ? "#333" : "#fff",
                          color: index === selectedIndex ? "#fff" : "#333",
                        }}
                        disabled={item.total === 0}
                      >
                        {item.code}
                      </Button>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <Typography variant="body1" style={{ alignSelf: "start" }}>
                {stock !== 0 ? `Stock = ${stock}` : null}
              </Typography>
            </CardContent>
            <CardActions style={styles.action}>
              <div style={styles.inputQty}>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() =>
                    this.quantity.value <= 0
                      ? null
                      : this.setState({ total: total - 1 })
                  }
                >
                  -
                </Button>
                <OutlinedInput
                  id="quantity"
                  inputRef={(quantity) => (this.quantity = quantity)}
                  type="text"
                  value={total}
                  onChange={this.handleInput}
                  style={styles.input}
                />
                <Button
                  variant="contained"
                  type="button"
                  onClick={() =>
                    this.quantity.value >= stock
                      ? null
                      : this.setState({ total: total + 1 })
                  }
                >
                  +
                </Button>
              </div>
              <Button
                variant="contained"
                style={styles.cart}
                onClick={this.addToCart}
                disabled={total === 0}
              >
                Add to Cart
              </Button>
            </CardActions>
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

  next: {
    position: "absolute",
    right: "3%",
    top: "40%",
    zIndex: 3,
    color: "white",
  },
  prev: {
    position: "absolute",
    left: "3%",
    top: "40%",
    zIndex: 3,
    color: "white",
  },

  action: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    width: "60vw",
    height: "70vh",
    padding: 10,
  },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflow: "scroll",
  },
  rightContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  small: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
  },
  mainImg: {
    display: "flex",
    width: "100%",
  },
  input: {
    width: "50px",
    height: "50px",
    textAlign: "center",
    margin: "0 1rem",
  },
  inputQty: {
    margin: "1rem",
  },
  cart: {
    alignSelf: "flex-end",
    borderRadius: "20px",
    backgroundColor: "#333",
    color: "#fff",
  },
};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    cart: state.user.cart,
  };
};
export default connect(mapStateToProps, { LogIn })(Detail);
