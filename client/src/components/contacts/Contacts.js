import React, { Component } from "react";
import Contact from "./Contact";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts } from "../../actions/contactActions";
import { withRouter } from "react-router-dom";

class Contacts extends Component {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const contacts = this.props.contacts;
    return (
      <div>
        {contacts &&
          contacts.map(contact => {
            return <Contact key={contact._id} contact={contact} />;
          })}
      </div>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contacts.contacts
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
