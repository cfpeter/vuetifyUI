import AuthService from '../../services/AuthService';
import jwt from 'jsonwebtoken' 

export const state = {
    token : localStorage.getItem('access_token') || null,
}//end of state

export const mutations = {
    setToken: (state, token) =>{
        state.token = token;
    },
    logout: (state) => {
        state.token = null
    },

}//end of mutations 

export const actions = {

    async logout(context) {
        if(context.getters.loggedIn){
            return new Promise( async (resolve, reject) => {
                AuthService.logout()
                .then(res => {   
                    localStorage.removeItem('access_token'); 
                    resolve(res) 
                    context.commit('logout');
    
                }).catch(err => {  
                    localStorage.removeItem('access_token'); 
                    context.commit('logout');
                    reject(err)
                })
            })
        } 
    },
     
    register ({commit}, formData){  
        return new Promise((resolve, reject) => { 
            AuthService.register(formData)
            .then( res => {   
                const token = res.data;
                localStorage.setItem('access_token' , token);
                commit('setToken' , token);
                resolve(token);
            }).catch(err => {  
                reject(err)
            })  
        }) 
    },

    
  login( {commit} , loginData ){
    return new Promise((resolve, reject) => { 
        AuthService.login(loginData).then(res => {   
            const token = res.data;
            localStorage.setItem('access_token' , token); 
            commit('setToken' , token);  
            resolve(token)
        }).catch(err => { 
            reject(err);
        })
    }) 
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