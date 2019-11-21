<template>
  <div id="nav" class="px-5" style="margin-top:40%; text-align:left;">
      <router-link to="/public">Home</router-link>
      <br>
      <div v-if="isLogin">
        <h5>Tags</h5>
        <div class="my-2">
          <form style="position:relative;">
            <vue-tags-input
                style="border: 1px solid black; margin: 10px 0;"
                class="mx-auto"
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
            />
            <button @click.prevent="addTag()">
              <i style="cursor:pointer;" class="fas fa-plus"></i>
            </button>
          </form>
        </div>
        <div style="width:100%; display:flex; flex-wrap:wrap;">
            <div @click.prevent="filterTag(tag)" v-for="(tag,index) in user.tags" :key="index" class="py-2 mr-2 my-1" style="text-align:center; width:100%; background-color:#e1ecf4; cursor:pointer;">
              {{tag}}
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import axios from '../apis/server'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Sidebar',
  data () {
    return {
      tag: '',
      tags: []
    }
  },
  computed: {
    ...mapState([
      'user','isLogin'
    ])
  },
  components: {
    VueTagsInput
  },
  methods: {
    ...mapActions([
      'userData','fetchData'
    ]),
    addTag() {
      let tags = []
        tags.push(this.user.tags)
      this.tags.forEach(element => {
        tags.push(element.text)
      })
      axios({
        method: 'patch',
        url: '/users',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          tags: tags.join(',')
        }
      })
        .then(_=>{
          this.tags =[]
          this.tag = []
          this.userData()
          Swal.fire('success','new tag added','success')
        })
        .catch(_=>{
          Swal.fire('error','internal server error','error')
        })
    },
    filterTag(tag){
      console.log(tag,'ini tagg');
      
      Swal.fire({
        title: 'loading',
        onOpen: () => {
          Swal.showLoading()
        }
      })
      this.fetchData(tag)
        .then( data  => {
          console.log(data,'dariii sidebarrrrrrrrrrrr');
          Swal.close()
          this.$router.push(`/public`)
        })
        .catch(err => {
          err = JSON.parse(err.response.request.response).message[0]
          Swal.fire('error', err, 'error')
        })
    }
  },
  created () {
    if(localStorage.getItem('token')) {
      this.userData()
      .then(data=>{
        console.log(data,'sidebarrrrrrrrrrrrrrrrrrrrrr');
      })
    }
  }
}
</script>

<style scoped>
.ti-new-tag-input-wrapper input[data-v-61d92e31] {
  background-color: red !important;
}
</style>
