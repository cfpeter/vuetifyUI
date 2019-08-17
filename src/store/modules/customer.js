// import jwt from 'jsonwebtoken' 
import CustomerService from '../../services/CustomerService';

export const state = {
    listOfCustomerType : null
     
}//end of state

export const mutations = {

    setCustomerType: (state, ctype) =>{
        state.listOfCustomerType = ctype;
    } 

}//end of mutations 

export const actions = {
     
    async listCustomerType ( { commit }){  
        try {
            const res = await CustomerService.listCustomerType();
            // console.log(res.data.recordset);
            // const listOfCustomerTYpe = res.data;
            commit('setCustomerType', res.data.recordset);
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