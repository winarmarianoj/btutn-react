import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import '../../assets/css/DataCategoryFilter.css';
import JobOfferContext from '../../context/joboffer/JobOfferContext';

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons
import 'react-notifications/lib/notifications.css';

const ApplicantJobofferToApply = () => {
    const context = useContext(JobOfferContext);
    const [redirection, setRedirection] = useState(false);
  
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("jobOfferData"));
        console.log(data)
        context.setId(data.id); context.setTitle(data.title);
        context.setDescription(data.description); context.setArea(data.area); 
        context.setBody(data.body); context.setExperience(data.experience); 
        context.setModality(data.modality); context.setPosition(data.position);
        context.setCategory(data.category); context.setDatePublished(data.datePublished);
        context.setModifiedDay(data.modifiedDay); context.setDeletedDay(data.deletedDay);
        context.setDeleted(data.deleted); context.setState(data.state);
        context.setMessage(data.message); setRedirection(true);
        localStorage.removeItem("jobOfferData");        
    }, []);

    return redirection ? (<Redirect to="/dialogJobOffer"/>) : (
        <div><h5>ACA NO HAY NADA LOCOOOOOOOO</h5></div>       
    );
}

export default ApplicantJobofferToApply;