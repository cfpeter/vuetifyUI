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
                          label="First Name"
                          :counter="100"
                          v-validate="'required|max:100'" 
                          :error-messages="errors.collect('firstName')" 
                          data-vv-name="firstName" 
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="lastName" 
                          :counter="100"
                          label="Last Name" 
                          v-validate="'required|max:100'" 
                          :error-messages="errors.collect('lastName')" 
                          data-vv-name="lastName" 
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="email" 
                          label="E-mail"
                          v-validate="'required|max:100'" 
                          :error-messages="errors.collect('email')" 
                          data-vv-name="email"
                          :counter="100"
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
                          :items="genderList" 
                          label="Gender" 
                          data-vv-name="gender"
                          v-validate="'required'" 
                          :error-messages="errors.collect('gender')"  
                          :counter="100"
                          required
                        ></v-select>

                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="userName" 
                          :counter="100"
                          label="User Name"
                          v-validate="'required|max:100'" 
                          :error-messages="errors.collect('userName')" 
                          data-vv-name="userName"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        md4
                      >
                        <v-text-field
                          v-model="password" 
                          label="Password"
                          :counter="100"
                          v-validate="'required|max:100'" 
                          :error-messages="errors.collect('password')" 
                          data-vv-name="password"
                          required 
                        ></v-text-field>
                      </v-flex>

                      <v-flex   
                        xs12
                        md4
                      >
                        <v-select
                          v-model="customerType" 
                          :items="dataListCustomerType" 
                          label="User Type" 
                          v-validate="'required'" 
                          :error-messages="errors.collect('customerType')" 
                          data-vv-name="customerType"
                          required
                        ></v-select>   
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
import {mapActions, mapGetters, mapState} from 'vuex';
import  {store} from '../../store/store.js';

  export default {
    $_veeValidate: {
      validator: 'new',
    },
    name:'Register',
    data: () => ({
      errorShow: false,
      errorMessage: '',
      valid: false,
      firstName: '', 
      lastName: '', 
      gender: '',
      genderList: [ 'Male', 'Female', 'Other'], 
      email: '',  
      userName: '', 
      password: '', 
      dataListCustomerType: [],
      customerType: '',

      dictionary: {
        custom: {
          firstName: {
            required: () => 'First Name can not be empty',
            max: 'The First Name field may not be greater than 100 characters'
          },
          lastName: {
            required: () => 'Last Name can not be empty',
            max: 'The Last Name field may not be greater than 100 characters'
          },
          email: {
            required: () => 'email can not be empty',
            max: 'The email field may not be greater than 100 characters'
          },
          gender: {
            required: () => 'gender can not be empty'
          },
          userName: {
            required: () => 'userName can not be empty',
            max: 'The userName field may not be greater than 100 characters'
          },
          password: {
            required: () => 'Password can not be empty',
            max: 'The Password field may not be greater than 100 characters'
          },
          customerType: {
            required: () => 'Ypu must select a customer typr.'
          }
           
        
        
        },
      },

    }), 
    created() {  
      //push the customer type to select input
      this.getListOfCustomerType().forEach( (element) => {
        this.dataListCustomerType.push(element.Name)
      });
      
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      ...mapActions([
          'register' , 
      ]),
      ...mapGetters([
        'getListOfCustomerType'
      ]),  
      async registerBtn() {   

        const isValid = await this.$validator.validateAll();
        if(isValid){ 
          const data = {
            firstName:        this.firstName,
            lastName:         this.lastName,
            gender:           this.gender,
            email:            this.email,
            userName:         this.userName,
            password:         this.password,
            customerTypeName: this.customerType
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
  }
</script>

<style>

</style>
