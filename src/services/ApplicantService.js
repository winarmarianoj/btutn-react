import axios from 'axios';

const APPLICANT_BASE_URL = "http://localhost:8082/applicant/";

class ApplicantService{
    getAll(){
        return axios.get(APPLICANT_BASE_URL + "getall").then(res => res.data);
    }
    create(applicant){
        return axios.post(APPLICANT_BASE_URL, applicant).then(res => res.data);
    }
    get(id){
        return axios.get(APPLICANT_BASE_URL + id).then(res => res.data);
    }
    update(id, applicant){
        return axios.put(APPLICANT_BASE_URL + id, applicant).then(res => res.data);
    }
    delete(id){
        return axios.get(APPLICANT_BASE_URL + id).then(res => res.data);
    }
}