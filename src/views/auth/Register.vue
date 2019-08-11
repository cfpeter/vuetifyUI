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
            md8
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="dark"
                dark 
              >
                <v-toolbar-title>Register form</v-toolbar-title>
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
                  <v-container grid-list-xl>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="firstName"
                          :rules="firstNameRules"
                          :counter="100"
                          label="First Name"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="lastName"
                          :rules="lastNameRules"
                          :counter="100"
                          label="Last Name"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout wrap>
                      <v-flex
                        xs12
                        md4
                      >
                        <v-select
                          v-model="gender"
                          item-value="genderList.value" 
                          :items="genderList" 
                          label="Gender" 
                          data-vv-name="Gender"
                          required
                        ></v-select>

                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="userName"
                          :rules="userNameRules"
                          :counter="100"
                          label="User Name"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="passWord"
                          :rules="passWordRules"
                          label="Password"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.prevent="registerBtn" color="dark">Register</v-btn>
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
    name:'Register',
    data: () => ({
      errorShow: false,
      errorMessage: '',
      valid: false,
      firstName: '',
      firstNameRules: [
        v => !!v || 'First Name is required',
        v => v.length <= 100 || 'First Name must be less than 100 characters',
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last Name is required',
        v => v.length <= 100 || 'Last Name must be less than 100 characters',
      ],
      gender: '',
      genderList: [
        { 
          text:'Male', 
          value:'Male' 
        }, 
        { 
          text:'Female', 
          value:'Female' 
        }, 
        { 
          text:'Other', 
          value:'Other' 
        }, 
      ], 
      email: '', 
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
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
      ...mapActions(['register']),
      
      registerBtn() {   
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          email: this.email,
          userName: this.userName,
          passCode: this.passWord
        }
        this.register(data)
        .then( token => { 
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
