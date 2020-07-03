import React from "react";
import Axios from "axios";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { LogIn, getProduct } from "./actions";

import Home from "./pages/home";
import Category from "./pages/category";
import Login from "./pages/login";
import Register from "./pages/register";
import Detail from "./pages/productDetails";
import userCart from "./pages/userCart";
import History from "./pages/history";
import NotFound from "./pages/notFound";
import UserProfile from "./pages/userProfile";
import UserHistory from "./pages/userHistory";

import NavbarMaterial from "./component/navbar";
import Footer from "./component/footer";

class App extends React.Component {
  componentDidMount() {
    Axios.get(`http://localhost:2000/users?id=${localStorage.getItem("id")}`)
      .then((res) => {
        this.props.LogIn(res.data[0]);
        Axios.get(`http://localhost:2000/products`).then((res) =>
          this.props.getProduct(res.data)
        );
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <NavbarMaterial />
        {this.props.role === "user" ? (
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/category" component={Category} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/details" component={Detail} />

            <Route path="/cart" component={userCart} />
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/userhistory" component={UserHistory} />
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/category" component={Category} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/details" component={Detail} />
            <Route path="/history" component={History} />
            <Route path="*" component={NotFound} />
          </Switch>
        )}

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    role: state.user.role,
    product: state.product,
  };
};
export default connect(mapStateToProps, { LogIn, getProduct })(App);
