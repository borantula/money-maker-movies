import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import ScrollToTop from "react-router-scroll-top";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import HomePage from "./containers/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MovieDetailPage from "./containers/Movie/DetailPage";
import UserSignInPage from "./containers/User/SignInPage";
import MyListPage from "./containers/User/MyListPage";
import PrivacyPolicyPage from "./containers/Pages/PrivacyPolicyPage";
import * as routes from "./constants/routes";
import { closeLoginModal, openLoginModal } from "./actions";
import {
  withAuthentication,
  withSavedListConnection,
  // withGoogleAds,
} from "./components/hoc/";

//TODO move theme to HoC
const theme = createMuiTheme({
  palette: {
    primary: colors.purple,
    secondary: colors.indigo,
  },
});

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <MuiThemeProvider theme={theme}>
            <CssBaseline>
              <Header
                title="Box Officed!"
                routes={routes}
                user={this.props.user}
                ui={this.props.ui}
                savedMoviesCount={this.props.savedMovies.length}
                isFetchingMovies={this.props.isFetchingMovies}
                closeLoginModal={this.props.closeLoginModal}
                openLoginModal={this.props.openLoginModal}
              />
              <div className="site-content">
                <ScrollToTop>
                  <Switch>
                    <Route path={routes.HOME} exact component={HomePage} />
                    <Route path={routes.MOVIE} component={MovieDetailPage} />
                    <Route
                      path={routes.SIGNIN}
                      exact
                      component={UserSignInPage}
                    />
                    <Route path={routes.MYLIST} exact component={MyListPage} />
                    <Route
                      path={routes.PRIVACY_POLICY}
                      exact
                      component={PrivacyPolicyPage}
                    />
                  </Switch>
                </ScrollToTop>
              </div>
              <Footer />
            </CssBaseline>
          </MuiThemeProvider>
        </React.Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  //current user object
  user: PropTypes.object.isRequired,
  savedMovies: PropTypes.array.isRequired,
  isFetchingMovies: PropTypes.bool.isRequired,
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  user: state.currentUser,
  savedMovies: state.savedMovies,
  isFetchingMovies: state.isFetchingMovies,
  ui: state.ui,
});

const ComposedApp = compose(
  // withInitialRemoteAppData,
  //withRouter,
  withSavedListConnection,
  withAuthentication
  //withGoogleAds
)(App);

export default connect(
  mapStateToProps,
  { closeLoginModal, openLoginModal }
)(ComposedApp);
