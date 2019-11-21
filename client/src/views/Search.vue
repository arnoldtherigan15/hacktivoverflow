<template>
    <div class=" container public" style="margin-top: 9%; width:90%;height:100vh; margin-bottom:5%;">
        <h1 class="pl-5 mb-5" style="text-align:center; font-size:25px;">Public Question</h1>
        <div class="question" v-for="question in publicQuestion.slice().reverse()" :key="question._id">
            <div class="ques-item">
               <div class="vote-sesction mx-5">
                    <!-- <div class="votes mx-5"> -->
                        <p style="margin:0;">{{ question.upvotes.length - question.downvotes.length }}</p>
                        <span style="color:gray;">Votes</span>
                    <!-- </div> -->
                    <!-- <div class="votes mx-5"> -->
                        <p style="margin:0;">{{ question.answerId.length }}</p>
                        <!-- answer masih hardcore -->
                        <span style="color:gray;">Answer</span>
                    <!-- </div> -->
               </div>
                <div class="ques-content">
                    <div>
                        <a href="" @click.prevent="quesDetail(question._id)">{{ question.title }}</a>
                    </div>
                    <div v-html="question.description" class="text-break"></div>
                    <div style="display:flex;">
                        <div style="width:85%; display:flex; flex-wrap:wrap;">
                            <div @click.prevent="filterTag()" v-for="(tag,index) in question.tags" :key="index" class="py-2 mr-2 my-1" style="text-align:center; width:15%; background-color:#e1ecf4; cursor:pointer;">
                              {{tag}}
                            </div>
                        </div>
                        <div style="text-align:right; width:15%;">
                            <p>{{ question.userId.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../apis/server'
import { mapActions,mapState } from 'vuex'

export default {
  name: 'Public',
  data () {
    return {
      questions: ''
    }
  },
  methods: {
    ...mapActions([
      'searchData'
    ]),
    filterTag(){
      Swal.fire({
        title: 'loading',
        onOpen: () => {
          Swal.showLoading()
        }
      })
      this.searchData(this.$route.params.id)
        .then(data => {
          this.questions = this.publicQuestion
          Swal.close()
        })
        .catch(err => {
          Swal.close()
          err = JSON.parse(err.response.request.response).message[0]
          Swal.fire('error', err, 'error')
        })
    },
    quesDetail (id) {
      if (!localStorage.getItem('token')) {
        this.$router.push(`/started`)
      } else {
        this.$store.dispatch('getMyDetail', id)
        this.$router.push(`/public/detail/${id}`)
      }
    }
  },
  created () {
      Swal.fire({
        title: 'loading',
        onOpen: () => {
          Swal.showLoading()
        }
      })
    this.filterTag(this.$route.params.id)
        .then( data  => {
          this.questions = this.publicQuestion
          Swal.close()
        })
        .catch(err => {
          err = JSON.parse(err.response.request.response).message[0]
          Swal.fire('error', err, 'error')
        })
  },
  computed: {
    ...mapState([
      'publicQuestion'
    ])
  }
}
</script>

<style scoped>

.allQues {
    height: 100%;
    margin-top: 50px !important;
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

</style>
