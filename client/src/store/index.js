import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/server'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    myQuestion: [],
    detailQuestion: {
      _id: '',
      title: '',
      description: '',
      upvotes: '',
      downvotes: '',
      userId: '',
      answerId: ''
    },
    publicQuestion: [],
    user: []
  },
  mutations: {
    IS_LOGIN (state) {
      state.isLogin = true
    },
    IS_LOGOUT (state) {
      state.isLogin = false
    },
    MY_QUESTION (state, payload) {
      state.myQuestion = payload
    },
    DETAIL_QUESTION (state, payload) {
      state.detailQuestion._id = payload._id
      state.detailQuestion.title = payload.title
      state.detailQuestion.description = payload.description
      state.detailQuestion.upvotes = payload.upvotes
      state.detailQuestion.downvotes = payload.downvotes
      state.detailQuestion.userId = payload.userId
      state.detailQuestion.answerId = payload.answerId

      state.detailQuestion = payload
    },
    REMOVE_DATA (state) {
      state.detailQuestion._id = ''
      state.detailQuestion.title = ''
      state.detailQuestion.description = ''
      state.detailQuestion.upvotes = ''
      state.detailQuestion.downvotes = ''
      state.detailQuestion.userId = ''
    },
    UPDATE_QUESTION (state, payload) {
      state.detailQuestion._id = payload._id
      state.detailQuestion.title = payload.title
      state.detailQuestion.description = payload.description
      state.detailQuestion.upvotes = payload.upvotes
      state.detailQuestion.downvotes = payload.downvotes
      state.detailQuestion.userId = payload.userId
    },
    PUBLIC_QUESTION (state, payload) {
      state.publicQuestion = payload
    },
    USER_DATA (state,payload) {
      state.user = payload
    }
  },
  actions: {
    userData({commit}) {
      return new Promise (function(resolve,reject) {
        axios({
          method: 'get',
          url: '/users',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data})=>{
            console.log(data,'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            // this.tags = data.tags
            commit('USER_DATA',data)
            resolve(data)
          })
          .catch(err=>{
            console.log(err,'errrorrrrrrrrrrrrrr')
            reject(err)
          })
      })
    },
    searchData({ commit }, payload) {
      return new Promise (function (resolve, reject) {
        if(payload) {
          axios({
            method: 'get',
            url: `/question?title=${payload}`
          })
            .then(({ data })=>{
              commit('PUBLIC_QUESTION',data)
              router.push(`/search/${payload}`)
              resolve(data)
            })
            .catch(err=>{
              reject(err)
            })
        } else {
            axios({
              method: 'get',
              url: `/question`
            })
              .then(({ data })=>{
                commit('PUBLIC_QUESTION',data)
                resolve(data)
              })
              .catch(err=>{
                reject(err)
              })
        }
      })
    },
    fetchData ({ commit }, payload) {
      return new Promise (function (resolve, reject) {
        if(payload) {
          axios({
            method: 'get',
            url: `/question?tag=${payload}`
          })
            .then(({ data })=>{
              commit('PUBLIC_QUESTION',data)
              resolve(data)
            })
            .catch(err=>{
              reject(err)
            })
        } else {
            axios({
              method: 'get',
              url: `/question`
            })
              .then(({ data })=>{
                commit('PUBLIC_QUESTION',data)
                resolve(data)
              })
              .catch(err=>{
                reject(err)
              })
        }
      })
    },
    downVoteAnswer ({ commit }, payload) {
      axios({
        method: 'put',
        url: `/answer/downvote/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(_ => {
          console.log(payload, 'paaayloaddddddddd')

          this.dispatch('getMyDetail', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVoteAnswer ({ commit }, payload) {
      axios({
        method: 'put',
        url: `/answer/upvote/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(_ => {
          console.log(payload, 'paaayloaddddddddd')
          this.dispatch('getMyDetail', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVote ({ commit }, payload) {
      axios({
        method: 'put',
        url: `/question/downvote/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(_ => {
          this.dispatch('findOne', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVote ({ commit }, payload) {
      axios({
        method: 'put',
        url: `/question/upvote/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(_ => {
          this.dispatch('findOne', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findOne ({ commit }, payload) {
      axios({
        method: 'get',
        url: `/question/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data, 'dari findone')

          commit('UPDATE_QUESTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateQue ({ commit }, payload) {
      console.log('masuk store')

      axios({
        method: 'put',
        url: `/question/${payload._id}`,
        headers: { token: localStorage.getItem('token') },
        data: { title: payload.title, description: payload.description }
      })
        .then(({ data }) => {
          console.log(data)
          this.dispatch('personalQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion ({ commit }, payload) {
      axios({
        method: 'delete',
        url: `/question/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(_ => {
          commit('REMOVE_DATA')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMyDetail ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: `/question/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            commit('DETAIL_QUESTION', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: '/users/login',
          data: { email: payload.email, password: payload.password }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            commit('IS_LOGIN')
            router.push('/public')
            resolve(data)
          })
          .catch((err) => {
            err = JSON.parse(err.response.request.response).message[0]
            reject(err)
          })
      })
    },
    register ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: '/users/register',
          data: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            tags: payload.tags
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => {
            err = JSON.parse(err.response.request.response).message[0]
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      commit('IS_LOGOUT')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      router.push('/public')
    },
    personalQuestion ({ commit }) {
      axios({
        method: 'get',
        url: '/question/personal',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data, 'ini data personal')

          commit('MY_QUESTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
