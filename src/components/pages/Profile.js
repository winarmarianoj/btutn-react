import React from "react";
import AuthService from "../../services/AuthService";
import ProfileStyle from '../../assets/css/ProfileCss.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container profile">
      <header className="jumbotron">
        <h1> Profile </h1>
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
  );
};

export default Profile;
