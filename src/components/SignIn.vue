<template>
  <div>
    <h2>Sign in to your account</h2>

    <form @submit.prevent="checkLogin">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import { supabase } from "../supabase";

export default {
  name: "SignIn",

  data() {
    return {
      email: "amindiary@gmail.com",
      password: "amin4878",
    };
  },
  async created() {},
  computed: {},
  methods: {
    isLoggedIn() {
      if (this.$cookies.get("loggedInUser") != undefined) {
        return true;
      } //if no cookie, check state
      return this.$store.state.user.id != undefined ? true : false;
    },
    async checkLogin() {
      if (this.isLoggedIn()) {
        console.log("Already logged in!");
        return;
      }
      // console.log("loggedin?", this.isLoggedIn());
      try {
        // Use the Supabase provided method to handle the signin
        const { data, error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });

        if (error) {
          console.log(error);
        } else {
          this.$cookies.set("loggedInUser", data.user.id);
          this.$store.commit("setLoggedinUser", data.user);
        }
      } catch (error) {
        console.log(error.error_description, error.message);
      }
    },
  },
};
</script>