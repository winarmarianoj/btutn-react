import { GET_APPLICANT_PROFILE, GET_APPLICANT_JOBOFFER } from "../Types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_APPLICANT_PROFILE:
      return {
        ...state,
        selectedPerson: payload,
      };
    case GET_APPLICANT_JOBOFFER:
    return {
        ...state,
        joboffersapplicated: payload,
    };
    default:
      return state;
  }
};