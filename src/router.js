import Vue from "vue";
import Router from "vue-router"; 
import Register from './views/auth/Register.vue'
import Login from './views/auth/Login.vue'
import Logout from './views/auth/Logout.vue'
import Dashboard from './views/Dashboard.vue';
import Setting from './views/Setting.vue';


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [ 
    {
      path: '/register' , 
      name: 'register',
      component: Register , 
      meta: { requiresVisitor: true }
    },
    {
      path: '/login' , 
      name: 'login',
      component: Login , 
      meta: { requiresVisitor: true }
    },
    {
      path: '/logout' , 
      name: 'logout',
      component: Logout , 
      // meta: { requiresVisitor: true }
    },
    
    {
      path: '/dashboard' , 
      name: 'dashboard',
      component: Dashboard , 
      meta: { requiresAuth: true }
    },
    {
      path: '/setting' , 
      name: 'setting',
      component: Setting , 
      meta: { requiresAuth: true }
    }
  ]
});
