<template>
  <div id="login">
    <div class="card login-page" style="width: 400px; border: 2px solid;">
      <h1 class="text-center pt-3">Login</h1>
      <form class="form-group m-5 text-center" @submit.prevent="loginto">
        <input
          type="text"
          placeholder="Enter Username"
          class="form-control"
          v-model="userdata.username"
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          class="form-control"
          v-model="userdata.password"
        />
        <button class="btn btn-success m-3">Submit</button>
        <label class="text-danger alert alert-danger" v-if="error">Wrong Username or password</label>
      </form>
    </div>
  </div>
</template>

<script>
import services from "../service";
export default {
  data() {
    return {
      userdata: {
        username: "",
        password: ""
      },
      error: false
    };
  },
  methods: {
    loginto: function() {
      var user={
        username: this.userdata.username,
        password: this.userdata.password
      }
      this.$http.post("http://localhost:3000/", user).then(data => {
        if (data.body == null) {
          error: true;
        } else {
          const user = {
            id: data.body[0].id,
            name: data.body[0].username,
            type: data.body[0].type
          };
          this.$session.start();
          this.$session.set("jwt", data.body.token);
          sessionStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/viewjob");
        }
      });
    }
  },
  beforeCreate() {
    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user");
    }
    if (sessionStorage.getItem("vue-session-key")) {
      sessionStorage.removeItem("vue-session-key");
    }
  }
};
</script>

<style scoped>
.login-page {
  align-items: center;
  display: flex;
  height: 50vh;
  margin: 16% auto;
  background-color: cadetblue;
}
</style>