import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/AuthService";
import {InputText} from 'primereact/inputtext';
import StyleRegister from "../../assets/css/styleRegister.css";
import StyleWeb from "../../assets/css/StyleWeb.css";

import { DatePicker } from "@material-ui/pickers";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickers from "../util/DatePickers";

const RegisterPerson = () => { 
    const form = useRef();
    const checkBtn = useRef();    
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [role, setRole] = useState("");

    let person = {
      id: null,
      name: null,
      surname: null,
      dni: null,                      
      email: null,
      password: null,
      phoneNumber: null,
      role: null
    };

    const onChangeRole = (e) => {
      const vrole = e.target.value;
      setRole(vrole);
    };

    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        person.role = role;
        console.log(person)
        /*AuthService.createPerson(person).then(
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
        );*/
      }
    };

    return (
      <div className="registration-form ">
        <div className="">
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div className="">
                <div className="form-icon" style={{fontSize:"3em", color:"blueviolet"}}>
                  <FontAwesomeIcon icon={faUser} />
                </div>                
                <div className="title"><p>Admin or Utn Register</p></div>

                <div className="form-group">
                  <Input type="text" className="form-control item" value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                      person.name = e.target.value;}} placeholder="Name" required/>
                </div>

                <div className="form-group">
                  <Input type="text" className="form-control item" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                      person.surname = e.target.value;}} placeholder="Last Name" required/>
                </div>

                <div className="form-group">
                  <Input type="text" className="form-control item" value={person.dni} style={{width : '100%'}} id="identification" onChange={(e) => {
                      person.dni = e.target.value;}} placeholder="Identification Number" required/>
                </div>

                <div className="form-group">
                  <Input type="email" className="form-control item" value={person.email} style={{width : '100%'}} id="username" onChange={(e) => {
                          person.email = e.target.value;}} placeholder="Email" required/>
                </div>

                <div className="form-group">
                  <Input type="password" className="form-control item" value={person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                          person.password = e.target.value;}} placeholder="Password" required/>
                </div>

                <div className="form-group">
                  <Input type="text" className="form-control item" value={person.phoneNumber} style={{width : '100%'}} id="phone" onChange={(e) => {
                          person.phoneNumber = e.target.value;}} placeholder="Phone Number" required/>
                </div>

                <div className="form-group">
                  <label className="labels">
                    Pick your role:
                    <select className="options" onChange={onChangeRole}>
                    <option value="" disabled>Elige una opción</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="UTN">UTN</option>
                    </select>
                  </label>
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

  export default RegisterPerson;