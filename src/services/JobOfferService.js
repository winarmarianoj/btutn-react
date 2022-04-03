import axios from 'axios';
import AuthService from './AuthService';

const JOBOFFER_BASE_URL = "http://localhost:8082/joboffer/";

class JobOfferService{
    
    async getAll(){
        return await axios.get(JOBOFFER_BASE_URL).then(res => res.data);
    }

    async create(joboffer) {
        return await axios.post(JOBOFFER_BASE_URL, joboffer).then(res => res.data);
    }

    async get(id){
        return await axios.get(JOBOFFER_BASE_URL + id).then(res => res.data);
    }

    async save(joboffer){
        let user = AuthService.getCurrentUser();
        return await axios.put(JOBOFFER_BASE_URL + user.id, joboffer).then(res => res.data);
    }

    async delete(id) {
        return await axios.get(JOBOFFER_BASE_URL + id).then(res => res.data);
    }

    async applicantPostulate(idJobOffer){
        let user = AuthService.getCurrentUser();
        let dto = {
            applicantID: user.id,
            jobofferID: idJobOffer
        }
        return await axios.post(JOBOFFER_BASE_URL + "postulate", dto).then(res => res.data);
    }
    
}

export default new JobOfferService()