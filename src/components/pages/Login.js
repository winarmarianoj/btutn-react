import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/AuthService";
import '../../assets/css/StyleLoginCarrousel.css';
import Swal from 'sweetalert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import LoginCarousel from "../slides/LoginCarousel";

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  let user = { username: null, password: null};

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(user).then(
        (response) => {
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
            console.log(resMessage)
            console.log( error.response.data.message)

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <main className="login-block ">
      <div className="container">
        <div className="row">
            <section id="formLogin" className="col-md-4 login-sec">
                <div className="form-icon row" style={{fontSize:"3em", color:"blueviolet"}}>
                  <FontAwesomeIcon icon={faUser} />
                  <h2 className="text-center">Login Now</h2>
                </div> 
                <Form onSubmit={handleLogin} ref={form}>
                  <div className="form-group mt-4">            
                    <Input type="text" className="form-control item datauser" value={user.username} style={{width : '100%'}} id="name" onChange={(e) => {
                              user.username = e.target.value;}} placeholder="Email" required/>
                  </div>

                  <div className="form-group mt-4">
                  <Input type="password" className="form-control item datauser" value={user.password} style={{width : '100%'}} id="password" onChange={(e) => {
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
                <div className="copy-text mt-5">Created <i className="fa fa-thumbs-o-up"></i> by <a href="https://github.com/winarmarianoj">CUVL-UTN</a></div>
            </section>

            <section id="carrouselLogin" className="col-md-8 banner-sec" > <LoginCarousel /> </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
