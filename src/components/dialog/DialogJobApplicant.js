import React, { useState, useEffect, useContext} from 'react';
import { InputText } from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import '../../assets/css/DataCategoryFilter.css';
import AuthService from "../../services/AuthService";
import JobApplicantContext from '../../context/jobApplicant/JobApplicantContext';

const DialogJobApplicant = () => {
    const jobApplied = useContext(JobApplicantContext);
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [utnBoard, setUtnBoard] = useState(false);
    const [adminBoard, setAdminBoard] = useState(false);
    const [publisherBoard, setPublisherBoard] = useState(false);
    const [applicantBoard, setApplicantBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        setJobofferDialog(true);
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setUtnBoard(user.role.role === "UTN" ? true : false);
            setAdminBoard(user.role.role === "ADMIN" ? true : false);
            setPublisherBoard(user.role.role === "PUBLISHER" ? true : false);
            setApplicantBoard(user.role.role === "APPLICANT" ? true : false);
        }
    }, []);
    const headerDialog = () => {return (<h5 className="titleDialog">Complete Data by Applicant and Job Offer</h5>);}
    const closeAndSendHome = () => {setJobofferDialog(false); window.location.href = './home'; }

    return(
        <Dialog className="p-fluid containerDialog" header={headerDialog} visible={jobofferDialog} style={{width: '1000px'}} modal={true} onHide={() => closeAndSendHome()}>    
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="jobOfferApplicantID">JobOfferApplicantID</label> </div>
                    <div className="field">
                        <InputText id="jobOfferApplicantID" value={jobApplied.jobOfferApplicantID} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="applied">Applied</label> </div>
                    <div className="field">
                        <InputText id="applied" value={jobApplied.applied} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="deletedDay">DeletedDay</label> </div>
                    <div className="field">
                        <InputText id="deletedDay" value={jobApplied.deletedDay} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="jobAppdeleted">JobAppdeleted</label> </div>
                    <div className="field">
                        <InputText id="jobAppdeleted" value={jobApplied.jobAppdeleted} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="applicantID">ApplicantID</label> </div>
                    <div className="field">
                        <InputText id="applicantID" value={jobApplied.applicantID} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="name">Name</label> </div>
                    <div className="field">
                        <InputText id="name" value={jobApplied.name} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="surname">Surname</label> </div>
                    <div className="field">
                        <InputText id="surname" value={jobApplied.surname} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="dni">DNI</label> </div>
                    <div className="field">
                        <InputText id="dni" value={jobApplied.dni} style={{width : '100%'}} readOnly />
                    </div>
                </div>

                    <div className="field col titleLabelByCategory"> <label htmlFor="email">Email</label> </div>
                    <div className="field">
                        <InputText id="email" value={jobApplied.email} readOnly style={{width : '70%'}} />
                    </div>


                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="phoneNumber">PhoneNumber</label> </div>
                    <div className="field">
                        <InputText id="phoneNumber" value={jobApplied.phoneNumber} style={{width : '100%'}} readOnly />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="typeStudent">TypeStudent</label> </div>
                    <div className="field">
                        <InputText id="typeStudent" value={jobApplied.typeStudent} readOnly style={{width : '100%'}} />
                    </div>                   
                </div>
                <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="jobOfferID">JobOfferID</label> </div>
                    <div className="field">
                        <InputText id="jobOfferID" value={jobApplied.jobOfferID} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="state">State</label> </div>
                    <div className="field">
                        <InputText id="state" value={jobApplied.state} readOnly style={{width : '100%'}} />
                    </div>                    
                </div>  
                
                    <div className="field col titleLabelByCategory"> <label htmlFor="title">Title</label> </div>
                    <div className="field">
                        <InputText id="title" value={jobApplied.title} style={{width : '70%'}} readOnly />
                    </div>

                    <div className="field col titleLabelByCategory"> <label htmlFor="description">Description</label> </div>
                    <div className="field">
                        <InputTextarea id="description" value={jobApplied.description} readOnly style={{width : '100%'}} rows={3} cols={80} />
                    </div>

                    <div className="field col titleLabelByCategory"> <label htmlFor="body">Body</label> </div>
                    <div className="field">
                        <InputTextarea id="body" value={jobApplied.body} readOnly style={{width : '100%'}} rows={3} cols={80} />
                    </div>
                
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="area">Area</label> </div>
                    <div className="field">
                        <InputText id="area" value={jobApplied.area} style={{width : '100%'}} readOnly />
                    </div>                    
                    <div className="field col titleLabelByCategory"> <label htmlFor="experience">Experience</label> </div>
                    <div className="field">
                        <InputText id="experience" value={jobApplied.experience} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="modality">Modality</label> </div>
                    <div className="field">
                        <InputText id="modality" value={jobApplied.modality} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="position">Position</label> </div>
                    <div className="field">
                        <InputText id="position" value={jobApplied.position} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="datePublished">DatePublished</label> </div>
                    <div className="field">
                        <InputText id="datePublished" value={jobApplied.datePublished} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="modifiedDay">ModifiedDay</label> </div>
                    <div className="field">
                        <InputText id="modifiedDay" value={jobApplied.modifiedDay} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="jobOfferDeletedDay">JobOfferDeletedDay</label> </div>
                    <div className="field">
                        <InputText id="jobOfferDeletedDay" value={jobApplied.jobOfferDeletedDay} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="jobOfferDeleted">JobOfferDeleted</label> </div>
                    <div className="field">
                        <InputText id="jobOfferDeleted" value={jobApplied.jobOfferDeleted} style={{width : '100%'}} readOnly />
                    </div>
                </div>
          </Dialog> 
    );
}
export default DialogJobApplicant;