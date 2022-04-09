import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { FilterMatchMode} from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

const UtnJobOfferStateSelected = () => {
    let jobofferState = JSON.parse(localStorage.getItem("jobstate"));
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
    const context = useContext(JobOfferContext);
    const [redirection, setRedirection] = useState(false);  
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        ReportListsService.getJobOfferAllWithFilter(jobofferState).then(data => { 
            setJoboffers(data); setLoading2(false); localStorage.removeItem("jobstate");
        }).catch(error=>{
            Swal({text: 'Failed get all joboffer by State.', icon: 'error', timer:'3500'}); console.log(error.message);})
    }, []);

    const editjoboffer = (rowData) => {   
        //localStorage.setItem("editjobofferID", JSON.stringify(rowData.rowData.id));
        //window.location.href = './dialogJobOffer';
        context.setId(rowData.rowData.id); context.setTitle(rowData.rowData.title);
        context.setDescription(rowData.rowData.description); context.setArea(rowData.rowData.area); 
        context.setBody(rowData.rowData.body); context.setExperience(rowData.rowData.experience); 
        context.setModality(rowData.rowData.modality); context.setPosition(rowData.rowData.position);
        context.setCategory(rowData.rowData.category); context.setDatePublished(rowData.rowData.datePublished);
        context.setModifiedDay(rowData.rowData.modifiedDay); context.setDeletedDay(rowData.rowData.deletedDay);
        context.setDeleted(rowData.rowData.deleted); context.setState(rowData.rowData.state);
        context.setMessage(rowData.rowData.message); setRedirection(true);
    }
    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>               
                <Button label="Edit" className="p-button-rounded p-button-primary " onClick={() => editjoboffer({rowData}) } />
            </React.Fragment>
        );
    }

    const headerTable = () => {return(<h5 className="p-datatable-customers">Filter JobOffers by States</h5>);}

    return redirection ? (
        <Redirect to="/dialogJobOffer"/>
    ) : (
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
                 