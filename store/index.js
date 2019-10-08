import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import users from './modules/users'
import comments from './modules/comments'

Vue.use(Vuex)
const store = () =>
  new Vuex.Store({
    // state: {},
    // mutations: {},
    // actions: {},
    // plugins: [createPersistedState({ storage: window.sessionStorage })], // !debug ? [createPersistedState({ storage: window.sessionStorage })] : [],
    modules: {
      posts,
      users,
      comments
    }
  })

export default store
