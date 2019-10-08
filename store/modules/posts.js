import api from '@/utils/backend-api'
import { Post } from '@/models/Post'

import {
  sendSuccessNotice,
  sendErrorNotice,
  closeNotice,
  getDefaultPagination,
  commitPagination
} from '@/utils/store-util.js'

const state = {
  items: [],
  pagination: {},
  loading: false,
  mode: '',
  snackbar: false,
  notice: '',
  post: new Post()
}

const getters = {
  posts: (state) => {
    return state
  }
}

const actions = {
  getAllPosts({ commit }, { query = '' } = {}) {
    commit('setLoading', { loading: true })
    api.getData('api/posts?' + query).then((res) => {
      if (res.data.status == 'success') {
        const posts = res.data.data.posts
        console.log(posts)
        commit('setItems', posts)
      }

      commit('setLoading', { loading: false })
    })

    commit('setLoading', { loading: false })
  },

  getPostById({ commit }, _id) {
    commit('setLoading', { loading: true })
    if (_id) {
      api.getData('api/posts/' + _id).then(
        (res) => {
          let post = res.data.data.post

          console.log(post)
          commit('setPost', { post })
          commit('setLoading', { loading: false })
        },
        (err) => {
          console.log(err)
        }
      )
    } else {
      console.log('post')
      // commit("setPost", { contatct: new Post() });
      commit('setLoading', { loading: false })
    }
  },

  savePost({ commit, dispatch }) {
    let post = state.post
    if (!post._id) {
      api
        .postData('api/posts', post)
        .then((res) => {
          console.log(res)
          const post = res.data.data.post
          commit('setPost', { post })
          sendSuccessNotice(commit, res.data.message)
        })
        .catch((err) => {
          console.log(err)
          sendErrorNotice(commit, 'Operation failed! Please try again later. ')
          closeNotice(commit, 1500)
        })
    } else {
      api
        .putData('api/posts/' + post._id.toString(), post)
        .then((res) => {
          const post = res.data.data.post
          commit('setPost', { post })
          sendSuccessNotice(commit, res.data.message)
        })
        .catch((err) => {
          console.log(err)
          sendErrorNotice(commit, 'Operation failed! Please try again later. ')
          closeNotice(commit, 1500)
        })
    }
  },
  deletePost({ state, commit, dispatch }, id) {
    api
      .deleteData('api/posts/' + id.toString())
      .then((res) => {
        return new Promise((resolve, reject) => {
          sendSuccessNotice(commit, 'Operation is done.')
          resolve()
        })
      })
      .catch((err) => {
        console.log(err)
        sendErrorNotice(commit, 'Operation failed! Please try again later. ')
        closeNotice(commit, 1500)
      })
  },
  closeSnackBar({ commit }, timeout) {
    closeNotice(commit, timeout)
  }
}

const mutations = {
  setItems(state, posts) {
    state.items = posts
  },
  setPostForm(state, post_form) {
    state.post_form = post_form
  },

  setPost(state, { post }) {
    state.post = post
  },

  setPagination(state, pagination) {
    state.pagination = pagination
  },
  setLoading(state, { loading }) {
    state.loading = loading
  },
  setNotice(state, { notice }) {
    console.log(' notice .... ', notice)
    state.notice = notice
  },
  setSnackbar(state, { snackbar }) {
    state.snackbar = snackbar
  },
  setMode(state, { mode }) {
    state.mode = mode
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
