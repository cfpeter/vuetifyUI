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
    login(loginData){ 
        return apiClient.post('/login', loginData)
    },
    logout(){ 
        return apiClient.post('/logout')
    }
}