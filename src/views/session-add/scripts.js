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
  modalController,
  alertController,
  IonButton,
  IonLabel,
  IonNote,
  IonListHeader,
  IonItem,
  IonProgressBar,
  IonList,
  IonRow,
  IonCol,
  IonFooter,
} from "@ionic/vue";
import {
  close,
  call,
  person,
  checkmark,
  idCard,
  barcode,
} from "ionicons/icons";
import sesiAPI from "@/api/sessions";
import { modulComp } from "@/helper/modulComponent";
import { sessionService } from "@/service/sessions";
import { transService } from "@/service/transaksi";

export default {
  name: "modalContent",
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
    IonButton,
    IonLabel,
    IonNote,
    IonListHeader,
    IonItem,
    IonProgressBar,
    IonList,
    IonRow,
    IonCol,
    IonFooter,
  },
  setup() {
    return { close, call, person, idCard, barcode };
  },
  mounted() {
    if (sessionService.getSession() != null) {
      this.newData = false;
      this.initData();
    } else {
      this.newData = true;
    }
  },
  data() {
    return {
      data: { session: "", telp: "", nama: "", loguser: "", idcustomer: "" },
      olddata: { session: "", telp: "", nama: "", loguser: "", idcustomer: "" },
      userPhone: [],
      newData: false,
      loading: false,
      lock: false,
    };
  },
  methods: {
    async initData() {
      this.data = await JSON.parse(sessionService.getSession());
      this.olddata = await JSON.parse(sessionService.getSession());
      console.log(this.newData);
      console.log(this.data);
      this.lock = true;
    },

    async clearData() {
      this.lock = false;
      this.newData = true;
      
      transService.clear(); //Membersihkan data Local
      sessionService.clearSession(); //Membersihkan data sesi
      
      this.data = {
        session: "",
        telp: "",
        nama: "",
        loguser: "",
        idcustomer: "",
      };
      this.olddata = {
        session: "",
        telp: "",
        nama: "",
        loguser: "",
        idcustomer: "",
      };
      // const alert = await alertController.create({
      //   header: "Session Baru",
      //   mode: "ios",
      //   message: "Apakah anda ingin menambahkan sesi baru ?",
      //   buttons: [
      //     {
      //       text: "Cancel",
      //       role: "cancel",
      //     },
      //     {
      //       text: "Ok",
      //       handler: () => {
      //         this.lock = false;
      //         this.newData = true;
      //         sessionService.clearSession();
      //         this.data = {
      //           session: "",
      //           telp: "",
      //           nama: "",
      //           loguser: "",
      //           idcustomer: "",
      //         };
      //         this.olddata = { session: "", telp: "", nama: "" };
      //       },
      //     },
      //   ],
      // });
      // return alert.present();
    },
    async submitData() {
      if (this.data.session == "") {
        const alert = await alertController.create({
          header: "Session Baru",
          mode: "ios",
          message: "Apakah data yang Anda masukkan sudah benar ?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Ok",
              handler: async () => {
                if (!this.lock) this.addSesi(this.data);
                else {
                  if (this.data.orderstatus != 0) {
                    this.addSesi(this.data);
                  } else {
                    await sessionService.setSession(this.data);
                    modulComp.openToast({
                      header: "Berhasil",
                      msg: "Menyimpan session",
                      color: "success",
                      icon: checkmark,
                      side: "start",
                    });
                    modalController.dismiss("create");
                  }
                }
              },
            },
          ],
        });
        return alert.present();
      } else {
        if (!this.lock) this.addSesi(this.data);
        else {
          if (this.data.orderstatus != 0) {
            this.addSesi(this.data);
          } else {
            await sessionService.setSession(this.data);
            modulComp.openToast({
              header: "Berhasil",
              msg: "Menyimpan session",
              color: "success",
              icon: checkmark,
              side: "start",
            });
            modalController.dismiss("create");
          }
        }
      }
    },
    addSesi(input) {
      return sesiAPI
        .addSession(input)
        .then((res) => {
          console.log(res);
          sessionService.setSession(
            Object.assign({ session: res.data.result.orderno }, res.data.result)
          );
          modulComp.openToast({
            header: "Berhasil",
            msg: "Membuat session baru",
            color: "success",
            icon: checkmark,
            side: "start",
          });
          modalController.dismiss("create");
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
    initPhone() {
      return sesiAPI
        .getPhone("")
        .then((res) => {
          this.loading = false;
          this.userPhone = res.data.result;
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Gagal Memuat Data",
            msg: error.data.message,
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    getPhone(input) {
      this.loading = true;
      this.lock = false;
      return sesiAPI
        .getPhone(input)
        .then((res) => {
          this.loading = false;
          if (res.data.result.length != 0) {
            this.data = res.data.result[0];
            this.lock = true;
          } else {
            console.log(this.data);
            this.data.nama = "";
            this.data.session = "";
            this.newData = true;
          }
        })
        .catch((error) => {
          this.data.nama = "";
          this.data.session = "";
          console.log(error);
          this.loading = false;
          this.newData = true;
        });
    },
    getIDSesi() {
      sesiAPI
        .getIDSession()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Error",
            msg: error.data.message,
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
      console.log("Begin async operation");
      this.initPhone();
      this.initData();
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
