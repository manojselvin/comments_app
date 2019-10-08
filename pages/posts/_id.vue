<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>{{ post.title }}</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>{{ post.description }}</v-card-text>
                <div>
                  <v-text-field
                    class="pl-4 pt-2"
                    v-model="newComment.text"
                    counter="160"
                    :rules="newCommentRules"
                    @keydown.enter="addComment"
                    label="Enter Comment"
                  ></v-text-field>
                </div>
                <div>
                  <v-container fluid>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="12" md="12">
                        <h4>All Comments</h4>
                        <hr>
                        <Comment
                          :id="'comment-'+comment._id"
                          @clicked="scrollToParent"
                          v-for="comment in items"
                          :comment="comment"
                          :key="comment._id"
                          @saveComment="addComment"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                </div>

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
import Comment from '../comments/comment'

export default {
  data: () => ({
    valid: true,
    newCommentRules: [
      (v) => !!v || 'Comment is required',
      (v) => (v && v.length <= 160) || 'Comment must be max 160 characters'
    ],
    newComment: {}
  }),
  computed: {
    ...mapState('posts', {
      post: 'post'
    }),
    ...mapState('comments', {
      items: 'items',
      comment: 'comment'
    })
  },
  components: {
    Comment
  },
  watch: {
    'post._id': function() {
      this.$store.dispatch('comments/getCommentsByColumn', {
        query: 'post_id=' + this.post._id
      })
    }
  },
  methods: {
    validate() {
      this.$store.dispatch('posts/savePost')
      if (this.$refs.postForm.validate()) {
        this.snackbar = true
      }
    },
    scrollToParent(selector) {
      let $el = this.$el.querySelector(selector)
      console.log($el)
      $el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
      $el.style.border = '2px dashed orange'
      setTimeout(() => {
        $el.style.border = '1px dashed lightslategray'
      }, 3000)
    },
    addComment(newComment = null) {
      console.log(this.newComment, newComment)
      let comment =
        this.newComment && this.newComment.text ? this.newComment : newComment
      comment.post_id = this.post._id
      console.log('<an', comment)
      this.$store.dispatch('comments/saveComment', comment).then(() => {
        let selector = '#comment-' + this.comment._id

        this.$store
          .dispatch('posts/getPostById', this.$route.params.id)
          .then(() => {
            console.log(selector)

            setTimeout(
              () => {
                console.log(selector)
                this.scrollToParent(selector)
              },
              2000,
              selector
            )

            this.newComment = {}
          })
      })
    }
  },
  created() {
    this.$store.dispatch('posts/getPostById', this.$route.params.id)
  }
}
</script>
