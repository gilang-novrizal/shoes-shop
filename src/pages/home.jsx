import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { getSlider } from "../actions";
import { getProduct } from "../actions";

import Carousel from "../component/carousel";
import Products from "../component/product";

const URL = "http://localhost:2000/";

class Home extends React.Component {
  getAPIDataSlider = () => {
    Axios.get(URL + "slider")
      .then((res) => {
        this.props.getSlider(res.data);
      })
      .catch((err) => console.log(err));
  };
  getAPIDataProducts = () => {
    Axios.get(URL + "products")
      .then((res) => {
        this.props.getProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getAPIDataSlider();
    this.getAPIDataProducts();
  }

  render() {
    return (
      <div>
        <Carousel dataSlider={this.props.slider} />
        <Products dataProduct={this.props.product} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("from redux", state);
  return {
    slider: state.slider,
    product: state.product,
  };
};

export default connect(mapStateToProps, { getSlider, getProduct })(Home);
