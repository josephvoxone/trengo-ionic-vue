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
  IonThumbnail,
  IonSkeletonText,
  IonLabel,
  IonItem,
  IonCard,
  IonNote,
  IonList,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
  IonMenuButton,
  IonFab,
  IonFabButton,
  IonFabList,
  alertController,
  loadingController,
} from "@ionic/vue";
import {
  hourglass,
  mailOpen,
  alert,
  addCircle,
  chevronDownCircleOutline,
  barcode,
  calendar,
  closeCircle,
  wallet,
  checkmarkDoneCircle,
  car,
  swapVertical,
  filter,
  settings,
} from "ionicons/icons";
import authAPI from "@/api/sessions";
import { modulComp } from "@/helper/modulComponent";
import { useRouter } from "vue-router";
import modalCart from "@/views/order-details/index.vue";

export default {
  name: "Home",
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
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonCard,
    IonNote,
    IonList,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonMenuButton,
    IonFab,
    IonFabButton,
    IonFabList,
  },
  setup() {
    const router = useRouter();
    return {
      settings,
      checkmarkDoneCircle,
      chevronDownCircleOutline,
      addCircle,
      router,
      car,
      barcode,
      calendar,
      hourglass,
      mailOpen,
      closeCircle,
      wallet,
      swapVertical,
      filter,
    };
  },
  data() {
    return {
      checkFilter: [],
      checkSort: [],
      sessions: [],
      paramFilter: { statusname: "", status: "", sort: "" },
      search: "",
      loading: false,
    };
  },
  async ionViewWillEnter() {
    this.sessions = [];
    this.filters = [];
    this.checkFilter = [];
    await this.getData(this.search);
  },
  methods: {
    getStatus() {
      return authAPI.getStatus().then((res) => {
        return res.data.result;
      });
    },
    async loadingPop(input) {
      const loading = await loadingController.create({
        message: input ? input : "memuat data..",
        mode: "ios",
        spinner: "crescent",
      });
      await loading.present();
    },
    chooseFil() {
      if (this.paramFilter.status != "") {
        this.filterItem();
      } else if (this.paramFilter.sort != "") {
        this.sortItem();
      }
    },
    async filterItem() {
      await this.loadingPop(); //Present Loading
      let statusData = await this.getStatus(); //Mendapatkan data dari API
      statusData = statusData.map((x) => ({ ...x, checked: false })); //Melakukan penambahan object key centang false
      // Untuk mengetahui data yang di centang
      this.checkFilter = Array.from(
        statusData.map((x) => ({ ...x, checked: true }))
      ).filter(({ value }) => value == this.paramFilter.status);
      // Melakukan set pada data diisi dengan data yang dicentang
      statusData = statusData.map(
        (obj) => this.checkFilter.find((o) => o.label === obj.label) || obj
      );
      // Menghilangkan Loading
      modulComp.hideLoader();

      const alert = await alertController.create({
        header: "Filter",
        subHeader: "Filter sesi berdasarkan",
        inputs: statusData,
        buttons: [
          {
            text: "Reset",
            handler: () => {
              this.sessions = []; // Initialize
              this.paramFilter.status = ""; //Default data
              this.getData(this.search); //Mendapatkan data dari API
            },
          },
          {
            text: "Filter",
            handler: (value) => {
              this.sessions = []; // Initialize
              this.paramFilter.status = value; //Set Value Param
              this.checkFilter = Array.from(
                statusData.map((x) => ({ ...x, checked: true }))
              ).filter(({ value }) => value == this.paramFilter.status); //Set filter data
              this.getData(this.search); //Mendapatkan Data dari API
            },
          },
        ],
      });
      return alert.present();
    },
    async sortItem() {
      let sortData = [
        {
          type: "radio",
          label: "Ascending",
          value: "asc",
          checked: false,
        },
        {
          type: "radio",
          label: "Descending",
          value: "desc",
          checked: false,
        },
      ];
      sortData = sortData.map((x) => ({ ...x, checked: false })); //Melakukan penambahan object key centang false
      // Untuk mengetahui data yang di centang
      this.checkSort = Array.from(
        sortData.map((x) => ({ ...x, checked: true }))
      ).filter(({ value }) => value == this.paramFilter.sort);
      // Melakukan set pada data diisi dengan data yang dicentang
      sortData = sortData.map(
        (obj) => this.checkSort.find((o) => o.label === obj.label) || obj
      );
      const alert = await alertController.create({
        header: "Urutkan",
        subHeader: "Mengurutkan nomor sesi secara",
        inputs: sortData,
        buttons: [
          {
            text: "Reset",
            handler: () => {
              this.sessions = []; // Initialize
              this.paramFilter.sort = ""; //Default data
              this.getData(this.search); //Mendapatkan data dari API
            },
          },
          {
            text: "Urutkan",
            handler: (value) => {
              this.sessions = []; // Initialize
              this.paramFilter.sort = value; //Set Value Param
              this.checkSort = Array.from(
                sortData.map((x) => ({ ...x, checked: true }))
              ).filter(({ value }) => value == this.paramFilter.sort); //Set filter data
              this.getData(this.search); //Mendapatkan Data dari API
            },
          },
        ],
      });
      return alert.present();
    },
    loadData(ev) {
      setTimeout(() => {
        this.getData(this.search);
        console.log("Loaded data");
        ev.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.sessions.length == 1000) {
          ev.target.disabled = true;
        }
      }, 1000);
      // End Pagination
    },
    searchData(input) {
      this.sessions = [];
      this.getData(input);
    },
    getData(data) {
      this.loading = true;
      return authAPI
        .getAllSession(data, this.paramFilter, this.sessions.length)
        .then((res) => {
          console.log("All Sesi", res.data.result);
          res.data.result.forEach((element) => {
            this.sessions.push(element);
          });
          // this.sessions = res.data.result;
          // this.filters = res.data.result;
          this.loading = false;
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Error",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
          });
          this.loading = false;
        });
    },
    async openOrderDetails(input) {
      console.log(input);
      const modal = await modalController.create({
        component: modalCart,
        componentProps: {
          sesi: input,
          push: true,
        },
      });
      modal.onWillDismiss().then(() => {
        this.sessions = [];
        this.filters = [];
        this.getData(this.search);
      });
      return await modal.present();
    },
    doRefresh(event) {
      setTimeout(() => {
        this.getData(this.search);
        event.target.complete();
      }, 2000);
    },
  },
};
