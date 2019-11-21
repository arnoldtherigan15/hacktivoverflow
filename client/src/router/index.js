import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Started from '../views/Started.vue'
import Public from '../views/Public.vue'
import Myquestion from '../views/Myquestion.vue'
import PublicDetail from '../views/PublicDetail.vue'
import Ask from '../views/Ask.vue'
import MyquestionDetail from '../views/MyquestionDetail.vue'
import Updateque from '../views/Updateque.vue'
import Tag from '../views/Tag.vue'
import Search from '../views/Search.vue'
import UpdateAnswer from '../views/UpdateAnswer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/public',
    component: Home,
    children: [
      {
        path: 'public',
        name: 'public',
        component: Public
      },
      {
        path: 'tag/:id',
        name: 'tag',
        component: Tag
      },
      {
        path: 'search/:id',
        name: 'search',
        component: Search
      },
      {
        path: 'myquestion',
        name: 'myquestion',
        component: Myquestion
      },
      {
        path: 'myquestion/:id',
        name: 'myquestion',
        component: MyquestionDetail
      },
      {
        path: 'updateque/:id',
        name: 'updateque',
        component: Updateque
      },
      {
        path: 'updateanswer/:id',
        name: 'updateanswer',
        component: UpdateAnswer
      },
      {
        path: 'public/detail/:id',
        name: 'publicdetail',
        component: PublicDetail
      },
      {
        path: 'ask',
        name: 'ask',
        component: Ask
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/started',
    name: 'started',
    component: Started
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
