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
                value="userbasicData.firstName"
            ></v-text-field> 
            
            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Last Name"
                v-model="formData.lastName"
                value=' '
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
                item-value="genderList.value" 
                :items="genderList" 
                label="Gender" 
                data-vv-name="Gender"
                required
            ></v-select>
          
            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Email"
                v-model="formData.email"
            ></v-text-field> 

            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Cell Phone"
                v-model="formData.cellPhone"
                type="tel" 
            ></v-text-field> 

            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Other Phone"
                v-model="formData.otherPhone"
                type="tel"
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
      }
    }, 
    computed: { 
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

        save () {  
            this.formData.PersonID = this.userbasicData().PersonID
            this.formData.CustomerID = this.userbasicData().CustomerID
            this.updatePerson(this.formData)
            .then(result => {  
                this.isEditing = !this.isEditing
                this.hasSaved = true
            })
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
