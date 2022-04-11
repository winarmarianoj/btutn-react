import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {InputText} from 'primereact/inputtext';
//import StyleRegister from "../../assets/css/styleRegister.css";
//import '../../assets/css/FormRegister.css';
import '../../assets/css/styleRegister2.css';

import { DatePicker } from "@material-ui/pickers";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickers from "../util/DatePickers";
import { Dropdown } from 'primereact/dropdown';

import ApplicantService from '../../services/ApplicantService';
import PublisherService from '../../services/PublisherService';
import PersonService from "../../services/PersonService";

const Register = (props) => {
    const typePersonSelected = JSON.parse(localStorage.getItem("typePerson"));
    console.log(typePersonSelected);
    localStorage.removeItem("typePerson");
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [utnBoard, setUtnBoard] = useState(false);
    const [adminBoard, setAdminBoard] = useState(false);
    const [publisherBoard, setPublisherBoard] = useState(false);
    const [applicantBoard, setApplicantBoard] = useState(false);

    let person = {id: '', uri: '', name: '', surname: '', identification: '', phoneNumber: '',
      email: '', password: '', role: '', genre: '', birthDate: '', typeStudent: '', webPage: '', message: ''}; 
    
    const genres = [ {label: 'MALE', value: 'MALE'}, {label: 'FEMALE', value: 'FEMALE'}, {label: 'OTHER', value: 'OTHER'}];
    const typeStudents = [ {label: 'ACTIVE', value: 'ACTIVE'}, {label: 'REGULAR', value: 'REGULAR'}, {label: 'RECEIVED', value: 'RECEIVED'}];

    useEffect(() => {    
      setUtnBoard(typePersonSelected === "UTN" ? true : false);
      setAdminBoard(typePersonSelected === "ADMIN" ? true : false);
      setPublisherBoard(typePersonSelected === "PUBLISHER" ? true : false);
      setApplicantBoard(typePersonSelected === "APPLICANT" ? true : false);
    }, []);

    const sendSelectedTypeGenre = (e) => {person.genre = e.target.value; console.log(person.genre) }
    const sendSelectedTypeStudent = (e) => {person.typeStudent = e.target.value; console.log(person.typeStudent)}  
    const onChangeBirthDate = (e) => {person.birthDate = e.target.value;};

    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        var response = [];
        if(typePersonSelected === "UTN" || typePersonSelected === "ADMIN"){
          response = PersonService.create(person);
        }else if(typePersonSelected === "PUBLISHER"){
          response = PublisherService.create(person);
        }else{
          response = ApplicantService.create(person);
        }

        try{
          if(response){
            setMessage(response.data.message);
            setSuccessful(true);
          }
        }catch(error){
          const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
        }
      }
    };

    return(
      <div className="page-container registerBody " >
        <div className="">
          <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div className="">
                  <div className="form-icon" style={{fontSize:"3em", color:"blueviolet"}}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="title"><p>New User</p></div>

                  <div className="">
                    <Input type="text" className="Name" value={person.email} style={{width : '100%'}} id="username" onChange={(e) => {
                            person.email = e.target.value;}} placeholder="Email" required/>
                  </div>

                  <div className="">
                    <Input type="text" className="Name" value={person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                            person.password = e.target.value;}} placeholder="Password" required/>
                  </div>

                  <div className="">
                    <Input type="text" className="Tele" value={person.identification} style={{width : '100%'}} id="identification" onChange={(e) => {
                        person.identification = e.target.value;}} placeholder="DNI or CUIT" required/>
                  </div>

                  <div className="">
                    <Input type="text" className="Tele" value={person.phoneNumber} style={{width : '100%'}} id="phone" onChange={(e) => {
                            person.phoneNumber = e.target.value;}} placeholder="Phone Number" required/>
                  </div>

                  {utnBoard ? (<>
                      <div className="">
                        <Input type="text" className="Name" value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                            person.name = e.target.value;}} placeholder="Name" required/>
                      </div>
                      <div className="">
                        <Input type="text" className="Name" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                            person.surname = e.target.value;}} placeholder="Last Name" required/>
                      </div>
                    </>) : (<> </> )}
                  
                  {adminBoard ? (<>
                    <div className="">
                      <Input type="text" className="Name" value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                          person.name = e.target.value;}} placeholder="Name" required/>
                    </div>
                    <div className="">
                      <Input type="text" className="Name" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                          person.surname = e.target.value;}} placeholder="Last Name" required/>
                    </div>
                  </>) : (<> </> )}
                  
                  {applicantBoard ? (<>
                    <div className="">
                      <Input type="text" className="Name" value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                          person.name = e.target.value;}} placeholder="Name" required/>
                    </div>
                    <div className="">
                      <Input type="text" className="Name" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                          person.surname = e.target.value;}} placeholder="Last Name" required/>
                    </div>
                    <div className="">
                      <Dropdown value={person.genre} options={genres} onChange={(e) => sendSelectedTypeGenre(e)} placeholder="Select Genre"/>                       
                    </div>
                    <div className="field"> <InputText id="personGenre" value={person.genre} readOnly/> </div>
                    
                    <div className="">
                      <Dropdown value={person.typeStudent} options={typeStudents} onChange={(e) => sendSelectedTypeStudent(e)} placeholder="Select a Type Student"/> 
                    </div>
                    <span className="">
                      <Input type="text" className="p-float-label my-3" value={person.typeStudent} style={{width : '100%'}} id="getTypeStudent"/>
                    </span>
                    <div className="form-group grupo">
                      <label className="labels"> Choose your birthdate: </label>                  
                      <TextField id="date" label="" type="date" defaultValue={'2022-04-11'} InputLabelProps={{shrink: true,}}
                          onChange={onChangeBirthDate} />
                    </div>
                  </>
                  ):(<></>)}

                  {publisherBoard ? (<>
                    <div className="">
                      <Input type="text" className="Name" value={person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                          person.name = e.target.value;}} placeholder="Name Organization" required/>
                    </div>
                    <div className="">
                      <Input type="text" className="Name" value={person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                          person.surname = e.target.value;}} placeholder="Name and Last Name" required/>
                    </div>
                    <div className="form-group">
                      <Input type="text" className="Name" value={person.webPage} style={{width : '100%'}} id="webPage" onChange={(e) => {
                              person.webPage = e.target.value;}} placeholder="Web Site" required/>
                    </div>
                  </>
                  ):(<></>)}

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

export default Register;