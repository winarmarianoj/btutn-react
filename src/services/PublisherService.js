import axios from 'axios';
import AuthService from "./AuthService";

const PUBLISHER_BASE_URL = "http://localhost:8082/person/";

class PublisherService{
    async getAll(){
        return await axios.get(PUBLISHER_BASE_URL + "getall").then(res => res.data);
    }

    async create(publisher){
        return await axios.post(PUBLISHER_BASE_URL, publisher).then(res => res.data);
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