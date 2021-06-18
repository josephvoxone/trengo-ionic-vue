import {
  IonButtons,
  IonLabel,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonPage,
  IonIcon,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  modalController,
  alertController,
  loadingController,
  IonButton,
  IonProgressBar,
  IonList,
  IonFooter,
} from "@ionic/vue";
import authAPI from "@/api/customer.js";
import { modulComp } from "@/helper/modulComponent";
import {
  close,
  idCard,
  call,
  person,
  home,
  atCircle,
  browsers,
  alert,
  checkmarkCircle,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    IonButtons,
    IonLabel,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonContent,
    IonPage,
    IonIcon,
    IonHeader,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonButton,
    IonProgressBar,
    IonList,
    IonFooter,
  },
  props: {
    idcustomer: { type: String, default: null },
  },
  setup() {
    return {
      idCard,
      call,
      person,
      close,
      browsers,
      home,
      atCircle,
      checkmarkCircle,
      alert,
    };
  },
  data() {
    const router = useRouter();
    return {
      loading: true,
      kota: [],
      kecamatan: [],
      kelurahan: [],
      cust: {
        alamat: "",
        email: "",
        idcustomer: "",
        kecamatan: "",
        kelurahan: "",
        kodepos: "",
        kota: "",
        nama: "",
        telp: "",
      },
      oldcust: {},
      router,
    };
  },
  async mounted() {
    this.loading = true;
    await this.getData(this.idcustomer);
    await this.getKecamatan(this.cust.kota);
    await this.getKelurahan(this.cust.kota, this.cust.kecamatan);
    this.loading = false;
  },
  methods: {
    async presLoading(input) {
      const loading = await loadingController.create({
        message: input ? input : "memuat data..",
        mode: "ios",
        spinner: "crescent",
      });
      await loading.present();
    },
    getData(data) {
      return authAPI
        .getCustomer(data)
        .then((res) => {
          this.cust = res.data.result[0];
          this.oldcust = res.data.result[0];
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
    filterInput(e) {
      e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    },
    getKota() {
      authAPI.getKota().then((res) => {
        this.kota = res.data.result;
      });
    },
    changeKota(input) {
      this.cust.kodepos = null;
      this.cust.kecamatan = null;
      this.cust.kelurahan = null;
      this.getKecamatan(input);
    },
    getKecamatan(kota) {
      authAPI.getKecamatan(kota).then((res) => {
        this.kecamatan = res.data.result;
      });
    },
    getKelurahan(kota, kec) {
      authAPI.getKelurahan(kota, kec).then((res) => {
        this.kelurahan = res.data.result;
      });
    },
    getKodepos(kec, kel) {
      authAPI.getKodepos(kec, kel).then((res) => {
        this.cust.kodepos = res.data.result[0].KODEPOS;
        // console.log("Kode Pos", res);
      });
    },
    async submitNew() {
      const alert = await alertController.create({
        header: "Ubah",
        mode: "ios",
        message: "Apakah anda yakin ingin mengubah data ini ?",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Iya",
            handler: () => {
              this.addNew();
            },
          },
        ],
      });
      alert.present();
    },
    async addNew() {
      this.presLoading("Memproses Data");
      await authAPI
        .editCustomer(this.cust)
        .then((res) => {
          console.log(res);
          modulComp.openToast({
            header: "Success",
            msg: res.data.message,
            color: "success",
            icon: checkmarkCircle,
            side: "start",
          });
          modulComp.hideLoader()
          // loadingController.dismiss();
          modalController.dismiss();
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
          modulComp.hideLoader()
          // loadingController.dismiss();
        });
    },
    closeModal() {
      modalController.dismiss();
    },
  },
  created: function() {
    this.getKota();
  },
};
