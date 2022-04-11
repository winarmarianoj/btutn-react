import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {InputText} from 'primereact/inputtext';
import StyleRegister from "../../assets/css/styleRegister.css";

import { DatePicker } from "@material-ui/pickers";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickers from "../components/util/DatePickers";
import { Dropdown } from 'primereact/dropdown';

import AuthService from "../services/AuthService";
import AdminService from '../services/AdminService';
import ApplicantServic from '../services/ApplicantService';
import PublisherService from '../services/PublisherService';
import UtnService from '../services/UserService.js';
import PersonService from "../services/PersonService";
import ApplicantService from "../services/ApplicantService";

const Register = () => {    
    const [typePerson, setTypePerson] = useState();
    const [redirection, setRedirection] = useState(false);

    const persons = [        
        {label: 'ADMIN', value: 'ADMIN'}, {label: 'APPLICANT', value: 'APPLICANT'}, 
        {label: 'PUBLISHER', value: 'PUBLISHER'}, {label: 'UTN', value: 'UTN'}
    ];

    const sendSelectedTypePerson = (e) => {
      localStorage.setItem("typePerson", JSON.stringify(e.value));
      setRedirection(true);      
    }

    return redirection ? (<Redirect to="./formRegisterNewUser"/> ) : (
      <div className="registration-form ">
        <div className="title"><p>Select Type User Register</p></div>
        <div className="">
            <Dropdown value={typePerson} options={persons} onChange={(e) => sendSelectedTypePerson(e)} placeholder="Select a Type Person Register"/> 
        </div>        
      </div>    
    );
  };
  export default Register;