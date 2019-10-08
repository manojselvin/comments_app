<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Add Post</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="postForm" v-model="valid" lazy-validation>
                    <v-text-field
                      id="title"
                      v-model="post.title"
                      :rules="titleRules"
                      label="Title"
                      counter="100"
                      required
                    ></v-text-field>

                    <v-textarea
                      id="description"
                      v-model="post.description"
                      name="description"
                      counter="300"
                      :rules="descriptionRules"
                      label="Description"
                    ></v-textarea>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn :disabled="!valid" color="primary" @click="validate">Save Post</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapState, dispatch } from 'vuex'
import Store from '@/store'
import api from '@/utils/backend-api'
import { constants } from 'crypto'

export default {
  data: () => ({
    valid: true,
    titleRules: [
      (v) => !!v || 'Title is required',
      (v) => (v && v.length <= 100) || 'Title must be max 100 characters'
    ],
    descriptionRules: [
      (v) => !!v || 'Description is required',
      (v) => (v && v.length <= 300) || 'Description must be max 300 characters'
    ]
  }),
  computed: {
    ...mapState('posts', {
      post: 'post'
    })
  },
  methods: {
    validate() {
      this.$store.dispatch('posts/savePost')
      if (this.$refs.postForm.validate()) {
        this.snackbar = true
      }
    }
  }
}
</script>
