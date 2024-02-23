<template>
  <v-row dense>
    <v-col
      v-for="item in categories"
      :key="item.order_id"
      :order="item.id"
      cols="6"
    >
      <v-card
        :to="'/phrases/' + item.id"
        v-if="item.published"
        class="category-btn ma-2"
      >
        <v-card-actions class="rtl">
          <v-btn color="teal" variant="contained-text" block>
            <v-badge
              v-if="item.isNew"
              class="new-badge"
              :color="item.labelNewColor"
              :content="item.labelNew"
              inline
              text-color="white"
            >
            </v-badge>

            <v-badge
              v-if="item.isUpdated"
              class="update-badge"
              :color="item.labelUpdateColor"
              :content="item.labelUpdate"
              inline
              text-color="white"
            >
            </v-badge>
          </v-btn>
        </v-card-actions>
        <v-card-header class="pa-2">
          <v-img
            class="rounded-lg mx-auto"
            :src="getCategoryImage(item.categoryImage, item.id)"
            max-width="100px"
            aspect-ratio="16/9"
            cover
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card-header>

        <v-divider></v-divider>
        <v-card-actions class="rtl">
          <v-btn color="teal" variant="contained-text" block
            >{{ item.farsi }}
            <v-badge
              color="success"
              :content="item.phrases.length"
              inline
            ></v-badge>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { supabase } from "../supabase";

export default {
  name: "CategoriesView",
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    isURL(str) {
      var regex =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    },

    getCategoryImage(imageSrc, catID) {
      const { data, error } = supabase.storage
        .from("images")
        .getPublicUrl("categories/" + imageSrc);

      return data.publicURL;

      if (this.isURL(imageSrc)) {
        return imageSrc;
      } else {
        //   console.log(img);
      }
    },

    storedCategories() {
      return this.$store.state.categories.length > 0 ? true : false;
    },
  },
  async created() {
    this.$store.state.showSearchButton = true;

    if (!this.storedCategories()) {
      try {
        const categories = await supabase
          .from("categories")
          .select("*, phrases!inner(id)")

          .order("order_id", { ascending: false });
        //console.log(categories.data);
        this.$store.commit("putCategories", categories.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  data() {
    return {};
  },
};
</script>


