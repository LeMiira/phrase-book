<template>
  <v-card class="rtl" title="درباره برنامه" prepend-avatar="/icons/tr-sq.svg">
    <v-card-text class="rtl">
      <div v-html="aboutUs"></div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  created() {
    this.$store.state.showSearchButton = true;
  },
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