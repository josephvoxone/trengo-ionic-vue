<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu
        content-id="main-content"
        type="overlay"
        @ionWillOpen="checkOpen"
        v-if="cekmenu == 1"
      >
        <ion-content>
          <ion-list id="inbox-list">
            <p class="role">{{ user.company }}</p>
            <ion-list-header>{{ user.username }}</ion-list-header>
            <ion-note>{{ user.email }}</ion-note>

            <ion-menu-toggle
              auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                button
                @click="selectedIndex = i"
                router-direction="root"
                :router-link="p.url"
                lines="none"
                detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
              >
                <ion-icon
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-menu-toggle>
            <ion-list id="labels-list">
              <!-- <ion-list-header mode="ios">Labels</ion-list-header> -->
              <ion-item button @click="logout" lines="none">
                <ion-icon slot="start" :ios="logOut"></ion-icon>
                <ion-label>Logout</ion-label>
              </ion-item>
            </ion-list>
            <ion-item
              button
              class="credit-dev"
              lines="none"
              @click="
                () =>
                  router.push({
                    name: 'credit',
                  })
              "
            >
              <ion-thumbnail class="ion-margin-right" slot="start">
                <img
                  class="ion-padding"
                  :src="require(`./assets/image/trengo.svg`)"
                />
              </ion-thumbnail>
              <ion-label>
                <p>VERSION</p>
                <h6>1.0.2</h6>
              </ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  alertController,
  menuController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import {
  logOut,
  filmOutline,
  newspaperOutline,
  searchCircleOutline,
} from "ionicons/icons";

import router from "./router";
import { useRouter } from "vue-router";
import { userService } from "@/service/user";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
  },
  setup() {
    const router = useRouter();
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: "Home",
        url: "/query",
        iosIcon: searchCircleOutline,
      },
      {
        title: "Session",
        url: "/session",
        iosIcon: newspaperOutline,
      },
      {
        title: "History",
        url: "/history",
        iosIcon: filmOutline,
      },
    ];
    let cekmenu = 0;
    if (userService.getItem() === null) {
      cekmenu = 0;
    } else {
      cekmenu = 1;
    }
    return {
      router,
      logOut,
      selectedIndex,
      appPages,
      cekmenu,
    };
  },
  data() {
    return { user: [] };
  },
  mounted() {
    this.user = JSON.parse(userService.getItem() || "{}");
  },
  methods: {
    checkOpen() {
      this.user = JSON.parse(userService.getItem() || "{}");
    },
    async logout() {
      menuController.close();
      const alert = await alertController.create({
        header: "Sign Out",
        mode: "ios",
        message: "Apakah anda yakin ingin keluar ?",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Iya",
            handler: () => {
              // userService.clear();
              localStorage.clear();
              router.push({ name: "Signin" });
              location.reload();
            },
          },
        ],
      });
      alert.present();
    },
  },
});
</script>

<style scoped>
.credit-dev {
  position: fixed;
  bottom: 10px;
  display: block;
}
.credit-dev p {
  color: #a2a2a2;
  font-size: 10px;
  letter-spacing: 2px;
}

.credit-dev h6 {
  letter-spacing: 1px;
  font-weight: 800;
}

ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md .role {
  background: #ff9800;
  border-radius: 5px;
  padding: 7px 10px;
  font-weight: 700;
  display: inline-block;
  margin: 0px 10px;
}

ion-menu.md ion-note {
  margin-bottom: 20px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note,
.role {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
