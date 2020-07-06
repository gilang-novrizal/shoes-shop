import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { getHistory } from "../actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Input,
  Button,
  Card,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  InputLabel,
} from "@material-ui/core";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      opencollapse: false,
      cellId: null,
      menu: "date",
      order: "asc",
    };
  }

  componentDidMount() {
    this.getProductfromAPI(this.state.item, this.state.order);
  }
  getProductfromAPI = (item, order) => {
    Axios.get(
      `http://localhost:2000/transaction_history?_sort=${item}&_order=${order}`
    )
      .then((res) => {
        console.log(res.data);
        // this.setState({ data: res.data });
        this.props.getHistory(res.data);
      })
      .catch((err) => console.log(err));
  };
  handleSortItem = (e) => {
    let menuinput = e.target.value;
    console.log(menuinput);
    this.setState({ menu: menuinput });
    this.getProductfromAPI(menuinput, this.state.order);
  };
  handleSortOrder = (e) => {
    let order = e.target.value;
    console.log(order);
    this.setState({ order: order });
    this.getProductfromAPI(this.state.item, order);
  };
  handleClose = (e) => {
    this.setState({ opencollapse: false });
  };

  handleSearch = () => {
    let keyword = this.keyword.value.toUpperCase();

    Axios.get(`http://localhost:2000/transaction_history?q=${keyword}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
        // this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  };

  renderTableBody = () => {
    const { opencollapse, cellId } = this.state;
    return this.props.history.map((item, index) => {
      return (
        <TableBody key={index}>
          <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.userID}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>Rp. {item.total.toLocaleString()}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                type="button"
                onClick={() =>
                  this.setState({
                    opencollapse: !opencollapse,
                    cellId: index,
                  })
                }
              >
                Details
              </Button>
            </TableCell>

            <Dialog
              onClose={this.handleClose}
              aria-labelledby="simple-dialog-title"
              open={opencollapse && cellId === index}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.products.map((value, idx) => {
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <img src={value.image} alt="" width="50px" />
                        </TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>{value.color}</TableCell>
                        <TableCell>{value.size}</TableCell>
                        <TableCell>{value.qty}</TableCell>
                        <TableCell>
                          Rp. {value.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <DialogActions>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={this.handleClose}
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </TableRow>
        </TableBody>
      );
    });
  };
  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>User ID</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>Product</TableCell>
      </TableRow>
    );
  };

  render() {
    const { order, menu } = this.state;
    // console.log(this.props.history);
    // console.log(this.props.history.slice(0).reverse());

    return (
      <div style={styles.root}>
        <h1>Transaction History</h1>
        <Typography variant="h6">Sort By</Typography>
        <InputLabel id="menu">Menu</InputLabel>
        <Select labelId="menu" value={menu} onChange={this.handleSortItem}>
          <MenuItem value="UserID">UserID</MenuItem>
          <MenuItem value="total">Date</MenuItem>
          <MenuItem value="date">Total</MenuItem>
        </Select>
        <InputLabel id="order">Order</InputLabel>
        <Select labelId="order" value={order} onChange={this.handleSortOrder}>
          <MenuItem value="asc">Asc</MenuItem>
          <MenuItem value="desc">Desc</MenuItem>
        </Select>

        <div>
          <Input
            inputRef={(keyword) => (this.keyword = keyword)}
            placeholder="Search"
          ></Input>
          <Button type="button" onClick={this.handleSearch} variant="contained">
            Search
          </Button>
        </div>
        <Table style={styles.table}>
          <TableHead>{this.renderTableHead()}</TableHead>
          {this.renderTableBody()}
        </Table>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "15vh 0",
  },
  table: {
    width: "70vw",
  },
  card: {
    margin: "1% 0",
    padding: "2%",
    width: "100%",
  },
};

const mapStateToProps = (state) => {
  return {
    history: state.history,
  };
};
export default connect(mapStateToProps, { getHistory })(History);
