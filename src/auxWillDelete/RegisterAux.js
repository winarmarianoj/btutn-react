import React, { useState, useRef, Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {InputText} from 'primereact/inputtext';
import StyleRegister from "../../assets/css/styleRegister.css";
import { CropPortrait } from "@material-ui/icons";

const RegisterAux = () => {

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
      <div className="registration-form ">
        <div className="">

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                  
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <InputText value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                      let val = e.target.value;
                      this.setState(prevState => {
                          let per = Object.assign({}, prevState.person);
                          per.name = val;
                          return { per };
                      })}} />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">LastName</label>
                  <InputText value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                      let val = e.target.value;
                      this.setState(prevState => {
                          let per = Object.assign({}, prevState.person);
                          per.surname = val
                          return { per };
                      })}} />
                </div>

                <div className="form-group">
                  <label htmlFor="identification">Identificacion</label>
                  <InputText value={person.identification} style={{width : '100%'}} id="identification" onChange={(e) => {
                      let val = e.target.value;
                      this.setState(prevState => {
                          let per = Object.assign({}, prevState.person);
                          per.identification = val
                          return { per };
                      })}} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <InputText value={person.username} style={{width : '100%'}} id="username" onChange={(e) => {
                          let val = e.target.value;
                          this.setState(prevState => {
                              let per = Object.assign({}, prevState.person);
                              per.username = val
                              return { per };
                          })}} />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <InputText value={person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                          let val = e.target.value;
                          this.setState(prevState => {
                              let per = Object.assign({}, prevState.person);
                              per.password = val
                              return { per };
                          })}} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <InputText value={person.phone} style={{width : '100%'}} id="phone" onChange={(e) => {
                          let val = e.target.value;
                          this.setState(prevState => {
                              let per = Object.assign({}, prevState.person);
                              per.phone = val
                              return { per };
                          })}} />
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

  export default RegisterAux;