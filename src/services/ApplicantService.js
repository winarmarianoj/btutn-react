import React, { useState } from "react";
import axios from 'axios';
import AuthService from "./AuthService";
import Swal from 'sweetalert';

const APPLICANT_BASE_URL = "http://localhost:8082/applicant/";
const PERSON_BASE_URL = "http://localhost:8082/person/";

class ApplicantService{
    async getAll(){
        return await axios.get(APPLICANT_BASE_URL + "getall").then(res => res.data);
    }

    async create(person){
        await axios.post(APPLICANT_BASE_URL, person).then(
            response => {                
                Swal({text: 'Congratulation!! Is already registered a new user. You will receive an email in which you must activate your account by clicking on the link. ' + response.data.message,
                    icon: 'success', timer:'5000'});
                setTimeout(() => {
                    window.location.href = './login';
                }, 2500);     
            }).catch(error=>{ 
                console.log(error.message);
                Swal({text: 'Failed register new user.' + error.message,
                    icon: 'error', timer:'4000'});
                setTimeout(() => {
                    window.location.href = './register';
                }, 2500);
            });            
    }
    

    async get(applicant){
        return await axios.get(applicant.uri).then(res => res.data);
    }

    async update(applicant){
        return await axios.put(APPLICANT_BASE_URL + applicant.id, applicant).then(res => res.data);
    }

    async delete(applicant){
        return await axios.get(applicant.uri).then(res => res.data);
    }

    async getByUserId(){
        let user = AuthService.getCurrentUser();
        return await axios.get(APPLICANT_BASE_URL + "userId/" + user.id).then(res => res.data);
    }   

}

export default new ApplicantService();