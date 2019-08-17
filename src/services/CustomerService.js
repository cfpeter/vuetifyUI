import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/customer',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
    }
})

export default {
    async listCustomerType(){ 
        return await apiClient.get('/listCustomerType')
    }
}