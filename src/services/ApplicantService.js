import axios from 'axios';
import AuthService from "./AuthService";

const APPLICANT_BASE_URL = "http://localhost:8082/applicant/";

class ApplicantService{
    async getAll(){
        return await axios.get(APPLICANT_BASE_URL + "getall").then(res => res.data);
    }

    async create(applicant){
        return await axios.post(APPLICANT_BASE_URL, applicant).then(res => res.data);
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