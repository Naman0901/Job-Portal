<template>
  <div>
    <app-header></app-header>
    <div class="my-4 mx-1" v-if="provider">
      <button class="btn btn-primary p-2" @click="add">+ New Job vacancy</button>
    </div>
    <div class="my-4 mx-1 text-center" v-else>
      <input type="text" class="form-control" placeholder="Enter Post to Search" v-model="searchpost">
      <button class="btn btn-primary p-2" @click="search">Search Job</button>
    </div>
    <div class="card m-3 text-center" v-for="job in jobs" v-bind:key="job.id">
      <div class="card-body">
        <h2 class="card-title pb-2">{{job.post}}</h2>
        <p class="card-subtitle pb-2">For technology :- {{job.tech}}</p>
        <p>By:- {{job.name}}</p>
        <button class="btn btn-primary"  v-if="provider" @click="applier(job.id)">View Applier</button>
        <button class="btn btn-primary" @click="apply(job.id)" v-else>View & Apply</button>
        <img
          src="https://www.nicepng.com/png/detail/326-3260333_graphic-edit-pencil-icon.png"
          style="width: 30px;" @click="update(job.id)" v-if="provider"
        />
        <img
          src="https://toppng.com/uploads/preview/delete-comments-delete-icon-black-11563177686kfv8sa8gps.png"
          style="width: 30px;" @click="deljob(job.id)" v-if="provider"
        />
      </div>
      <div class="card-footer text-muted">On :- {{new Date(job.posted_on).toDateString()}}</div>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";

export default {
  components: {
    "app-header": Header
  },
  data() {
    return {
      jobs: [],
      provider: true,
      searchpost: '',
      org:[]
    };
  },
  methods: {
    add: function(event) {
      this.$router.push("/crtjob");
    },
    update: function(id) {
      sessionStorage.setItem("job_id", id);
      this.$router.push("/crtjob");
    },
    deljob: function(id){
      this.$http.delete("http://localhost:3000/job/"+id).then(data=>{
        this.jobs = this.jobs.filter(job=> job.id != id);
      })
    },
    applier: function(id){
       sessionStorage.setItem("job_id", id);
      this.$router.push("/applier");
    },
    search: function(){
      if(this.searchpost != '')
      {
        console.log(this.searchpost)
        this.jobs = this.orgs.filter(job=> job.post == this.searchpost)
      }
      else this.jobs = this.orgs;
    },
    apply: function(id) {
      sessionStorage.setItem("job_id", id);
      this.$router.push("/apply");
    },
    getdata: function(){
      this.$http.get("http://localhost:3000/jobs").then(data => {
      this.jobs = data.body;
      this.orgs = data.body;
    });
    }
  },
  beforeCreate() {
    try {
      if (!this.$session.exists()) {
        this.$router.push("/");
      }
    } catch (err) {
      this.$router.replace({ path: "/" });
    }
  },
  created() {
    this.getdata();
    if (sessionStorage.getItem("job_id")) sessionStorage.removeItem("job_id");
    var user = JSON.parse(sessionStorage.getItem("user"));
    if(user.type!="provider")
      this.provider = false;

  }
};
</script>

<style scoped>
.btn {
  border-radius: 20px;
}
.card {
  width: fit-content;
  display: flex;
}
input{
  width: 300px;
  display: inline;
}
</style>

