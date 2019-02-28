// import isEmpty from "../validation/is-empty";

import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  CONTACT_LOADING
} from "../actions/types";

const initialState = {
  contacts: [],
  contact: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case CONTACT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    default:
      return state;
  }
}
