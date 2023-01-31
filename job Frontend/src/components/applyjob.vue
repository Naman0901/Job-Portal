<template>
  <div id="apply">
    <app-header></app-header>
    <h1 class="text-center my-5">Job Description</h1>
    <div class="container p-4 m-5">
      <label class="p-1">Company Name :-</label>
      <label class="p-1">{{details.name}}</label>
      <br />
      <label class="p-1">Vacant Post :-</label>
      <label class="p-1">{{details.post}}</label>
      <br />
      <label class="p-1">Technology Required :-</label>
      <label class="p-1">{{details.tech}}</label>
      <br />
      <label class="p-1">Vacancy :-</label>
      <label class="p-1">{{details.vacancy}}</label>
      <br />
      <label class="p-1">Detailed Description</label>
      <br />
      <label class="p-1">{{details.description}}</label>
      <br />
    </div>
    <button class="btn btn-success mx-5 my-5" @click="apply">Apply</button>
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
      details: { },
      job_id: ""
    };
  },
  methods: {
    apply: function(event) {
      this.$router.push("/details");
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
#apply {
  background-color: rgba(124, 208, 223, 0.911);
}
.container {
  border: 2px dotted;
}
input {
  display: inline;
  width: 50%;
}

p {
  width: fit-content;
  color: rgb(182, 128, 27);
}
</style>