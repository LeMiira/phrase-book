<template>
  <v-card class="ma-3">
    <v-card-avatar class="justify-end d-flex">
      <v-btn
        class="ma-2"
        color="red-darken-4"
        icon="mdi-message-question-outline"
      ></v-btn>
    </v-card-avatar>
    <v-card-header class="rtl">
      <v-card-header-text>
        <v-card-title>
          عبارت یا کلمه مورد نظر خود را سوال کنید تا در سریعترین زمان ممکن به
          مجموعه اضافه شود. <br />
          عباراتی که از این بخش اضافه میشوند به دسته بندی "درخواستی" اضافه خواهد
          شد.
        </v-card-title>
      </v-card-header-text>
    </v-card-header>
    <v-card-text class="rtl">
      <v-row>
        <v-col cols="12" md="12">
          <v-alert v-if="askDone" type="success">
            درخواست شما ارسال شد، در اولین فرصت به مجموعه اضافه خواهد شد.
          </v-alert>
          <v-textarea
            class="mt-5"
            solo
            v-model="askText"
            name="input-7-4"
            label="تایپ کنید..."
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn
            id="ask-button"
            size="x-large"
            block
            color="green"
            @click="doAsk"
            variant="contained-text"
            >ارسال متن</v-btn
          >
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
  name: "AskMe",

  created() {
    this.askDone = false;
  },
  methods: {
    async doAsk() {
      if (this.askText === null) {
        return;
      }
      this.stillLoading = true;

      const { data2, error2 } = await supabase
        .from("askedLog")
        .insert([{ asked_text: this.askText }]);
      this.askText = "";
      this.askDone = true;
      this.stillLoading = false;
    },
  },
  computed: {},
  data() {
    return {
      askText: null,
      askDone: false,
      stillLoading: false,
    };
  },
};
</script>

<style scoped>
</style>