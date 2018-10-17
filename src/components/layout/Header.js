import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from "@material-ui/core/Modal";
import { auth } from "../../app/firebase";
import "./Header.scss";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "white",
  },
};

const Header = ({
  title = "",
  user,
  routes,
  savedMoviesCount,
  isFetchingMovies,
  classes,
}) => {
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Typography variant="title" noWrap className={classes.grow}>
            <Link className="site-title" to={routes.HOME}>
              {title}
            </Link>
          </Typography>
          <span>
            {user.isLoggedIn === false && (
              <Link className="my-list-btn" to={routes.SIGNIN}>
                <Button color="primary">Login</Button>
              </Link>
            )}

            <Badge color="secondary" badgeContent={savedMoviesCount}>
              <Link className="my-list-btn" to={routes.MYLIST}>
                <Button color="primary">My Bag</Button>
              </Link>
            </Badge>
            {user.isLoggedIn === true && (
              <Button
                color="primary"
                onClick={() =>
                  auth.signOut().then(() => window.location.reload())
                }
              >
                Logout
              </Button>
            )}
          </span>
        </Toolbar>
      </AppBar>
      {isFetchingMovies === true && <LinearProgress color="secondary" />}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={false}
      >
        <div>
          <Typography variant="title" id="modal-title">
            Text in a modal
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

Header.propTypes = {
  //Site title
  title: PropTypes.string,
  //Current user object
  user: PropTypes.object.isRequired,
  savedMoviesCount: PropTypes.number.isRequired,
  routes: PropTypes.object.isRequired,
  isFetchingMovies: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
