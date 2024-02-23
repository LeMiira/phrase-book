
<template>
  <v-col v-for="(item, index) in PhrasesList" :key="index" cols="12">
    <v-card v-if="item" class="mb-4">
      <template v-slot:prepend>
        <v-avatar size="18">
          <v-img src="/icons/tr-sq.svg" alt="TR"></v-img>
        </v-avatar>
      </template>
      <template v-slot:title>
        <v-card-text
          style="font-size: 16px overflow: visible;
    text-overflow: unset;
    white-space: normal;"
          class="pa-0"
        >
          {{ item.turkish }}</v-card-text
        >
      </template>
      <template v-slot:append>
        <v-btn
          v-if="item.sound_tr"
          class="rtl play-btn"
          @click.prevent="playTR(item.sound_tr, item.id)"
          color="#607D8B"
          variant="contained-text"
        >
          <v-icon icon="mdi-volume-high"></v-icon>
        </v-btn>

        <v-card-text class="pa-0"> {{ item.desc_tr }} </v-card-text>
      </template>

      <v-divider></v-divider>

      <div v-if="item.isPremium" class="card-bottom rtl">
        <v-chip
          v-if="item.isPremium"
          class="premium-badge rtl"
          color="orange"
          label
          text-color="white"
        >
          <v-icon left icon="mdi-star"></v-icon>
          نسخه پرمیوم
        </v-chip>
      </div>

      <div v-if="!item.isPremium" class="card-bottom">
        <v-card v-if="item" class="rtl">
          <template v-slot:title>
            <v-card-text
              class="pa-0"
              style="font-size: 16px overflow: visible;
    text-overflow: unset;
    white-space: normal;"
            >
              {{ item.farsi }}</v-card-text
            >
          </template>

          <template v-slot:prepend>
            <v-avatar size="18">
              <v-img src="/icons/fa-sq.svg" alt="FA"></v-img>
            </v-avatar>
          </template>
          <template v-slot:append>
            <!-- <v-icon class="mr-2" v-if="item.desc_fa" size="xsmall" color="red"
              >mdi-information-outline</v-icon
            > -->

            <div
              v-if="item.color"
              class="color-badge"
              :style="'background-color:' + item.color"
            ></div>

            <v-btn
              v-if="isWebApp"
              class="rtl play-btn rotate-180"
              @click.prevent="playFA(item.farsi)"
              color="#607D8B"
              variant="contained-text"
            >
              <v-icon icon="mdi-volume-high"></v-icon>
            </v-btn>
          </template>
        </v-card>

        <!-- <PhraseTags v-if="item.tag_ids" :tagIds="item.tag_ids" /> -->

        <v-divider v-if="item.farsi_literally"> </v-divider>

        <v-card-text class="rtl" v-if="item.farsi_literally">
          <v-chip size="small" color="green" class="ma-0 mb-1">
            ترجمه کلمه به کلمه
          </v-chip>

          <v-card-text class="pa-0">
            <div v-html="item.farsi_literally"></div>
          </v-card-text>
        </v-card-text>

        <v-card-actions
          v-if="anyButtonIsAvailable(item)"
          class="pa-3 justify-end"
        >
          <v-btn
            v-if="item.desc_fa"
            color="teal"
            variant="contained-text"
            @click="toggleDescFa(index)"
          >
            توضیحات
            <v-icon class="ml-1" size="small" v-show="showDescFa !== index">
              mdi-information-outline
            </v-icon>
            <v-icon class="ml-1" size="small" v-show="showDescFa == index">
              mdi-information
            </v-icon></v-btn
          >

          <v-btn
            v-if="item.example_tr"
            color="teal "
            variant="contained-text"
            @click="toggleExampleTr(index)"
          >
            مثال
            <v-icon class="ml-1" size="small" v-show="showExampleTr !== index">
              mdi-dots-grid
            </v-icon>
            <v-icon class="ml-1" size="small" v-show="showExampleTr == index">
              mdi-dots-square
            </v-icon></v-btn
          >

          <v-btn
            v-if="item.image"
            color="teal "
            variant="contained-text"
            @click="toggleImage(index)"
          >
            تصویر
            <v-icon class="ml-1" size="small" v-show="showImage !== index">
              mdi-image-outline
            </v-icon>
            <v-icon class="ml-1" size="small" v-show="showImage == index">
              mdi-image
            </v-icon></v-btn
          >
        </v-card-actions>
        <v-expand-transition v-if="item.image">
          <div v-show="showImage == index">
            <v-img
              :width="150"
              aspect-ratio="4/3"
              cover
              class="mx-auto mb-4 rounded-lg"
              :src="phraseImage(item.image)"
              :lazy-src="phraseImage(item.image)"
              max-width="150"
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
          </div>
        </v-expand-transition>
        <v-expand-transition v-if="item.desc_fa">
          <div v-show="showDescFa == index">
            <v-divider></v-divider>

            <v-card-text class="rtl">
              <div v-html="item.desc_fa"></div>
            </v-card-text>
          </div>
        </v-expand-transition>

        <v-expand-transition v-if="item.example_tr">
          <div v-show="showExampleTr == index">
            <v-divider></v-divider>

            <v-card-text>
              <div v-html="item.example_tr"></div>
            </v-card-text>
            <v-divider></v-divider>

            <div class="rtl pt-2 pb-2" v-if="item.example_fa_literally">
              <v-chip class="ma-2 mb-0" color="green" size="small">
                ترجمه کلمه به کلمه
              </v-chip>

              <v-card-text class="ma-0 pa-3 pt-1">
                <div v-html="item.example_fa_literally"></div>
              </v-card-text>
            </div>
            <v-divider></v-divider>
            <div class="rtl pt-2 pb-2" v-if="item.example_fa_real">
              <v-chip class="ma-2 mb-0" size="small" color="green">
                معادل فارسی
              </v-chip>

              <v-card-text class="ma-0 pa-3 pt-1">
                <div v-html="item.example_fa_real"></div>
              </v-card-text>
            </div>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </v-col>
</template>

    <script>
import { supabase } from "../supabase";
export default {
  name: "PhraseComponent",
  props: {
    PhrasesList: Object,
  },

  methods: {
    anyButtonIsAvailable(item) {
      if (
        item.image ||
        item.desc_fa ||
        item.example_tr ||
        item.example_fa_literally ||
        item.example_fa_real
      ) {
        return true;
      } else {
        return false;
      }
    },
    isURL(str) {
      var regex =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    phraseImage(imageSrc) {
      if (this.isURL(imageSrc)) {
        //contains http
        return imageSrc;
      } else {
        var pathToImages = "/assets/img/phrases/" + imageSrc;

        return pathToImages;
      }
    },

    phrasesExist() {
      let catID = this.$route.params.cat_id;
      let foundIndex = -1;
      let filteredPhrases = this.$store.state.phrases.filter(function (
        filtered,
        index
      ) {
        if (filtered.cat_id == catID) {
          foundIndex = index;
          return true;
        }
      });

      if (filteredPhrases.length > 0) {
        // means category fetched before and stored
        return this.$store.state.phrases[foundIndex].value.length > 0
          ? true
          : false;
      }
    },

    toggleDescFa(index) {
      this.showDescFa = this.showDescFa == index ? null : index;
    },
    toggleImage(index) {
      this.showImage = this.showImage == index ? null : index;
    },
    toggleExampleTr(index) {
      this.showExampleTr = this.showExampleTr == index ? null : index;
    },

    async playFA(text) {
      if (this.isWebApp) {
        await TextToSpeech.speak({
          text: text,
          lang: "fa-IR",
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          category: "ambient",
          voice: 72,
        });
      } else {
      }
    },
    getFileURL(filename, fileID) {
      //  filename = "public/" + filename;
      if (localStorage.getItem("audio:" + fileID)) {
        return localStorage.getItem("audio:" + fileID);
      } else {
        const { data, error } = supabase.storage
          .from("depo")
          .getPublicUrl(filename);

        localStorage.setItem("audio:" + fileID, data.publicURL);
        return data.publicURL;
      }
    },
    async playTR(text, fileID) {
      this.isSoundLoading = true;
      if (this.isWebApp) {
        await TextToSpeech.speak({
          text: text,
          lang: "tr-TR",
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          category: "ambient",
          voice: 93,
        });
      } else {
        if (text) {
          let pathToAudio = this.getFileURL(text, fileID);
          this.isSoundLoading = false;
          var audio = new Audio(pathToAudio);
          audio.play();
        }
      }

      /*     this.greetingSpeech.text = text;

      this.synth.speak(this.greetingSpeech); */
    },
  },
  data() {
    return {
      voiceList: [],
      isWebApp: false,
      greetingSpeech: null,
      showImage: null,

      showDescFa: null,

      showExampleTr: null,
    };
  },
};
</script>