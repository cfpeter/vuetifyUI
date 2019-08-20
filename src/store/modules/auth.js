import AuthService from '../../services/AuthService';
import jwt from 'jsonwebtoken' 

export const state = {
    token : localStorage.getItem('access_token') || null,
}//end of state

export const mutations = {
    setToken: (state, token) =>{
        state.token = token; 
        localStorage.setItem('access_token' , token); 
    },
    logout: () => { 
        localStorage.removeItem('access_token'); 
        location.reload()
    },

}//end of mutations 

export const actions = {

    async logout({commit, getters}) {
        if(getters.loggedIn){
            return await AuthService.logout()
                .then(() => {    
                    commit('logout'); 
                })
                .catch(() => {   
                    commit('logout'); 
                }) 
        }
    },
     
    register ({commit}, formData){  
        return new Promise(async (resolve, reject) => { 
            await AuthService.register(formData)
            .then( res => {   
                const token = res.data;  
                commit('setToken' , token);
                resolve(token);
            }).catch(err => {  
                reject(err)
            })  
        }) 
    },

    
    async login( {commit, getters, dispatch } , loginData ){
        try {
            const result = await AuthService.login(loginData)
            commit('setToken' , result.data);   

            //get person/user info nad commit/call action and action will commit
            await dispatch(
                'getUserByCustomerID',  
                getters.userTokenInfo.customerID , 
                {
                    root:true
                }
            ) 
            return result.data;
            
        } catch (error) {
            throw error
        } 
    
  },


}//end of actions

export const getters = {
    
    loggedIn: state => {
        return state.token != null;
    },
    userTokenInfo: state => { 
        if(state.token)
            return jwt.verify(state.token, 'wellThisShouldBeStrongKeyForToken');
    }
}//end of getters 