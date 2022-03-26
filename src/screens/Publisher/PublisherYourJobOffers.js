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
import Styles from '../../assets/css/StyleWeb.css';
import Swal from 'sweetalert';

import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'react-notifications/lib/notifications.css';
import { DialogActions } from "@material-ui/core";

class PublisherYourJobOffers extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible : false,
      joboffers : [] ,
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
        <Button label="Send" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  peticionGet=()=>{
    ReportListsService.getJobOfferAllByPublisher().then(response=>{
      this.setState({joboffers: response});
    }).catch(error=>{      
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

  componentDidMount(){this.peticionGet();}

  render(){
    return (
        <div className="joboffersPublisher">
            <Menubar model={this.items}/>
            <Panel header="JOB OFFERS">
                <DataTable value={this.state.joboffers} paginator={true} rows="2" selectionMode="single" selection={this.state.selectedJoboffer} onSelectionChange={e => this.setState({selectedJoboffer: e.value})}>
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
            <Dialog header="JobOffer" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
                    <form id="joboffer-form">
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.id} readOnly style={{width : '100%'}} id="id" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.joboffer);
                                    joboffer.id = val;

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="id">ID</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.title} style={{width : '100%'}} id="title" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.joboffer);
                                    joboffer.title = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="title">Title</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.description} style={{width : '100%'}} id="description" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.joboffer);
                                    joboffer.description = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="description">Description</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.area} style={{width : '100%'}} id="area" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.joboffer);
                                    joboffer.area = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="area">Area</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.body} style={{width : '100%'}} id="body" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.joboffer);
                                    joboffer.body = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="body">Body</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.experience} style={{width : '100%'}} id="experience" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let joboffer = Object.assign({}, prevState.joboffer);
                                    joboffer.experience = val

                                    return { joboffer };
                                })}
                            } />
                            <label htmlFor="experience">Experience</label>
                        </span>
                        <br/>

                        <div className="row">
                            <section className="col-12 md:col-4">
                                <span className="p-float-label">
                                    <label htmlFor="modality">Modality</label>
                                </span>
                            </section>
                            <section className="col-6 md:col-4">
                                <span className="p-float-label">
                                    <select className="options" value={this.state.joboffer.modality} onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                          let joboffer = Object.assign({}, prevState.joboffer);
                                          joboffer.modality = val

                                          return { joboffer };})
                                        }}>
                                          <option value="">SELECT ONE OPTION</option>
                                          <option value="ONSITE">ONSITE</option>
                                          <option value="REMOTE">REMOTE</option>
                                          <option value="MIXED">MIXED</option>
                                    </select> 
                                </span>
                            </section>
                        </div>
                        <span className="p-float-label my-3">
                            <InputText value={this.state.joboffer.modality} readOnly style={{width : '100%'}} id="modality" />
                        </span>
                        <br/>

                        <div className="row">
                            <section className="col-12 md:col-4">
                                <span className="p-float-label">
                                  <label htmlFor="position">Position</label>
                                </span>
                            </section>
                            <section className="col-6 md:col-4">
                                <span className="p-float-label">
                                    <select className="options" value={this.state.joboffer.position} onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                          let joboffer = Object.assign({}, prevState.joboffer);
                                          joboffer.position = val

                                          return { joboffer };})
                                        }}>
                                          <option value="">SELECT ONE OPTION</option>
                                          <option value="FULLTIME">FULLTIME</option>
                                          <option value="PARTTIME">PARTTIME</option>
                                          <option value="CONTRACT">CONTRACT</option>
                                    </select> 
                                </span>
                            </section>
                        </div>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.position} style={{width : '100%'}} id="position"/>                           
                        </span>
                        <br/>
                        
                        <div className="row">
                            <section className="col-12 md:col-4">
                                <span className="p-float-label">
                                  <label htmlFor="category">Category</label>
                                </span>
                            </section>
                            <section className="col-6 md:col-4">
                                <span className="p-float-label">
                                    <select className="options" onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                          let joboffer = Object.assign({}, prevState.joboffer);
                                          joboffer.category = val

                                          return { joboffer };})
                                        }}>
                                          <option value="">SELECT ONE OPTION</option>
                                          <option value="FRONTEND">FRONTEND</option>
                                          <option value="BACKEND">BACKEND</option>
                                          <option value="FULLSTACK">FULLSTACK</option>
                                          <option value="BEST">Lo mejor</option>
                                          <option value="BILLING">BILLING</option>
                                          <option value="THIRD-PARTIES">THIRD-PARTIES</option>                                          
                                          <option value="CONTRACT">CONTRACT</option>                                          
                                    </select> 
                                </span>
                            </section>
                        </div>
                        <span className="p-float-label">
                            <InputText value={this.state.joboffer.category} style={{width : '100%'}} id="category" />                            
                        </span>
                    </form>
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
