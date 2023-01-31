<template>
  <div>
    <app-header></app-header>
    <h1 class="text-center my-5">Details of Appliers</h1>
    <div id="table" class="table m-3">
      <table class="table-dark">
        <tr>
          <th>Full Name</th>
          <th>College Name</th>
          <th>Cureent Education</th>
          <th>Email</th>
          <th> Mobile No.</th>
          <th>Date of Birth</th>
          <th>Experience in Years</th>
        </tr>
        <tr v-for="detail in details" v-bind:key="detail.id">
          <td>{{detail.name}}</td>
          <td>{{detail.college}}</td>
          <td>{{detail.education}}</td>
          <td>{{detail.email}}</td>
          <td>{{detail.mobile}}</td>
          <td>{{new Date(detail.date_of_birth).toDateString()}}</td>
          <td>{{detail.experience}}</td>
        </tr>
      </table>
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
      details: [],
      apply: false,
        job_id: "",
    };
  },
  methods: {
    applyjob: function(event) {
      event.preventDefault();
      this.$http
        .post("http://localhost:3000/apply",this.details)
        .then(data => {
          this.apply = true;
          this.$router.push('/viewjob');
        });

    },
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
    }
    this.$http.get('http://localhost:3000/applier/'+this.job_id).then(data=>{
      this.details = data.body;
    })
  }
};
</script>

<style scoped>
th,td{
  border: 2px solid violet;
}
</style>