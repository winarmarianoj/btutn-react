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
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';


import {Dialog} from 'primereact/dialog';
import Swal from 'sweetalert';

const DialogTest = (job, dialog) => {
    let emptyJoboffer = { id: '', title: '', description: '', area: '', body: '', experience: '',
              modality: '', position: '', category: '', datePublished: '', modifiedDay: '',
              deletedDay: '', deleted: '', state: '', message: ''};
    const [jobofferDialog, setJobofferDialog] = useState(true);

    useEffect(() => {   
    }, []);
    
    const [joboffer, setJoboffer] = useState({
        'id': { value: null, matchMode: FilterMatchMode.EQUALS },
        'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'area': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'experience': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'modality': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'position': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'category': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    


    return(
        <Dialog header="JobOffer" visible={dialog} style={{width: '600px'}} modal={true} onHide={() => setJobofferDialog(false)}>
                    <div className="field">
                        <div className="field col"><label htmlFor="id">JobOffer ID</label></div>
                        <InputText value={job.id} readOnly style={{width : '25%'}} id="id" />                    
                    </div>
                    <div className="field">
                        <div className="field col"> <label htmlFor="title">Title</label> </div>
                        <InputText id="title" value={job.title} style={{width : '70%'}} readOnly /> 
                    </div>
                    <div className="field">
                        <div className="field col"> <label htmlFor="description">Description</label> </div>
                        <div className="field">
                            <InputTextarea id="description" value={job.description} readOnly/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Area</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.area} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Experience</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.experience} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Modality</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.modality} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Position</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.position} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Category</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.category} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Publicado</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.datePublished} readOnly/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Modificado</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.modifiedDay} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Eliminado</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.deletedDay} readOnly/>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col"> <label htmlFor="area">Estado</label> </div>
                        <div className="field">
                            <InputText id="area" value={job.state} readOnly/>
                        </div>
                        <div className="field col"> <label htmlFor="experience">Mensajes</label> </div>
                        <div className="field">
                            <InputNumber id="experience" value={job.message} readOnly/>
                        </div>
                    </div>

                </Dialog>    
    );
}

export default DialogTest;