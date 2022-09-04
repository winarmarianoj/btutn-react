import React, { Component, useState, useEffect, useContext } from 'react'; 
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import JobOfferService from "../../services/JobOfferService";
import AuthService from "../../services/AuthService";
import "../../assets/css/DataView.css";
import 'primeflex/primeflex.css';

class HomeCards extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible : false,
      joboffers : [] ,      
      layout: 'grid',
      loading: true,
      first: 0,
      totalRecords: 0,
      setApplicantBoard: false,
      currentUser: '',
      context: ''
    };
    this.rows = 12;
    
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onPage = this.onPage.bind(this);
  }

  componentDidMount(){
    setTimeout(() => {
        JobOfferService.getAll().then(data => {
            this.datasource = data;
            this.state.joboffers = data;
            this.setState({
                totalRecords: data.length,
                joboffers: this.datasource.slice(0, this.rows),
                loading: false
            });
        });       
    }, 1000);
    const user = AuthService.getCurrentUser();    
    if (user && user.role.role === "APPLICANT") { 
        this.state.currentUser = user;
        this.state.setApplicantBoard = true;
    }
  }

  onPage(event) {
    this.setState({
        loading: true
    });

    //imitate delay of a backend call
    setTimeout(() => {
        const startIndex = event.first;
        const endIndex = Math.min(event.first + this.rows, this.state.totalRecords - 1);
        const newJoboffer = startIndex === endIndex ? this.datasource.slice(startIndex) : this.datasource.slice(startIndex, endIndex);

        this.setState({
                first: startIndex,
                joboffers: newJoboffer,
                loading: false
            });
        }, 1000); 
    };

    editjoboffer({data}){
        localStorage.setItem("jobOfferData", JSON.stringify(data));
        window.location.href = './applicantJobofferToApply';
    }

    renderListItem(data) {
        return (
            <div className="col-6">
                <div className="product-list-item colorWordsRows">                    
                    <div className="product-list-detail">
                        <div className="product-name">Title: {data.title}</div>
                        <div className="product-description">Description: {data.description}</div>
                        <div className="product-description">Area: {data.area}</div>
                        <div className="product-description">Experience Required: {data.experience} años</div>
                    </div>
                    
                    {this.state.currentUser ? (
                        <div className="product-list-action"> 
                            <Button icon="pi pi-list" label="More Info" onClick={() => this.editjoboffer({data})} ></Button> 
                        </div>
                    ) : (
                        <></>    
                    )}
                </div>
            </div>
        );
    }

    renderGridItem(data) {
        return (
            <div className="col-6 md:col-6">
                <div className="product-grid-item card colorWordsCards">
                    <div className="product-grid-item-top">
                        <div className="product-description">{data.category}</div>
                        <div className="product-description">{data.modality}</div>
                        <div className="product-description">{data.position}</div>
                    </div>
                    <div className="product-grid-item-content">                        
                    <div className="product-name">Title: {data.title}</div>
                        <div className="product-description">Description: {data.description}</div>
                        <div className="product-description">Area: {data.area}</div>
                        <div className="product-description">Experience Required: {data.experience} años</div>                        
                    </div>
                    {this.state.currentUser ? (
                        <div className="product-list-action"> 
                            <Button icon="pi pi-list" label="More Info" onClick={() => this.editjoboffer({data})} ></Button> 
                        </div>
                    ) : (
                        <></>    
                    )}
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
            <div className="dataview-demo tableCardsJobOffers">                
                <div className="cardByCards">                
                    <DataView value={this.state.joboffers} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} lazy paginator paginatorPosition={'both'} rows={this.rows}
                            totalRecords={this.state.totalRecords} first={this.state.first} onPage={this.onPage} loading={this.state.loading} 
                            />
                </div>
            </div>
        );
    }

}

export default HomeCards;
