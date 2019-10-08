<template>
  <div :id="'comment-'+comment._id" class="mt-4" style="border: 1px dashed lightslategray;">
    <v-card-text>
      <v-form ref="commentForm" v-model="valid" lazy-validation>
        <p
          style="background: lightgray; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
          class="pa-2"
          v-if="comment.parent_comment"
        >
          <v-chip
            @click="scrollTo('#comment-'+comment.parent_comment._id)"
            class
            color="primary"
            label
            text-color="white"
          >
            <v-icon left>mdi-label</v-icon>Parent
          </v-chip>
          &nbsp;
          {{ comment.parent_comment.text }}
        </p>
        <p>
          <span style="font-weight: bold;" class="primary--text">Manoj Selvin:</span>
          {{ comment.text }}
        </p>
        <v-btn v-on:click="toggleField('#comment-box-'+comment._id)" text small color="primary">
          <v-icon>mdi-reply</v-icon>&nbsp;Reply
        </v-btn>
        <div :id="'comment-box-'+comment._id" style="display: none">
          <v-text-field
            class="pl-4 pt-2"
            v-model="newComment.text"
            counter="160"
            @keydown.enter="addComment"
            :rules="newCommentRules"
            label="Enter Comment"
          ></v-text-field>
        </div>
      </v-form>
    </v-card-text>
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
    newCommentRules: [
      (v) => !!v || 'Comment is required',
      (v) => (v && v.length <= 160) || 'Comment must be max 160 characters'
    ],
    newComment: {}
  }),
  props: ['comment'],
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.snackbar = true
      }
    },
    toggleField(selector) {
      console.log(selector, $('#test'))
      $(selector).fadeToggle()
      // this.$nextTick(() => {
      // console.log(this.$refs[selector].$el.classList.toggle('hidden'))
      // })
    },
    scrollTo(selector) {
      this.$emit('clicked', selector)
    },
    addComment(e) {
      this.newComment.parent_comment = this.comment._id
      this.newComment.text = e.target.value
      this.newComment.post_id = this.comment.post_id

      this.$emit('saveComment', this.newComment)
    }
  }
}
</script>
<style>
.hidden {
  display: none;
}
</style>
