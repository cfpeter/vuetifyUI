<template>
    <v-content >  
      <v-container>
        <h2>THis is your dashboard {{userTokenInfo.name}}</h2> 
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
        if(!this.userTokenInfo.id)
            this.getUserByCustomerID(this.userTokenInfo.id);
    },
    computed: {
        ...mapGetters(['userTokenInfo']), 
    },
    methods: { 
        ...mapActions(['getUserByCustomerID'])
    }
}
</script>

<style>

</style>
