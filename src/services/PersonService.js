import React, { useState } from "react";
import axios from 'axios';
import AuthService from "./AuthService";
import Swal from 'sweetalert';

const PERSON_BASE_URL = "http://localhost:8082/person/";
const JOBOFFER_BASE_URL = "http://localhost:8082/joboffer/";


class PersonService{
    async getAll(){
        return await axios.get(PERSON_BASE_URL + "getall").then(res => res.data);
    }

    async create(person){
        await axios.post(PERSON_BASE_URL, person).then(
            response => {                
                Swal({text: 'Congratulation!! Is already registered a new user.' + response.data.message,
                    icon: 'success', timer:'3500'});
                window.location.href = './login';
            }).catch(error=>{ 
                console.log(error.message);
                Swal({text: 'Failed register new user.' + error.message,
                    icon: 'error', timer:'3500'});
                window.location.href = './register';
            });
    }
    
    async get(person){
        return await axios.get(person.uri).then(res => res.data);
    }

    async update(person){
        return await axios.put(PERSON_BASE_URL + person.id, person).then(res => res.data);
    }

    async updateUtn(person){
        return await axios.put(PERSON_BASE_URL + "utn/" + person.id, person).then(res => res.data);
    }

    async delete(person){
        return await axios.delete(person.uri).then(res => res.data);
    }

    async getByUserId(){
        let user = AuthService.getCurrentUser();
        return await axios.get(PERSON_BASE_URL + "userId/" + user.id).then(res => res.data);
    }

    async applicantPostulate(idJobOffer){
        return await axios.get(JOBOFFER_BASE_URL + "postulate/" + idJobOffer).then(res => res.data);
    }

    async getJobApplicantAllByApplicant(){
        return await axios.get(JOBOFFER_BASE_URL + "jobapplicants").then(res => res.data);
    }
    
}

export default new PersonService()