import UserService from '../../services/UserService'; 
import PersonService from '../../services/PersonService';

export const state = {
    userData : null
}

export const mutations = {
    
    userBasicData: (state, data) => {
        state.userData = data;
    }
}

export const actions = {

    async updatePerson ( { commit }, payload){  
        try {
            const response = await PersonService.updatePerson(payload); 
            // console.log(res)
            commit('userBasicData' , response.data.recordset[0]) 
            return response.data.recordset[0];
        }
        catch (err) {
            console.log(err);
        }  
         
    },

    getUserByCustomerID({ commit } , id){
        
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