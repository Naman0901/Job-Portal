<template>
  <div class>
     <router-view></router-view>
  </div>
</template>

<script>
import Addto from "./components/Viewjob.vue";
import Header from "./components/header.vue";
import Login from "./components/login.vue";

export default {
  components: {
    "addto": Addto,
    'app-header': Header,
    'login': Login
  },
  data() {
    return {
      title: "Quiz App",
      user:{}
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
</style>
 