import {
  IonButtons,
  IonContent,
  IonPage,
  IonIcon,
  IonInput,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonMenuButton,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
} from "@ionic/vue";
import { closeCircle } from "ionicons/icons";

export default {
  name: "Home",
  components: {
    IonHeader,
    IonButtons,
    IonContent,
    IonPage,
    IonIcon,
    IonInput,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonRefresher,
    IonRefresherContent,
    IonMenuButton,
    IonAvatar,
    IonLabel,
    IonItem,
    IonList,
  },
  setup() {
    return {
      closeCircle,
    };
  },
  data() {
    return {
      segment: "changelog",
      items: [
        {
          title: "Add Look Password on Trengo",
          desc: "Now the user can see the password for login.",
          date: "11/05/2021",
        },
        {
          title: "Enter on Login",
          desc: "Now the user can press enter for login.",
          date: "11/05/2021",
        },
        {
          title: "Save Transaction",
          desc: "Saving data old about the transaction and will be reset after change session.",
          date: "11/05/2021",
        },
        {
          title: "Security",
          desc: "Improve security data API to Frontend encrypt",
          date: "10/05/2021",
        },
        {
          title: "UX",
          desc: "Fixing user flow add session and load session",
          date: "05/05/2021",
        },
        {
          title: "Sort and Filter",
          desc: "Add sort and filter on Menu Session",
          date: "03/05/2021",
        },
        {
          title: "Last Store by Order",
          desc: "Automatically add last stroe to user order ",
          date: "03/05/2021",
        },
      ],
    };
  },
  mounted() {
    null;
  },
  methods: {
    segmentChanged($event) {
      this.segment = $event.detail.value;
    },
    doRefresh(event) {
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    },
  },
};
