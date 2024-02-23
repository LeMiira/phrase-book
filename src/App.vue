<template>
  <v-app>
    <v-main id="main-app">
      <v-card
        id="main-card"
        max-width="900"
        class="mx-auto"
        style="border-radius: 0 !important"
        color="grey-lighten-4"
      >
        <v-btn
          v-show="this.$store.state.showSearchButton"
          id="search-btn"
          icon="mdi-magnify"
          color="red-darken-4"
          to="/search"
        ></v-btn>
        <v-layout>
          <v-app-bar color="red-darken-4" class="text-white rtl">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>

            <v-app-bar-title> {{ settingsInfo.app_title }}</v-app-bar-title>
            {{ currentCategory() }}
            <v-btn
              v-if="this.$route.path != '/'"
              icon
              color="white"
              text-color="white"
              v-show="this.$route.path !== '/categories'"
              to="/categories"
            >
              <v-icon class="pulse-left" color="white"
                >mdi-arrow-left
              </v-icon></v-btn
            >
          </v-app-bar>

          <v-navigation-drawer
            position="right"
            v-model="drawer"
            bottom
            temporary
          >
            <v-list class="rtl" density="compact" nav>
              <v-chip color="teal" class="ma-4 mt-1 mr-6"
                >نسخه
                <span class="mr-1">{{ settingsInfo.app_version }}</span></v-chip
              >

              <v-list-item
                two-line
                :prepend-avatar="settingsInfo.app_avatar"
                :title="settingsInfo.app_title"
              ></v-list-item>

              <br />
              <!--   <v-list-item
                class="sidebar-list-item"
                prepend-icon="mdi-user-outline"
                title="ورود / ثبت نام"
                to="/login"
              ></v-list-item> -->
              <v-list-item
                class="sidebar-list-item"
                color="red"
                prepend-icon="mdi-label-multiple-outline"
                title="دسته بندی ها"
                to="/categories"
              ></v-list-item>
              <v-list-item
                color="red"
                class="sidebar-list-item"
                prepend-icon="mdi-information-outline"
                title="درباره برنامه"
                to="/about"
              ></v-list-item>
              <v-list-item
                color="red"
                class="sidebar-list-item"
                prepend-icon="mdi-chat-question-outline"
                title="از من بپرسید"
                to="/ask"
              ></v-list-item>
              <v-list-item
                color="red"
                class="sidebar-list-item"
                prepend-icon="mdi-book-search-outline"
                title="جستجو"
                to="/search"
              ></v-list-item>

              <v-list-item
                color="red"
                class="sidebar-list-item"
                to="/contact"
                prepend-icon="mdi-email-outline"
                title="ارتباط با من"
              ></v-list-item>

              <!--     <v-list-item
                class="sidebar-list-item-donate"
                prepend-icon="mdi-trophy-award"
                title="حمایت مالی"
                @click.prevent="donate()"
              ></v-list-item>
 -->
              <v-list-item
                class="sidebar-list-item-donate"
                prepend-icon="mdi-trophy-award"
                title="حمایت مالی"
                href="https://hamibash.com/mira"
              ></v-list-item>

              <br />

              <!-- <v-chip
                color="black"
                prepend-icon="mdi-star"
                class="ma-4 mt-1 mr-6"
                >حامیان<span class="mr-1"></span
              ></v-chip> -->

              <!-- <v-list-item
                two-line
                :prepend-avatar="settingsInfo.sponsor1_logo"
                :title="settingsInfo.sponsor1_text"
              ></v-list-item>
              <br />
              <v-list-item
                two-line
                :prepend-avatar="settingsInfo.sponsor2_logo"
                :title="settingsInfo.sponsor2_text"
              ></v-list-item>
              <br />
              <v-list-item
                two-line
                :prepend-avatar="settingsInfo.sponsor3_logo"
                :title="settingsInfo.sponsor3_text"
              ></v-list-item> -->
            </v-list>
          </v-navigation-drawer>
          <v-main id="main-cointainer">
            <v-container fluid>
              {{ $route.params.id }}
              <router-view />
            </v-container>
          </v-main>
        </v-layout>
      </v-card>
      <v-btn
        v-if="false"
        class="mr-2"
        variant="outlined"
        @click="snackbar = !snackbar"
      >
        TESTER
      </v-btn>

      <v-snackbar
        v-if="!closeNotification"
        :timeout="-1"
        color="yellow-lighten-4"
        location="top"
        vertical
        class="rtl"
        v-model="appNotification"
      >
        <div class="rtl" v-html="settingsInfo.appNotification"></div>
        <template v-slot:actions>
          <v-btn
            class="ma-2"
            block
            variant="tonal"
            color="green"
            @click="closeNotification = true"
            >متوجه شدم</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar
        v-if="!closeUpdate"
        :timeout="-1"
        color="white"
        location="center"
        vertical
        class="rtl"
        v-model="needUpdate"
      >
        <p>{{ settingsInfo.updateText }}</p>
        <template v-slot:actions>
          <v-btn
            class="ml-2"
            variant="outlined"
            href="https://play.google.com/store/apps/details?id=com.temsool.phrasebook"
          >
            نصب
          </v-btn>
          <v-btn
            class="ma-2"
            block
            variant="contained-text"
            color="#004D40"
            text-color="#fff"
            @click="closeUpdate = true"
            >بعدا</v-btn
          >
        </template>
      </v-snackbar>
      <v-snackbar
        :timeout="-1"
        color="white"
        location="center"
        vertical
        class="rtl"
        v-model="showDonate"
      >
        <v-img src="assets/trx.jpg"></v-img>
        <h4>TSefn5fSboSJGosXN9vBJSp1caNH9Ln3Ni</h4>
        <v-btn
          class="mt-4"
          block
          variant="contained-text"
          color="#004D40"
          text-color="#fff"
          @click="this.showDonate = false"
          >بستن</v-btn
        >
      </v-snackbar>
      <v-snackbar
        :timeout="-1"
        :value="true"
        location="center"
        vertical
        text
        class="rtl"
        v-model="snackbar"
      >
        <p class="rtl pb-2">آیا از خروج از برنامه مطمئن هستید؟</p>

        <template v-slot:actions>
          <v-btn class="ml-2" variant="outlined" @click="exitApp()">
            بله
          </v-btn>
          <v-btn
            color="green"
            class="ma-2"
            variant="outlined"
            @click="snackbar = false"
          >
            خیر
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "./supabase";
import { App as CapacitorApp } from "@capacitor/app";

import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  AdMobBannerSize,
} from "@capacitor-community/admob";

export default {
  name: "App",

  async created() {
    try {
      const res = await supabase.from("settings").select();

      this.$store.commit("putSettings", res.data);

      const tags = await supabase.from("tags").select();

      this.$store.commit("putTags", tags.data);
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    appNotification() {
      if (
        this.$store.state.settings !== undefined &&
        this.$store.state.settings !== null
      ) {
        if (
          this.$store.state.settings[0].appNotification !== "" &&
          this.$store.state.settings[0].appNotification !== undefined &&
          this.$store.state.settings[0].appNotification !== null
        ) {
          return this.$store.state.settings[0].appNotification;
        } else {
          return false;
        }
      }
    },
    needUpdate() {
      if (
        this.$store.state.settings !== undefined &&
        this.$store.state.settings !== null
      ) {
        if (
          parseFloat(this.$store.state.settings[0].app_version) >
          parseFloat(this.installedAppVersion)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    settingsInfo() {
      return this.$store.state.settings !== null &&
        this.$store.state.settings !== undefined
        ? this.$store.state.settings[0]
        : "";
    },
  },
  methods: {
    donate() {
      this.showDonate = true;
    },
    currentCategory() {
      return "";
    },
    exitApp() {
      CapacitorApp.exitApp();
    },
  },
  mounted() {
    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        this.snackbar = true;
      } else {
        window.history.back();
      }
    });
    AdMob.initialize({
      initializeForTesting: true,
    });
    const showTabBarBanner = () => {
      const options = {
        adId: "ca-app-pub-8415309020579786/9837358772",
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        /*  isTesting: true,
        npa: true, */
      };

      // Show Banner Ad
      AdMob.showBanner(options).then(
        (value) => {
          console.log(value);
        },
        (error) => {
          console.error(error); // show error
        }
      );
      // Subscibe Banner Event Listener
      AdMob.addListener("onAdLoaded", (info) => {
        console.log("Showing TabBar Banner AD.");
      });
    };

    showTabBarBanner();
  },
  data: () => ({
    closeUpdate: false,
    closeNotification: false,
    showSearchButton: true,
    showDonate: false,
    drawer: false,
    snackbar: false,
    thanks: false,
    installedAppVersion: 2.2,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
 <style lang="scss">
.loading {
  position: fixed;
  border-radius: 100px;
  top: 80px;
  left: auto;
  margin-left: 0px;
  z-index: 900;
  background-color: white;
}
#main-card {
  position: relative;
}
.color-badge {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: inline-flex;
}
.sidebar-list-item {
  i {
    color: #f44336;
  }
}
#search-btn {
  position: absolute;
  bottom: 10px;
  z-index: 10000;
  left: 10px;
}
.sidebar-list-item-donate {
  .v-list-item,
  i,
  .v-list-item-title {
    color: #dd2c00;
  }
  background-color: #fbc02d;
}
.play-btn {
  padding: 2px 0 0 0 !important;
  display: inline-flex;
  min-width: 36px;
  width: 36px;
  margin: 0;
}
.card-bottom {
  position: relative;
}
.premium-badge {
  z-index: 10;
  margin: 10px;
}
.v-snackbar__content {
  margin: auto;
}
.v-snackbar__actions {
  align-self: center;
}
@keyframes pulse-left {
  0% {
    left: 0;
  }
  50% {
    left: -5px;
  }
  100% {
    left: 0;
  }
}

.pulse-left {
  animation: pulse-left 1s infinite ease;
}
.premium-content {
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
  top: 0%;
  left: 0;
  width: 100%;
  position: absolute;
  height: 100%;
  backdrop-filter: blur(5px);
}
* {
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}
.v-card-actions .v-btn,
.v-btn {
  letter-spacing: 0;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}
#main-cointainer {
  max-height: 100vh;
  overflow-y: scroll;
}
.p-0 {
  padding: 0 !important;
}
.float-badge {
  position: absolute;
}
.rtl {
  direction: rtl;
}
.phrase-image {
  border-radius: 10px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.category-btn {
  .v-card-text {
  }
}
.v-main {
  min-height: 100vh;
}
.tags-header {
  background-color: #fafafa;
}
.sound-player-during {
  width: 34px;
  height: 34px;
}
.v-snackbar--vertical .v-snackbar__wrapper .v-snackbar__actions {
  align-self: center;
}
</style>
