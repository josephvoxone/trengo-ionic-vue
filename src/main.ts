import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { TokenService } from "@/service/token";
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { userService } from "@/service/user";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueClipboard)
  .use(TokenService.interceptor);

if (userService.getItem() === null) {
  router.push({ name: 'Signin' })
} else {
  if (TokenService.checkToken()) {
    TokenService.pushHeader();
    // router.push({ name: 'Home' })
  } else {
    router.push({ name: 'Signin' })
  }
}

router.isReady().then(() => {
  app.mount('#app');
});