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
import ReportListsService from '../services/ReportListsService';
import JobOfferService from '../services/JobOfferService';

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons
import 'react-notifications/lib/notifications.css';

const ApplicantJobofferToApply = () => {
    let emptyJob = { id: '', title: '', description: '', area: '', body: '', experience: '',
          modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
          deletedDay: '', deleted: '', state: '', message: ''};
    
    const [applied, setApplied] = useState(''); 
    const [loading2, setLoading2] = useState(true);
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [jobApplied, setJobApplied] = useState(emptyJob);
  
    useEffect(() => {
        let jobidApp = JSON.parse(localStorage.getItem("jobAppliedID")); 
        localStorage.removeItem("jobAppliedID");
        JobOfferService.get(jobidApp).then(data => { getJob(data); setLoading2(false) });
    }, []);

    const getJob = (data) => {   
        console.log(data)     
        setJobApplied(data);
        setTimeout(() => {
            setJobofferDialog(true);  
          }, 1000);        
    }   

    const editjobofferapplied = () => {     
        JobOfferService.applicantPostulate(jobApplied.id).then((data) => {
            if(data) Swal({text: 'Congratulation!!! is postulate in this job',
                    icon: 'success', timer:'3500'});    
            
        }).catch(error=>{
            Swal({text: 'Failed Apply. You are already applied.',
                    icon: 'error', timer:'3500'});
            console.log(error.message);            
        })
    }

    const headerDialog = () => {
        return (
            <h5 className="titleDialog">Complete Data by Applicant and Job Offer</h5>
        );
    }

    const closeAndSendHome = () => {
        setJobofferDialog(false);
        window.location.href = './home';
    }

    return(
        <div className="datatable-filter">
            <Dialog className="p-fluid containerDialog" header={headerDialog} visible={jobofferDialog} style={{width: '1000px'}} modal={true} onHide={() => closeAndSendHome() }>
        
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="id">ID</label> </div>
                    <div className="field">
                        <InputText id="id" value={jobApplied.id} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor=""></label> </div>
                    <div className="field">
                        
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
                    <div className="field col titleLabelByCategory"> <label htmlFor="category">Category</label> </div>
                    <div className="field">
                        <InputText id="category" value={jobApplied.category} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="modifiedDay">ModifiedDay</label> </div>
                    <div className="field">
                        <InputText id="modifiedDay" value={jobApplied.modifiedDay} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="datePublished">DatePublished</label> </div>
                    <div className="field">
                        <InputText id="datePublished" value={jobApplied.datePublished} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col titleLabelByCategory"> <label htmlFor="deletedDay">DeletedDay</label> </div>
                    <div className="field">
                        <InputText id="deletedDay" value={jobApplied.deletedDay} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col titleLabelByCategory"> <label htmlFor="deleted">Deleted</label> </div>
                    <div className="field">
                        <InputText id="deleted" value={jobApplied.deleted} readOnly style={{width : '100%'}} />
                    </div> 
                    <div className="field col titleLabelByCategory"> <label htmlFor="state">State</label> </div>
                    <div className="field">
                        <InputText id="state" value={jobApplied.state} readOnly style={{width : '100%'}} />
                    </div>                    
                </div> 
                

                <div className="formgrid grid">
                <div className="field col titleLabelByCategory"> <label htmlFor="deleted"></label> </div>
                    <div className="field"></div>
                    <div className="field">
                        <Button label="APPLY" icon="pi pi-send" className="p-button-rounded p-button-success mr-4" 
                            style={{bottom: -20, right: '10%'}}
                            onClick={() => editjobofferapplied() } />    
                    </div>                
                </div>                 
            </Dialog>            
                                                          
        </div>
    );
}

export default ApplicantJobofferToApply;