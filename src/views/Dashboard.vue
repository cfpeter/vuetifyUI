<template>
    <v-content >  
      <v-container>
        <h2>THis is your dashboard {{personData.firstName  }} {{personData.lastName}} </h2> 
      </v-container>
    </v-content>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Dashboard',
    components:{
        SideNav
    }, 
    created(){ 
        if(this.$store.getters.getPersonData)
            return this.$store.getters.getPersonData 
    },
    computed: {

        personData(){
          if(this.$store.getters.getPersonData)
            return this.$store.getters.getPersonData 
          
          return '';
        },

         
    },
    methods: { 
        ...mapActions(['getUserByCustomerID'])
    }
}
</script>

<style>

</style>
