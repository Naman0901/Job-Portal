<template>
  <div id="crtjob">
    <app-header></app-header>
    <h1 class="text-center my-5">Details</h1>
    <div id="form" class="p-4 m-5">
      <form class="form-group">
        <label class="p-1">Full Name</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Full Name"
          v-model="details.name"
          @click="added = false"
        />
        <br />
        <label class="p-1">College Name</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter College Name"
          v-model="details.college"
        />
        <br />
        <label class="p-1">Cureent Education</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Education"
          v-model="details.edu"
        />
        <br />
        <label class="p-1">Email</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Personal E-mail"
          v-model="details.email"
        />
        <br />
        <label class="p-1">Mobile</label>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Enter Mobile Number"
          v-model="details.mobile"
        />
        <br />
        <label class="p-1">Date of Birth</label>
        <input type="date" class="form-control mb-3" v-model="details.date_of_birth" />
        <br />
        <label class="p-1 mb-1">Experience in Years</label>
        <input type="number" class="form-control mb-3" v-model="details.experience" /> <br>
        <button class="btn btn-success my-3" @click="applyjob">Apply</button>
        <p class="p-1" v-if="apply">Applied For Job</p>
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
        college: "",
        edu: "",
        email: '',
        mobile: "",
        date_of_birth: '',
        experience: '',
        job_id: "",
        user_id: ''
      },
      apply: false,
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
      this.details.job_id = sessionStorage.getItem("job_id");
    }
    var user =JSON.parse(sessionStorage.getItem("user"));
    this.details.user_id = user.id;
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