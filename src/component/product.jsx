import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default (props) => {
  return (
    <div style={styles.parent}>
      {(props.dataProduct || []).map((item) => {
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
      })}
    </div>
  );
};

const styles = {
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
