import React, {useState, useEffect} from "react";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

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
import PublisherApplicantByJobOffer from "../components/publisher/PublisherApplicantByJobOffer";
import Utn from "../screens/Utn/Utn";
import UtnProfile from "../components/utn/UtnProfile";
import StyleCentral from '../assets/css/stylesCentral.css';

// import AuthVerify from "./common/AuthVerify";
import EventBus from "../common/EventBus";

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
                                <><Link to={"/utn"} className="nav-link">
                                        UTN Board
                                    </Link>
                                    <Link to={"/utnProfile"} className="nav-link">
                                        Profile
                                    </Link></>
                            )}

                            {adminBoard && (
                                <><Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                    <Link to={"/adminProfile"} className="nav-link">
                                        Profile
                                    </Link></>
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
                        <Route path="/publisherApplicantByJobOffer" component={PublisherApplicantByJobOffer} />
                        <Route path="/utn" component={Utn} />
                        <Route path="/utnProfile" component={UtnProfile} />
                        </Switch>
                    </div>

                </BrowserRouter>            
             <Footer/>
        </div>
        
    );
}