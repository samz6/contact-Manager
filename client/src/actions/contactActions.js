import axios from "axios";

import {
  GET_CONTACTS,
  GET_ERRORS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACT_LOADING
} from "./types";

// Add contact
export const addContact = contactData => dispatch => {
  //   dispatch(clearErrors());
  axios
    .post("/api/contacts", contactData)
    .then(res =>
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get contacts
export const getContacts = () => dispatch => {
  dispatch(setContactLoading());
  axios
    .get("/api/contacts")
    .then(res =>
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    });
};

// Delete contact
export const deleteContact = id => dispatch => {
  axios
    .delete(`/api/contacts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set loading state
export const setContactLoading = () => {
  return {
    type: CONTACT_LOADING
  };
};
