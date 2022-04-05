import { GET_REGISTER } from "../Types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_REGISTER:
      return {
        ...state,
        newPerson: payload,
      };
    default:
      return state;
  }
};