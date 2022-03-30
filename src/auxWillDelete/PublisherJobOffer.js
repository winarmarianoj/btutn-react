
import React, { Component } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jobofferService } from '../service/jobofferService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../../assets/css/PublisherJobOffer.css';

import JobOfferService from "../services/JobOfferService";
import ReportListsService from '../services/ReportListsService';

export class PublisherJobOffer extends Component {

    emptyjoboffer = { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''};
      selectedJobofferEmpty = { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''};        
    

    constructor(props) {
        super(props);

        this.state = {
            joboffers: null,
            jobofferDialog: false,
            deletejobofferDialog: false,
            deletejoboffersDialog: false,
            joboffer: this.emptyjoboffer,
            selectedJoboffers: null,
            submitted: false,
            globalFilter: null
        };
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.savejoboffer = this.savejoboffer.bind(this);
        this.editjoboffer = this.editjoboffer.bind(this);
        this.confirmDeletejoboffer = this.confirmDeletejoboffer.bind(this);
        this.deletejoboffer = this.deletejoboffer.bind(this);
        this.importCSV = this.importCSV.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedjoboffers = this.deleteSelectedjoboffers.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeletejobofferDialog = this.hideDeletejobofferDialog.bind(this);
        this.hideDeletejoboffersDialog = this.hideDeletejoboffersDialog.bind(this);
    }

    componentDidMount() {
        this.jobofferService.getjoboffers().then(data => this.setState({ joboffers: data }));
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    openNew() {
        this.setState({
            joboffer: this.emptyjoboffer,
            submitted: false,
            jobofferDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            jobofferDialog: false
        });
    }

    hideDeletejobofferDialog() {
        this.setState({ deletejobofferDialog: false });
    }

    hideDeletejoboffersDialog() {
        this.setState({ deletejoboffersDialog: false });
    }

    savejoboffer() {
        let state = { submitted: true };

        if (this.state.joboffer.name.trim()) {
            let joboffers = [...this.state.joboffers];
            let joboffer = {...this.state.joboffer};
            if (this.state.joboffer.id) {
                const index = this.findIndexById(this.state.joboffer.id);

                joboffers[index] = joboffer;
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'joboffer Updated', life: 3000 });
            }
            else {
                joboffer.id = this.createId();
                joboffer.image = 'joboffer-placeholder.svg';
                joboffers.push(joboffer);
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'joboffer Created', life: 3000 });
            }

            state = {
                ...state,
                joboffers,
                jobofferDialog: false,
                joboffer: this.emptyjoboffer
            };
        }

        this.setState(state);
    }

    editjoboffer(joboffer) {
        this.setState({
            joboffer: { ...joboffer },
            jobofferDialog: true
        });
    }

    confirmDeletejoboffer(joboffer) {
        this.setState({
            joboffer,
            deletejobofferDialog: true
        });
    }

    deletejoboffer() {
        let joboffers = this.state.joboffers.filter(val => val.id !== this.state.joboffer.id);
        this.setState({
            joboffers,
            deletejobofferDialog: false,
            joboffer: this.emptyjoboffer
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'joboffer Deleted', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.joboffers.length; i++) {
            if (this.state.joboffers[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    importCSV(e) {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});

                processedData['id'] = this.createId();
                return processedData;
            });

            const joboffers = [...this.state.joboffers, ...importedData];

            this.setState({ joboffers });
        };

        reader.readAsText(file, 'UTF-8');
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deletejoboffersDialog: true });
    }

    deleteSelectedjoboffers() {
        let joboffers = this.state.joboffers.filter(val => !this.state.selectedjoboffers.includes(val));
        this.setState({
            joboffers,
            deletejoboffersDialog: false,
            selectedjoboffers: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'joboffers Deleted', life: 3000 });
    }

    onCategoryChange(e) {
        let joboffer = {...this.state.joboffer};
        joboffer['category'] = e.value;
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

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedjoboffers || !this.state.selectedjoboffers.length} />
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={this.importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    imageBodyTemplate(rowData) {
        return <img src={`images/joboffer/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="joboffer-image" />
    }

    priceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.price);
    }

    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        return <span className={`joboffer-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => this.editjoboffer(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeletejoboffer(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="mx-0 my-1">Manage joboffers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const jobofferDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.savejoboffer} />
            </React.Fragment>
        );
        const deletejobofferDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletejobofferDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deletejoboffer} />
            </React.Fragment>
        );
        const deletejoboffersDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletejoboffersDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedjoboffers} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.joboffers} selection={this.state.selectedJoboffers} onSelectionChange={(e) => this.setState({ selectedjoboffers: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} joboffers"
                        globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="image" header="Image" body={this.imageBodyTemplate}></Column>
                        <Column field="price" header="Price" body={this.priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Reviews" body={this.ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="inventoryStatus" header="Status" body={this.statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.jobofferDialog} style={{ width: '450px' }} header="joboffer Details" modal className="p-fluid" footer={jobofferDialogFooter} onHide={this.hideDialog}>
                    {this.state.joboffer.image && <img src={`images/joboffer/${this.state.joboffer.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.joboffer.image} className="joboffer-image block m-auto pb-3" />}
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={this.state.joboffer.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.joboffer.name })} />
                        {this.state.submitted && !this.state.joboffer.name && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" value={this.state.joboffer.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label className="mb-3">Category</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category1" name="category" value="Accessories" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'Accessories'} />
                                <label htmlFor="category1">Accessories</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category2" name="category" value="Clothing" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'Clothing'} />
                                <label htmlFor="category2">Clothing</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category3" name="category" value="Electronics" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'Electronics'} />
                                <label htmlFor="category3">Electronics</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category4" name="category" value="Fitness" onChange={this.onCategoryChange} checked={this.state.joboffer.category === 'Fitness'} />
                                <label htmlFor="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="price">Price</label>
                            <InputNumber id="price" value={this.state.joboffer.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                        </div>
                        <div className="field col">
                            <label htmlFor="quantity">Quantity</label>
                            <InputNumber id="quantity" value={this.state.joboffer.quantity} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                        </div>
                    </div>
                </Dialog>

                <Dialog visible={this.state.deletejobofferDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletejobofferDialogFooter} onHide={this.hideDeletejobofferDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.joboffer && <span>Are you sure you want to delete <b>{this.state.joboffer.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deletejoboffersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletejoboffersDialogFooter} onHide={this.hideDeletejoboffersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.joboffer && <span>Are you sure you want to delete the selected joboffers?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}
                 