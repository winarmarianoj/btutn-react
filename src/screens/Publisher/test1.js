
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
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { CustomerService } from '../service/CustomerService';
import './DataTableDemo.css';

export class DataTableFilterDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers1: null,
            customers2: null,
            filters1: null,
            filters2: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'representative': { value: null, matchMode: FilterMatchMode.IN },
                'status': { value: null, matchMode: FilterMatchMode.EQUALS },
                'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            globalFilterValue1: '',
            globalFilterValue2: '',
            loading1: true,
            loading2: true
        };

        this.representatives = [
            { name: "Amy Elsner", image: 'amyelsner.png' },
            { name: "Anna Fali", image: 'annafali.png' },
            { name: "Asiya Javayant", image: 'asiyajavayant.png' },
            { name: "Bernardo Dominic", image: 'bernardodominic.png' },
            { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
            { name: "Ioni Bowcher", image: 'ionibowcher.png' },
            { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
            { name: "Onyama Limba", image: 'onyamalimba.png' },
            { name: "Stephen Shaw", image: 'stephenshaw.png' },
            { name: "XuXue Feng", image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
        ]

        this.customerService = new CustomerService();
        this.clearFilter1 = this.clearFilter1.bind(this);
        this.onGlobalFilterChange1 = this.onGlobalFilterChange1.bind(this);
        this.onGlobalFilterChange2 = this.onGlobalFilterChange2.bind(this);
        this.filterClearTemplate = this.filterClearTemplate.bind(this);
        this.filterApplyTemplate = this.filterApplyTemplate.bind(this);
        this.filterFooterTemplate = this.filterFooterTemplate.bind(this);
        this.representativeFilterTemplate = this.representativeFilterTemplate.bind(this);
        this.dateBodyTemplate = this.dateBodyTemplate.bind(this);
        this.dateFilterTemplate = this.dateFilterTemplate.bind(this);
        this.balanceBodyTemplate = this.balanceBodyTemplate.bind(this);
        this.balanceFilterTemplate = this.balanceFilterTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.statusFilterTemplate = this.statusFilterTemplate.bind(this);
        this.statusItemTemplate = this.statusItemTemplate.bind(this);
        this.activityBodyTemplate = this.activityBodyTemplate.bind(this);
        this.activityFilterTemplate = this.activityFilterTemplate.bind(this);
        this.verifiedBodyTemplate = this.verifiedBodyTemplate.bind(this);
        this.verifiedFilterTemplate = this.verifiedFilterTemplate.bind(this);
        this.representativeRowFilterTemplate = this.representativeRowFilterTemplate.bind(this);
        this.statusRowFilterTemplate = this.statusRowFilterTemplate.bind(this);
        this.verifiedRowFilterTemplate = this.verifiedRowFilterTemplate.bind(this);
    }

    componentDidMount() {
        this.customerService.getCustomersLarge().then(data => this.setState({ customers1: this.getCustomers(data), loading1: false }));
        this.customerService.getCustomersLarge().then(data => this.setState({ customers2: this.getCustomers(data), loading2: false }));
        this.initFilters1();
    }

    getCustomers(data) {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    formatDate(value) {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    clearFilter1() {
        this.initFilters1();
    }

    onGlobalFilterChange1(e) {
        const value = e.target.value;
        let filters1 = { ...this.state.filters1 };
        filters1['global'].value = value;

        this.setState({ filters1, globalFilterValue1: value });
    }

    onGlobalFilterChange2(e) {
        const value = e.target.value;
        let filters2 = { ...this.state.filters2 };
        filters2['global'].value = value;

        this.setState({ filters2, globalFilterValue2: value });
    }

    initFilters1() {
        this.setState({
            filters1: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'representative': { value: null, matchMode: FilterMatchMode.IN },
                'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
                'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
                'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            globalFilterValue1: ''
        });
    }

    renderHeader1() {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={this.clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={this.state.globalFilterValue1} onChange={this.onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        )
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

    countryBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    filterClearTemplate(options) {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    }

    filterApplyTemplate(options) {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
    }

    filterFooterTemplate() {
        return <div className="px-3 pt-0 pb-3 text-center font-bold">Customized Buttons</div>;
    }

    representativeBodyTemplate(rowData) {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img alt={representative.name} src={`images/avatar/${representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{representative.name}</span>
            </React.Fragment>
        );
    }

    representativeFilterTemplate(options) {
        return <MultiSelect value={options.value} options={this.representatives} itemTemplate={this.representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
    }

    representativesItemTemplate(option) {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`images/avatar/${option.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    dateBodyTemplate(rowData) {
        return this.formatDate(rowData.date);
    }

    dateFilterTemplate(options) {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    balanceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.balance);
    }

    balanceFilterTemplate(options) {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    statusBodyTemplate(rowData) {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    statusFilterTemplate(options) {
        return <Dropdown value={options.value} options={this.statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={this.statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    statusItemTemplate(option) {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    activityBodyTemplate(rowData) {
        return <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>;
    }

    activityFilterTemplate(options) {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        )
    }

    verifiedBodyTemplate(rowData) {
        return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified})}></i>;
    }

    verifiedFilterTemplate(options) {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />
    }

    representativeRowFilterTemplate(options) {
        return <MultiSelect value={options.value} options={this.representatives} itemTemplate={this.representativesItemTemplate} onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" maxSelectedLabels={1} />;
    }

    statusRowFilterTemplate(options) {
        return <Dropdown value={options.value} options={this.statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={this.statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    verifiedRowFilterTemplate(options) {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
    }

    render() {
        const header1 = this.renderHeader1();
        const header2 = this.renderHeader2();

        return (
            <div className="datatable-filter-demo">
                <div className="card">
                    <h5>Filter Menu</h5>
                    <p>Filters are displayed in an overlay.</p>
                    <DataTable value={this.state.customers1} paginator className="p-datatable-customers" showGridlines rows={10}
                        dataKey="id" filters={this.state.filters1} filterDisplay="menu" loading={this.state.loading1} responsiveLayout="scroll"
                        globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']} header={header1} emptyMessage="No customers found.">
                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={this.countryBodyTemplate} filter filterPlaceholder="Search by country"
                            filterClear={this.filterClearTemplate} filterApply={this.filterApplyTemplate} filterFooter={this.filterFooterTemplate} />
                        <Column header="Agent" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem'}} style={{ minWidth: '14rem' }} body={this.representativeBodyTemplate}
                            filter filterElement={this.representativeFilterTemplate} />
                        <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={this.dateBodyTemplate}
                            filter filterElement={this.dateFilterTemplate} />
                        <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={this.balanceBodyTemplate} filter filterElement={this.balanceFilterTemplate} />
                        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={this.statusBodyTemplate} filter filterElement={this.statusFilterTemplate} />
                        <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={this.activityBodyTemplate} filter filterElement={this.activityFilterTemplate} />
                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={this.verifiedBodyTemplate} filter filterElement={this.verifiedFilterTemplate} />
                    </DataTable>
                </div>

                <div className="card">
                    <h5>Filter Row</h5>
                    <p>Filters are displayed inline within a separate row.</p>
                    <DataTable value={this.state.customers2} paginator className="p-datatable-customers" rows={10}
                        dataKey="id" filters={this.state.filters2} filterDisplay="row" loading={this.state.loading2} responsiveLayout="scroll"
                        globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header2} emptyMessage="No customers found.">
                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={this.countryBodyTemplate} filter filterPlaceholder="Search by country" />
                        <Column header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem'}} style={{ minWidth: '14rem' }} body={this.representativeBodyTemplate}
                            filter filterElement={this.representativeRowFilterTemplate} />
                        <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={this.statusBodyTemplate} filter filterElement={this.statusRowFilterTemplate} />
                        <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={this.verifiedBodyTemplate} filter filterElement={this.verifiedRowFilterTemplate} />
                    </DataTable>
                </div>
            </div>
        );
    }
}
                 