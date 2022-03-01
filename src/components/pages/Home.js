import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import UserService from "../../services/user.service";
import JobOfferService from "../../services/JobOfferService";
import DataViewCss from "../../assets/css/DataView.css";
import ReactDOM from 'react-dom';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible : false,
      joboffers : [] ,
      joboffer: {
        id: null,
        title: null,
        description: null,
        area: null,
        body: null,
        experience: null,
        modality: null,
        position: null,
        category: null,
        datePublished: null,
        modifiedDay: null,
        deletedDay: null,
        deleted: null,
        state: null,
        message: null
        },
      selectedJobOffer : {
        id: null,
        title: null,
        description: null,
        area: null,
        body: null,
        experience: null,
        modality: null,
        position: null,
        category: null,
        datePublished: null,
        modifiedDay: null,
        deletedDay: null,
        deleted: null,
        state: null,
        message: null
      },
      layout: 'grid',
      loading: true,
      first: 0,
      totalRecords: 0
    };
    this.rows = 6;
    
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onPage = this.onPage.bind(this);
  }

  componentDidMount(){
    //JobOfferService.getAll().then(data => this.setState({joboffers: data}))    
    setTimeout(() => {
      JobOfferService.getAll().then(data => {
          this.state.joboffers = data;
          this.setState({
              totalRecords: data.length,
              loading: false
          });
      });
    }, 1000);
    console.log(this.state.joboffers);
  }

  onPage(event) {
    this.setState({
        loading: true
    });

    //imitate delay of a backend call
    setTimeout(() => {
        const startIndex = event.first;
        const endIndex = Math.min(event.first + this.rows, this.state.totalRecords - 1);
        const newProducts = startIndex === endIndex ? this.datasource.slice(startIndex) : this.datasource.slice(startIndex, endIndex);

        this.setState({
            first: startIndex,
            products: newProducts,
            loading: false
        });
    }, 1000); 
  }

    renderListItem(data) {
        return (
            <div className="col-12">
                <div className="product-list-item">                    
                    <div className="product-list-detail">
                        <div className="product-name">{data.title}</div>
                        <div className="product-description">{data.description}</div>
                        <div className="product-description">{data.area}</div>
                        <div className="product-description">{data.experience}</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action"> 
                        <div className="product-description">{data.modality}</div>
                        <div className="product-description">{data.position}</div>                       
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>                        
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(data) {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category}</span>
                        </div>                        
                    </div>
                    <div className="product-grid-item-content">                        
                        <div className="product-name">{data.title}</div>
                        <div className="product-description">{data.description}</div>
                        <div className="product-description">{data.area}</div>
                        <div className="product-description">{data.experience}</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="product-grid-item-bottom">
                        <div className="product-description">{data.modality}</div>
                        <div className="product-description">{data.position}</div>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    }

    itemTemplate(product, layout) {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(product);
        else if (layout === 'grid')
            return this.renderGridItem(product);
    }

    renderHeader() {
        let onOptionChange = (e) => {
            this.setState({ loading: true }, () => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        layout: e.value
                    });
                }, 1000);
            });
        };

        return (
            <div style={{ textAlign: 'left' }}>
                <DataViewLayoutOptions layout={this.state.layout} onChange={onOptionChange} />
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div className="dataview-demo">
                <div className="card">
                    <DataView value={this.state.joboffers} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} lazy paginator paginatorPosition={'both'} rows={this.rows}
                            totalRecords={this.state.totalRecords} first={this.state.first} onPage={this.onPage} loading={this.state.loading} />
                </div>
            </div>
        );
    }

}

export default Home;
