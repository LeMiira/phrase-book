<template>
  <v-card class="ma-3">
    <v-card-avatar class="justify-end d-flex">
      <v-btn class="ma-2" color="red-darken-4" icon="mdi-magnify"></v-btn>
    </v-card-avatar>
    <v-card-header class="rtl">
      <v-card-header-text>
        <v-card-title
          >عبارت مورد نظر را به فارسی وارد کنید و کلیک کنید</v-card-title
        >
      </v-card-header-text>
    </v-card-header>
    <v-card-text class="rtl">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            id="search-field"
            v-model="searchText"
            required
            label="عبارت مورد نظر به زبان فارسی"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn
            id="search-button"
            size="x-large"
            block
            color="green"
            @click="doSearch"
            variant="contained-text"
            >جستجو</v-btn
          >
        </v-col>
      </v-row>
      <v-btn
        v-if="notFound"
        size="x-large"
        block
        class="mt-4"
        color="orange"
        to="/ask"
        variant="contained-text"
        >از من بپرسید</v-btn
      >
      <v-alert class="mt-4" v-if="notFound" type="error">
        برای عبارت مورد نظر نتیجه ای پیدا نشد!
      </v-alert>
      <v-alert class="my-4" v-if="notFound" type="info">
        عبارتی که جستجو کردید هنوز به مجموعه اضافه نشده، از بخش "از من بپرسید"
        عبارت یا کلمه مورد نظر خود را سوال کنید تا در سریعترین زمان ممکن به
        مجموعه اضافه شود. <br />
        عباراتی که از این بخش اضافه میشوند به دسته بندی "درخواستی" اضافه خواهد
        شد.
      </v-alert>
    </v-card-text>
  </v-card>

  <div class="loading" v-show="stillLoading">
    <v-progress-circular indeterminate color="teal"></v-progress-circular>
  </div>

  <PhraseComponent :PhrasesList="searchResult" />
</template>

<script>
import PhraseTags from "../components/PhraseTags.vue";
import PhraseComponent from "../components/PhraseComponent.vue";
import { supabase } from "../supabase";
export default {
  name: "Search",
  components: {
    PhraseTags,
    PhraseComponent,
  },
  created() {
    this.$store.state.showSearchButton = false;
  },
  methods: {
    async doSearch() {
      if (this.searchText === null) {
        return;
      }
      this.stillLoading = true;

      const { data, error } = await supabase
        .from("phrases")
        .select()
        .textSearch("farsi", this.searchText, { type: "plain" });
      console.log(data, error);
      if (data.length < 1) {
        this.notFound = true;
      } else {
        this.notFound = false;

        this.$store.commit("putSearchData", data);
      }
      const { data2, error2 } = await supabase
        .from("searchLog")
        .insert([{ searched_text: this.searchText }]);
      this.stillLoading = false;
    },
  },
  computed: {
    searchResult() {
      return this.$store.state.searchData;
    },
  },
  data() {
    return {
      notFound: false,
      searchText: null,
      stillLoading: false,
    };
  },
};
</script>

<style scoped>
#search-button {
  height: 56px;
}
</style>