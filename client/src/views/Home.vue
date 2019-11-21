<template>
  <div class="home row" style="height:100vh;">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="col-2" style="overflow:auto; height:100vh; border-right:1px solid #d6d9dc;">
      <Sidebar />
    </div>
    <div class="col-10" style="overflow:auto; height:100vh;">
      <router-view/>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    Sidebar
  }
}
</script>
