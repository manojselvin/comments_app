<template>
  <div>
    <v-card>
      <v-card-title class="title">
        Posts
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          autocomplete="no"
        ></v-text-field>
        <v-btn class="deep-orange darken-3" fab small dark @click.native="add">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="postList"
        :page.sync="page"
        :items-per-page="10"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
        :single-expand="true"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-btn class="grey darken-3" fab small dark @click.native="viewPost(item._id)">
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import Store from '@/store'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Description', value: 'description' },
        {
          text: 'Is Parent',
          value: 'title'
        },
        { text: 'Stage', value: 'author.name' },
        { text: 'Actions', value: 'action', sortable: false }
      ],

      posts: [],
      search: null
    }
  },

  methods: {
    add() {
      this.$router.push('/posts/add')
    },
    viewPost(_id) {
      this.$router.push('/posts/' + _id)
    }
  },

  computed: {
    ...mapState('posts', {
      postList: 'items',
      pagination: 'pagination',
      loading: 'loading',
      mode: 'mode',
      snackbar: 'snackbar',
      notice: 'notice'
    })
  },
  created() {
    console.log(this.allPost)
    this.$store.dispatch('posts/getAllPosts')
  }
}
</script>
