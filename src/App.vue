<template>
  <v-app>  
    <v-content>    
      <SideNav v-if="loggedIn"/> 
      <Header />
      <router-view></router-view>  
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/layout/Header.vue'; 
import SideNav from './components/SideNav.vue';  
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    SideNav
  },
  data: () => ({
    return :{
      
    }
    //
  }), 
  
    created(){
        this.getUserByCustomerID(8);
    },
  computed: {
      ...mapGetters(['loggedIn'])
  },
  methods: { 
      ...mapActions(['getUserByCustomerID'])
  }
};
</script>
