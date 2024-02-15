//import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createStore } from "vuex";
import App from './App.vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import VueCookies from 'vue3-cookies'



import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


const store = createStore({
  state(){
      return{
        showSearchButton:true,
        user: [],
          categories:[],
          tags:[],
          currentCategory:'',
          settings:null,
          searchData:[],
          phrases:[{
              cat_id:0,
              value:[]
          }]
               }
          },
        
          mutations:{
              putCategories(state,fetchedCatsFromDb){
                  state.categories=fetchedCatsFromDb;
              },
              putSearchData(state,data){
                state.searchData=data;
            },
              putCurrentCategory(state,id){
               
              },
              putTags(state,data){
state.tags=data;
              },
              setLoggedinUser(state,data){
state.user=data;
              },
              putPhrases(state,data){
                  let obj= {
                    cat_id:data.cat_id,
                    value:data.value
                 };
                  state.phrases.push(obj);
                  
              },
              putSettings(state,data){
                state.settings=data;
              }

          },
       
});


loadFonts()


const app=createApp(App);

app.use(router);
  app.use(vuetify);
  app.use(store);
app.use(VueCookies);
  app.use(Vue3Lottie);


  app.mount('#app');

 