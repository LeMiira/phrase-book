<template>
  <v-card>
    <v-card-header class="rtl">
      <v-card-avatar>
        <v-avatar image="/icons/tr-sq.svg"></v-avatar>
      </v-card-avatar>

      <v-card-header-text>
        <v-card-title>درباره برنامه</v-card-title>
      </v-card-header-text>
    </v-card-header>
    <v-card-text class="rtl">
      <div v-html="aboutUs"></div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  computed: {
    aboutUs() {
      return this.$store.state.settings !== null &&
        this.$store.state.settings !== undefined
        ? this.$store.state.settings[0].about
        : "";
    },
  },
  methods: {},
};
</script>