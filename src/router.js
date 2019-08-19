import Vue from "vue";
import Router from "vue-router"; 
import Register from './views/auth/Register.vue'
import Login from './views/auth/Login.vue'
import Logout from './views/auth/Logout.vue'
import Dashboard from './views/Dashboard.vue';
import Setting from './views/Setting.vue';
import NProgress from 'nprogress'
import store from './store/store' 


Vue.use(Router);


const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [ 
    {
      path: '/' ,  
      component: Dashboard , 
      meta: { requiresAuth: true }
    },
    {
      path: '/register' , 
      name: 'register',
      component: Register , 
      meta: { requiresVisitor: true },
      beforeEnter(routeTo , routeFrom, next) { 
        store.dispatch('listCustomerType').then(() =>{   
          next()
        }) 
      }
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
      meta: { requiresAuth: true },
      beforeEnter(routeTo , routeFrom, next) { 
        store.dispatch('logout').then(() =>{  
          next('/login')
        }) 
      }
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
      meta: { requiresAuth: true },
      beforeEnter(routeTo , routeFrom, next) {  
        store.dispatch('getUserByCustomerID', store.getters.userTokenInfo.customerID ).then(() =>{  
          next()
        }) 
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router