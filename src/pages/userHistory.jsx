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
  Box,
  IconButton,
  Collapse,
  Typography,
  Button,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Rating from "@material-ui/lab/Rating";

class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      opencollapse: false,
      cellId: null,
      read: false,
      star: 0,
    };
  }

  componentDidMount() {
    Axios.get(
      `http://localhost:2000/transaction_history?userID=${this.props.id}`
    )
      .then((res) => {
        // this.props.getHistory(res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  }
  handleRating = (val) => {
    console.log(val);
    this.setState({ star: val });
  };
  handleSubmit = (id) => {
    this.setState({ read: true });
    Axios.get(`http://localhost:2000/products/${id}`)
      .then((res) => {
        let tempRate = res.data.rating;
        tempRate.push({ star: this.state.star, userID: this.props.id });
        Axios.patch(`http://localhost:2000/products/${id}`, {
          rating: tempRate,
        }).then((res) => console.log(res));
      })
      .catch((err) => console.log(err));
  };

  renderTableBody = () => {
    const { opencollapse, cellId, read, star } = this.state;

    return this.state.data
      .slice(0)
      .reverse()
      .map((item, index) => {
        return (
          <TableBody key={index}>
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() =>
                    this.setState({
                      opencollapse: !opencollapse,
                      cellId: index,
                    })
                  }
                  open={opencollapse && cellId === index}
                >
                  {opencollapse && cellId === index ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>Rp. {item.total.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={4}
              >
                <Collapse
                  in={opencollapse && cellId === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box>
                    <Typography variant="h6" gutterBottom component="div">
                      History Details
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Item</TableCell>
                          <TableCell>Color</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell>Review</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.products.map((value, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <img src={value.image} alt="" width="100px" />{" "}
                              </TableCell>
                              <TableCell>{value.name}</TableCell>
                              <TableCell>{value.color}</TableCell>
                              <TableCell>{value.size}</TableCell>
                              <TableCell>{value.qty}</TableCell>
                              <TableCell>
                                Rp. {value.total.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Box
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <Rating
                                    name="simple-controlled"
                                    readOnly={read}
                                    value={star}
                                    onChange={(event, newvalue) =>
                                      this.handleRating(newvalue)
                                    }
                                  />
                                </Box>
                                <div>
                                  <Button
                                    variant="contained"
                                    type="button"
                                    disabled={value.id && read}
                                    onClick={() => this.handleSubmit(value.id)}
                                  >
                                    Submit Review
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      });
  };
  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>No</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Total</TableCell>
      </TableRow>
    );
  };

  render() {
    return (
      <div style={styles.root}>
        <Typography variant="h4">
          Transaction History {this.props.username}
        </Typography>
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
    id: state.user.id,
    username: state.user.username,
    product: state.product,
  };
};
export default connect(mapStateToProps)(UserHistory);
