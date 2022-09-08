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

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons
import 'react-notifications/lib/notifications.css';

const ApplicantYourApplicants = () => {    
    const [jobofferApplied, setJobofferApplied] = useState({ 
        'jobOfferID': { value: null, matchMode: FilterMatchMode.EQUALS },
        'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'category': { value: null, matchMode: FilterMatchMode.EQUALS } 
    });
    const context = useContext(JobApplicantContext);
    const [redirection, setRedirection] = useState(false);
    const [applied, setApplied] = useState([]); 
    const [loading2, setLoading2] = useState(true);
    const categories = ['FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA', 'BILLING', 'THIRD-PARTIES', 'CONTRACT'];
  
    useEffect(() => {        
        ReportListsService.getJobApplicantAllByApplicant().then(data => {setApplied(data); setLoading2(false) 
        }).catch(error=>{
            Swal({text: 'Failed get joboffers to applied.', icon: 'error', timer:'3500'}); console.log(error.message);
    })}, []);

    const categoriesBodyTemplate = (rowData) => {return <span className={`customer-badge category-${rowData.category}`}>{rowData.category}</span>;}

    const categoriesItemTemplate = (option) => {return <span className={`customer-badge category-${option}`}>{option}</span>;}

    const categoriesRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={categories} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={categoriesItemTemplate} placeholder="Select a Categories" className="p-column-filter" showClear />;
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
                <Button icon="pi pi-list" label="More Info" className="p-button-rounded p-button-light " onClick={() => editjobofferapplied({rowData}) } />  
            </React.Fragment>
        );
    }

    const headerTable = () => {return (<h5 className="p-datatable-customers">My Applied JobOffers</h5>);}    

    return redirection ? (<Redirect to="/dialogJobApplicant"/> ) : (
        <div className="datatable-filter">
            <DataTable value={applied} paginator className="p-datatable-customers" rows={10} 
                dataKey="id" filters={jobofferApplied} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                globalFilterFields={['jobOfferID','title','area','experience','modality','position','category']}  header={headerTable} emptyMessage="No customers found."
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers">
                <Column field="jobOfferID" header="JobOfferID" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="title" header="Title" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="area" header="Area" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="experience" header="Experience" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="modality" header="Modality" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="position" header="Position" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />                    
                <Column field="category" header="Category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={categoriesBodyTemplate} filter filterElement={categoriesRowFilterTemplate}/>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>            
        </div>
    );
}
export default ApplicantYourApplicants;