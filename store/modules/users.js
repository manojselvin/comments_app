import api from '@/utils/backend-api'
import { User } from '@/models/User'

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
  user: new User()
}

const getters = {
  users: (state) => {
    return state
  }
}

const actions = {
  authenticate({ commit, state }) {
    console.log(state.user, this.user)
    commit('setLoading', { loading: true })
    api
      .postData('api/users/authenticate/', {
        username: state.user.username,
        password: state.user.password
      })
      .then(
        (res) => {
          let user = res.data

          // console.log(User)
          commit('setUser', { user })
          commit('setLoading', { loading: false })
        },
        (err) => {
          console.log(err)
        }
      )
  },

  getAllUsers({ commit }, { query = '' } = {}) {
    commit('setLoading', { loading: true })
    api.getData('api/users?' + query).then((res) => {
      if (res.data.status == 'success') {
        const Users = res.data.data.Users
        console.log(Users)
        commit('setItems', Users)
      }

      commit('setLoading', { loading: false })
    })

    commit('setLoading', { loading: false })
  },

  getUserById({ commit }, _id) {
    commit('setLoading', { loading: true })
    if (_id) {
      api.getData('api/users/' + _id).then(
        (res) => {
          let User = res.data.data.User

          console.log(User)
          commit('setUser', { User })
          commit('setLoading', { loading: false })
        },
        (err) => {
          console.log(err)
        }
      )
    } else {
      console.log('User')
      // commit("setUser", { contatct: new User() });
      commit('setLoading', { loading: false })
    }
  },

  saveUser({ commit, dispatch }, User, parent) {
    console.log(User)
    if (!User._id) {
      delete User._id
      //   User.owner_id = null;
      console.log(User)
      api
        .UserData('api/users', User)
        .then((res) => {
          console.log(res)
          const User = res.data.data.User
          commit('setUser', { User })
          sendSuccessNotice(commit, res.data.message)
        })
        .catch((err) => {
          console.log(err)
          sendErrorNotice(commit, 'Operation failed! Please try again later. ')
          closeNotice(commit, 1500)
        })
    } else {
      api
        .putData('api/users/' + User._id.toString(), User)
        .then((res) => {
          const User = res.data.data.User
          commit('setUser', { User })
          sendSuccessNotice(commit, res.data.message)
        })
        .catch((err) => {
          console.log(err)
          sendErrorNotice(commit, 'Operation failed! Please try again later. ')
          closeNotice(commit, 1500)
        })
    }
  },
  deleteUser({ state, commit, dispatch }, id) {
    api
      .deleteData('api/users/' + id.toString())
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
  setItems(state, users) {
    state.items = users
  },
  setUserForm(state, User_form) {
    state.User_form = User_form
  },

  setUser(state, { user }) {
    state.user = user
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
