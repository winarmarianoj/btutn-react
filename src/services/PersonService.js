import axios from 'axios';
import AuthService from "./AuthService";

const PERSON_BASE_URL = "http://localhost:8082/person/";
const JOBOFFER_BASE_URL = "http://localhost:8082/joboffer/";

class PersonService{
    async getAll(){
        return await axios.get(PERSON_BASE_URL + "getall").then(res => res.data);
    }

    async create(person){
        return await axios.post(PERSON_BASE_URL, person).then(res => res.data);
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