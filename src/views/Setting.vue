<template>
    <v-content  >  
      <v-container  > 
        <v-flex
            xs12
            sm8
            md6 
            mx-auto
          >
        <v-card 
            class="overflow-hidden"
            color="dark"
            dark
        >
            <v-toolbar 
            color="dark"
            
            >
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light">Edit User Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                color="dark darken-3"
                fab
                small
                @click="isEditing = !isEditing"
            >
                <v-icon v-if="isEditing">mdi-close</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
            </v-toolbar>

            <v-card-text>
              
            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="First Name"
                v-model="formData.firstName" 
                :counter="100"
                v-validate="'required|max:100'" 
                :error-messages="errors.collect('firstName')" 
                data-vv-name="firstName" 
                required
            ></v-text-field> 
            
            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Last Name"
                v-model="formData.lastName" 
                :counter="100"
                v-validate="'required|max:100'" 
                :error-messages="errors.collect('lastName')" 
                data-vv-name="lastName" 
                required
            ></v-text-field>  

            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="formData.dob"
                        label="Date Of Birth" 
                        readonly
                        v-on="on"
                        v-validate="'required'" 
                        :error-messages="errors.collect('dob')" 
                        data-vv-name="dob" 
                        required
                         :disabled="!isEditing"
                    ></v-text-field>
                </template>
                <v-date-picker
                    ref="picker"
                    v-model="formData.dob"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"  
                ></v-date-picker>
            </v-menu>

            <v-select
                v-model="formData.gender" 
                :items="genderList" 
                label="Gender"
                data-vv-name="gender"
                v-validate="'required'" 
                :error-messages="errors.collect('gender')"  
                :counter="100"
                required
                 :disabled="!isEditing"
            ></v-select>
          
            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Email"
                v-model="formData.email"
                v-validate="'required|max:100'" 
                :error-messages="errors.collect('email')" 
                data-vv-name="email"
                :counter="100"
                required
            ></v-text-field> 

            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Cell Phone"
                v-model="formData.cellPhone"
                type="tel" 
                v-validate="'max:15'" 
                :error-messages="errors.collect('cellPhone')" 
                data-vv-name="cellPhone"
                :counter="15"
                required
            ></v-text-field> 

            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Other Phone"
                v-model="formData.otherPhone"
                type="tel"
                v-validate="'max:15'" 
                :error-messages="errors.collect('otherPhone')" 
                data-vv-name="otherPhone"
                :counter="15"
                required
            ></v-text-field> 
 

            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :disabled="!isEditing"
                color="success"
                @click="save"
            >
                Save
            </v-btn>
            </v-card-actions>
            <v-snackbar
            v-model="hasSaved"
            :timeout="2000"
            absolute
            bottom
            left
            >
            Your profile has been updated
            </v-snackbar>
        </v-card> 
        </v-flex >
      </v-container>
    </v-content>

</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'


  export default {
      $_veeValidate: {
      validator: 'new',
    },
    data () {
      return {
        hasSaved: false,
        isEditing: true,
        model: null, 
        formData: {
            firstName: null,
            lastName: null,
            dob: null,
            gender: null,
            email: null,
            cellPhone: null,
            otherPhone: null

        },
        genderList: [ 'Male', 'Female', 'Other'], 
        date: null,
        menu: false,
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
            dob: {
                required: () => 'Date of birth can not be empty'
            },
            gender: {
                required: () => 'gender can not be empty'
            },
            cellPhone: { 
                max: 'The cell Phone field may not be greater than 15 characters'
            },
            otherPhone: { 
                max: 'The other Phone field may not be greater than 15 characters'
            }
        //   customerType: {
        //     required: () => 'Ypu must select a customer typr.'
        //   }
        },
      },
      }
    }, 
    mounted () {
      this.$validator.localize('en', this.dictionary)
    }, 
    created(){ 
        this.setUser(this.userbasicData())
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: { 
        ...mapGetters(['userbasicData']) ,
        ...mapActions(['updatePerson']),

        async save () {  
            const isValid = await this.$validator.validateAll()
            if(isValid){

                this.formData.PersonID = this.userbasicData().PersonID
                this.formData.CustomerID = this.userbasicData().CustomerID
                this.updatePerson(this.formData)
                .then(result => {  
                    this.isEditing = !this.isEditing
                    this.hasSaved = true
                })
            }
        },
        
        setUser (data){
            this.formData.firstName = data.firstName;
            this.formData.lastName = data.lastName;
            this.formData.gender = data.Gender;
            this.formData.email = data.Email;  
            this.formData.dob = data.DOB;  
            this.formData.cellPhone = data.CellPhone;
            this.formData.otherPhone = data.OtherPhone;            
        } 
    },
  }
</script>

<style>

</style>
