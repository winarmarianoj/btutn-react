import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/AuthService";
import '../../assets/css/StyleLoginCarrousel.css';
import Swal from 'sweetalert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightToBracket, faUser} from '@fortawesome/free-solid-svg-icons';

const Forgot = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  let userForgot = {username: '', firstPassword: '', secondPassword: ''};

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.forgot(userForgot).then(
        (response) => {      
            Swal({text: 'Is already changed your password.' + response.data.message,
                    icon: 'success', timer:'3500'});
            setTimeout(() => {
              window.location.href = './login';
            }, 2500); 
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage)
            console.log( error.response.data.message)

          setLoading(false);
          setMessage(resMessage);
          Swal({text: 'Failed change your password.' + error.message,
                    icon: 'error', timer:'5000'});
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-block ">
      <div className="container Forgot">
        <div className="formLogin row">
            <div className="form-icon row" style={{fontSize:"3em", color:"blueviolet"}}>
                <FontAwesomeIcon icon={faUser} />
                <h2 className="text-center">Forgot Password</h2>
            </div> 
            <Form onSubmit={handleLogin} ref={form}>
                <div className="form-group mt-4">            
                <Input type="text" className="form-control item datauser" value={userForgot.username} style={{width : '100%'}} id="username" onChange={(e) => {
                            userForgot.username = e.target.value;}} placeholder="Email" required/>
                </div>

                <div className="form-group mt-4">
                <Input type="password" className="form-control item datauser" value={userForgot.firstPassword} style={{width : '100%'}} id="firstPassword" onChange={(e) => {
                            userForgot.firstPassword = e.target.value;}} placeholder="Password One" required/>
                </div>

                <div className="form-group mt-4">
                <Input type="password" className="form-control item datauser" value={userForgot.secondPassword} style={{width : '100%'}} id="secondPassword" onChange={(e) => {
                            userForgot.secondPassword = e.target.value;}} placeholder="Password Two" required/>
                </div>

                <div className="form-group mt-5 ">
                <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Forgot</span>
                </button>
                </div>
                {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
                )}
                
                <CheckButton className="btn btn-sm btn-light col" style={{ display: "none" }} ref={checkBtn} />
            </Form> 
            <div className="copy-text mt-5">Created <i className="fa fa-thumbs-o-up"></i> by <a href="https://github.com/winarmarianoj">CUVL-UTN</a></div>            
        </div>
      </div>
    </main>
  );
};

export default Forgot;