import axios from 'axios'


const apiPerson = axios.create({
    baseURL: 'http://localhost:3000/api/person',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
    }
})

export default {
    async updatePerson(data){  
        return await apiPerson.post(`/update/${data.PersonID}`, data)
    }
}