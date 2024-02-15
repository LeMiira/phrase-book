<template>
  <v-card-header v-if="tagIds != null" class="rtl tags-header">
    <v-chip
      color="black"
      class="ml-2"
      size="small"
      v-for="tag in tagChips"
      v-bind:key="tag.id"
    >
      {{ tagText(tag) }}
    </v-chip>
  </v-card-header>
</template>

<script>
export default {
  props: {
    tagIds: Object,
  },
  computed: {
    tagChips() {
      return this.tagIds.ids;
    },
  },
  methods: {
    tagText(tag_id) {
      const returnValue = this.$store.state.tags.filter(
        (filtered) => filtered.id == tag_id
      );

      return returnValue.length > 0 ? returnValue[0].farsi : "";
    },
    phraseTags(tag_id) {
      let filteredTags = [];
      tag_id.forEach((tagID) => {
        filteredTags.push(
          this.$store.state.tags.filter((filtered) => filtered.id == tagID)
        );
      });

      return filteredTags;
    },
  },
};
</script>