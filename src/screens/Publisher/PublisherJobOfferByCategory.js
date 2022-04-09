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
import JobOfferContext from '../../context/joboffer/JobOfferContext';

//import "primereact/resources/themes/arya-orange/theme.css";          //theme
//import 'primereact/resources/themes/saga-orange/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'react-notifications/lib/notifications.css';

const PublisherJobOfferByCategory = () => {
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
    const context = useContext(JobOfferContext);
    const [redirection, setRedirection] = useState(false);
    const [loading2, setLoading2] = useState(true);
    const categories = ['FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA', 'BILLING', 'THIRD-PARTIES', 'CONTRACT'];

    useEffect(() => {        
        ReportListsService.getJobOfferAllByPublisher().then(data => {setJoboffers(data); setLoading2(false) 
        }).catch(error=>{
            Swal({text: 'Failed get all joboffer by publisher id.', icon: 'error', timer:'3500'}); console.log(error.message);})
    }, []);

    const categoriesBodyTemplate = (rowData) => {return <span className={`customer-badge category-${rowData.category}`}>{rowData.category}</span>;}

    const categoriesFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={categories} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={categoriesItemTemplate} placeholder="Select a Category" className="p-column-filter" showClear />;
    }

    const categoriesItemTemplate = (option) => {return <span className={`customer-badge category-${option}`}>{option}</span>;}

    const categoriesRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={categories} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={categoriesItemTemplate} placeholder="Select a Categories" className="p-column-filter" showClear />;
    }

    const editjoboffer = (rowData) => {
        context.setId(rowData.rowData.id); context.setTitle(rowData.rowData.title);
        context.setDescription(rowData.rowData.description); context.setArea(rowData.rowData.area); 
        context.setBody(rowData.rowData.body); context.setExperience(rowData.rowData.experience); 
        context.setModality(rowData.rowData.modality); context.setPosition(rowData.rowData.position);
        context.setCategory(rowData.rowData.category); context.setDatePublished(rowData.rowData.datePublished);
        context.setModifiedDay(rowData.rowData.modifiedDay); context.setDeletedDay(rowData.rowData.deletedDay);
        context.setDeleted(rowData.rowData.deleted); context.setState(rowData.rowData.state);
        context.setMessage(rowData.rowData.message); setRedirection(true);
    }    

    const openApplicantByJoboffer = (rowData) => {
        localStorage.setItem("jobid", JSON.stringify(rowData.rowData.id));
        window.location.href = './publisherAppliedByJobOffer';
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

    const headerTable = () => {return (<h5 className="p-datatable-customers">Filter JobOffers by Categories</h5>);}

    return redirection ? ( <Redirect to="/dialogJobOffer"/> ) : (
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
        </div>
    );
}

export default PublisherJobOfferByCategory;
                 