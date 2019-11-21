<template>
  <div class="container mt-5 asking" style="height:100vh; margin-bottom:5%;">
      <form @submit.prevent="updateQuestion()">
          <div class="form-group">
              <label for="title" style="text-align:left !important; margin:0;">Title</label>
          <small class="form-text text-muted">Imagine you’re asking a question to another developer.</small>
          <input v-model="title" type="text" placeholder="e.g “Is there an R function for finding the index of an element in a vector?” " class="form-control">
          </div>
          <div class="form-group">
            <quill v-model="description" :config="config" output="html"></quill>
          </div>
          <div class="mb-2" style="border: 1px solid #cccccc;">
            <vue-tags-input
                class="mt-2 mx-auto"
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
            />
          </div>
          <button type="submit" class="btn-color" style="color:#fff; padding:5px 10px;">Submit</button>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input'
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from '../apis/server'
import Swal from 'sweetalert2'
Vue.use(VueQuill)
export default {
  name: 'updateque',
  data () {
    return {
      title: '',
      description: '',
      tag: '',
      tags: [],
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
  components: {
    VueTagsInput
  },
  computed: {
    ...mapState(['detailQuestion'])
  },
  methods: {
    updateQuestion () {
      let tags = []
      this.tags.forEach(element => {
        tags.push(element.text)
      })
      axios({
        method: 'put',
        url: `/question/${this.$route.params.id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          title: this.title,
          description: this.description,
          tags: tags.join(',')
        }
      })
        .then(({ data }) => {
          this.title = ''
          this.description = ''
          this.tags = ''
          this.$router.push(`/myquestion/${this.$route.params.id}`)
        })
        .catch(err => {
            console.log(err.response,'================================'); 
            Swal.fire('error', 'internal server error :(', 'error')
        })
    }
  },
    created () {
        this.description = this.detailQuestion.description
        this.title = this.detailQuestion.title
        this.tags = this.detailQuestion.tags
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
