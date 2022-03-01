import React, { useState, useRef, Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {InputText} from 'primereact/inputtext';
import StyleRegister from "../../assets/css/styleRegister.css";
import StyleWeb from "../../assets/css/StyleWeb.css";
import { CropPortrait } from "@material-ui/icons";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Register = () => {

  let person = {
    id: null,
    name: null,
    surname: null,
    identification: null,                
    phone: null,
    username: null,
    password: null
  };

  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();

      try {
        if (checkBtn.current.context._errors.length === 0) {
          localStorage.setItem("newperson", JSON.stringify(this.person));        
        }
      } catch (error) {
        const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
      }
    };  

    return (
      <div className="registration-form">
        <div className="">
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-control item">
                  <InputText class="form-control item" value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                      person.name = e.target.value;}} placeholder="Name"/>
                </div>

                <div className="form-group">
                  <InputText class="form-control item" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                      person.surname = e.target.value;}} placeholder="Last Name"/>
                </div>

                <div className="form-group">
                  <InputText class="form-control item" value={person.identification} style={{width : '100%'}} id="identification" onChange={(e) => {
                      person.identification = e.target.value;}} placeholder="Identification Number"/>
                </div>

                <div className="form-group">
                  <InputText class="form-control item" value={person.username} style={{width : '100%'}} id="username" onChange={(e) => {
                          person.username = e.target.value;}} placeholder="Email"/>
                </div>

                <div className="form-group">
                  <InputText class="form-control item" value={person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                          person.password = e.target.value;}} placeholder="Password"/>
                </div>

                <div className="form-group">
                  <InputText class="form-control item" value={person.phone} style={{width : '100%'}} id="phone" onChange={(e) => {
                          person.phone = e.target.value;}} placeholder="Phone Number"/>
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

  export default Register;