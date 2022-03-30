
import React, { Component } from 'react';
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

import '../../assets/css/DataCategoryFilter.css';
import ReportListsService from '../../services/ReportListsService';
import JobOfferService from '../../services/JobOfferService';

import DialogTest from './DialogTest';

class Test1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedJoboffers: '',
            visible : false,
            submitted: false,
            jobofferDialog: false,
            joboffers : [] ,
            importedData: [],
            selectedImportedData: [],
            joboffer: {
                'id': { value: null, matchMode: FilterMatchMode.EQUALS },
                'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'category': { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            selectedJoboffer: { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''}, 
            globalFilterValue2: '',
            loading2: true,
            categories: [
                'FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA', 'BILLING',
                'THIRD-PARTIES', 'CONTRACT'
            ]
        };
        this.categoriesBodyTemplate = this.categoriesBodyTemplate.bind(this);
        this.renderHeader2 = this.renderHeader2.bind(this);
        this.categoriesFilterTemplate = this.categoriesFilterTemplate.bind(this);
        this.categoriesItemTemplate = this.categoriesItemTemplate.bind(this);
        this.categoriesRowFilterTemplate = this.categoriesRowFilterTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);       
        this.onGlobalFilterChange2 = this.onGlobalFilterChange2.bind(this);
    }

    peticionGet=()=>{
        ReportListsService.getJobOfferAllByPublisher().then(response=>{
          this.setState({joboffers: response});
        }).catch(error=>{      
          console.log(error.message);
        })
    } 
    
    onGlobalFilterChange2(e) {
        const value = e.target.value;
        let filters2 = { ...this.state.joboffer };
        filters2['category'].value = value;

        this.setState({ filters2, globalFilterValue2 : value });
    }

    renderHeader2() {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={this.state.globalFilterValue2} onChange={this.onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    categoriesBodyTemplate(rowData){
        return <span className={`customer-badge category-${rowData.category}`}>{rowData.category}</span>;
    }

    categoriesFilterTemplate(options){
        return <Dropdown value={options.value} options={this.state.categories} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={this.categoriesItemTemplate} placeholder="Select a Category" className="p-column-filter" showClear />;
    }

    categoriesItemTemplate(option) {
        return <span className={`customer-badge category-${option}`}>{option}</span>;
    }

    categoriesRowFilterTemplate(options){
        return <Dropdown value={options.value} options={this.state.categories} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={this.categoriesItemTemplate} placeholder="Select a Categories" className="p-column-filter" showClear />;
    }

    editjoboffer(rowData) {
        <DialogTest selectJob={rowData} />
        this.setState({
            joboffer: { ...rowData },            
            jobofferDialog: true
        });
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => this.editjoboffer(rowData)  } /> 
            </React.Fragment>
        );
    }

    componentDidMount(){this.peticionGet();}

    render() {
        const header2 = this.renderHeader2();

        return (
            <div className="datatable-filter-demo">                
                <div className="card">
                    <h5>Filter JobOffers by Categories</h5>
                    <DataTable value={this.state.joboffers} paginator className="p-datatable-customers" rows={10} value={this.state.joboffers} selectionMode="single" selection={this.state.selectedJoboffer} onSelectionChange={e => this.setState({selectedJoboffer: e.value})}
                        dataKey="id" filters={this.state.joboffer} filterDisplay="row" loading={this.state.loading2} responsiveLayout="scroll"
                        globalFilterFields={['id','title','description','area','experience','modality','position','category']}  header={header2} emptyMessage="No customers found.">
                        <Column field="id" header="Id" filter filterPlaceholder="Search by id" style={{ minWidth: '10rem' }} />
                        <Column field="title" header="Title" filter filterPlaceholder="Search by title" style={{ minWidth: '12rem' }} />
                        <Column field="description" header="Description" filter filterPlaceholder="Search by description" style={{ minWidth: '12rem' }} />
                        <Column field="area" header="Area" filter filterPlaceholder="Search by Area" style={{ minWidth: '12rem' }} />
                        <Column field="experience" header="Experience" filter filterPlaceholder="Search by experience" style={{ minWidth: '12rem' }} />
                        <Column field="modality" header="Modality" filter filterPlaceholder="Search by modality" style={{ minWidth: '12rem' }} />
                        <Column field="position" header="Position" filter filterPlaceholder="Search by position" style={{ minWidth: '12rem' }} />                    
                        <Column field="category" header="Category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={this.categoriesBodyTemplate} filter filterElement={this.categoriesRowFilterTemplate}/> 
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>     
                </div>
            </div>
        );
    }
}

export default Test1;