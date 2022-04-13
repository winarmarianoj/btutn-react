import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {InputText} from 'primereact/inputtext';
import Swal from 'sweetalert';
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
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [typePerson, setTypePerson] = useState('');
    const [takeGenre, setTakeGenre] = useState('');
    const [takeTypeStudent, setTakeTypeStudent] = useState('');
    const [birthDate, setBirthDate] = useState("2022-02-27");
    const [utnBoard, setUtnBoard] = useState(false);
    const [adminBoard, setAdminBoard] = useState(false);
    const [publisherBoard, setPublisherBoard] = useState(false);
    const [applicantBoard, setApplicantBoard] = useState(false);

    let result = {response: useState(false), message: ''}

    let person = {id: '', uri: '', name: '', surname: '', identification: '', phoneNumber: '',
      email: '', password: '', role: '', genre: '', birthDate: '', typeStudent: '', webPage: '', message: ''}; 
    
    const genres = [ {label: 'MALE', value: 'MALE'}, {label: 'FEMALE', value: 'FEMALE'}, {label: 'OTHER', value: 'OTHER'}];
    const typeStudents = [ {label: 'ACTIVE', value: 'ACTIVE'}, {label: 'REGULAR', value: 'REGULAR'}, {label: 'RECEIVED', value: 'RECEIVED'}];

    useEffect(() => {    
      const typePersonSelected = JSON.parse(localStorage.getItem("typePerson"));
      setTypePerson(typePersonSelected);
      localStorage.removeItem("typePerson");
      setUtnBoard(typePersonSelected === "UTN" ? true : false);
      setAdminBoard(typePersonSelected === "ADMIN" ? true : false);
      setPublisherBoard(typePersonSelected === "PUBLISHER" ? true : false);
      setApplicantBoard(typePersonSelected === "APPLICANT" ? true : false);
    }, []);

    const sendSelectedTypeGenre = (e) => { e.preventDefault();setTakeGenre(e.target.value);}
    const sendSelectedTypeStudent = (e) => { e.preventDefault();setTakeTypeStudent(e.target.value);}  
    const onChangeBirthDate = (e) => { e.preventDefault();setBirthDate(e.target.value);}

    const handleRegister = (e) => {
      e.preventDefault();
      person.genre = takeGenre;
      person.typeStudent = takeTypeStudent;
      person.birthDate = birthDate;
      console.log(person)
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        if(typePerson === "UTN" || typePerson === "ADMIN"){                  
          PersonService.create(person);
        }else if(typePerson === "PUBLISHER"){
          PublisherService.create(person);
        }else if(typePerson === "APPLICANT"){
          ApplicantService.create(person);
        }

        /*if(result.response === 'true'){
          Swal({text: 'Congratulation!! Is already registered a new user.',
                        icon: 'success', timer:'3500'});
            setMessage(result.message);
            setSuccessful(true);
            window.location.href = './login';
        }else{
          Swal({text: 'Failed register new user.',
                        icon: 'error', timer:'3500'});
            setMessage(result.message);
            setSuccessful(false);
            window.location.href = './register';
        }
        */
       
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

                  {applicantBoard ? (<>
                      <div className="Name"> <Dropdown value={takeGenre} options={genres} onChange={(e) => sendSelectedTypeGenre(e)} placeholder="Select Genre"/> </div>
                      <div className="Name"> <Dropdown value={takeTypeStudent} options={typeStudents} onChange={(e) => sendSelectedTypeStudent(e)} placeholder="Select a Type Student"/> </div> 

                      <div className="form-group grupo">
                        <label className="Name"> Choose your birthdate: </label>                  
                        <TextField id="date" label="" type="date" defaultValue={'2022-04-11'} InputLabelProps={{shrink: true,}} onChange={onChangeBirthDate} />
                      </div>
                    </> ):(<></>)}

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