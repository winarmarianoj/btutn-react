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

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons
import 'react-notifications/lib/notifications.css';

const ApplicantYourApplicants = () => {
    let emptyJobApplicant = { jobOfferApplicantID: '', applied: '', deletedDay: '', jobAppdeleted: '', 
      applicantID: '', name: '', surname: '', dni: '', email: '', phoneNumber: '', typeStudent: '',
      jobOfferID: '', title: '', description: '', area: '', body: '', experience: '',
      modality: '', position: '', category: '', categoryDescription: '',
      datePublished: '', modifiedDay: '',
      jobOfferDeletedDay: '', jobOfferDeleted: '', state: ''};  

    const [jobofferApplied, setJobofferApplied] = useState({      
      'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH }, 
      'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'category': { value: null, matchMode: FilterMatchMode.EQUALS } 
    });
    const [applied, setApplied] = useState([]); 
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');    
    const [loading2, setLoading2] = useState(true);
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [jobApplied, setJobApplied] = useState(emptyJobApplicant);

    const categories = [
        'FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA', 'BILLING', 'THIRD-PARTIES', 'CONTRACT'
    ];
  
    useEffect(() => {        
        ReportListsService.getJobApplicantAllByApplicant().then(data => { 
            setApplied(data); setLoading2(false) 
        }).catch(error=>{
            Swal({text: 'Failed get joboffers to applied.',
                    icon: 'error', timer:'3500'});
            console.log(error.message);            
        })
    }, []);

    const onGlobalFilterChange2 = (e) => {
      const value = e.target.value;
      let _filters2 = { ...jobofferApplied };
      _filters2['category'].value = value;

      setJobofferApplied(_filters2);
      setGlobalFilterValue2(value);
    }

    const categoriesBodyTemplate = (rowData) => {
        return <span className={`customer-badge category-${rowData.category}`}>{rowData.category}</span>;
    }

    const categoriesFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={categories} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={categoriesItemTemplate} placeholder="Select a Category" className="p-column-filter" showClear />;
    }

    const categoriesItemTemplate = (option) => {
        return <span className={`customer-badge category-${option}`}>{option}</span>;
    }

    const categoriesRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={categories} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={categoriesItemTemplate} placeholder="Select a Categories" className="p-column-filter" showClear />;
    }

    const editjoboffer = (rowData) => { 
      let id = rowData.rowData.jobOfferID;
      applied.forEach(element => {
        if(element.jobOfferID===id){
          setJobApplied(element)
        }
      });
            
        setTimeout(() => {
          setJobofferDialog(true);  
        }, 2000);
    }    

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>         
                <Button icon="pi pi-list" label="More Info" className="p-button-rounded p-button-light " onClick={() => editjoboffer({rowData}) } /> 
            </React.Fragment>
        );
    }

    const headerTable = () => {
        return (
            <h5 className="p-datatable-customers">My Applied JobOffers</h5>
        );
    }
    const headerDialog = () => {
        return (
            <h5 className="titleDialog">JobOffer Applied Detail</h5>
        );
    }

    return (
        <div className="datatable-filter">
            <DataTable value={applied} paginator className="p-datatable-customers" rows={10} 
                dataKey="id" filters={jobofferApplied} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                globalFilterFields={['title','area','experience','modality','position','category']}  header={headerTable} emptyMessage="No customers found."
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers">                    
                <Column field="title" header="Title" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />                    
                <Column field="area" header="Area" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="experience" header="Experience" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="modality" header="Modality" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                <Column field="position" header="Position" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />                    
                <Column field="category" header="Category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={categoriesBodyTemplate} filter filterElement={categoriesRowFilterTemplate}/>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
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

export default ApplicantYourApplicants;