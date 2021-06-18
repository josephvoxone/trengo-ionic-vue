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
  IonRefresher,
  IonRefresherContent,
  modalController,
  loadingController,
  IonThumbnail,
  IonMenuButton,
  IonSkeletonText,
  IonLabel,
  IonCard,
  IonItem,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonListHeader,
  IonNote,
  IonButton,
  IonFooter,
} from "@ionic/vue";
import {
  idCard,
  storefront,
  copy,
  save,
  card,
  bagHandle,
  barcode,
  calendar,
} from "ionicons/icons";
import authAPI from "@/api/history";
import { modulComp } from "@/helper/modulComponent";
import { useRouter } from "vue-router";
import modalContent from "@/views/edit-customer/index.vue";

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
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonListHeader,
    IonNote,
    IonButton,
    IonFooter,
  },
  setup() {
    return {
      idCard,
      storefront,
      copy,
      barcode,
      bagHandle,
      save,
      card,
      calendar,
    };
  },
  data() {
    const router = useRouter();
    return {
      history: [],
      riwayat: [],
      search: "",
      router,
    };
  },
  async mounted() {
    // console.log(this.$route.query, "Param");
    this.loading();
    await this.getData(this.$route.query.userId);
    await this.getRiwayat(this.$route.query.userId);
    setTimeout(() => {  // Some AJAX call occurs
      modulComp.hideLoader()
      // loadingController.dismiss();
    }, 1000);
    
   // loadingController.dismiss();
  },
  methods: {
    async loading(input) {
      const loading = await loadingController.create({
        message: input ? input : "memuat data..",
        mode: "ios",
        spinner: "crescent",
      });
      await loading.present();
    },
    async openModal() {
      const modal = await modalController.create({
        component: modalContent,
        componentProps: {
          idcustomer: this.history.idcustomer,
        },
      });
      modal.onWillDismiss().then(() => {
        this.getData(this.$route.query.userId);
        this.getRiwayat(this.$route.query.userId);
      });
      return await modal.present();
    },
    getData(data) {
      return authAPI
        .getAllSession(data)
        .then((res) => {
          // console.log(res);
          this.history = res.data.result[0];
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
    getRiwayat(data) {
      return authAPI
        .getRiwayatTransaksi(data)
        .then((res) => {
          // console.log(res);
          this.riwayat = res.data.result;
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
      this.getData("");
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
