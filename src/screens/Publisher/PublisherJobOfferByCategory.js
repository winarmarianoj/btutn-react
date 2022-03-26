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

import '../../assets/css/DataCategoryFilter.css';
import ReportListsService from '../../services/ReportListsService';

const PublisherJobOfferByCategory = () => {
    const [customers2, setCustomers2] = useState(null); 
    const [filters2, setFilters2] = useState({
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
    
    const categories = [
        'FULLSTACK', 'BACKEND', 'FRONTEND', 'DEVELOPER', 'UI-UX', 'QA'
    ];

    useEffect(() => {        
        ReportListsService.getJobOfferAllByPublisher().then(data => { setCustomers2(data); setLoading2(false) });        
    }, []);

    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2['category'].value = value;

        setFilters2(_filters2);
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

    const header2 = renderHeader2();

    return (
            <div className="card">
                <h5>Filter JobOffers by Categories</h5>
                <DataTable value={customers2} paginator className="p-datatable-customers" rows={10}
                    dataKey="id" filters={filters2} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                    globalFilterFields={['id','title','description','area','experience','modality','position','category']}  header={header2} emptyMessage="No customers found.">
                    <Column field="id" header="Id" filter filterPlaceholder="Search by id" style={{ minWidth: '12rem' }} />
                    <Column field="title" header="Title" filter filterPlaceholder="Search by title" style={{ minWidth: '12rem' }} />
                    <Column field="description" header="Description" filter filterPlaceholder="Search by description" style={{ minWidth: '12rem' }} />
                    <Column field="experience" header="Experience" filter filterPlaceholder="Search by experience" style={{ minWidth: '12rem' }} />
                    <Column field="modality" header="Modality" filter filterPlaceholder="Search by modality" style={{ minWidth: '12rem' }} />
                    <Column field="position" header="Position" filter filterPlaceholder="Search by position" style={{ minWidth: '12rem' }} />                    
                    <Column field="category" header="Category" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={categoriesBodyTemplate} filter filterElement={categoriesRowFilterTemplate}/>
                </DataTable>
            </div>
    );
}

export default PublisherJobOfferByCategory;
                 