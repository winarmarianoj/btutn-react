import React, { Component } from "react";
import JobOfferService from "../../services/JobOfferService";
import ReportListsService from '../../services/ReportListsService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Swal from 'sweetalert';

import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import '../../assets/css/DataCategoryFilter.css';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import fileSaver from 'file-saver';
import * as FileSaver from 'file-saver';

class PublisherYourJobOffers extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible : false,
      submitted: false,
      joboffers : [] ,
      importedData: [],
      selectedImportedData: [],
      importedCols: [{ field: '', header: 'Header' }],
      joboffer: { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''},
      selectedJoboffer: { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''},      
    };
    this.items = [
      {
        label : 'Create',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.saveDialog()}
      },
      {
        label : 'Edit',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.editDialog()}        
      },
      {
        label : 'Delete',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      },
    ]; 
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Send" icon="pi pi-send" onClick={this.save} />
      </div>
    );

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onModalityChange = this.onModalityChange.bind(this);
    this.onPositionChange = this.onPositionChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.exportPdf = this.exportPdf.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'title', header: 'title' },
      { field: 'description', header: 'description' },
      { field: 'area', header: 'area' },
      { field: 'body', header: 'body' },
      { field: 'experience', header: 'experience' },
      { field: 'modality', header: 'modality' },
      { field: 'position', header: 'position' },
      { field: 'category', header: 'category' },
      { field: 'datePublished', header: 'adatePublishedrea' },
      { field: 'modifiedDay', header: 'modifiedDay' },
      { field: 'deletedDay', header: 'deletedDay' },
      { field: 'deleted', header: 'deleted' },
      { field: 'state', header: 'state' },
      { field: 'message', header: 'message' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

  }

  peticionGet=()=>{
    ReportListsService.getJobOfferAllByPublisher().then(response=>{
      this.setState({joboffers: response});
    }).catch(error=>{ 
      Swal({text: 'Failed Get All Publisher.',
                    icon: 'error', timer:'3500'});     
      console.log(error.message);
    })
  } 

  delete(){    
      Swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: ['No', 'Yes']
      }).then(result => {
        if(result){
          JobOfferService.delete(this.state.joboffer.id).then(data => {
                Swal({text: 'Thank you for using our services',
                  icon: 'success', timer:'3500'});
                  ReportListsService.getJobOfferAllByPublisher().then(data => this.setState({joboffers: data}))});
        }else{ window.location.assign('/home');}
      })
  }

  save(){
    console.log(this.state.selectedJoboffer)
    console.log(this.state.joboffer)
    JobOfferService.save(this.state.joboffer).then(data => {
          this.setState({
            visible : !this.state.visible,
            selectedJoboffer: { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''},
      });
      Swal({text: 'Edit and Update correct!', icon: 'success', timer:'3500'});
      this.peticionGet();
    });      
  };

  onCategoryChange(e) {
    let joboffer = {...this.state.joboffer};
    joboffer['category'] = e.value;
    this.setState({ joboffer });
  }

  onModalityChange(e) {
    let joboffer = {...this.state.joboffer};
    joboffer['modality'] = e.value;
    this.setState({ joboffer });
  }

  onPositionChange(e) {
    let joboffer = {...this.state.joboffer};
    joboffer['position'] = e.value;
    this.setState({ joboffer });
  }

  onInputChange(e, name) {
      const val = (e.target && e.target.value) || '';
      let joboffer = {...this.state.joboffer};
      joboffer[`${name}`] = val;

      this.setState({ joboffer });
  }

  onInputNumberChange(e, name) {
      const val = e.value || 0;
      let joboffer = {...this.state.joboffer};
      joboffer[`${name}`] = val;

      this.setState({ joboffer });
  }

  rightToolbarTemplate() {
    return (
        <React.Fragment>            
            <Button label="Export CSV" icon="pi pi-upload" className="p-button-help mr-2" onClick={this.exportCSV} data-pr-tooltip="CSV"/>
            <Button label="Export XLSX" type="button" icon="pi pi-file-excel" onClick={this.exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            <Button label="Export PDF" type="button" icon="pi pi-file-pdf" onClick={this.exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
        </React.Fragment>
    )
  }  

  exportCSV() {this.dt.exportCSV();}

  exportPdf() {
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default('landscape');
            doc.autoTable(this.exportColumns, this.state.joboffers);
            doc.save('joboffers.pdf');
        })
    })
}

exportExcel() {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.state.joboffers);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'joboffers');
    });
}

saveAsExcelFile(buffer, fileName) {
  import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

toCapitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

clear() {
  this.setState({
      importedData: [],
      selectedImportedData: [],
      importedCols: [{ field: '', header: 'Header' }]
  });
}

onImportSelectionChange(e) {
  this.setState({ selectedImportedData: e.value }, () => {
      const detail = this.state.selectedImportedData.map(d => Object.values(d)[0]).join(', ');
      this.toast.show({ severity: 'info', summary: 'Data Selected', detail, life: 3000 });
  });
}

onSelectionChange(e) {
  this.setState({ selectedProducts: e.value });
}

  componentDidMount(){this.peticionGet();}

  render(){
    return (
        <div className="datatable-filter joboffersPublisher">            
            <div className="formgrid grid">
                <div className="field col">
                  <Menubar model={this.items}/>
                </div>
                <div className="field col">
                  <Toolbar className="mb-1" right={this.rightToolbarTemplate}></Toolbar>
                </div>
            </div>
            <Panel>                
                <DataTable ref={(el) => this.dt = el} value={this.state.joboffers} paginator={true} rows="2" selectionMode="single" selection={this.state.selectedJoboffer} onSelectionChange={e => this.setState({selectedJoboffer: e.value})}
                className="p-datatable-customers"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers">
                    <Column field="id" header="ID"></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="area" header="Area"></Column>
                    <Column field="experience" header="Experience"></Column>    
                    <Column field="modality" header="Modality"></Column>    
                    <Column field="position" header="Position"></Column>    
                    <Column field="category" header="Category"></Column>    
                    <Column field="datePublished" header="Date Published"></Column>    
                    <Column field="modifiedDay" header="Modified Day"></Column>
                    <Column field="state" header="State"></Column> 
                </DataTable>
            </Panel>
            <Dialog header="JobOffer" visible={this.state.visible} style={{width: '600px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
                <div className="field">
                    <div className="field col titleLabelByCategory"><label htmlFor="id">JobOffer ID</label></div>
                    <InputText value={this.state.joboffer.id} readOnly style={{width : '25%'}} id="id" />                    
                </div>
                <div className="field">
                    <div className="field col"> <label htmlFor="title">Title</label> </div>
                    <InputText id="title" value={this.state.joboffer.title} style={{width : '70%'}} onChange={(e) => this.onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.joboffer.title })} />
                    {this.state.submitted && !this.state.joboffer.title && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <div className="field col"> <label htmlFor="description">Description</label> </div>
                    <div className="field">
                        <InputTextarea id="description" value={this.state.joboffer.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={80} />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="area">Area</label> </div>
                    <div className="field">
                        <InputText id="area" value={this.state.joboffer.area} onValueChange={(e) => this.onInputChange(e, 'area')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.joboffer.area })}/>
                    </div>
                    <div className="field col"> <label htmlFor="experience">Experience</label> </div>
                    <div className="field">
                        <InputNumber id="experience" value={this.state.joboffer.experience} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3">Modality</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="ONSITE" name="modality" value="ONSITE" onChange={this.onModalityChange} checked={this.state.joboffer.modality === 'ONSITE'} />
                            <label htmlFor="ONSITE">ONSITE</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="REMOTE" name="modality" value="REMOTE" onChange={this.onModalityChange} checked={this.state.joboffer.modality === 'REMOTE'} />
                            <label htmlFor="REMOTE">REMOTE</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="MIXED" name="modality" value="MIXED" onChange={this.onModalityChange} checked={this.state.joboffer.modality === 'MIXED'} />
                            <label htmlFor="MIXED">MIXED</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3">Position</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="FULLTIME" name="position" value="FULLTIME" onChange={this.onPositionChange} checked={this.state.joboffer.position === 'FULLTIME'} />
                            <label htmlFor="FULLTIME">FULLTIME</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="PARTTIME" name="position" value="PARTTIME" onChange={this.onPositionChange} checked={this.state.joboffer.position === 'PARTTIME'} />
                            <label htmlFor="PARTTIME">PARTTIME</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="CONTRACT" name="position" value="CONTRACT" onChange={this.onPositionChange} checked={this.state.joboffer.position === 'CONTRACT'} />
                            <label htmlFor="CONTRACT">CONTRACT</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="FRONTEND" name="category" value="FRONTEND" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'FRONTEND'} />
                            <label htmlFor="FRONTEND">FRONTEND</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="BACKEND" name="category" value="BACKEND" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'BACKEND'} />
                            <label htmlFor="BACKEND">BACKEND</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="FULLSTACK" name="category" value="FULLSTACK" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'FULLSTACK'} />
                            <label htmlFor="FULLSTACK">FULLSTACK</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="BILLING" name="category" value="BILLING" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'BILLING'} />
                            <label htmlFor="BILLING">BILLING</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="THIRD-PARTIES" name="category" value="THIRD-PARTIES" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'THIRD-PARTIES'} />
                            <label htmlFor="THIRD-PARTIES">THIRD-PARTIES</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="CONTRACT" name="category" value="CONTRACT" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'CONTRACT'} />
                            <label htmlFor="CONTRACT">CONTRACT</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="DEVELOPER" name="category" value="DEVELOPER" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'DEVELOPER'} />
                            <label htmlFor="DEVELOPER">DEVELOPER</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="UI-UX" name="category" value="UI-UX" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'UI-UX'} />
                            <label htmlFor="UI-UX">UI-UX</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="QA" name="category" value="QA" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'QA'} />
                            <label htmlFor="QA">QA</label>
                        </div>
                    </div>
                </div> 
            </Dialog>                               
        </div>
    );
  }

  saveDialog(){
    this.setState({
      visible : !this.state.visible,
      joboffer: { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''},
    });    
  }

  editDialog() {
    this.setState({
      visible : true, 
      joboffer: {
          id: this.state.selectedJoboffer.id,
          title: this.state.selectedJoboffer.title,
          description: this.state.selectedJoboffer.description,
          area: this.state.selectedJoboffer.area,
          body: this.state.selectedJoboffer.body,
          experience: this.state.selectedJoboffer.experience,
          modality: this.state.selectedJoboffer.modality,
          position: this.state.selectedJoboffer.position,
          category: this.state.selectedJoboffer.category,
          datePublished: this.state.selectedJoboffer.datePublished,
          modifiedDay: this.state.selectedJoboffer.modifiedDay,
          deletedDay: this.state.selectedJoboffer.deletedDay,
          deleted: this.state.selectedJoboffer.deleted,
          state: this.state.selectedJoboffer.state,
          message: this.state.selectedJoboffer.message
        }
    })    
  }

};

export default PublisherYourJobOffers;
