<template>
  <div class="container mt-5 asking" style="height:100vh; margin-bottom:5%;">
      <form @submit.prevent="updateAnswer()">
          <div class="form-group">
            <quill v-model="description" :config="config" output="html"></quill>
          </div>
          <button type="submit" class="btn-color" style="color:#fff; padding:5px 10px;">Submit</button>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from '../apis/server'
import Swal from 'sweetalert2'
Vue.use(VueQuill)
export default {
  name: 'updateque',
  data () {
    return {
      description: '',
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        },
        placeholder: 'Description here'
      }
    }
  },
  computed: {
    ...mapState(['detailQuestion'])
  },
  methods: {
    updateAnswer () {
      axios({
        method: 'put',
        url: `/answer/${this.$route.params.id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          description: this.description
        }
      })
        .then(({ data }) => {
          this.description = ''
          this.$router.push(`/myquestion`)
        })
        .catch(err => {
            console.log(err.response,'================================'); 
            Swal.fire('error', 'internal server error :(', 'error')
        })
    }
  },
    created () {
        // this.description = this.detailQuestion
        console.log(this.detailQuestion,'==============================================');
        
        Swal.fire({
        title: 'loading',
        onOpen: () => {
            Swal.showLoading()
        }
        })
        this.$store.dispatch('getMyDetail', this.$route.params.id)
        .then(_ => {
            Swal.close()
        })
        .catch(err => {
            Swal.close()
            console.log(err)
        })
    }
}
</script>

<style scoped>
.asking {
    padding-top: 100px;
    height: 80vh;
}
.btn-color {
    background-color: #f48024 !important;
    border: none !important;
}
</style>
