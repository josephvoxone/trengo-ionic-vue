import { modulComp } from "@/helper/modulComponent";
import { alert } from "ionicons/icons";
import axios from "axios";
import router from '@/router';
import { loadingController } from "@ionic/vue";
import { userService } from "@/service/user";

const TOKEN_KEY = "access_token";
const TokenService = {
  setup() {
    return { alert };
  },
  pushHeader() {
    axios.defaults.headers.common["x-token"] = this.getToken();
  },
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  saveToken(accessToken: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  interceptor() {
    axios.interceptors.response.use(
      response => {
        if (TokenService.checkToken()) {
          TokenService.pushHeader();
        } else {
          router.push({ name: 'Signin' })
        }
        if (response.status === 200 || response.status === 201 || response.status === 202 || response.status === 210) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      error => {
        if (error.response.status) {
          if (TokenService.checkToken()) {
            TokenService.pushHeader();
          } else {
            router.push({ name: 'Signin' })
          }
          return Promise.reject(error.response);
        }
      }
    )
  },
  checkToken() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const user: any = userService.getItem();
    const expired: any = JSON.parse(user)?.expired_at
    console.log(expired)
    // console.log("Check Token", Date.now(), JSON.parse(expired_at)?.expired_at);
    if (Date.now() > Date.parse(expired)) {
      this.removeHeader();
      localStorage.clear();
      modulComp.hideLoader()
      modulComp.hideToast()
      // loadingController.dismiss(); // Catch semua loading dismiss
      modulComp.openToast({
        header: "Sesi Expired",
        msg: "Sesi telah habis silakan login lagi.",
        color: "danger",
        icon: alert,
        side: "start",
      });
      return false;
    } else if (expired === undefined) {
      return false;
    } else {
      return true;
    }
  },
};

export {
  TokenService
};
