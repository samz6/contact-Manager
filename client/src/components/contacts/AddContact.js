import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContact } from "../../actions/contactActions";

class AddContact extends Component {
  state = {
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { contactName, contactEmail, contactPhone } = this.state;

    // Check For Errors
    if (contactName === "") {
      this.setState({ errors: { contactName: "contactName is required" } });
      return;
    }

    if (contactEmail === "") {
      this.setState({ errors: { contactEmail: "contactEmail is required" } });
      return;
    }

    if (contactPhone === "") {
      this.setState({ errors: { contactPhone: "contactPhone is required" } });
      return;
    }

    const newContact = {
      contactName,
      contactEmail,
      contactPhone
    };

    this.props.addContact(newContact);

    // Clear State
    this.setState({
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { contactName, contactEmail, contactPhone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="contactName"
              placeholder="Enter contact Name"
              value={contactName}
              onChange={this.onChange}
              error={errors.contactName}
            />
            <TextInputGroup
              label="Email"
              name="contactEmail"
              type="email"
              placeholder="Enter contact Email"
              value={contactEmail}
              onChange={this.onChange}
              error={errors.contactEmail}
            />
            <TextInputGroup
              label="Phone"
              name="contactPhone"
              placeholder="Enter contact Phone"
              value={contactPhone}
              onChange={this.onChange}
              error={errors.contactPhone}
            />
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { addContact }
)(AddContact);
