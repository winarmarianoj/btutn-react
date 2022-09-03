import React, { useState } from "react";
import axios from 'axios';
import AuthService from "./AuthService";
import Swal from 'sweetalert';

const PUBLISHER_BASE_URL = "http://localhost:8082/publisher/";
const PERSON_BASE_URL = "http://localhost:8082/person/";

class PublisherService{
    async getAll(){
        return await axios.get(PUBLISHER_BASE_URL + "getall").then(res => res.data);
    }

    async create(person){
        await axios.post(PUBLISHER_BASE_URL, person).then(
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
    
    async get(publisher){
        return await axios.get(publisher.uri).then(res => res.data);
    }

    async update(publisher){
        return await axios.put(PUBLISHER_BASE_URL + publisher.id, publisher).then(res => res.data);
    }

    async delete(publisher){
        return await axios.delete(publisher.uri).then(res => res.data);
    }
    async getByUserId(){
        let user = AuthService.getCurrentUser();
        return await axios.get(PUBLISHER_BASE_URL + "userId/" + user.id).then(res => res.data);
    }
}

export default new PublisherService()