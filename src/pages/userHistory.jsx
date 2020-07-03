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
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      opencollapse: false,
      cellId: null,
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

  renderTableBody = () => {
    const { opencollapse, cellId } = this.state;
    return this.state.data
      .slice(0)
      .reverse()
      .map((item, index) => {
        return (
          <TableBody>
            <TableRow>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() =>
                  this.setState({ opencollapse: !opencollapse, cellId: index })
                }
                open={opencollapse && cellId === index}
              >
                {opencollapse && cellId === index ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
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
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.products.map((value) => {
                        return (
                          <TableRow>
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
                          </TableRow>
                        );
                      })}
                    </TableBody>
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
  };
};
export default connect(mapStateToProps)(UserHistory);
