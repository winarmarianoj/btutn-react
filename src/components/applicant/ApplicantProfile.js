import React, {Component} from "react";
import ApplicantService from '../../services/ApplicantService';
import PersonService from "../../services/PersonService";
import AuthService from "../../services/AuthService";
import {Panel} from 'primereact/panel';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Styles from '../../assets/css/StyleWeb.css';
import Swal from 'sweetalert';
import ProfileCss from '../../assets/css/ProfileCss.css';
import {Menubar} from 'primereact/menubar';
import Profile from '../../auxWillDelete/Profile-backup';

import "primereact/resources/themes/arya-orange/theme.css";          //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                              //icons

import 'react-notifications/lib/notifications.css';

class ApplicantProfile extends Component{
    constructor(){
        super();
        this.state = {
            visible : false,
            person : {id: '', uri: '', name: '', surname: '', identification: '', phoneNumber: '',
                email: '', password: '', role: '', genre: '', birthDate: '', typeStudent: '',
                webPage: '', message: ''},            
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
                command : () => {this.delete()}
            }        
        ];
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.footer = (
            <div><Button label="Save" icon="pi pi-send" onClick={this.save} /> </div>
        );
    }

    peticionGet=()=>{
        PersonService.getByUserId().then(response=>{
            this.setState({person: response});
        }).catch(error=>{
            Swal({text: 'Failed get Applicant by user id.',
                    icon: 'error', timer:'3500'});
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
                PersonService.delete(this.state.person).then(data => {
                    Swal({text: 'Thank you for using our services',
                        icon: 'success', timer:'3500'});});
                AuthService.logout();
                window.location.assign('/login');
            }else{
                Swal({text: 'Failed delete your profile.',
                        icon: 'error', timer:'3500'});
                window.location.assign('/profile');}
            })
    }

    save(){ 
        ApplicantService.update(this.state.person).then(data => {            
            this.setState({
                visible : !this.state.visible,
                person : {id: '', uri: '', name: '', surname: '', identification: '', phoneNumber: '',
                email: '', password: '', role: '', genre: '', birthDate: '', typeStudent: '',
                webPage: '', message: ''}
            });
            Swal({text: 'Edit and Update correct!', icon: 'success', timer:'3500'});
            this.peticionGet();
        });        
    }
    
    componentDidMount() { this.peticionGet(); }

    render(){
        return(
            <div style={Styles.divPerson}>
                <Menubar model={this.items}/>
                <div className="container profile"> 
                    <div className="container profile"> 
                        <div className="profile-usertitle ">
                            <div className="profile-usertitle-name row">                                
                                <p>Name :  {this.state.person.name}</p>
                                <p>Last Name :  {this.state.person.surname}</p>
                                <p>Id Applicant :  {this.state.person.id}</p>
                                <p>URI :  {this.state.person.uri}</p>
                                <p>DNI :  {this.state.person.identification}</p>
                                <p>Phone Number :  {this.state.person.phoneNumber}</p>
                                <p>Email :  {this.state.person.email}</p>
                                <p>Genre :  {this.state.person.genre}</p>
                                <p>BirthDate :  {this.state.person.birthDate}</p>
                                <p>TypeStudent :  {this.state.person.typeStudent}</p>
                            </div>                            
                        </div> 
                    </div>
                </div>

                <Dialog header="Update Person" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
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
                            <InputText value={this.state.person.identification} style={{width : '100%'}} id="identification" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.identification = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="identification">DNI</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.phoneNumber} style={{width : '100%'}} id="phoneNumber" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.phoneNumber = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="phoneNumber">Telefono</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.email} style={{width : '100%'}} id="email" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.email = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="email">Email</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.password} style={{width : '100%'}} id="password" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.password = val;

                                    return { person };
                                })}
                            } />
                            <label htmlFor="password">Password</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.genre} style={{width : '100%'}} id="genre" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.genre = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="genre">Genero</label>
                        </span>
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.birthDate} style={{width : '100%'}} id="birthDate" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.birthDate = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="birthDate">Fecha Cumpleaños</label>
                        </span>     
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.person.typeStudent} style={{width : '100%'}} id="typeStudent" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let person = Object.assign({}, prevState.person);
                                    person.typeStudent = val

                                    return { person };
                                })}
                            } />
                            <label htmlFor="typeStudent">Tipo de Estudiante</label>
                        </span>                      
                    </form>
            </Dialog>
        </div>                
        );
    };

    saveDialog(){
        this.setState({
            person : {id: '', uri: '', name: '', surname: '', identification: '', phoneNumber: '',
                email: '', password: '', role: '', genre: '', birthDate: '', typeStudent: '',
                webPage: '', message: ''}
        });
        document.getElementById('person-form').reset();
    }
    
    editDialog() {
        this.setState({
            visible : true,
            person : {
                id: this.state.person.id,
                name: this.state.person.name,
                surname: this.state.person.surname,
                identification: this.state.person.identification,
                email: this.state.person.email,
                password: '',
                phoneNumber: this.state.person.phoneNumber,
                genre: this.state.person.genre,
                birthDate: this.state.person.birthDate,
                typeStudent: this.state.person.typeStudent
            }
        })
    }

}

export default ApplicantProfile;