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

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
//import 'primereact/resources/themes/saga-orange/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'react-notifications/lib/notifications.css';

const UtnJobOfferStateSelected = () => {
    let jobofferState = JSON.parse(localStorage.getItem("jobstate"));
    
    let emptyJoboffer = { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''};

    const [joboffers, setJoboffers] = useState(null); 
    const [joboffer, setJoboffer] = useState({
        'id': { value: null, matchMode: FilterMatchMode.EQUALS },
        'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'category': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'state': { value: null, }
    });  
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        ReportListsService.getJobOfferAllWithFilter(jobofferState).then(data => { 
            setJoboffers(data); setLoading2(false);
            localStorage.removeItem("jobstate");
        }).catch(error=>{
            Swal({text: 'Failed get all joboffer by State.',
                    icon: 'error', timer:'3500'});
            console.log(error.message);            
        })
    }, []);

    const editjoboffer = (rowData) => {   
        localStorage.setItem("editjobofferID", JSON.stringify(rowData.rowData.id));
        window.location.href = './dialogJobOffer';      
        //setJobofferDialog(true);
    }    

    const checkJoboffer = (rowData) => {
        localStorage.setItem("jobid", JSON.stringify(rowData.rowData.id));
        window.location.href = './publisherApplicantByJobOffer';
        //window.location.assign(link) icon="pi pi-pencil"  icon="pi pi-list";
    }
    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>               
                <Button label="Edit" className="p-button-rounded p-button-primary " onClick={() => editjoboffer({rowData}) } /> 
                <Button label="Check" className="p-button-rounded p-button-secondary " onClick={() => checkJoboffer({rowData}) } />  
            </React.Fragment>
        );
    }

    const headerTable = () => {
        return (
            <h5 className="p-datatable-customers">Filter JobOffers by States</h5>
        );
    }

    return (
            <div className="datatable-filter">
                <DataTable value={joboffers} paginator className="p-datatable-customers" rows={10} 
                    dataKey="id" filters={joboffer} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                    globalFilterFields={['id','title','area','experience','modality','position','category', 'state']}  header={headerTable} emptyMessage="No customers found."
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers">
                    <Column field="id" header="Id" filter filterPlaceholder="Search" style={{ minWidth: '10rem' }} />
                    <Column field="title" header="Title" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />                    
                    <Column field="area" header="Area" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="experience" header="Experience" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="modality" header="Modality" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column field="position" header="Position" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />                    
                    <Column field="category" header="Category" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} /> 
                    <Column field="state" header="State" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>                                                           
            </div>
    );
}

export default UtnJobOfferStateSelected;
                 