<template>
   <div></div>
</template>

<script>
// import { constants } from 'crypto';
// import {mapActions} from 'vuex';
export default {
    name: 'Logout',
    created() {
        // ...mapActions(['logout'])
        this.$store.dispatch('logout') 
        .then(() => {
            // console.log('im the logout.vue ' , response)
            this.$router.push('login'); 
        }).catch(() => {
            // console.log(err)
            this.$router.push('login');
        })

    }
}
</script>

<style>

</style>
