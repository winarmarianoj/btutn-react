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
import PublisherApplicantByJobOffer from './PublisherApplicantByJobOffer';

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
//import 'primereact/resources/themes/saga-orange/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'react-notifications/lib/notifications.css';

const PublisherJobOfferByCategory = () => {
    let emptyJoboffer = { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''};

    const [joboffers, setJoboffers] = useState(null); 
    const [joboffer, setJoboffer] = useState({
        'id': { value: null, matchMode: FilterMatchMode.EQUALS },
        'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'category': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');    
    const [loading2, setLoading2] = useState(true);
    const [jobofferDialog, setJobofferDialog] = useState(false);
    const [job, setJob] = useState(emptyJoboffer);
    
    const categories = [
        'FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA', 'BILLING', 'THIRD-PARTIES', 'CONTRACT'
    ];

    useEffect(() => {        
        ReportListsService.getJobOfferAllByPublisher().then(data => { setJoboffers(data); setLoading2(false) });        
    }, []);

    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...joboffer };
        _filters2['category'].value = value;

        setJoboffer(_filters2);
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
        JobOfferService.get(rowData.rowData.id).then(response => {
            setJob(response);
        }).catch(error=>{      
            console.log(error.message);
        })
        setJobofferDialog(true);
    }    

    const openApplicantByJoboffer = (rowData) => {
        console.log(rowData)
        console.log(rowData.rowData.id)
        localStorage.setItem("jobid", JSON.stringify(rowData.rowData.id));
        window.location.href = './publisherApplicantByJobOffer';
        //window.location.assign(link) icon="pi pi-pencil"  icon="pi pi-list";
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>               
                <Button label="Edit" className="p-button-rounded p-button-success " onClick={() => editjoboffer({rowData}) } /> 
                <Button label="Applied" className="p-button-rounded p-button-info " onClick={() => openApplicantByJoboffer({rowData}) } /> 
            </React.Fragment>
        );
    }

    const headerTable = () => {
        return (
            <h5 className="p-datatable-customers">Filter JobOffers by Categories</h5>
        );
    }
    const headerDialog = () => {
        return (
            <h5 className="titleDialog">JobOffer Detail</h5>
        );
    }

    return (
            <div className="datatable-filter">
                <DataTable value={joboffers} paginator className="p-datatable-customers" rows={10} 
                    dataKey="id" filters={joboffer} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                    globalFilterFields={['id','title','description','area','experience','modality','position','category']}  header={headerTable} emptyMessage="No customers found."
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers">
                    <Column field="id" header="Id" filter filterPlaceholder="Search" style={{ minWidth: '10rem' }} />
                    <Column field="title" header="Title" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="description" header="Description" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="area" header="Area" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="experience" header="Experience" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="modality" header="Modality" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="position" header="Position" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />                    
                    <Column field="category" header="Category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={categoriesBodyTemplate} filter filterElement={categoriesRowFilterTemplate}/> 
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>

                <Dialog header={headerDialog} visible={jobofferDialog} style={{width: '600px'}} modal={true} onHide={() => setJobofferDialog(false)}>
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
            </div>
    );
}

export default PublisherJobOfferByCategory;
                 