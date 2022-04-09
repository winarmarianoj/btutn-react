import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { FilterMatchMode} from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Swal from 'sweetalert';
import '../../assets/css/DataCategoryFilter.css';
import ReportListsService from '../../services/ReportListsService';
import JobApplicantContext from '../../context/jobApplicant/JobApplicantContext';
import '../../assets/css/prueba.css'

const PublisherAppliedByJobOffer = () => {
    let jobid = JSON.parse(localStorage.getItem("jobid"));
    localStorage.removeItem("jobid");
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
    const context = useContext(JobApplicantContext);
    const [redirection, setRedirection] = useState(false);
    const [applied, setApplied] = useState(''); 
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');    
    const [loading2, setLoading2] = useState(true);
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const studentTypes = ['ACTIVE', 'REGULAR', 'RECEIVED'];
   
    useEffect(() => {        
        ReportListsService.getJobApplicantAllByJobOfferSimplePublisher(jobid).then(data => { setApplied(data); setLoading2(false)
        }).catch(error=>{
            Swal({text: 'Failed get applicants to applied.', icon: 'error', timer:'3500'}); console.log(error.message);
    })}, []);

    const typeStudentBodyTemplate = (rowData) => {return <span className={`customer-badge typeStudent-${rowData.typeStudent}`}>{rowData.typeStudent}</span>;}

    const typeStudentFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={studentTypes} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={typeStudentItemTemplate} placeholder="Select a Type Student" className="p-column-filter" showClear />;
    }

    const typeStudentItemTemplate = (option) => {return <span className={`customer-badge typeStudent-${option}`}>{option}</span>;}

    const typeStudentRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={studentTypes} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typeStudentItemTemplate} placeholder="Select a Student Types" className="p-column-filter" showClear />;
    }

    const editjobofferapplied = (rowData) => {
        context.setJobOfferApplicantID(rowData.rowData.jobOfferApplicantID);
        context.setApplied(rowData.rowData.applied);
        context.setDeletedDay(rowData.rowData.deletedDay);
        context.setJobAppdeleted(rowData.rowData.jobAppdeleted);
        context.setApplicantID(rowData.rowData.applicantID);
        context.setName(rowData.rowData.name);
        context.setSurname(rowData.rowData.surname);
        context.setDni(rowData.rowData.dni);
        context.setEmail(rowData.rowData.email);
        context.setPhoneNumber(rowData.rowData.phoneNumber);
        context.setTypeStudent(rowData.rowData.typeStudent);
        context.setJobOfferID(rowData.rowData.jobOfferID);
        context.setTitle(rowData.rowData.title);
        context.setDescription(rowData.rowData.description);
        context.setArea(rowData.rowData.area);
        context.setBody(rowData.rowData.body);
        context.setExperience(rowData.rowData.experience);
        context.setModality(rowData.rowData.modality);
        context.setPosition(rowData.rowData.position);
        context.setCategory(rowData.rowData.category);
        context.setCategoryDescription(rowData.rowData.categoryDescription);
        context.setDatePublished(rowData.rowData.datePublished);
        context.setModifiedDay(rowData.rowData.modifiedDay);
        context.setJobOfferDeletedDay(rowData.rowData.jobOfferDeletedDay);
        context.setJobOfferDeleted(rowData.rowData.jobOfferDeleted);
        context.setState(rowData.rowData.state);
        setRedirection(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label="More Info" icon="pi pi-list" className="p-button-rounded p-button-success mr-2" onClick={() => editjobofferapplied({rowData}) } /> 
            </React.Fragment>
        );
    }

    const headerTable = () => {return (<h5 className="p-datatable-customers">List Applied Student</h5>);}

    return redirection ? (<Redirect to="/dialogJobApplicant"/> ) : (
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
        </div>
    );
}

export default PublisherAppliedByJobOffer;