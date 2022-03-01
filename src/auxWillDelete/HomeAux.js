import React, { useState, useEffect, Component } from "react";
import UserService from "../../services/user.service";
import JobOfferService from "../services/JobOfferService";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Styles from '../../assets/css/StyleWeb.css';

import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";        

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
      }
    };
  }
  componentDidMount(){
    JobOfferService.getAll().then(data => this.setState({joboffers: data}))
    console.log(this.state.joboffers)
  }

  render(){
    return (
        <div style={Styles.divPerson}>            
            <Panel header="JOB OFFERS">
                <DataTable value={this.state.joboffers} paginator={true} rows="5" selectionMode="single" selection={this.state.selectedJobOffer} onSelectionChange={e => this.setState({selectedJobOffer: e.value})}>
                    <Column field="id" header="ID"></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="area" header="Area"></Column>
                    <Column field="body" header="Body"></Column>
                    <Column field="experience" header="Experience"></Column>    
                    <Column field="modality" header="Modality"></Column>    
                    <Column field="position" header="Position"></Column>    
                    <Column field="category" header="Category"></Column>    
                    <Column field="datePublished" header="Date Published"></Column>    
                    <Column field="modifiedDay" header="Modified Day"></Column>    
                    <Column field="deletedDay" header="Deleted Day"></Column>  
                    <Column field="deleted" header="Deleted"></Column>  
                    <Column field="state" header="State"></Column>  
                    <Column field="message" header="Message"></Column>  
                </DataTable>
            </Panel>
            <Dialog header="JobOffer List" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
                    <form id="joboffer-form">
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.id} style={{width : '100%'}} id="name" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.person);
                                    joboffer.id = val;

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="id">ID</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.title} style={{width : '100%'}} id="surname" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.person);
                                    joboffer.title = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="title">Title</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.description} style={{width : '100%'}} id="phone" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.person);
                                    joboffer.description = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="description">Description</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.area} style={{width : '100%'}} id="username" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.person);
                                    joboffer.area = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="area">Area</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.body} style={{width : '100%'}} id="password" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.person);
                                    joboffer.body = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="body">Body</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.experience} style={{width : '100%'}} id="role" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.person);
                                    joboffer.experience = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="experience">Experience</label>
                        </span>
                    </form>
                </Dialog>                               
        </div>
    );
  }

}

export default Home;
