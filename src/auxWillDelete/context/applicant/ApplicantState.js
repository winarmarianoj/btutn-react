import React, { useReducer } from "react";
import ApplicantService from '../../services/ApplicantService';
import ApplicantContext from '../../context/applicant/ApplicantContext';
import ApplicantReducer from '../../context/applicant/ApplicantReducer';
import AuthService from '../../services/AuthService';
import axios from "axios";

import {GET_APPLICANT_PROFILE, GET_APPLICANT_JOBOFFER} from '../Types';

const ApplicantState = (props) => {
  const APPLICANT_BASE_URL = "http://localhost:8082/applicant";
  const JOBOFFER_BASE_URL = "http://localhost:8082/joboffer";

    const initialState = {
        joboffersapplicated: [],
        selectedPerson : null,
    };    

    const [state, dispatch] = useReducer(ApplicantReducer, initialState);

    const getProfile = async () => {
      let user = AuthService.getCurrentUser();
      console.log("holaaaaaaaaaaaaaa")
        try {
          const response = await axios.get(APPLICANT_BASE_URL + "/userId/" + user.id);
          const { data } = response;
          console.log(data.data)
          dispatch({ type: GET_APPLICANT_PROFILE, payload: data.data});
        } catch (error) {console.log(error);}
    }; 

    const getJobOffersApplicated = async () => {
        try {
          const response = await axios.get(JOBOFFER_BASE_URL + "/jobapplicants");
          const data = response.data;
          console.log(data)
          dispatch({ type: GET_APPLICANT_JOBOFFER, payload: data });
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <ApplicantContext.Provider
          value={{
            joboffersapplicated: state.joboffersapplicated,
            selectedPerson: state.selectedPerson,            
            getJobOffersApplicated,
            getProfile,
          }}
        >
          {props.children}
        </ApplicantContext.Provider>
    );

}

export default ApplicantState;