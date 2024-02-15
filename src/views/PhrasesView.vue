<template>
  <div class="loading" v-show="stillLoading">
    <v-progress-circular indeterminate color="teal"></v-progress-circular>
  </div>

  <!--   <v-card v-if="!phrasesExist() && !stillLoading" class="mb-4">
    <v-responsive :aspect-ratio="9 / 16">
      <v-card-text class="rtl pa-4">
        <v-alert class="rtl" type="info">
          هنوز چیزی در این قسمت اضافه نشده.</v-alert
        >
      </v-card-text>
      <Vue3Lottie :animationData="CatJSON" />
    </v-responsive>
  </v-card> -->

  <v-row dense v-if="phrases">
    <div class="loading" v-show="isSoundLoading">
      <v-progress-circular indeterminate color="teal"></v-progress-circular>
    </div>
    <PhraseComponent :PhrasesList="phrases.value" />
  </v-row>
</template>


<script>
import PhraseTags from "../components/PhraseTags.vue";
import PhraseComponent from "../components/PhraseComponent.vue";
import { supabase } from "../supabase";
/* import LoadingJSON from "../assets/lotties/loading.json";
import CatJSON from "../assets/lotties/cat.json"; */
//import { TextToSpeech } from "@capacitor-community/text-to-speech";
//const dataJsonPath = "https://temsool.com/app/phrasebook/phrases.json";

export default {
  name: "PhrasesView",
  components: {
    PhraseTags,
    PhraseComponent,
  },
  computed: {
    phrases() {
      let catID = this.$route.params.cat_id;
      let filteredPhrases = this.$store.state.phrases.filter(
        (filtered) => filtered.cat_id == catID
      );
      filteredPhrases = filteredPhrases[0]; //0 is value prop that contains object of phrases

      return filteredPhrases;
    },
  },
  mounted() {},
  async created() {
    this.$store.state.showSearchButton = true;

    /* 
    this.synth = window.speechSynthesis;
    this.greetingSpeech = new window.SpeechSynthesisUtterance();

    this.voiceList = this.synth.getVoices();
    this.greetingSpeech.voice = this.voiceList[93];
    console.log(this.voiceList, this.greetingSpeech.voice); */

    let catID = this.$route.params.cat_id;

    if (!this.storedPhrases(catID)) {
      try {
        //   const res = await axios.get(dataJsonPath);

        const res = await supabase
          .from("phrases")
          .select()
          .eq("cat_id", catID)
          .order("order_id", { ascending: false });

        /*    this.$store.commit("putPhrases", res.data); */

        if (res.data.length == 0) {
          res.data = [];
        }
        this.$store.commit({
          type: "putPhrases",
          cat_id: parseInt(catID),
          value: res.data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.toggleLoading(false);
      }
    }
    this.toggleLoading(false);
  },
  watch: {},

  methods: {
    toggleLoading(value) {
      this.stillLoading = false;
    },
    storedPhrases(catID) {
      /*   let filteredPhrases = this.$store.state.phrases.filter(function (
        filtered
      ) {
        console.log("------->", filtered);
        if (filtered.cat_id == catID) {
          return true;
        }
      }); */
      // console.log(this.$store.state.phrases);
      let filteredPhrases = this.$store.state.phrases.filter(
        (filtered) => filtered.cat_id == catID
      );

      return filteredPhrases.length > 0 ? true : false;
    },
    listenForSpeechEvents() {
      /*   this.greetingSpeech.onstart = () => {
        this.isSoundLoading = true;
      };

      this.greetingSpeech.onend = () => {
        this.isSoundLoading = false;
      }; */
    },
  },
  data() {
    return {
      synth: null,

      stillLoading: true,
      isSoundLoading: false,
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>