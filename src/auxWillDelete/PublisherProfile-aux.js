import React, {Component} from "react";
import PublisherService from '../services/PublisherService';
import AuthService from "../services/AuthService";
import {Panel} from 'primereact/panel';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Styles from '../../assets/css/StyleWeb.css';
import Swal from 'sweetalert';
import ProfileCss from '../../assets/css/ProfileCss.css';
import {Menubar} from 'primereact/menubar';
import Profile from '../../assets/css/profile.css'

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons

import 'react-notifications/lib/notifications.css';

const PUBLISHER_BASE_URL = "http://localhost:8082/publisher/";
const url = "http://localhost:8082/publisher/";

class PublisherProfile extends Component{
    constructor(){
        super();
        this.state = {
            visible : false,
            modalInsertar: false,
            modalEliminar: false,
            person : {
                id: null,
                uri: null,
                oficialName: null,
                lastName: null,
                cuit: null,
                phoneNumber: null,
                email: null,
                password: null,
                webPage: null,
                message: null               
            },
            tipoModal: '',           
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
            }        
        ];
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.footer = (
            <div>
            <Button label="Save" icon="pi pi-check" onClick={this.save} />
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
            </div>
        );
    }
    
    peticionGet=()=>{
        PublisherService.getByUserId().then(response=>{
          this.setState({person: response});
        }).catch(error=>{
          console.log(error.message);
        })
        }
        
        peticionPost=async()=>{
          delete this.state.person.id;
         await axios.post(url,this.state.person).then(response=>{
            this.modalInsertar();
            this.peticionGet();
          }).catch(error=>{
            console.log(error.message);
          })
        }
        
        peticionPut=()=>{
          axios.put(this.state.person.uri, this.state.person).then(response=>{
            this.modalInsertar();
            /*this.peticionGet();*/
          })
        }
        
        peticionDelete=()=>{
          axios.delete(url+this.state.person.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
          })
        }
        
        modalInsertar=()=>{
          this.setState({modalInsertar: !this.state.modalInsertar});
        }

        seleccionarPublisher=(publisher)=>{
            this.setState({
              tipoModal: 'actualizar',
              person : {
                id: publisher.id,
                uri: publisher.uri,
                oficialName: publisher.oficialName,
                lastName: publisher.lastName,
                cuit: publisher.cuit,
                phoneNumber: publisher.phoneNumber,
                email: publisher.email,
                password: publisher.password,
                webPage: publisher.webPage,
                message: publisher.message
            }
            })
          }
          
          handleChange=async e=>{
          e.persist();
          await this.setState({
            person:{
              ...this.state.person,
              [e.target.name]: e.target.value
            }
          });
          console.log(this.state.person);
          }
          
    componentDidMount() { this.peticionGet(); }

    render(){
        const {person}=this.state;
        return(
            <div className="App">
                <Menubar model={this.items}/>
                
                <div className="container"> 
                    <div className="profile-usertitle row">
                        <div className="profile-usertitle-name row">                                
                            <p>Oficial Name :  {person.oficialName}</p>
                            <p>Last Name :  {person.lastName}</p>
                            <p>Id Person :  {person.id}</p>
                            <p>URI :  {person.uri}</p>
                            <p>CUIT :  {person.cuit}</p>
                            <p>Phone Number :  {person.phoneNumber}</p>
                            <p>Email :  {person.email}</p>
                            <p>Web Page :  {person.webPage}</p>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={()=>{this.seleccionarPublisher(person); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarPublisher(person); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>

                <button className="btn btn-success" onClick={()=>{this.setState({person: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Modificar Perfil</button>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                    <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={person?person.id: ''}/>
                        <br />
                        <label htmlFor="oficialName">oficialName</label>
                        <input className="form-control" type="text" name="oficialName" id="oficialName" onChange={this.handleChange} value={person?person.oficialName: ''}/>
                        <br />
                        <label htmlFor="lastName">lastName</label>
                        <input className="form-control" type="text" name="lastName" id="lastName" onChange={this.handleChange} value={person?person.lastName: ''}/>
                        <br />
                        <label htmlFor="cuit">cuit</label>
                        <input className="form-control" type="text" name="cuit" id="cuit" onChange={this.handleChange} value={person?person.cuit: ''}/>
                        <br />
                        <label htmlFor="phoneNumber">phoneNumber</label>
                        <input className="form-control" type="text" name="phoneNumber" id="phoneNumber" onChange={this.handleChange} value={person?person.phoneNumber:''}/>
                        <br />
                        <label htmlFor="email">email</label>
                        <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={person?person.email:''}/>
                        <br />
                        <label htmlFor="password">password</label>
                        <input className="form-control" type="text" name="password" id="password" onChange={this.handleChange} value={person?person.password:''}/>
                        <br />
                        <label htmlFor="webPage">webPage</label>
                        <input className="form-control" type="text" name="webPage" id="webPage" onChange={this.handleChange} value={person?person.webPage:''}/>
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
                Estás seguro que deseas eliminar a la empresa {this.state.person && this.state.person.oficialName}
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
            </Modal>
        </div>                
        );
    };
    
    editDialog() {
        this.setState({
            visible : true,
            person : {
                id: this.state.person.id,
                uri: this.state.person.uri,
                oficialName: this.state.person.oficialName,
                lastName: this.state.person.lastName,
                cuit: this.state.person.cuit,
                phoneNumber: this.state.person.phoneNumber,
                email: this.state.person.email,
                webPage: this.state.person.webPage,
                message: this.state.person.message
            }
        })
    }

}

export default PublisherProfile;