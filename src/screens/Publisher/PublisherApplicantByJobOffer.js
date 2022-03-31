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
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';


import {Dialog} from 'primereact/dialog';
import Swal from 'sweetalert';
import '../../assets/css/DataCategoryFilter.css';
import ReportListsService from '../../services/ReportListsService';

const PublisherApplicantByJobOffer = () => {   
    let jobid = JSON.parse(localStorage.getItem("jobid"));
    console.log(jobid);

    let emptyJobApplicant = { jobId: '', applied: '', deletedDay: '', jobAppdeleted: '', 
        studentid: '', name: '', surname: '', dni: '', email: '', phoneNumber: '', typeStudent: '',
        title: '', description: '', area: '', body: '', experience: '',
        modality: '', position: '', datePublished: '', modifiedDay: '',
        jobOfferDeletedDay: '', jobOfferDeleted: '', state: ''};    

    useEffect(() => {   
    }, []);
    
    /*const [jobofferApplied, setJobofferApplied] = useState({
        'jobid': { value: null, matchMode: FilterMatchMode.EQUALS },
        'applied': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'deletedDay': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'jobAppdeleted': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'studentid': { value: null, matchMode: FilterMatchMode.EQUALS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'surname': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'dni': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'email': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'phoneNumber': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'typeStudent': { value: null, matchMode: FilterMatchMode.EQUALS },
        'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },        
        'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'body': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'category': { value: null, matchMode: FilterMatchMode.EQUALS }        
    });*/

    const [jobofferApplied, setJobofferApplied] = useState({
        'applied': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'jobAppdeleted': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'studentid': { value: null, matchMode: FilterMatchMode.EQUALS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'surname': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'typeStudent': { value: null, matchMode: FilterMatchMode.EQUALS },
        'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH }, 
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH }    
    });
    const [applied, setApplied] = useState(''); 
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');    
    const [loading2, setLoading2] = useState(true);
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [jobApplied, setJobApplied] = useState(emptyJobApplicant);
    const studentTypes = ['ACTIVE', 'REGULAR', 'RECEIVED'];
   
    

    useEffect(() => {        
        ReportListsService.getJobApplicantAllByJobOfferSimplePublisher(jobid).then(data => { setApplied(data); setLoading2(false) });
        //ReportListsService.getJobApplicantAllByJobOfferSimplePublisher(data).then(data => { setApplied(data); setLoading2(false) });        
    }, []);

    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...jobofferApplied };
        _filters2['typeStudent'].value = value;

        setJobofferApplied(_filters2);
        setGlobalFilterValue2(value);
    }

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Type Student" />
                </span>
            </div>
        )
    }

    const typeStudentBodyTemplate = (rowData) => {
        return <span className={`customer-badge typeStudent-${rowData.typeStudent}`}>{rowData.typeStudent}</span>;
    }

    const typeStudentFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={studentTypes} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={typeStudentItemTemplate} placeholder="Select a Type Student" className="p-column-filter" showClear />;
    }

    const typeStudentItemTemplate = (option) => {
        return <span className={`customer-badge typeStudent-${option}`}>{option}</span>;
    }

    const typeStudentRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={studentTypes} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typeStudentItemTemplate} placeholder="Select a Student Types" className="p-column-filter" showClear />;
    }

    const editjobofferapplied = (rowData) => {        
        setJobApplied(rowData.rowData);
        setJobofferDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label="More Data" icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editjobofferapplied({rowData}) } /> 
            </React.Fragment>
        );
    }

    const header2 = renderHeader2();

    return(
        <div className="card">
            <h5>Applied By JobOffer</h5>
            <DataTable value={applied} paginator className="p-datatable-customers" rows={10} 
                dataKey="id" filters={jobofferApplied} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                globalFilterFields={['applied','jobAppdeleted','studentid','name','surname','typeStudent','title','area']}  header={header2} emptyMessage="No customers found.">
                <Column field="applied" header="Applied" filter filterPlaceholder="Search by applied" style={{ minWidth: '10rem' }} />                
                <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column field="surname" header="Surname" filter filterPlaceholder="Search by surname" style={{ minWidth: '12rem' }} />
                <Column field="typeStudent" header="TypeStudent" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={typeStudentBodyTemplate} filter filterElement={typeStudentRowFilterTemplate} />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>

            <Dialog header="JobOffer" visible={jobofferDialog} style={{width: '1000px'}} modal={true} onHide={() => setJobofferDialog(false)}>
        
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="jobId">JobId</label> </div>
                    <div className="field">
                        <InputText id="jobId" value={jobApplied.jobId} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="applied">Applied</label> </div>
                    <div className="field">
                        <InputText id="applied" value={jobApplied.applied} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="deletedDay">DeletedDay</label> </div>
                    <div className="field">
                        <InputText id="deletedDay" value={jobApplied.deletedDay} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="jobAppdeleted">JobAppdeleted</label> </div>
                    <div className="field">
                        <InputText id="jobAppdeleted" value={jobApplied.jobAppdeleted} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="studentid">StudentID</label> </div>
                    <div className="field">
                        <InputText id="studentid" value={jobApplied.studentid} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="name">Name</label> </div>
                    <div className="field">
                        <InputText id="name" value={jobApplied.name} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="surname">Surname</label> </div>
                    <div className="field">
                        <InputText id="surname" value={jobApplied.surname} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="dni">DNI</label> </div>
                    <div className="field">
                        <InputText id="dni" value={jobApplied.dni} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="email">Email</label> </div>
                    <div className="field">
                        <InputText id="email" value={jobApplied.email} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="phoneNumber">PhoneNumber</label> </div>
                    <div className="field">
                        <InputText id="phoneNumber" value={jobApplied.phoneNumber} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="typeStudent">TypeStudent</label> </div>
                    <div className="field">
                        <InputText id="typeStudent" value={jobApplied.typeStudent} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="title">Title</label> </div>
                    <div className="field">
                        <InputText id="title" value={jobApplied.title} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="description">Description</label> </div>
                    <div className="field">
                        <InputTextarea id="description" value={jobApplied.description} readOnly style={{width : '100%'}} rows={3} cols={80} />
                    </div>
                    <div className="field col"> <label htmlFor="area">Area</label> </div>
                    <div className="field">
                        <InputText id="area" value={jobApplied.area} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="body">Body</label> </div>
                    <div className="field">
                        <InputTextarea id="body" value={jobApplied.body} readOnly style={{width : '100%'}} rows={3} cols={80} />
                    </div>
                    <div className="field col"> <label htmlFor="experience">Experience</label> </div>
                    <div className="field">
                        <InputText id="experience" value={jobApplied.experience} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="modality">Modality</label> </div>
                    <div className="field">
                        <InputText id="modality" value={jobApplied.modality} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="position">Position</label> </div>
                    <div className="field">
                        <InputText id="position" value={jobApplied.position} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="datePublished">DatePublished</label> </div>
                    <div className="field">
                        <InputText id="datePublished" value={jobApplied.datePublished} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="modifiedDay">ModifiedDay</label> </div>
                    <div className="field">
                        <InputText id="modifiedDay" value={jobApplied.modifiedDay} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="jobOfferDeletedDay">JobOfferDeletedDay</label> </div>
                    <div className="field">
                        <InputText id="jobOfferDeletedDay" value={jobApplied.jobOfferDeletedDay} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="jobOfferDeleted">JobOfferDeleted</label> </div>
                    <div className="field">
                        <InputText id="jobOfferDeleted" value={jobApplied.jobOfferDeleted} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="state">State</label> </div>
                    <div className="field">
                        <InputText id="state" value={jobApplied.state} readOnly style={{width : '100%'}} />
                    </div>
                    
                </div> 
            </Dialog>                                                 
        </div>
    );
}

export default PublisherApplicantByJobOffer;