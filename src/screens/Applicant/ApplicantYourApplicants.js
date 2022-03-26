import React, {Component} from "react";
import JobOfferService from "../../services/JobOfferService";
import ReportListsService from '../../services/ReportListsService';
import AuthService from "../../services/AuthService";
import {Panel} from 'primereact/panel';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Styles from '../../assets/css/StyleWeb.css';
import Swal from 'sweetalert';
import ProfileCss from '../../assets/css/ProfileCss.css';
import {Menubar} from 'primereact/menubar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons

import 'react-notifications/lib/notifications.css';

class ApplicantYourApplicants extends Component{
  constructor(props){
    super(props);

    this.state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        joboffer:{
          id: '', title: '', description: '', area: '', body: '', experience: '', modality: '',
          position: '', category: '', datePublished: '', modifiedDay: '', deletedDay: '',
          deleted: '', state: '', message: ''},
        tipoModal: '',
    }
  }   
    
    peticionGet=()=>{
      setTimeout(() => {
        ReportListsService.getJobApplicantAllByApplicant().then(response=>{
          this.state.data = response;
        }).catch(error=>{
          console.log(error.message);
        })        
      }, 1000);
    }
    
    peticionPost=async()=>{
      delete this.state.joboffer.id;
      JobOfferService.create(this.state.joboffer).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    peticionPut=()=>{
      JobOfferService.update(this.state.joboffer.id, this.state.joboffer).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      })
    }
    
    peticionDelete=()=>{
      JobOfferService.delete(this.state.joboffer.id).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
      })
    }
    
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    selectJobOffer=(offer)=>{
      this.setState({
        tipoModal: 'actualizar',
        joboffer: {
          id: offer.id, title: offer.title, description: offer.description, area: offer.area,
          body: offer.body, experience: offer.experience, modality: offer.modality, position: offer.position,
          category: offer.category, datePublished: offer.datePublished, modifiedDay: offer.modifiedDay,
          deletedDay: offer.deletedDay, deleted: offer.deleted, state: offer.state, message: offer.message
        }
      })
    }
    
    handleChange=async e=>{
      e.persist();
      this.setState({
        joboffer:{
          ...this.state.joboffer,
          [e.target.name]: e.target.value
        }
      });
    }
    
    componentDidMount() {this.peticionGet(); }      
    
    render(){
          const {joboffer}=this.state;
        return (
          <div className="App">
          <br /><br /><br />
        <button className="btn btn-success" onClick={()=>{this.setState({joboffer: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar job</button>
        <br /><br />
          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Area</th>
                <th>Experience</th>
                <th>Modality</th>
                <th>Position</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(job=>{
                return(
                  <tr>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{job.description}</td>
                      <td>{job.area}</td>
                      <td>{job.experience}</td>
                      <td>{job.modality}</td>
                      <td>{job.position}</td>
                      <td>{job.category}</td>

                      <td>
                          <button className="btn btn-primary" onClick={()=>{this.selectJobOffer(job); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                          {"   "}
                          <button className="btn btn-danger" onClick={()=>{this.selectJobOffer(job); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>    
      
          <Modal isOpen={this.state.modalInsertar}>
                      <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                      </ModalHeader>
                      <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={joboffer?joboffer.id: ''}/>
                            <br />
                            <label htmlFor="title">Title</label>
                            <input className="form-control" type="text" name="title" id="title" onChange={this.handleChange} value={joboffer?joboffer.title: ''}/>
                            <br />
                            <label htmlFor="description">Description</label>
                            <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={joboffer?joboffer.description: ''}/>
                            <br />
                            <label htmlFor="area">Area</label>
                            <input className="form-control" type="text" name="area" id="area" onChange={this.handleChange} value={joboffer?joboffer.area:''}/>
                            <br />
                            <label htmlFor="experience">Experience</label>
                            <input className="form-control" type="text" name="experience" id="experience" onChange={this.handleChange} value={joboffer?joboffer.experience:''}/>
                            <br />
                            <label htmlFor="modality">Modality</label>
                            <input className="form-control" type="text" name="modality" id="modality" onChange={this.handleChange} value={joboffer?joboffer.modality:''}/>
                            <br />
                            <label htmlFor="position">Position</label>
                            <input className="form-control" type="text" name="position" id="position" onChange={this.handleChange} value={joboffer?joboffer.position:''}/>
                            <br />
                            <label htmlFor="category">Category</label>
                            <input className="form-control" type="text" name="category" id="category" onChange={this.handleChange} value={joboffer?joboffer.category:''}/>                      
                          </div>
                      </ModalBody>
      
                      <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                            Insertar
                          </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                            Actualizar
                          </button>
                        }
                          <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                      </ModalFooter>
                </Modal>
      
      
                <Modal isOpen={this.state.modalEliminar}>
                  <ModalBody>
                    Estás seguro que deseas eliminar la oferta de trabajo {joboffer && joboffer.title}
                  </ModalBody>
                  <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                    <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                  </ModalFooter>
                </Modal>
        </div>
      
        );
    }
}

export default ApplicantYourApplicants;