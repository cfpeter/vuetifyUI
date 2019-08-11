<template>
    <v-content  >
      <v-container   
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md6
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="dark"
                dark 
              >
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer></v-spacer>
               
              </v-toolbar>
              <v-card-text>
                 <v-alert 
                  v-model="errorShow"
                  border="top"
                  color="red lighten-2"
                  dark
                 type="error">
                  {{errorMessage}}
                </v-alert>
                
                <v-form >
                  <v-container  >

                    <v-layout wrap>
                     
                      <v-flex>
                        <v-text-field
                          v-model="userName"
                          :rules="userNameRules"
                          :counter="100"
                          label="User Name"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-spacer></v-spacer>

                      <v-flex  >
                        <v-text-field
                          v-model="passWord"
                          :rules="passWordRules"
                          :counter="100"
                          label="Password"
                          type="password"
                          required
                        ></v-text-field>
                      </v-flex>

                    </v-layout>
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.prevent="LoginBtn" color="info">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content> 
</template>

<script>
import {mapActions} from 'vuex';

  export default {
    name:'Login',
    data: () => ({
      errorShow: false,
      errorMessage: '',
      valid: false, 
      userName: '',
      userNameRules: [
        v => !!v || 'User Name is required',
        v => v.length <= 100 || 'User Name must be less than 100 characters',
      ],
      passWord: '',
      passWordRules: [
        v => !!v || 'Password is required',
        v => v.length <= 100 || 'Password must be less than 100 characters',
      ],

    }),
    methods: {
      ...mapActions(['login']),
      LoginBtn() {
        const data ={
          userName: this.userName,
          passWord: this.passWord
        }

         this.login(data)
        .then( () => { 
           this.$router.push('dashboard')
        })
        .catch(err => {
          this.errorShow = true;
          this.errorMessage = err.response.data
        })
      }
     
       
    }
  }
</script>

<style>

</style>
