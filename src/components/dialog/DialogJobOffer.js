import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import {Dialog} from 'primereact/dialog';
import Swal from 'sweetalert';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import '../../assets/css/DataCategoryFilter.css';
import ReportListsService from '../../services/ReportListsService';
import JobOfferService from '../../services/JobOfferService';
import PublisherApplicantByJobOffer from '../../components/publisher/PublisherAppliedByJobOffer';

const DialogJobOffer = () => {
    
    let emptyJoboffer = { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''};

    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [job, setJob] = useState(emptyJoboffer);

    useEffect(() => {
        let editjobofferID = JSON.parse(localStorage.getItem("editjobofferID")); 
        localStorage.removeItem("editjobofferID");
        JobOfferService.get(editjobofferID).then(response => {
            setJob(response);
            setJobofferDialog(true) ; 
        }).catch(error=>{      
            console.log(error.message);
        })
          
        
        console.log(job)
        console.log(jobofferDialog)
    }, []);

    const headerDialog = () => {
        return (
            <h5 className="titleDialog">JobOffer Detail</h5>
        );
    }

    const closeAndSendHome = () => {
        setJobofferDialog(false);
        window.location.href = './home';
    }

    return (
        <Dialog header={headerDialog} visible={jobofferDialog} style={{width: '600px'}} modal={true} onHide={() => closeAndSendHome()}>
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
                        <div className="field">
                            <InputTextarea id="description" value={job.description} style={{width : '100%'}} readOnly/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="field col titleLabelByCategory"> <label htmlFor="body">Body</label> </div>
                        <div className="field">
                            <InputTextarea id="body" value={job.body} style={{width : '100%'}} readOnly/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col titleLabelByCategory"> <label htmlFor="area">Area</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.area} readOnly/>
                        </div>
                        <div className="field col titleLabelByCategory"> <label htmlFor="experience">Experience</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.experience} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col titleLabelByCategory"> <label htmlFor="modality">Modality</label> </div>
                        <div className="field">
                            <InputText id="modality" value={job.modality} readOnly/>
                        </div>
                        <div className="field col titleLabelByCategory"> <label htmlFor="position">Position</label> </div>
                        <div className="field">
                            <InputNumber id="position" value={job.position} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col titleLabelByCategory"> <label htmlFor="category">Category</label> </div>
                        <div className="field">
                            <InputText id="category" value={job.category} readOnly/>
                        </div>
                        <div className="field col titleLabelByCategory"> <label htmlFor="datePublished">Publicado</label> </div>
                        <div className="field">
                            <InputNumber id="datePublished" value={job.datePublished} readOnly/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col titleLabelByCategory"> <label htmlFor="modifiedDay">Modificado</label> </div>
                        <div className="field">
                            <InputText id="modifiedDay" value={job.modifiedDay} readOnly/>
                        </div>
                        <div className="field col titleLabelByCategory"> <label htmlFor="deletedDay">Eliminado</label> </div>
                        <div className="field">
                            <InputNumber id="deletedDay" value={job.deletedDay} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col titleLabelByCategory"> <label htmlFor="state">Estado</label> </div>
                        <div className="field">
                            <InputText id="state" value={job.state} readOnly/>
                        </div>
                        <div className="field col titleLabelByCategory"> <label htmlFor="message">Mensajes</label> </div>
                        <div className="field">
                            <InputNumber id="message" value={job.message} readOnly/>
                        </div>
                    </div>
                </Dialog> 
    );
}

export default DialogJobOffer;