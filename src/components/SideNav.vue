<template>
    <v-navigation-drawer
      expand-on-hover  
      app
      permanent 
      clipped
      floating
      mobile-break-point
      fixed
    >
      <template  >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item
            link
            two-line
          >
            <v-list-item-content>
              <v-list-item-title class="title"> 
               {{ personData.firstName }} 
               {{ personData.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle> {{personData.email}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="{ name: 'setting'}">
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title  >Settings</v-list-item-title>
        </v-list-item>

      </v-list> 
    </v-navigation-drawer> 
</template>


<script>
import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
      }
    },
    computed: {
        
        personData(){
          if(this.$store.getters.getPersonData)
            return this.$store.getters.getPersonData 
          
          return '';
        }
        
    }, 
  }
</script>