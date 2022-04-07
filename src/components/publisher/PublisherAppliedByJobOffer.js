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
import '../../assets/css/prueba.css'

const PublisherAppliedByJobOffer = () => {   
    let jobid = JSON.parse(localStorage.getItem("jobid"));
    localStorage.removeItem("jobid");

    let emptyJobApplicant = { jobOfferApplicantID: '', applied: '', deletedDay: '', jobAppdeleted: '', 
    applicantID: '', name: '', surname: '', dni: '', email: '', phoneNumber: '', typeStudent: '',
    jobOfferID: '', title: '', description: '', area: '', body: '', experience: '',
    modality: '', position: '', category: '', categoryDescription: '',
    datePublished: '', modifiedDay: '',
    jobOfferDeletedDay: '', jobOfferDeleted: '', state: ''};    
    
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

    const headerTable = () => {
        return (
            <h5 className="p-datatable-customers">List Applied Student</h5>
        );
    }
    const headerDialog = () => {
        return (
            <h5 className="titleDialog">Complete Data by Applicant and Job Offer</h5>
        );
    }

    return(
        <div className="datatable-filter">            
            <DataTable value={applied} paginator className="p-datatable-customers" rows={10} 
                dataKey="id" filters={jobofferApplied} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                globalFilterFields={['applied','jobAppdeleted','studentid','name','surname','typeStudent','title','area']}  header={headerTable} emptyMessage="No customers found."
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers">
                <Column field="applied" header="Applied" filter filterPlaceholder="Search by applied" style={{ minWidth: '10rem' }} />                
                <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column field="surname" header="Surname" filter filterPlaceholder="Search by surname" style={{ minWidth: '12rem' }} />
                <Column field="typeStudent" header="TypeStudent" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={typeStudentBodyTemplate} filter filterElement={typeStudentRowFilterTemplate} />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>

            <Dialog className="p-fluid containerDialog" header={headerDialog} visible={jobofferDialog} style={{width: '1000px'}} modal={true} onHide={() => setJobofferDialog(false)}>
        
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
                                                          
        </div>
    );
}

export default PublisherAppliedByJobOffer;