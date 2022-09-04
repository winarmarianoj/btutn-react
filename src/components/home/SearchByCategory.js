import React, { useState, useEffect} from 'react';
import CategoryService from '../../services/CategoryService';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Swal from 'sweetalert';
import "primeicons/primeicons.css";      
import '../../assets/css/SearchByCategory.css';

const SearchByCategory = () => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [viewCategories, setViewCategories] = useState([]);

    useEffect(() => {        
        CategoryService.getFiltersAllCategories().then(data => {
            data.map((ele) => { categories.push(ele.name); })
        }).catch(error=>{
            Swal({text: 'Failed get all joboffer by publisher id.', icon: 'error', timer:'3500'}); console.log(error.message);})
    }, []);

    const getJobByCategories = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    }

    return(
        <div className="container backgroundSearchByCategory h-100">
            <div className="d-flex justify-content-center h-100">
                <div className="searchbar">
                <Dropdown value={category} options={categories} onChange={(e) => getJobByCategories(e)} placeholder="Select Category"/> 
                    <input className="search_input" type="text" name="" placeholder="Search..." />
                    <Button icon="pi pi-search" className="p-button-rounded p-button-success " onClick={() => getJobByCategories() } /> 
                </div>
            </div>
        </div>
    );
}
export default SearchByCategory;