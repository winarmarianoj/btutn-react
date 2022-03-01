import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";
import Register from "./Register";
import DataValidator from "../validator/DataValidator";
import {InputText} from 'primereact/inputtext';
import StyleRegister from "../../assets/css/styleRegister.css";

import { DatePicker } from "@material-ui/pickers";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import 'react-datepicker/dist/react-datepicker.css';

import DatePickers from "../util/DatePickers";

const RegisterPublisher = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    let person = {
      id: null,
      oficialName: null,
      lastName: null,
      cuit: null,                      
      email: null,
      password: null,
      phoneNumber: null,
      role: null,
      webPage: null
    };    

    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        person.role = "PUBLISHER";
        AuthService.createPublisher(person).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };

    return (
      <div className="registration-form ">
        <div className="">

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div >
                <div className="form-icon" style={{fontSize:"3em", color:"blueviolet"}}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="title"><p>Publisher Register</p></div>

                <div className="form-group">
                  <Input className="form-control item" value={person.oficialName} style={{width : '100%'}} id="name" onChange={(e) => {
                      person.oficialName = e.target.value;}} placeholder="Oficial Name"/>
                </div>

                <div className="form-group">
                  <Input className="form-control item" value={person.lastName} style={{width : '100%'}} id="surname" onChange={(e) => {
                      person.lastName = e.target.value;}} placeholder="Last Name"/>
                </div>

                <div className="form-group">
                  <Input className="form-control item" value={person.cuit} style={{width : '100%'}} id="identification" onChange={(e) => {
                      person.cuit = e.target.value;}} placeholder="CUIT Number"/>
                </div>

                <div className="form-group">
                  <Input className="form-control item" value={person.email} style={{width : '100%'}} id="username" onChange={(e) => {
                          person.email = e.target.value;}} placeholder="Email"/>
                </div>

                <div className="form-group">
                  <Input className="form-control item" value={person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                          person.password = e.target.value;}} placeholder="Password"/>
                </div>

                <div className="form-group">
                  <Input className="form-control item" value={person.phoneNumber} style={{width : '100%'}} id="phone" onChange={(e) => {
                          person.phoneNumber = e.target.value;}} placeholder="Phone Number"/>
                </div>

                <div className="form-group">
                  <Input className="form-control item" value={person.webPage} style={{width : '100%'}} id="phone" onChange={(e) => {
                          person.webPage = e.target.value;}} placeholder="Web Site"/>
                </div>

                <div className="form-group grupo mt-5">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
    </div>    
    );

  };
  export default RegisterPublisher;