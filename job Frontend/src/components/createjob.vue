<template>
  <div id="crtjob">
    <app-header></app-header>
    <h1 class="text-center my-5" v-if="!job_id">Add Job Vacancy</h1>
    <h1 class="text-center my-5" v-else>Update Job Vacancy</h1>
    <div id="form" class="p-4 m-5">
      <form class="form-group">
        <label class="p-1">Company Name</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Comapny Name"
          v-model="details.name"
          @click="added = false"
        />
        <br />
        <label class="p-1">Vacant Post</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Post Name"
          v-model="details.post"
        />
        <br />
        <label class="p-1">Technology Required</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Technology"
          v-model="details.tech"
        />
        <br />
        <label class="p-1">Vacancy</label>
        <input type="number" class="form-control mb-3" v-model="details.vacancy" />
        <br />
        <label class="p-1 mb-1">Detailed Description</label>
        <textarea cols="63" rows="10" class="form-control" v-model="details.description"></textarea>
        <button class="btn btn-success my-3" @click="addjob" v-if="!job_id">Submit</button>
        <button class="btn btn-success my-3" @click="updatejob" v-else>Update</button>
        <p class="p-1" v-if="added">Job Created</p>
        <p class="p-1" v-if="updated">Job Updated</p>
      </form>
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
      details: {
        name: "",
        post: "",
        tech: "",
        vacancy: 0,
        description: ""
      },
      added: false,
      updated: false,
      job_id: ""
    };
  },
  methods: {
    addjob: function(event) {
      event.preventDefault();
      this.$http
        .post("http://localhost:3000/newjob", this.details)
        .then(data => {
          this.added = true;
          this.details = {
            name: "",
            post: "",
            tech: "",
            vacancy: 0,
            description: ""
          };
        });
    },
    updatejob: function(event) {
      event.preventDefault();
      this.$http
        .put("http://localhost:3000/job/" + this.job_id, this.details)
        .then(data => {
          console.log(data.body);
          this.updated = true;
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
    if (sessionStorage.getItem("job_id")) {
      this.job_id = sessionStorage.getItem("job_id");
      this.$http.get("http://localhost:3000/job/" + this.job_id).then(data => {
        this.details = data.body;
      });
    }
  }
};
</script>

<style scoped>
#crtjob {
  background-color: rgba(124, 208, 223, 0.911);
}
form {
  padding: 3px;
}
input {
  display: inline;
  width: 50%;
}
label {
  border: 2px solid;
  border-radius: 12px;
  color: white;
  background-color: rgb(233, 83, 83);
}
p {
  width: fit-content;
  color: rgb(182, 128, 27);
}
</style>