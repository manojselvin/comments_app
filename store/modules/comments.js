import api from '@/utils/backend-api'
import { Comment } from '@/models/Comment'

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
  comment: new Comment()
}

const getters = {
  comments: (state) => {
    return state
  }
}

const actions = {
  getAllComments({ commit }, { query = '' } = {}) {
    commit('setLoading', { loading: true })
    api.getData('api/comments?' + query).then((res) => {
      if (res.data.status == 'success') {
        const Comments = res.data.data.Comments
        console.log(Comments)
        commit('setItems', Comments)
      }

      commit('setLoading', { loading: false })
    })

    commit('setLoading', { loading: false })
  },

  getCommentsByColumn({ commit }, { query = '' } = {}) {
    commit('setLoading', { loading: true })
    api.getData('api/comments/column?' + query).then((res) => {
      if (res.data.status == 'success') {
        let comments = res.data.data.comments
        console.log(comments)
        commit('setItems', comments)
      }

      commit('setLoading', { loading: false })
    })

    commit('setLoading', { loading: false })
  },

  getCommentById({ commit }, _id) {
    commit('setLoading', { loading: true })
    if (_id) {
      api.getData('api/comments/' + _id).then(
        (res) => {
          let Comment = res.data.data.Comment

          console.log(Comment)
          commit('setComment', { Comment })
          commit('setLoading', { loading: false })
        },
        (err) => {
          console.log(err)
        }
      )
    } else {
      console.log('Comment')
      // commit("setComment", { contatct: new Comment() });
      commit('setLoading', { loading: false })
    }
  },

  saveComment({ commit, dispatch }, comment) {
    //console.log(comment)
    if (!comment._id) {
      delete comment._id
      //   Comment.owner_id = null;
      console.log(comment)
      api
        .postData('api/comments', comment)
        .then((res) => {
          console.log(res)
          const comment = res.data.data.comment
          commit('setComment', { comment })
          alert(res.data.message)
          sendSuccessNotice(commit, res.data.message)
        })
        .catch((err) => {
          console.log(err)
          sendErrorNotice(commit, 'Operation failed! Please try again later. ')
          closeNotice(commit, 1500)
        })
    } else {
      api
        .putData('api/comments/' + Comment._id.toString(), Comment)
        .then((res) => {
          const Comment = res.data.data.Comment
          commit('setComment', { Comment })
          sendSuccessNotice(commit, res.data.message)
        })
        .catch((err) => {
          console.log(err)
          sendErrorNotice(commit, 'Operation failed! Please try again later. ')
          closeNotice(commit, 1500)
        })
    }
  },
  deleteComment({ state, commit, dispatch }, id) {
    api
      .deleteData('api/comments/' + id.toString())
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
  setItems(state, comments) {
    state.items = comments
  },
  setCommentForm(state, Comment_form) {
    state.Comment_form = Comment_form
  },

  setComment(state, { comment }) {
    state.comment = comment
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
