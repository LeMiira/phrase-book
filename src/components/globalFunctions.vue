<template></template>


<script>
export default {
  name: "globalFunctions",
  methods: {
    isLoggedIn() {
      if (this.$cookies.get("loggedInUser") != undefined) {
        return true;
      }
      return this.$store.state.user.id != undefined ? true : false;
    },
  },
};
</script>