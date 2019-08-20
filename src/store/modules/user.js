import UserService from '../../services/UserService'; 
import PersonService from '../../services/PersonService';

export const state = {
    userData : null
}

export const mutations = {
    
    setPersonData: (state, data) => {
        state.userData = data;
    }
}

export const actions = {

    async updatePerson ( { commit }, payload){  
        try {
            const response = await PersonService.updatePerson(payload); 
            // console.log(res)
            commit('setPersonData' , response.data.recordset[0]) 
            return response.data.recordset[0];
        }
        catch (err) {
            console.log(err);
        }  
         
    },

    async getUserByCustomerID({ commit } , id){ 
        try { 
            const response = await UserService.getUserByCustomerID(id);
            commit('setPersonData' , response.data) 
            return response.data;
        } catch (error) {
            throw error
        }   
    }
}

export const getters = {

    getPersonData: state => { 
        // if(state.userData)
            return state.userData; 
    }
}