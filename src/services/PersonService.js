import axios from 'axios';

const PERSON_BASE_URL = "http://localhost:8082/person/";

class PersonService{
    getAll(){
        return axios.get(PERSON_BASE_URL + "getall").then(res => res.data);
    }
    create(person){
        return axios.post(PERSON_BASE_URL, person).then(res => res.data);
    }
    get(id){
        return axios.get(PERSON_BASE_URL + id).then(res => res.data);
    }
    update(id, person){
        return axios.put(PERSON_BASE_URL + id, person).then(res => res.data);
    }
    delete(id){
        return axios.get(PERSON_BASE_URL + id).then(res => res.data);
    }
}