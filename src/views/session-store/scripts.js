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
  alertController,
  IonRefresher,
  IonRefresherContent,
  modalController,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonListHeader,
  IonSkeletonText,
  IonThumbnail,
  IonItem,
  IonList,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import { storefront, addCircle, close, barcode, alert } from "ionicons/icons";
import storeAPI from "@/api/store";
import { modulComp } from "@/helper/modulComponent";

export default {
  name: "Store",
  components: {
    IonCardSubtitle,
    IonLabel,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonCard,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
    IonItem,
    IonList,
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
    IonButton,
  },
  setup() {
    return {
      storefront,
      addCircle,
      close,
      barcode,
      alert,
    };
  },
  props: {
    params: { default: null },
  },
  data() {
    return {
      stores: [],
      loading: true,
    };
  },
  async mounted() {
    console.log(this.params);
    this.loading = true;
    await this.getStore(this.params);
    await this.getCustomer(this.params);
    this.loading = false;
  },
  methods: {
    async submitStore(input) {
      this.setStore(input);
      // const alert = await alertController.create({
      //   header: "Pilih Store",
      //   mode: "ios",
      //   message: "Apakah anda ingin memilih " + input.SUBUNIT_NAME + " ?",
      //   buttons: [
      //     {
      //       text: "Batal",
      //       role: "cancel",
      //     },
      //     {
      //       text: "Iya",
      //       handler: () => {
      //         this.setStore(input);
      //       },
      //     },
      //   ],
      // });
      // alert.present();
    },
    setStore(input) {
      const obj = { subunitid: input.SUBUNIT_ID, session: this.params.noreff };
      return storeAPI
        .setStore(obj)
        .then((res) => {
          modulComp.openToast({
            header: "Berhasil Pilih Store",
            msg: res.data.message,
            color: "success",
            icon: storefront,
            side: "start",
          });
          console.log(res);
          modalController.dismiss();
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Error",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    randomOngkir() {
      return Math.floor(Math.random() * 100000) + 10000;
    },
    getCustomer(data) {
      console.log(data);
    },
    getStore(input) {
      return storeAPI
        .getAllStore(input)
        .then((res) => {
          console.log(res);
          this.stores = res.data.result;
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Error",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    closeModal() {
      modalController.dismiss();
    },
    doRefresh(event) {
      console.log("Begin async operation", event);
      this.getStore(this.params);
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
