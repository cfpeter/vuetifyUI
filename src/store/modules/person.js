// import jwt from 'jsonwebtoken' 
import PersonService from '../../services/PersonService';

export const state = {
    listOfCustomerType : null
     
}//end of state

export const mutations = {
 
    setCustomerType: (state, ctype) =>{
        state.listOfCustomerType = ctype;
    } 

}//end of mutations 

export const actions = {
     
    async updatePerson ( { commit }, payload){  
        try {
            alert(6)
            const res = await PersonService.updatePerson(payload); 
            console.log(res)
            // commit('setCustomerType', res.data.recordset);
            return res.data.recordset 
        }
        catch (err) {
            console.log(err);
        }  
         
    },

}//end of actions

export const getters = {
      
    getListOfCustomerType: state => {
        return state.listOfCustomerType; 
    }
     
}//end of getters 