import React, {useState, useEffect} from "react";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

import AuthService from "../services/AuthService";

import Header from "../components/fixed/Header";
import Footer from "../components/fixed/Footer";
import Login from "../components/pages/Login";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import RegisterPerson from "../components/pages/RegisterPerson";
import RegisterApplicant from "../components/pages/RegisterApplicant";
import RegisterPublisher from "../components/pages/RegisterPublisher";
import Admin from "../screens/Admin/Admin";
import Applicant from "../screens/Applicant/Applicant";
import Publisher from "../screens/Publisher/Publisher";
import Utn from "../screens/Utn/Utn";


// import AuthVerify from "./common/AuthVerify";
import EventBus from "../common/EventBus";
import { form } from "react-validation/build/form";

export default function ProyectRoutes() {
  const [utnBoard, setUtnBoard] = useState(false);
  const [adminBoard, setAdminBoard] = useState(false);
  const [publisherBoard, setPublisherBoard] = useState(false);
  const [applicantBoard, setApplicantBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setUtnBoard(user.role);
      setAdminBoard(user.role);
      setPublisherBoard(user.role);
      setApplicantBoard(user.role);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setUtnBoard(false);
    setAdminBoard(false);
    setPublisherBoard(false);
    setApplicantBoard(false);
    setCurrentUser(undefined);
  };

  const openCloseDropdown= () => {
    setDropdown(!dropdown);
  }

    return(
        <div className="">
                <BrowserRouter>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">                        
                        <img src="../assets/img/logo-utn.ba.png" width="50px" height="30px" />
                        <Link to={"/"} className="navbar-brand marginLeft">
                        CUVL - UTN
                        </Link>
                        <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {utnBoard && (
                            <li className="nav-item">
                            <Link to={"/utn"} className="nav-link">
                                UTN Board
                            </Link>
                            </li>
                        )}

                        {adminBoard && (
                            <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                            </li>
                        )}

                        {publisherBoard && (
                            <li className="nav-item">
                            <Link to={"/publisher"} className="nav-link">
                                Publisher Board
                            </Link>
                            </li>
                        )}

                        {applicantBoard && (
                            <li className="nav-item">
                            <Link to={"/applicant"} className="nav-link">
                                Applicant Board
                            </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                            </li>
                        )}

                        </div>

                        {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                            </li>
                            <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                            </li>
                        </div>
                        ) : (
                        <div className="navbar-nav ml-auto marginRight">
                            <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                            </li>

                            <Dropdown isOpen={dropdown} toggle={openCloseDropdown}>
                            <DropdownToggle caret>Sign Up</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem >
                                    <Link to={"/registerApplicant"} className="">
                                        Applicant
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to={"/registerPublisher"} className="">
                                        Publisher
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to={"/registerPerson"} className="">
                                        Person
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                            </Dropdown>         

                        </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/registerApplicant" component={RegisterApplicant} />
                        <Route exact path="/registerPublisher" component={RegisterPublisher} />
                        <Route exact path="/registerPerson" component={RegisterPerson} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/applicant" component={Applicant} />
                        <Route path="/publisher" component={Publisher} />
                        <Route path="/utn" component={Utn} />
                        </Switch>
                    </div>

                </BrowserRouter>            
             <Footer/>
        </div>
    );
}