import React, {Component} from "react";
import PublisherService from '../../services/PublisherService';
import AuthService from "../../services/AuthService";
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Styles from '../../assets/css/StyleWeb.css';
import Swal from 'sweetalert';
import ProfileCss from '../../assets/css/ProfileCss.css';

import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons

import 'react-notifications/lib/notifications.css';

class PublisherProfile extends Component{
    constructor(){
        super();
        this.state = {
            visible : false,
            person : {
                id: null,
                uri: null,
                oficialName: null,
                lastName: null,
                cuit: null,
                phoneNumber: null,
                email: null,
                webPage: null,
                message: null
            },
            selectedPerson : {
                id: null,
                uri: null,
                oficialName: null,
                lastName: null,
                cuit: null,
                phoneNumber: null,
                email: null,
                webPage: null,
                message: null
            },
            user : {
                id: null,
                jwt: null,
                roleId: null,
                role: null,
                username: null
            }
        };
        this.items = [
            {
              label : 'Edit',
              icon  : 'pi pi-fw pi-pencil',
              command : () => {this.editDialog()}
            },
            {
              label : 'Delete',
              icon  : 'pi pi-fw pi-trash',
              command : () => {this.deletePerson()}
            }
          ];
            
        this.addPerson = this.addPerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
        this.footer = (
            <div>
              <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
          );
        }

        componentDidMount(){
            let user = AuthService.getCurrentUser();
            this.state.user.id= user.id;
            this.state.user.jwt = user.jwt;
            this.state.user.roleId = user.role.roleId;
            this.state.user.role = user.role.role;
            this.state.user.username = user.username;
            PublisherService.getByUserId(user.id).then(data => this.setState({person: data}))
        }
    
        deletePerson(){
            if(window.confirm("¿Realmente desea eliminar el registro?")) {
                PublisherService.delete(this.state.selectedPerson.id).then(data => {
                  this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
                  PublisherService.getAll().then(data => this.setState({persons: data}));
                });
              }
        }
    
        addPerson(){
            PublisherService.create(this.state.person).then(data => {
                this.setState({
                  visible : false,
                  person: {
                    id: null,
                    uri: null,
                    oficialName: null,
                    lastName: null,
                    cuit: null,
                    phoneNumber: null,
                    email: null,
                    webPage: null,
                    message: null
                  }
                });
                this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
                PublisherService.getAll().then(data => this.setState({persons: data}))
              })
        }

        render(){
            return(
                <div style={Styles.divPerson}>
                    
                    <div className="container">
                        <div className="divMenuBar row">
                            <Menubar model={this.items}/>
                        </div>                    
                        <div className="profile-usertitle row">
                            <div className="profile-usertitle-name row">                                
                                <p>Oficial Name :  {this.state.person.oficialName}</p>
                                <p>Last Name :  {this.state.person.lastName}</p>
                                <p>Id Person :  {this.state.person.id}</p>
                                <p>URI :  {this.state.person.uri}</p>
                                <p>CUIT :  {this.state.person.cuit}</p>
                                <p>Phone Number :  {this.state.person.phoneNumber}</p>
                                <p>Email :  {this.state.person.email}</p>
                                <p>Web Page :  {this.state.person.webPage}</p>
                            </div>
                            <div className="profile-usertitle-job">
                                
                            </div>
                        </div>
                        <div className="profile-userbuttons">
                            <button type="button" className="btn btn-success btn-sm">Follow</button>
                            <button type="button" clclassNameass="btn btn-danger btn-sm">Message</button>
                        </div>
                    </div>

                    <Dialog header="Create Person" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
                    <form id="person-form">
                        <span className="p-float-label">
                            <InputText value={this.state.person.name} style={{width : '100%'}} id="name" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.name = val;

                                    return { person };
                                })}
                            } />
                            <label htmlFor="name">Nombre</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.surname} style={{width : '100%'}} id="surname" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.surname = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="surname">Apellido</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.phone} style={{width : '100%'}} id="phone" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.phone = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="phone">Teléfono</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.username} style={{width : '100%'}} id="username" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.username = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="username">Email</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.password = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="password">Password</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.role} style={{width : '100%'}} id="role" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.role = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="role">Role</label>
                        </span>
                    </form>
                </Dialog>  

            </div>
                
            );
        };

        saveDialog(){
            this.setState({
              visible : true,
              person : {
                id: null,
                uri: null,
                oficialName: null,
                lastName: null,
                cuit: null,
                phoneNumber: null,
                email: null,
                webPage: null,
                message: null
              }
            });
            document.getElementById('person-form').reset();
          }
        
          editDialog() {
            this.setState({
              visible : true,
              person : {
                id: this.state.selectedPerson.id,
                uri: this.state.selectedPerson.uri,
                oficialName: this.state.selectedPerson.oficialName,
                lastName: this.state.selectedPerson.lastName,
                cuit: this.state.selectedPerson.cuit,
                phoneNumber: this.state.selectedPerson.phoneNumber,
                email: this.state.selectedPerson.email,
                webPage: this.state.selectedPerson.webPage,
                message: this.state.selectedPerson.message
              }
            })
          }

}

export default PublisherProfile;