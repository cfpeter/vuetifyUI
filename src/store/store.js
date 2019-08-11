import Vue from "vue";
import Vuex from "vuex";
import * as user from './modules/user'
import * as auth from './modules/auth' 

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auth
  },
  state: {  
    
  },

  getters : {    
  },
  
  mutations: {  
  },
  
  
  actions: {
      
  }
});

