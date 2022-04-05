import React, {useState, useEffect} from "react";
import AuthService from "../../services/AuthService";
import ProfileStyle from '../../assets/css/ProfileCss.css';
import ApplicantProfile from "../applicant/ApplicantProfile";
import PublisherProfile from "../publisher/PublisherProfile";
import AdminProfile from "../admin/AdminProfile";
import UtnProfile from "../utn/UtnProfile";
import Admin from "../../screens/Admin/Admin";
import ProfileCss from '../../assets/css/ProfileCss.css';

const Profile = () => {
  let emptyUser = { jwt: '', id: '', role: '', username: ''};  
  const [utnBoard, setUtnBoard] = useState(false);
  const [adminBoard, setAdminBoard] = useState(false);
  const [publisherBoard, setPublisherBoard] = useState(false);
  const [applicantBoard, setApplicantBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(emptyUser);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setUtnBoard(user.role.role === "UTN" ? true : false);
      setAdminBoard(user.role.role === "ADMIN" ? true : false);
      setPublisherBoard(user.role.role === "PUBLISHER" ? true : false);
      setApplicantBoard(user.role.role === "APPLICANT" ? true : false);
    }
  }, []);

  return (
    <div className="profilebackground">
        <section className="column1 col-7 fixed-top offset-fixed f-left  my-5 pt-5">
            <div className="container card profile">
              {utnBoard && (<UtnProfile/>)}
              {adminBoard && (<AdminProfile />)}
              {publisherBoard && (<PublisherProfile />)}
              {applicantBoard && ( <ApplicantProfile />)}
            </div>              
        </section>
        <section className="column2 col-5 fixed-top offset-fixed f-right my-5 pt-5">
            <div className="container card profile">
                <header className="jumbotron">
                  <h1> User Profile Credentials</h1>
                  <h3> <strong>Username : </strong>
                    <strong>{currentUser.username}</strong>
                  </h3>
                </header>
                <p> 
                  <strong>Token : </strong> {currentUser.jwt.substring(0, 20)} ...{" "}
                  {currentUser.jwt.substr(currentUser.jwt.length - 20)}
                </p>
                <p>
                  <strong>User Id: </strong> {currentUser.id}
                </p>
                <p>
                  <strong>Email: </strong> {currentUser.username}
                </p>
                <strong>Authorities: </strong> {currentUser.role.role}
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>   
        </section>
    </div>
    
  );
};

export default Profile;
