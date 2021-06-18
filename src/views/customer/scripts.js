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
} from "@ionic/vue";
import CustAPI from "@/api/customer.js";
import { modulComp } from "@/helper/modulComponent";
import { idCard, call, person } from "ionicons/icons";

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
  },
  setup() {
    return {
      idCard,
      call,
      person,
    };
  },
  data() {
    return {
      kota: [],
      kec: [],
      kel: [],
      cust: {
        nosesi: "",
        nohp: "",
        nama: "",
        kota: "",
        kec: "",
        kel: "",
      },
    };
  },
  methods: {
    filterInput(e) {
      e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    },
    resetFormData() {
      this.cust = {
        nosesi: "",
        nohp: "",
        nama: "",
        kota: "",
        kec: "",
        kel: "",
      };
    },
    getKota() {
      CustAPI.getKota().then((res) => {
        this.kota = res.data.result;
      });
    },
    getKecamatan() {
      this.cust.kec = "";
      CustAPI.getKecamatan(this.cust.kota).then((res) => {
        this.kec = res.data.result;
      });
    },
    getKelurahan() {
      this.cust.kel = "";
      CustAPI.getKelurahan(this.cust.kota, this.cust.kec).then((res) => {
        this.kel = res.data.result;
      });
    },
    addNew() {
      CustAPI.add(this.cust)
        .then((res) => {
          /* console.log(res);
          modulComp.openToast({
            header: "Success",
              msg: error.data?.message || "Tidak dapat mengakses API",
            color: "success",
            icon: alert,
            side: "start",
          }); */
          this.resetFormData();
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
  },
  created: function() {
    this.getKota();
  },
};
