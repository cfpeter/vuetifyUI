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
                v-model="firstName"
                value="userbasicData.firstName"
            ></v-text-field> 
            
            <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Last Name"
                v-model="lastName"
                value=' '
            ></v-text-field> 

            <v-select
                v-model="gender"
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
                v-model="email"
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
        firstName: null,
        lastName: null,
        genderList: [ 'Male', 'Female', 'Other'], 
        gender: null,
        email: null
      }
    }, 
    computed: { 
        ...mapGetters(['userTokenInfo']), 
    },
    created(){ 
        if(this.userbasicData()){ 
            this.setUser(this.userbasicData())
        }
        else{ 
            this.getUserByCustomerID(this.userTokenInfo.id).then(res => {
                this.setUser(res.data)
            }) 
        }
    },
    methods: { 
        ...mapGetters(['userbasicData']) ,
        ...mapActions(['getUserByCustomerID']),

        save () { 
            this.isEditing = !this.isEditing
            this.hasSaved = true
        },
        setUser (data){
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.gender = data.Gender;
            this.email = data.Email;  
        } 
    },
  }
</script>

<style>

</style>
