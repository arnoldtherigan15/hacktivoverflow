<template>
     <div class="container detail" style="height:100vh; margin-bottom:20%;">
        <h2 style="margin-bottom: 50px;">Question</h2>
        <div class="question">
            <div class="ques-item">
               <div class="vote-sesction mx-5">
                    <div class="votes mx-5">
                        <a href="" style="color:gray;" @click.prevent="upvote()"><i class="fas fa-caret-up"></i></a>
                        <p style="margin:0;">{{ detailQuestion.upvotes.length - detailQuestion.downvotes.length }}</p>
                        <a href="" style="color:gray;" @click.prevent="downvote()"><i class="fas fa-caret-down"></i></a>
                    </div>
               </div>

                <div class="ques-content">
                    <div>
                        <h3>{{ detailQuestion.title }}</h3>
                    </div>
                    <div v-html="detailQuestion.description" class="text-break">
                        {{ detailQuestion.description }}
                    </div>
                </div>
            </div>
        </div>
        <!-- ANSWER -->
        <div class="answer">
            <h2>Answer</h2>
            <div v-for="answer in detailQuestion.answerId" :key="answer._id" style="background-color:#f2f2f2; color:black; padding-top: 10px;">
                <!-- <h1>{{ answer.description }}</h1> -->
                <div class="ques-item">
                <div class="vote-sesction mx-5">
                        <div class="votes mx-5">
                            <a href="" style="color:gray;" @click.prevent="upvoteAnswer(answer._id)"><i class="fas fa-caret-up"></i></a>
                            <p style="margin:0;">{{ answer.upvotes.length - answer.downvotes.length }}</p>
                            <a href="" style="color:gray;" @click.prevent="downvoteAnswer(answer._id)"><i class="fas fa-caret-down"></i></a>
                        </div>
                </div>

                    <div class="ques-content">
                        <div style="display:flex;">
                            <div v-html="answer.description" class="text-break" style="width:85%; display:flex; flex-wrap:wrap;">
                                {{ answer.description }}
                            </div>
                            <div style="text-align:right; width:15%; margin-right:10px;">
                                <p>{{ answer.userId.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <!-- answer question -->
        <div style="margin-bottom:100px;">
            <form @submit.prevent="answerQue()">
                <h3>Your Answer</h3>
                <div class="form-group">
                    <quill v-model="description" :config="config" output="html"></quill>
                </div>
                <button type="submit" class="btn-color" style="color:#fff; padding:5px 10px;">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from '../apis/server'
Vue.use(VueQuill)

export default {
  name: 'AllQuestionDetal',
  methods: {
    upvoteAnswer (id) {
      this.$store.dispatch('upVoteAnswer', id)
    },
    downvoteAnswer (id) {
      this.$store.dispatch('downVoteAnswer', id)
    },
    upvote () {
      this.$store.dispatch('upVote', this.$route.params.id)
    },
    downvote () {
      this.$store.dispatch('downVote', this.$route.params.id)
    },
    answerQue () {
      axios({
        method: 'post',
        url: `/answer/${this.$route.params.id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          description: this.description
        }
      })
        .then(({ data }) => {
          this.description = ''
          this.$router.push('/public')
        })
        .catch(err => {
          Swal.fire('error', err, 'error')
        })
    }
  },
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
  created () {
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
a {
    text-decoration: none !important;
    /* margin: 0 10px; */
}
i {
    font-size: 30px !important;
}
.detail {
    padding-top: 100px;
    height: 100vh;
}

.question {
    /* background-color: gray; */
    border-top: 1px solid gray;
    padding: 20px 0;
}
.ques-item {
    display: flex;
}
.votes {
    width: 20%;
}
.ques-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
}
.vote-section {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.answer {
    /* background-color: gray; */
    border-top: 1px solid gray;
    padding: 20px 0;
}
</style>
