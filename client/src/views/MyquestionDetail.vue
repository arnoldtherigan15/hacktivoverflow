<template>
     <div class="container detail" style="height:100vh; margin-top:2%;">
        <b-tabs content-class="mt-3">
          <b-tab title="Question" active>
            <div style="margin-bottom: 50px;">
                <h2>My Question</h2>
                <button @click.prevent="updateQue()" class="btn btn-success mx-1">Update</button>
                <button @click.prevent="deleteQue()" class="btn btn-danger mx-1">Delete</button>
            </div>
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
          </b-tab>
          <b-tab title="Answers">
              <!-- ANSWER -->
                  <h1>Answer</h1>
              <div class="answer" v-for="answer in detailQuestion.answerId" :key="answer._id">
                  <!-- <div v-for="answer in detailQuestion.answerId" :key="answer._id">
                      <h1>{{ answer.description }}</h1>
                  </div> -->
                  <div class="ques-content">
                      <div style="display:flex; flex-wrap:wrap;">
                          <div v-html="answer.description" class="text-break" style="width:80%; display:flex; flex-wrap:wrap;">
                              {{ answer.description }}
                          </div>
                          <div style="text-align:right; width:15%; margin-right:10px;">
                              <p>{{ answer.userId.name}}</p>
                          </div>
                          <br>
                          <div>
                            <button @click.prevent="updateans(answer._id)" v-if="answer.userId.name === nama" class="btn btn-success">Update</button>
                          </div>
                      </div>
                  </div>
              </div>
            
          </b-tab>
        </b-tabs>
       <!-- --------- -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import axios from '../apis/server'

export default {
  name: 'AllQuestionDetal',
  data () {
    return {
      nama: localStorage.getItem('name')
    }
  },
  methods: {
    updateans(id) {
      this.$router.push(`/updateanswer/${id}`)
    },
    upvote () {
      this.$store.dispatch('upVote', this.$route.params.id)
    },
    downvote () {
      this.$store.dispatch('downVote', this.$route.params.id)
    },
    updateQue () {
        this.$router.push(`/updateque/${this.$route.params.id}`)
    //   axios({
    //     method: 'put',
    //     url: `/question/${this.$route.params.id}`,
    //     headers: {
    //       token: localStorage.getItem('token')
    //     }
    //   })
    //     .then(_ => {
    //       Swal.fire(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //       )
    //       this.$router.push('/myquestion')
    //     })
    //     .catch(err => {
    //       console.log(err.response, '===========================')
    //       Swal.fire('error', 'internal server error', 'error')
    //     })
    },
    deleteQue () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/question/${this.$route.params.id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(_ => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.$router.push('/myquestion')
            })
            .catch(err => {
              console.log(err.response, '===========================')
              Swal.fire('error', 'internal server error', 'error')
            })
        }
      })
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
    border-top: 1px solid gray !important;
    padding: 20px 0;
}
</style>
