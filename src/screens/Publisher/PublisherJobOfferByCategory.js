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

import "primereact/resources/themes/arya-orange/theme.css";          //theme
//import 'primereact/resources/themes/saga-orange/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'react-notifications/lib/notifications.css';

import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';

import '../../assets/css/DataCategoryFilter.css';
import ReportListsService from '../../services/ReportListsService';
import JobOfferService from '../../services/JobOfferService';
import DialogTest from './DialogTest';

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

    const [getJob, setGetJob] = useState(emptyJoboffer);
    const [dialog, setDialog] = useState(false);
    
    const categories = [
        'FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA', 'BILLING',
        'THIRD-PARTIES', 'CONTRACT'
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

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Search by Category" />
                </span>
            </div>
        )
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editjoboffer({rowData}) } /> 
            </React.Fragment>
        );
    }

    const header2 = renderHeader2();

    return (
            <div className="card">
                <h5>Filter JobOffers by Categories</h5>
                <DataTable value={joboffers} paginator className="p-datatable-customers" rows={10} 
                    dataKey="id" filters={joboffer} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                    globalFilterFields={['id','title','description','area','experience','modality','position','category']}  header={header2} emptyMessage="No customers found.">
                    <Column field="id" header="Id" filter filterPlaceholder="Search by id" style={{ minWidth: '10rem' }} />
                    <Column field="title" header="Title" filter filterPlaceholder="Search by title" style={{ minWidth: '12rem' }} />
                    <Column field="description" header="Description" filter filterPlaceholder="Search by description" style={{ minWidth: '12rem' }} />
                    <Column field="area" header="Area" filter filterPlaceholder="Search by Area" style={{ minWidth: '12rem' }} />
                    <Column field="experience" header="Experience" filter filterPlaceholder="Search by experience" style={{ minWidth: '12rem' }} />
                    <Column field="modality" header="Modality" filter filterPlaceholder="Search by modality" style={{ minWidth: '12rem' }} />
                    <Column field="position" header="Position" filter filterPlaceholder="Search by position" style={{ minWidth: '12rem' }} />                    
                    <Column field="category" header="Category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={categoriesBodyTemplate} filter filterElement={categoriesRowFilterTemplate}/> 

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>

                <Dialog header="JobOffer" visible={jobofferDialog} style={{width: '600px'}} modal={true} onHide={() => setJobofferDialog(false)}>
                    <div className="field">
                        <div className="field col"><label htmlFor="id">JobOffer ID</label></div>
                        <InputText value={job.id} readOnly style={{width : '25%'}} id="id" />                    
                    </div>
                    <div className="field">
                        <div className="field col"> <label htmlFor="title">Title</label> </div>
                        <InputText id="title" value={job.title} style={{width : '100%'}} readOnly /> 
                    </div>
                    <div className="field">
                        <div className="field col"> <label htmlFor="description">Description</label> </div>
                        <div className="field">
                            <InputTextarea id="description" value={job.description} style={{width : '100%'}} readOnly/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="field col"> <label htmlFor="body">Body</label> </div>
                        <div className="field">
                            <InputTextarea id="body" value={job.body} style={{width : '100%'}} readOnly/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Area</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.area} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Experience</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.experience} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Modality</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.modality} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Position</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.position} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Category</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.category} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Publicado</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.datePublished} readOnly/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Modificado</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.modifiedDay} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Eliminado</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.deletedDay} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Estado</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.state} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Mensajes</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.message} readOnly/>
                        </div>
                    </div>
                </Dialog>                                                 
            </div>
    );
}

export default PublisherJobOfferByCategory;
                 