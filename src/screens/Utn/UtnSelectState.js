import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';

import { Dropdown } from 'primereact/dropdown';
 
import UtnJobOfferStateSelected from '../../components/utn/UtnJobOfferStateSelected';

const UtnSelectState = () => {
    const [state, setState] = useState();

    const states = [
        {label: 'ACTIVE', value: 'ACTIVE'},
        {label: 'APPROVED', value: 'APPROVED'},
        {label: 'DELETED', value: 'DELETED'},
        {label: 'PENDING', value: 'PENDING'},
        {label: 'PUBLISHED', value: 'PUBLISHED'},
        {label: 'REJECTED', value: 'REJECTED'},
        {label: 'REVIEW', value: 'REVIEW'}
    ];

    return(
        <div className="">
            <div className="col">
                <section className="col-12 ml-5  my-5 pt-5">                                        
                    
                    
 
                </section>
                <section className="col-12 ">                        
                    
                </section>
            </div>
        </div>        
    );
}

export default UtnSelectState;