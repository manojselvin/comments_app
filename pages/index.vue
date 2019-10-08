<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-text-field
                    id="username"
                    v-model="user.username"
                    :rules="usernameRules"
                    prepend-icon="person"
                    label="Username"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="user.password"
                    :rules="passwordRules"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn :disabled="!valid" color="primary" @click="validate">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, dispatch } from 'vuex'
import Store from '@/store'
import api from '@/utils/backend-api'
import { constants } from 'crypto'

export default {
  data: () => ({
    valid: true,
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 8) || 'Password must be atleast 8 characters'
    ],
    usernameRules: [(v) => !!v || 'Username is required']
  }),
  computed: {
    ...mapState('users', {
      user: 'user'
    })
  },
  methods: {
    validate() {
      this.$store.dispatch('users/authenticate')
      if (this.$refs.loginForm.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.loginForm.reset()
    },
    resetValidation() {
      this.$refs.loginForm.resetValidation()
    }
  }
}
</script>