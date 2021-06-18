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
} from "@ionic/vue";
import {
  alert,
  addCircle,
  chevronDownCircleOutline,
  barcode,
  call,
  bagHandle,
} from "ionicons/icons";
import authAPI from "@/api/history";
import { modulComp } from "@/helper/modulComponent";
import { useRouter } from "vue-router";

export default {
  name: "History",
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
    
  },
  setup() {
    const router = useRouter();
    return {
      chevronDownCircleOutline,
      addCircle,
      router,
      barcode,
      call,
      bagHandle,
    };
  },
  data() {
    return {
      history: [],
      search: "",
      loading: true,
    };
  },
  mounted() {
    this.getData(this.search);
  },
  methods: {
    searchData(input) {
      this.history = [];
      this.getData(input);
    },
    loadData(ev) {
      setTimeout(() => {
        this.getData(this.search);
        console.log("Loaded data");
        ev.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.history.length == 1000) {
          ev.target.disabled = true;
        }
      }, 1000);
      // End Pagination
    },
    getData(data) {
      this.loading = true;
      return authAPI
        .getAllSession(data, this.history.length)
        .then((res) => {
          console.log(res.data.result);
          res.data.result.forEach((element) => {
            this.history.push(element);
          });
          // this.history = res.data.result;
          this.loading = false;
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
          this.loading = false;
        });
    },
    doRefresh(event) {
      console.log("Begin async operation");
      this.getData(this.search);
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
