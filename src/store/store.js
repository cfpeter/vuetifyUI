import Vue from "vue";
import Vuex from "vuex";
import * as user from './modules/user'
import * as auth from './modules/auth' 
import * as customer from './modules/customer' 
// import * as person from './modules/person' 

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auth,
    customer
  }
});

