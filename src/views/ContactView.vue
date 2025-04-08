<template>
  <v-card class="ma-3">
    <v-card-text class="rtl">
      <div v-html="contactMeText"></div>
    </v-card-text>

    <v-card-text class="rtl">
      <v-row>
        <v-col cols="12" md="12">
          <v-list density="compact">
            <v-list-item
              href="mailto:info@temsool.com"
              title="ایمیل"
              variant="tonal"
              color="red-lighten-5"
              rounded="xl"
              class="ma-1"
              prepend-icon="mdi-email-outline"
            >
            </v-list-item>

            <v-list-item
              href="https://twitter.com/miiiiiiiiiirra"
              title="توییتر"
              color="red-lighten-5"
              variant="tonal"
              class="ma-1"
              rounded="xl"
              prepend-icon="mdi-twitter"
            >
            </v-list-item>

           
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <div class="loading" v-show="stillLoading">
    <v-progress-circular indeterminate color="teal"></v-progress-circular>
  </div>
</template>

<script>
import { supabase } from "../supabase";
export default {
  name: "ContactMe",

  created() {},

  computed: {
    contactMeText() {
      return this.$store.state.settings !== null &&
        this.$store.state.settings !== undefined
        ? this.$store.state.settings[0].contactMeText
        : "";
    },
  },
  data() {
    return {
      stillLoading: false,
    };
  },
};
</script>

<style scoped>
</style>