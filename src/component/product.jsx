import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProduct } from "../actions";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      category: "",
      price: "",
    };
  }
  componentDidMount() {
    this.getProductData("");
  }
  getProductData = (input) => {
    Axios.get(`http://localhost:2000/products?q=${input}`)
      .then((res) => this.props.getProduct(res.data))
      .catch((err) => console.log(err));
  };
  handleCategory = (event) => {
    console.log(event.target.value);
    let cat = event.target.value;
    this.setState({ category: cat });
    this.getProductData(cat);
  };
  handleSearch = () => {
    let searchInput = this.search.value;
    this.getProductData(searchInput);
  };
  handlePrice = (event) => {
    console.log(event.target.value);
    let sortPrice = event.target.value;
    let searchInput = this.search.value;
    this.setState({ price: sortPrice });
    Axios.get(
      `http://localhost:2000/products?q=${searchInput}&_sort=price&_order=${sortPrice}`
    )
      .then((res) => this.props.getProduct(res.data))
      .catch((err) => console.log(err));
  };
  render() {
    const { category, price } = this.state;
    return (
      <div>
        <div style={styles.input}>
          <OutlinedInput
            inputRef={(search) => (this.search = search)}
          ></OutlinedInput>
          <Button variant="contained" type="button" onClick={this.handleSearch}>
            Search
          </Button>
          <Typography variant="h6">Filter Products</Typography>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            value={category}
            onChange={this.handleCategory}
          >
            <MenuItem value="Men">Men</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
            <MenuItem value="sport">Sport</MenuItem>
            <MenuItem value="converse">Converse</MenuItem>
            <MenuItem value="sandals">Sandals</MenuItem>
          </Select>
          <Typography variant="h6">Sort Products by Price</Typography>
          <InputLabel id="price">Price</InputLabel>
          <Select labelId="price" value={price} onChange={this.handlePrice}>
            <MenuItem value="asc">From Low to High</MenuItem>
            <MenuItem value="desc">From High to Low</MenuItem>
          </Select>
        </div>
        <div style={styles.parent}>
          {this.props.product.length !== 0 ? (
            this.props.product.map((item) => {
              return (
                <Card style={styles.root} key={item.id}>
                  <CardActionArea>
                    <div>
                      <CardMedia style={styles.media} image={item.images[0]} />
                      <CardContent>
                        <Typography style={styles.title} variant="h6">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={styles.desc}
                        >
                          Rp. {item.price.toLocaleString()}
                        </Typography>
                        <div style={styles.box}>
                          <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                          >
                            <Rating
                              name="simple-controlled"
                              readOnly={true}
                              value={
                                item.rating.length !== 0
                                  ? item.rating
                                      .map((item) => item.star)
                                      .reduce((a, b) => a + b) /
                                    item.rating.length
                                  : "0"
                              }
                            />
                          </Box>

                          <Typography variant="body1">
                            ({item.rating.length})
                          </Typography>
                        </div>
                      </CardContent>
                    </div>
                  </CardActionArea>
                  <CardActions style={styles.action}>
                    <Link to={`/details?id=${item.id}`}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Buy Now
                      </Button>
                    </Link>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<FavoriteIcon />}
                    >
                      Wish List
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Typography variant="h4">Product not found!</Typography>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  box: {
    display: "flex",
  },
  input: {
    padding: "2%",
  },
  parent: {
    marginTop: "2rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  root: {
    width: 300,
    margin: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 200,
  },
  action: {
    display: "flex",
    padding: 16,
  },
  title: {
    fontWeight: 600,
    margin: "2% 0px",
  },
};

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

export default connect(mapStateToProps, { getProduct })(Products);
