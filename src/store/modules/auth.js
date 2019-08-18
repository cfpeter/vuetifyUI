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
            return new Promise( async (resolve, reject) => {
                AuthService.logout()
                .then(res => {   
                    resolve(res) 
                    commit('logout');
    
                }).catch(err => {   
                    commit('logout');
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
                commit('setToken' , token);
                resolve(token);
            }).catch(err => {  
                reject(err)
            })  
        }) 
    },

    
  login( {commit} , loginData ){
    return new Promise((resolve, reject) => { 
        AuthService.login(loginData)
        .then(res => {   
            const token = res.data;
            commit('setToken' , token);  
            resolve(token)
        })
        .catch(err => { 
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