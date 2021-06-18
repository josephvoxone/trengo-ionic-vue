import {
  IonButtons,
  IonContent,
  IonPage,
  IonIcon,
  IonInput,
  IonThumbnail,
  IonItem,
  IonButton,
} from "@ionic/vue";
import { personCircle, lockClosed, alert, eye, eyeOff } from "ionicons/icons";
import authAPI from "@/api/auth";
import { modulComp } from "@/helper/modulComponent";
import router from "@/router/index";
import { TokenService } from "@/service/token";
import { userService } from "@/service/user";

export default {
  name: "Login",
  components: {
    IonButtons,
    IonContent,
    IonThumbnail,
    IonItem,
    IonButton,
    IonPage,
    IonIcon,
    IonInput,
  },
  setup() {
    return {
      personCircle,
      lockClosed,
      alert,
      eye,
      eyeOff,
    };
  },
  ionViewWillEnter() {
    if (TokenService.checkToken()) {
      router.push("/query");
    }
  },
  data() {
    return {
      hide: true,
      user: { username: "", password: "" },
    };
  },
  methods: {
    login() {
      modulComp.openLoader({ msg: "Verifikasi Akun" });
      setTimeout(() => {
        authAPI
          .login(this.user)
          .then(async (res) => {
            await userService.setItem(res.data.result[0]);
            await TokenService.saveToken(res.data.result[0].token);
            await TokenService.pushHeader();
            modulComp.hideLoader();
            router.push({ name: "QueryHome" });
            location.reload();
          })
          .catch((error) => {
            console.log("Error Login", error);
            modulComp.hideLoader();
            modulComp.openToast({
              header: "Error",
              msg: error.data?.message || "Tidak dapat mengakses API",
              color: "danger",
              icon: alert,
              side: "start",
              duration: -1,
            });
          });
      }, 1000);
    },
  },
};
