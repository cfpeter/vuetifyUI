import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
    }
})

export default {
    register(regData){ 
        return apiClient.post('/register', regData)
    },
    login(lohinData){ 
        return apiClient.post('/login', lohinData)
    },
    logout(){ 
        return apiClient.post('/logout')
    }
}