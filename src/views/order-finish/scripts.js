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
  alertController,
  modalController,
  loadingController,
  IonLabel,
  IonNote,
  IonListHeader,
  IonItem,
  IonList,
  IonButton,
  IonCol,
  IonRow,
  IonFooter,

} from "@ionic/vue";
import { barcode, storefront, checkmark } from "ionicons/icons";
import authAPI from "@/api/sessions";
import orderAPI from "@/api/order";
import { modulComp } from "@/helper/modulComponent";
import { useRoute } from "vue-router";
import { userService } from "@/service/user";

export default {
  name: "Store",
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
    IonLabel,
    IonNote,
    IonListHeader,
    IonItem,
    IonList,
    IonButton,
    IonCol,
    IonRow,
    IonFooter,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    return {
      barcode,
      storefront,
      route,
      id,
      session: id,
    };
  },
  data() {
    return {
      sesi: [],
      detail: [],
      search: "",
      id: "",
      data: { noorder: "", loguserid: "", orderbatalalasan: "" },
      datapaid: {
        noorder: "",
        loguserid: "",
        paymenttgl: "",
        paymentbank: "",
        paymentamount: "",
      },
    };
  },
  async mounted() {
    this.loading();
    await this.getData(this.session);
    await this.getDetailData(this.session);
    setTimeout(() => {  // Some AJAX call occurs
      modulComp.hideLoader()
      // loadingController.dismiss();
    }, 1000);
  },
  methods: {
    async loading() {
      const loading = await loadingController.create({
        message: "memuat data..",
        mode: "ios",
        spinner: "crescent",
      });
      await loading.present();
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: "Batal",
        mode: "ios",
        subHeader: "",
        message: "Apakah anda yakin ingin membatalkan Pesanan ini ?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: data  => {
              console.log("Confirm Ok");
              const a = JSON.parse(userService.getItem() || "{}");

              this.data.noorder = this.session;
              this.data.loguserid = a.username;
              this.data.orderbatalalasan = data.orderbatalalasan;
              this.batalOrder(this.data);
            },
          },
        ],
        inputs: [
          {
            name: "orderbatalalasan",
            id: "orderbatalalasan",
            value: "",
            placeholder: "Alasan Pembatalan",
          },
        ],
      });
      return alert.present();
    },
    async submitDataPaid() {
      const alert = await alertController.create({
        header: "Payment",
        mode: "ios",
        message: "Apakah anda ingin membayar order ini ?",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: (datapaid) => {
              const a = JSON.parse(userService.getItem() || "{}");
              this.datapaid.noorder = this.session;
              this.datapaid.loguserid = a.username;
              this.datapaid.paymenttgl = datapaid.paymenttgl;
              this.datapaid.paymentbank = datapaid.paymentbank;
              this.datapaid.paymentamount = this.sesi.biayatotal;

              if (!this.lock) this.paidOrder(this.datapaid);
              else {
                modulComp.openToast({
                  header: "Berhasil",
                  msg: "Mempaid order",
                  color: "success",
                  icon: checkmark,
                  side: "start",
                });
                modalController.dismiss();
              }
            },
          },
        ],
        inputs: [
          {
            name: "paymenttgl",
            id: "paymenttgl",
            value: new Date().toLocaleString(),
            type: "date",
            placeholder: "dd/mm/yyyy",
          },
          {
            name: "paymentbank",
            id: "paymentbank",
            value: "",
            placeholder: "Rekening Bank Transfer",
          },
        ],
      });
      return alert.present();
    },
    batalOrder(input) {
      return orderAPI
        .batalOrder(input)
        .then((res) => {
     //     console.log(res);
          modulComp.openToast({
            header: "Berhasil",
            msg: "Membatalkan order",
            color: "success",
            icon: checkmark,
            side: "start",
          });
          modalController.dismiss();
          this.getData(this.session);
          this.getDetailData(this.session);
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Gagal Input",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    paidOrder(input) {
      return orderAPI
        .paidOrder(input)
        .then((res) => {
          console.log(res);
          modulComp.openToast({
            header: "Berhasil",
            msg: "Mempaid order",
            color: "success",
            icon: checkmark,
            side: "start",
          });
          modalController.dismiss();
          this.getData(this.session);
          this.getDetailData(this.session);
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Gagal Input",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    getData(data) {
      return authAPI
        .getAllSession(data)
        .then((res) => {
          console.log("Header", res);
          this.sesi = res.data.result[0];
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
    getDetailData(data) {
      return authAPI
        .getdetailorder(data)
        .then((res) => {
          console.log("Detail", res);
          this.detail = res.data.result;
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
    doRefresh(event) {
   //   console.log("Begin async operation", event);
      this.getData(this.vid);
      this.getDetailData(this.vid);
      this.loading();
      modulComp.hideLoader()
      // loadingController.dismiss();
      setTimeout(() => {
  //      console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
