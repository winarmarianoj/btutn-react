import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/AuthService";
import LoginCss from '../../assets/css/StyleLogin.css';
import Swal from 'sweetalert';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  let user = {
    username: null,
    password: null
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(user).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="loguer mt-5">
      <div className="loguerin-dark p-3 shadow-lg rounded justify-content-center card card-container">
        <div className="form-icon row" style={{fontSize:"3em", color:"blueviolet"}}>
            <p></p>
            <FontAwesomeIcon icon={faUser} />
        </div> 

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group mt-4">            
            <Input type="text" className="form-control item " value={user.username} style={{width : '100%'}} id="name" onChange={(e) => {
                      user.username = e.target.value;}} placeholder="Email" required/>
          </div>

          <div className="form-group mt-4">
          <Input type="password" className="form-control item" value={user.password} style={{width : '100%'}} id="password" onChange={(e) => {
                          user.password = e.target.value;}} placeholder="Password" required/>
          </div>

          <div className="form-group mt-5 ">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
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
      </div>
    </div>
  );
};

export default Login;
