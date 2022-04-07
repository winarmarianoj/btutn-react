import React, {useState, useEffect} from "react";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";
import { DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

import AuthService from "../services/AuthService";

import Header from "../components/fixed/Header";
import Footer from "../components/fixed/Footer";
import Login from "../components/pages/Login";
import Home from "../screens/Home/Home";
import Profile from "../components/pages/Profile";
import RegisterPerson from "../components/pages/RegisterPerson";
import RegisterApplicant from "../components/pages/RegisterApplicant";
import RegisterPublisher from "../components/pages/RegisterPublisher";
import Admin from "../screens/Admin/Admin";
import AdminProfile from "../components/admin/AdminProfile";
import ApplicantYourApplicants from "../screens/Applicant/ApplicantYourApplicants";
import ApplicantProfile from "../components/applicant/ApplicantProfile";
import ApplicantJobofferToApply from '../components/applicant/ApplicantJobofferToApply';
import PublisherYourJobOffers from "../screens/Publisher/PublisherYourJobOffers";
import PublisherProfile from "../components/publisher/PublisherProfile";
import PublisherJobOfferByCategory from "../screens/Publisher/PublisherJobOfferByCategory";
import PublisherAppliedByJobOffer from "../components/publisher/PublisherAppliedByJobOffer";
import UtnProfile from "../components/utn/UtnProfile";
import UtnJobOfferStateSelected from '../screens/Utn/UtnJobOfferStateSelected';
import DialogJobOffer from "../components/dialog/DialogJobOffer";
import StyleCentral from '../assets/css/stylesCentral.css';
import { Dropdown } from 'primereact/dropdown';

// import AuthVerify from "./common/AuthVerify";
import EventBus from "../common/EventBus";

export default function ProyectRoutes() {
    const [utnBoard, setUtnBoard] = useState(false);
    const [adminBoard, setAdminBoard] = useState(false);
    const [publisherBoard, setPublisherBoard] = useState(false);
    const [applicantBoard, setApplicantBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [dropdown, setDropdown] = useState(false);
    const [state, setState] = useState();

    const states = [
        {label: 'ACTIVE', value: 'ACTIVE'},
        {label: 'APPROVED', value: 'APPROVED'},
        {label: 'DELETED', value: 'DELETED'},
        {label: 'PENDING', value: 'PENDING'},
        {label: 'PUBLISHED', value: 'PUBLISHED'},
        {label: 'REJECTED', value: 'REJECTED'},
        {label: 'REVIEW', value: 'REVIEW'}
    ];

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setUtnBoard(user.role.role === "UTN" ? true : false);
      setAdminBoard(user.role.role === "ADMIN" ? true : false);
      setPublisherBoard(user.role.role === "PUBLISHER" ? true : false);
      setApplicantBoard(user.role.role === "APPLICANT" ? true : false);
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

  const sendState = (e) => {
    let newState = e.value;
    localStorage.setItem("jobstate", JSON.stringify(newState));
    window.location.href = './utnJobOfferStateSelected';
  }

    return(        
        <div >
                <BrowserRouter>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">                                                
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
                                <><Link to={"/utnJobOfferStateSelected"} className="nav-link">
                                        <Dropdown value={state} options={states} onChange={(e) => sendState(e)} placeholder="Select a State Joboffer"/>                                    
                                    </Link>
                                </>
                            )}

                            {adminBoard && (
                                <><Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </>
                            )}

                            {publisherBoard && (
                                <><Link to={"/publisherYourJobOffers"} className="nav-link">
                                        YourJobOffers
                                    </Link>
                                    <Link to={"/publisherJobOfferByCategory"} className="nav-link">
                                        ByCategory
                                    </Link>
                                </>
                            )}

                            {applicantBoard && (
                                <><Link to={"/applicantYourApplicants"} className="nav-link">
                                        Your Applications
                                    </Link>                                
                                </>
                            )}

                        </div>

                        {currentUser ? (                            
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
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

                    <div className="">
                        <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/registerApplicant" component={RegisterApplicant} />
                        <Route exact path="/registerPublisher" component={RegisterPublisher} />
                        <Route exact path="/registerPerson" component={RegisterPerson} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/adminProfile" component={AdminProfile} />
                        <Route path="/applicantYourApplicants" component={ApplicantYourApplicants} />
                        <Route path="/applicantProfile" component={ApplicantProfile} />
                        <Route path="/applicantJobofferToApply" component={ApplicantJobofferToApply} />
                        <Route path="/publisherYourJobOffers" component={PublisherYourJobOffers} />
                        <Route path="/publisherProfile" component={PublisherProfile} />
                        <Route path="/publisherJobOfferByCategory" component={PublisherJobOfferByCategory} />
                        <Route path="/publisherAppliedByJobOffer" component={PublisherAppliedByJobOffer} />
                        <Route path="/utnProfile" component={UtnProfile} />
                        <Route path="/utnJobOfferStateSelected" component={UtnJobOfferStateSelected} />                        
                        <Route path="/dialogJobOffer" component={DialogJobOffer} />
                        </Switch>
                    </div>

                </BrowserRouter>            
             <Footer/>
        </div>
        
    );
}