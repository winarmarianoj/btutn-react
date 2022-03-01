import axios from 'axios';

const PUBLISHER_BASE_URL = "http://localhost:8082/publisher/";

class PublisherService{
    getAll(){
        return axios.get(PUBLISHER_BASE_URL + "getall").then(res => res.data);
    }
    create(publisher){
        return axios.post(PUBLISHER_BASE_URL, publisher).then(res => res.data);
    }
    get(id){
        return axios.get(PUBLISHER_BASE_URL + id).then(res => res.data);
    }
    update(id, publisher){
        return axios.put(PUBLISHER_BASE_URL + id, publisher).then(res => res.data);
    }
    delete(id){
        return axios.get(PUBLISHER_BASE_URL + id).then(res => res.data);
    }
}