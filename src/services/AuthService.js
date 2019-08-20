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
    async register(regData){ 
        return await apiClient.post('/register', regData)
    },
    async login(loginData){ 
        return await apiClient.post('/login', loginData)
    },
    async logout(){ 
        return await apiClient.post('/logout')
    }
}