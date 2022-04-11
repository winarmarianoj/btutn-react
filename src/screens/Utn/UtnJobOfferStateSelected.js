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

import { Toolbar } from 'primereact/toolbar';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import fileSaver from 'file-saver';
import * as FileSaver from 'file-saver';

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
    const [dt, setDt] = useState('');

    const cols = [
        { field: 'id', header: 'id' }, { field: 'title', header: 'title' },
        { field: 'description', header: 'description' }, { field: 'area', header: 'area' },
        { field: 'body', header: 'body' }, { field: 'experience', header: 'experience' },
        { field: 'modality', header: 'modality' }, { field: 'position', header: 'position' },
        { field: 'category', header: 'category' }, { field: 'datePublished', header: 'adatePublishedrea' },
        { field: 'modifiedDay', header: 'modifiedDay' }, { field: 'deletedDay', header: 'deletedDay' },
        { field: 'deleted', header: 'deleted' }, { field: 'state', header: 'state' },
        { field: 'message', header: 'message' }
      ];
  
    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    useEffect(() => {
        ReportListsService.getJobOfferAllWithFilter(jobofferState).then(data => { 
            setJoboffers(data); setLoading2(false); localStorage.removeItem("jobstate");
        }).catch(error=>{
            Swal({text: 'Failed get all joboffer by State.', icon: 'error', timer:'3500'}); console.log(error.message);})
    }, []);

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
    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>               
                <Button label="Edit" className="p-button-rounded p-button-primary " onClick={() => editjoboffer({rowData}) } />
            </React.Fragment>
        );
    }

    const headerTable = () => {return(<h5 className="p-datatable-customers">Filter JobOffers by States</h5>);}

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>            
                <Button label="Export CSV" icon="pi pi-upload" className="p-button-help mr-2" onClick={exportCSV} data-pr-tooltip="CSV"/>
                <Button label="Export XLSX" type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                <Button label="Export PDF" type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            </React.Fragment>
        )
    }  
    
    const exportCSV = () => {dt.exportCSV();}
    
    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default('landscape');
                doc.autoTable(exportColumns, joboffers);
                doc.save('joboffers.pdf');
            })
        })
    }
    
    const exportExcel = () => {
          import('xlsx').then(xlsx => {
              const worksheet = xlsx.utils.json_to_sheet(joboffers);
              const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
              const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
              saveAsExcelFile(excelBuffer, 'joboffers');
          });
    }
    
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], { type: EXCEL_TYPE });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    return redirection ? (<Redirect to="/dialogJobOffer"/>) : (
        <div className="datatable-filter">
            <div className="formgrid grid field col"> <Toolbar className="mt-1" right={rightToolbarTemplate}></Toolbar> </div>
            <DataTable ref={(el) => setDt(el)} value={joboffers} paginator className="p-datatable-customers" rows={10} 
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
                 