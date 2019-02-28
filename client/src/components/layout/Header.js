import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
          >
            <i className="fas fa-times" /> Logout
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts/add" className="nav-link">
            <i className="fas fa-plus" /> Add
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
        <div className="container">
          <a href="/" className="navbar-brand">
            Contact Manager
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? authLinks : guestLinks}
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <i className="fas fa-question" /> About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
