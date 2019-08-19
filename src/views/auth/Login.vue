<template>
    <v-content  >
      <v-container>
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md5 >
            <v-card class="elevation-12">
              <v-toolbar color="dark" dark  >
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
                
                <v-form ref="form">  
                      <v-flex>
                        <v-text-field  
                          v-model="userName" 
                          label="User Name"
                          v-validate="'required|max:100'"
                          :counter="100"
                          :error-messages="errors.collect('userName')" 
                          data-vv-name="userName"
                          required
                        ></v-text-field> 
                      </v-flex>

                      <v-spacer></v-spacer>

                      <v-flex >
                        <v-text-field
                          v-model="password"  
                          label="password"
                          type="password"
                          required
                          v-validate="'required|max:100'"
                          :counter="100"
                          :error-messages="errors.collect('password')" 
                          data-vv-name="password"
                          v-on:keyup.enter="LoginBtn"
                        ></v-text-field>
                      </v-flex> 

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
    $_veeValidate: {
      validator: 'new',
    },
    name:'Login',
    data: () => ({
      errorShow: false,
      errorMessage: '',
      valid: false, 
      userName: '', 
      password: '',
      dictionary: {
        custom: {
          userName: {
            required: () => 'User Name can not be empty',
            max: 'The User Name field may not be greater than 100 characters'
          },
          password: {
            required: () => 'Password can not be empty',
            max: 'The Password field may not be greater than 100 characters'
          },
        },
      },

    }),
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      ...mapActions(['login']),


      async LoginBtn() {

        const isValid = await this.$validator.validateAll()

        if(isValid){ 
          
          const data ={
            userName: this.userName,
            password: this.password
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
  }
</script>

<style>

</style>
