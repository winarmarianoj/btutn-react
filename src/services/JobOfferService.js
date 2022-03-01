import axios from 'axios';

const JOBOFFER_BASE_URL = "http://localhost:8082/joboffer/";

class JobOfferService{
    
    getAll(){
        return axios.get(JOBOFFER_BASE_URL + "getall").then(res => res.data);
    }

    create(joboffer) {
        return axios.post(JOBOFFER_BASE_URL, joboffer).then(res => res.data);
    }

    get(id){
        return axios.get(JOBOFFER_BASE_URL + id).then(res => res.data);
    }

    update(id, joboffer){
        return axios.put(JOBOFFER_BASE_URL + id, joboffer).then(res => res.data);
    }

    delete(id) {
        return axios.get(JOBOFFER_BASE_URL + id).then(res => res.data);
    }
}

export default new JobOfferService()