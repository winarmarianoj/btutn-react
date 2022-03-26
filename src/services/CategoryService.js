import axios from 'axios';
import AuthService from "./AuthService";

const CATEGORY_BASE_URL = "http://localhost:8082/category/";

class CategoryService {
    async getAll(){
        return await axios.get(CATEGORY_BASE_URL).then(res => res.data);
    }

    async create(category){
        return await axios.post(CATEGORY_BASE_URL, category).then(res => res.data);
    }
    
    async get(category){
        return await axios.get(CATEGORY_BASE_URL + category.id).then(res => res.data);
    }

    async update(category){
        return await axios.put(CATEGORY_BASE_URL + category.id, category).then(res => res.data);
    }

    async delete(category){
        return await axios.delete(CATEGORY_BASE_URL + category.id).then(res => res.data);
    }
}

export default new CategoryService();