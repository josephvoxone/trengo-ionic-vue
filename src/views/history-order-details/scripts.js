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
  IonThumbnail,
  IonMenuButton,
  IonSkeletonText,
  IonLabel,
  IonCard,
  IonItem,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonNote,
  IonListHeader,
} from "@ionic/vue";
import {
  idCard,
  storefront,
  copy,
  save,
  card,
  briefcaseOutline,
  callOutline,
  calendarOutline,
  personCircleOutline,
  checkmarkCircleOutline,
  carOutline,
  cubeOutline,
} from "ionicons/icons";
import authAPI from "@/api/sessions";
import { modulComp } from "@/helper/modulComponent";
import { useRouter } from "vue-router";

export default {
  name: "orderDetails",
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
    IonThumbnail,
    IonMenuButton,
    IonSkeletonText,
    IonLabel,
    IonCard,
    IonItem,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonNote,
    IonListHeader,
  },
  setup() {
    return {
      idCard,
      storefront,
      copy,
      save,
      card,
      briefcaseOutline,
      callOutline,
      calendarOutline,
      personCircleOutline,
      checkmarkCircleOutline,
      carOutline,
      cubeOutline,
    };
  },
  data() {
    const router = useRouter();
    return {
      sesi: [],
      detail: [],
      search: "",
      router,
    };
  },
  ionViewWillEnter() {
    console.log(this.$route.query, "Param");
    this.getData(this.$route.query.sesi);
    this.getDataDetail(this.$route.query.sesi);
  },
  methods: {
    getData(data) {
      return authAPI
        .getAllSession(data)
        .then((res) => {
          console.log(res);
          this.sesi = res.data.result[0];
        })
        .catch((error) => {
          if (error) {
            modulComp.openToast({
              header: "Error",
              msg: error.data?.message || "Tidak dapat mengakses API",
              color: "danger",
              icon: alert,
              side: "start",
            });
          }
        });
    },
    getDataDetail(data) {
      return authAPI
        .getdetailorder(data)
        .then((res) => {
          console.log(res);
          this.detail = res.data.result;
        })
        .catch((error) => {
          if (error) {
            modulComp.openToast({
              header: "Error",
              msg: error.data?.message || "Tidak dapat mengakses API",
              color: "danger",
              icon: alert,
              side: "start",
            });
          }
        });
    },
    doRefresh(event) {
      console.log("Begin async operation", event);
      this.getData(this.$route.query.sesi);
      this.getDataDetail(this.$route.query.sesi);
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
