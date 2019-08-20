<template>
  <v-app>  
      <SideNav v-if="loggedIn"/> 
      <Header />
      <v-container fluid>  
          <router-view></router-view>
      </v-container>
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
  }),    
  computed: {
      ...mapGetters(['loggedIn'])
  }, 
};
</script>
