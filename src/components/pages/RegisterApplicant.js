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

const RegisterApplicant = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [genre, setGenre] = useState("");
    const [birthDate, setBirthDate] = useState("2022-02-27");
    const [typeStudent, setTypeStudent] = useState("");

    let person = {
      id: null,
      name: null,
      surname: null,
      dni: null,                      
      email: null,
      password: null,
      phoneNumber: null,
      role: null,
      genre: null,
      birthDate: null,
      typeStudent: null
    };    

    const onChangeGenre = (e) => {
      const vgenre = e.target.value;
      setGenre(vgenre);
    };

    const onChangeBirthDate = (e) => {
      const vbirthDate = e.target.value;
      setBirthDate(vbirthDate);
      console.log(birthDate)
    };
  
    const onChangeTypeStudent = (e) => {
      const vtypeStudent = e.target.value;
      setTypeStudent(vtypeStudent);
    };

    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        person.role = "APPLICANT";
        person.genre = genre;
        person.birthDate = birthDate;
        person.typeStudent = typeStudent;
        AuthService.createApplicant(person).then(
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
                <div className="title"><p>Applicant Register</p></div>

                <div className="">
                  <Input className="form-control item " value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                      person.name = e.target.value;}} placeholder="Name"/>
                </div>

                <div className="">
                  <Input className="form-control item" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                      person.surname = e.target.value;}} placeholder="Last Name"/>
                </div>

                <div className="">
                  <Input className="form-control item" value={person.dni} style={{width : '100%'}} id="identification" onChange={(e) => {
                      person.dni = e.target.value;}} placeholder="Identification Number"/>
                </div>

                <div className="">
                  <Input className="form-control item" value={person.email} style={{width : '100%'}} id="username" onChange={(e) => {
                          person.email = e.target.value;}} placeholder="Email"/>
                </div>

                <div className="">
                  <Input className="form-control item" value={person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                          person.password = e.target.value;}} placeholder="Password"/>
                </div>

                <div className="">
                  <Input className="form-control item" value={person.phoneNumber} style={{width : '100%'}} id="phone" onChange={(e) => {
                          person.phoneNumber = e.target.value;}} placeholder="Phone Number"/>
                </div>

                <div className="">
                  <label className="labels">
                    Pick your genre:
                    <select className="options" value={genre} onChange={onChangeGenre}>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </label>
                </div>

                <div className="">
                  <label className="labels">
                    Pick your type student:
                    <select className="options" value={typeStudent} onChange={onChangeTypeStudent}>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="REGULAR">REGULAR</option>
                      <option value="RECEIVED">RECEIVED</option>
                    </select>
                  </label>
                </div>

                <div className="form-group grupo">
                  <label className="labels"> Choose your birthdate: </label>                  
                  <TextField
                      id="date"
                      label=""
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onChangeBirthDate}
                    />
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
  export default RegisterApplicant;