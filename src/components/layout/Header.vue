<template>
    <v-app-bar  
    >
      <v-toolbar-title class="headline text-uppercase">
        <span>Team</span>
        <span class="font-weight-light" > Management</span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
    
        <v-btn v-if="loggedIn"  text  to="/dashboard"> Dashboard </v-btn> 
        <v-btn v-if="!loggedIn" text  to="/login">    Login     </v-btn>  
        <v-btn v-if="!loggedIn" text  to="/register"> Register  </v-btn> 
        <v-btn v-if="loggedIn"  text  to="/logout">   Logout    </v-btn>
            
    </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name:"Header",
    computed: {
        ...mapGetters(['loggedIn'])
    },
}
</script>

<style>

</style>
