import UserService from '../../services/UserService'; 

export const state = {
    userData : null
}

export const mutations = {
    
    userBasicData: (state, data) => {
        state.userData = data;
    }
}

export const actions = {

    getUserByCustomerID({commit} , id){
        return new Promise((resolve, reject) => {
            UserService.getUserByCustomerID(id)
            .then((response) => {
                resolve(response) 
                commit('userBasicData' , response.data)
            })
            .catch((e) =>{
                reject(e)
            })
        })
    }
}

export const getters = {
    userbasicData: state => {
        return state.userData; 
    }
}