import React, { useState, useEffect, useContext} from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert';
import { InputTextarea } from 'primereact/inputtextarea';
import '../../assets/css/DataCategoryFilter.css';
import AuthService from "../../services/AuthService";
import JobOfferService from '../../services/JobOfferService';
import JobOfferContext from '../../context/joboffer/JobOfferContext';

const DialogJobOffer = () => {
    const job = useContext(JobOfferContext);
    const [editjobofferID, setEditJobofferID] = useState('');
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [utnBoard, setUtnBoard] = useState(false);
    const [adminBoard, setAdminBoard] = useState(false);
    const [publisherBoard, setPublisherBoard] = useState(false);
    const [applicantBoard, setApplicantBoard] = useState(false);
    const [state, setState] = useState();
    const [currentUser, setCurrentUser] = useState(undefined);

    const states = [ {label: 'APPROVED', value: 'APPROVED'}, {label: 'REJECTED', value: 'REJECTED'}, 
    {label: 'REVIEW', value: 'REVIEW'}, {label: 'DELETED', value: 'DELETED'}];

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

    const headerDialog = () => {return (<h5 className="titleDialog">JobOffer Detail</h5>);}
    const closeAndSendHome = () => {setJobofferDialog(false); 
        {(publisherBoard ? ( window.location.href = './publisherJobOfferByCategory') : (window.location.href = './publisherJobOfferByCategory'))};
        {(applicantBoard ? ( window.location.href = './applicantYourApplicants' ) : (window.location.href = './applicantYourApplicants'))};
        {(utnBoard ? ( window.location.href = './utnJobOfferStateSelected' ) : (window.location.href = './utnJobOfferStateSelected'))};
    }

    const editjobofferapplied = () => {     
        JobOfferService.applicantPostulate(job.id).then((data) => {
            if(data) Swal({text: 'Congratulation!!! is postulate in this job', icon: 'success', timer:'3500'});
        }).catch(error=>{
            Swal({text: 'Failed Apply. You are already applied.', icon: 'error', timer:'3500'}); console.log(error.message); 
        })
    }

    const checkJoboffer = (e) => {
        let newState = e.value;
        let jobOfferEvaluationDTO = { id: job.id, decision: newState}
        JobOfferService.getJobOfferAllEvaluation(jobOfferEvaluationDTO).then((data) => {
            if(data) Swal({text: 'Success!! Modified job offer you state.', icon: 'success', timer:'3500'});
        }).catch(error=>{
            Swal({text: 'Failed Evaluation.' + error.message, icon: 'error', timer:'3500'}); console.log(error.message); 
        });
    }

    return (
        <Dialog header={headerDialog} visible={jobofferDialog} style={{width: '800px'}} modal={true} onHide={() => closeAndSendHome()}>
            <div className="field">
                <div className="field col titleLabelByCategory"> <label  htmlFor="id">JobOffer ID</label></div>
                <InputText value={job.id} readOnly style={{width : '25%'}} id="id" />                    
            </div>
            <div className="field">
                <div className="field col titleLabelByCategory"> <label htmlFor="title">Title</label> </div>
                <InputText id="title" value={job.title} style={{width : '100%'}} readOnly /> 
            </div>
            <div className="field">
                <div className="field col titleLabelByCategory"> <label htmlFor="description">Description</label> </div>
                <div className="field"> <InputTextarea id="description" value={job.description} style={{width : '100%'}} readOnly rows={3} cols={80}/> </div>
            </div>
            <div className="field">
                <div className="field col titleLabelByCategory"> <label htmlFor="body">Body</label> </div>
                <div className="field"> <InputTextarea id="body" value={job.body} style={{width : '100%'}} readOnly rows={3} cols={80}/> </div>
            </div>
            <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="area">Area</label> </div>
                <div className="field"> <InputText id="area" value={job.area} readOnly/> </div>
                <div className="field col titleLabelByCategory"> <label htmlFor="experience">Experience</label> </div>
                <div className="field"> <InputNumber id="experience" value={job.experience} readOnly/> </div>
            </div>

            <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="modality">Modality</label> </div>
                <div className="field"> <InputText id="modality" value={job.modality} readOnly/> </div>
                <div className="field col titleLabelByCategory"> <label htmlFor="position">Position</label> </div>
                <div className="field"> <InputNumber id="position" value={job.position} readOnly/> </div>
            </div>

            <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="category">Category</label> </div>
                <div className="field"> <InputText id="category" value={job.category} readOnly/> </div>
                <div className="field col titleLabelByCategory"> <label htmlFor="datePublished">Publicado</label> </div>
                <div className="field"> <InputNumber id="datePublished" value={job.datePublished} readOnly/> </div>
            </div>
            <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="modifiedDay">Modificado</label> </div>
                <div className="field"> <InputText id="modifiedDay" value={job.modifiedDay} readOnly/> </div>
                <div className="field col titleLabelByCategory"> <label htmlFor="deletedDay">Eliminado</label> </div>
                <div className="field"> <InputNumber id="deletedDay" value={job.deletedDay} readOnly/> </div>
            </div>

            <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="state">Estado</label> </div>
                <div className="field"> <InputText id="state" value={job.state} readOnly/> </div>
                <div className="field col titleLabelByCategory"> <label htmlFor="message">Mensajes</label> </div>
                <div className="field"> <InputNumber id="message" value={job.message} readOnly/> </div>
            </div>

            {applicantBoard ? (
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="deleted"></label> </div>                            
                    <div className="field"> <Button label="APPLY" icon="pi pi-send" className="p-button-rounded p-button-success mr-4" 
                                            style={{bottom: -20, right: '10%'}} onClick={() => editjobofferapplied() } /> </div>                
                </div>                       
            ) : ( <></> )}

            {utnBoard ? (
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="deleted"></label> </div>                            
                    <div className="field"> <Dropdown value={state} options={states} onChange={(e) => checkJoboffer(e)} placeholder="Check Joboffer"/> </div>
                </div> 
            ) : ( <></> )}

        </Dialog> 
    );
}

export default DialogJobOffer;