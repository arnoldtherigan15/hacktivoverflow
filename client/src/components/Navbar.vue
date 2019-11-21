<template>
  <div>
    <b-navbar toggleable="lg" class="fixed-top nav-style nav-color">
        <b-navbar-brand href="#" v-if="!this.$store.state.isLogin"><img src="../assets/logo.png" alt="logooverflow" style="width:25px; margin-bottom:10px;"><img @click="home()" src="../assets/overflow.png" alt="logo" class="logo"></b-navbar-brand>
        <b-navbar-brand href="#" v-if="this.$store.state.isLogin"><img src="../assets/logo.png" alt="logooverflow" style="width:25px; margin-bottom:10px;"><img @click="questions()" src="../assets/overflow.png" alt="logo" class="logo"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="!this.$store.state.isLogin">
            <b-nav-item href="#" @click="questions()">Question</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="this.$store.state.isLogin">
            <b-nav-item href="#" @click="myquestion()">My Question</b-nav-item>
        </b-navbar-nav>
        <!-- <b-nav-form class="search-bar mx-auto">
            <b-form-input size="sm" class="mr-sm-2 searchform" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 btn-color" type="submit">Search</b-button>
        </b-nav-form> -->
        <div style="width:80%;">
                  <form @submit.prevent="searchTitle()">
              <div style="display:flex;">
                  <div class="search-icon">
                      <i class="fas fa-search" style="font-size:20px; margin-top:8px; color:#848d95;"></i>
                  </div>
                  <div style="width:100%;">
                      <input v-model="title" class="form-control search" type="text" placeholder="search ...">
                  </div>
              </div>
                  </form>
        </div>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto" v-if="!this.$store.state.isLogin">
            <!-- Using 'button-content' slot -->
            <b-navbar-nav right>
                <router-link to="/started"><p class="login">Get Started</p></router-link>
            </b-navbar-nav>
        </b-navbar-nav>
        <b-navbar-nav class="mx-auto" v-if="this.$store.state.isLogin">
            <!-- Using 'button-content' slot -->
            <b-navbar-nav right>
                <!-- <router-link to="/login"><p class="login">Logout</p></router-link> -->
                <button class="ask" @click="ask()"><i class="fas fa-question-circle pt-1"></i></button>
                <button class="logout" @click="logout()">Logout</button>
            </b-navbar-nav>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: this.$store.state.isLogin,
      title: ''
    }
  },
  methods: {
    searchTitle(){
      let title = this.title
      this.$store.dispatch('fetchData',title)
      this.title = ''
    },
    home () {
      this.$router.push('/public')
    },
    questions () {
      this.$router.push('/public')
    },
    logout () {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'See you again'
      })
      this.$store.dispatch('userData')
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    ask () {
      this.$router.push('/ask')
    },
    myquestion () {
      this.$router.push('/myquestion')
    }
  },
  created () {
    this.$store.dispatch('userData')
    .then(data=>{
      console.log(data,'sidebarrrrrrrrrrrrrrrrrrrrrr');
    })
  }
}
</script>

<style>
.search {
  background-color: #f2f2f2 !important;
  border: none !important;
  border-radius: 0 8px 8px 0 !important;
}
.search-icon {
  background-color: #f2f2f2 !important;
  /* height: 100%; */
  padding: 0 10px !important;
  border-radius: 8px 0 0 8px !important;
}

.btn-color {
    background-color: #f48024 !important;
    border: none !important;
}
.nav-style {
    color: gray;
    box-shadow: 1px 1px 1px rgba(189, 195, 199,.8);
}
.logo {
    width: 6vw;
    margin-left: 10px;
    margin-bottom: 8px;
}
i {
    font-size: 25px;
}
.search-bar {
    width: 80%;
}

.login {
    color: #f48024;
    font-weight: bold;
    margin-top: 10px;
    text-decoration: none !important;
}
.logout {
    background-color: #f48024;
    border: none;
    color: white;
    border-radius: 0 8px 8px 0 !important;
}
.ask {
    background-color: #d35400;
    border: none;
    color: white;
    border-radius: 8px 0 0 8px !important;
}
</style>
