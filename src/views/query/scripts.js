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
  IonSkeletonText,
  alertController,
  modalController,
  IonThumbnail,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonCard,
  IonList,
  IonInfiniteScrollContent,
  IonFabButton,
  IonBadge,
  IonFab,
  IonInfiniteScroll,
  IonNote,
  IonButton,
} from "@ionic/vue";
import {
  create,
  cart,
  alert,
  copy,
  addCircle,
  settings,
  checkmarkCircle,
  personAdd,
  people,
  warning,
  storefront,
  bagHandle,
  reload,
  cube,
} from "ionicons/icons";
import { modulComp } from "@/helper/modulComponent";
import { useRouter } from "vue-router";
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import queryAPI from "@/api/query";
import sesiAPI from "@/api/sessions";
import modalAddsesi from "@/views/session-add/index.vue";
import modalCart from "@/views/order-details/index.vue";
import { sessionService } from "@/service/sessions";
import { queryService } from "@/service/query";

export default {
  name: "QueryHome",
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
    IonSkeletonText,
    IonThumbnail,
    IonMenuButton,
    IonInfiniteScroll,
    IonNote,
    IonButton,
    IonItem,
    IonLabel,
    IonCard,
    IonList,
    IonInfiniteScrollContent,
    IonFabButton,
    IonBadge,
    IonFab,
  },
  setup() {
    const router = useRouter();
    return {
      checkmarkCircle,
      cart,
      create,
      people,
      copy,
      router,
      addCircle,
      storefront,
      warning,
      settings,
      bagHandle,
      personAdd,
      reload,
      cube,
    };
  },
  data() {
    return {
      stockLength: 0,
      session: { session: "", kota: "" },
      items: [],
      kota: [],
      loading: false,
      filters: { barang: "", id: "00046", name: "SURABAYA" },
    };
  },
  async mounted() {
    this.loading = true;
    this.items = [];
    this.session = (await JSON.parse(sessionService.getSession())) || {
      session: "",
      kota: "",
    };
    await this.getKota();
    await this.getStockCart();
    if (this.session.kota != "") {
      this.filters.name = this.session.kota;
      await this.getKotaIDNumber(this.session.kota);
    } else {
      await this.setKota(); //Untuk mengatur log ketika tidak ada sesi
      await this.getKotaIDNumber(this.filters.name);
      // await this.getData(this.filters);
    }
    console.log(this.stockLength);
    console.log(this.session);
    this.loading = false;
  },
  methods: {
    clearSearch() {
      console.log("aw");
    },
    setKota() {
      if (this.session.session == "") {
        if (queryService.getCity() == undefined) {
          this.filters.id = "00046";
          this.filters.name = "SURABAYA";
          queryService.setQuery({ city: "SURABAYA" });
        } else {
          this.filters.name = queryService.getCity();
        }
      }
    },
    searchData(input) {
      this.items = [];
      this.getData(input);
    },
    loadData(ev) {
      setTimeout(() => {
        this.getData(this.filters);
        console.log("Loaded data");
        ev.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.items.length == 1000) {
          ev.target.disabled = true;
        }
      }, 1000);
      // End Pagination
    },
    async addtoCart(item) {
      const alert = await alertController.create({
        header: "Sesi Kosong",
        subHeader: "Tambahkan sesi terlebih dahulu.",
        mode: "ios",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Tambah",
            handler: () => {
              this.openModal("modalAddsesi");
            },
          },
        ],
      });
      if (sessionService.getSession() == null) {
        alert.present();
      } else {
        alert.header = "Tambah Qty";
        alert.subHeader = item?.barang;
        alert.inputs = [
          {
            name: "stock",
            type: "number",
            placeholder: "Jumlah Qty",
            min: 1,
            value: 1,
          },
        ];
        alert.buttons = [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Tambah",
            handler: async (data) => {
              if (data.stock <= 0) {
                modulComp.openToast({
                  header: "Proses Gagal",
                  msg: "Inputan tidak valid",
                  color: "danger",
                  icon: warning,
                  side: "start",
                });
                modalController.dismiss();
                return;
              }
              if (item.stock >= data.stock) {
                let itemData = Object.assign({}, item);
                itemData.stock = data.stock;
                itemData = Object.assign(
                  {
                    session: this.session.session,
                    tax: 0,
                    discount: 0,
                    promocode: " ",
                  },
                  itemData
                );
                await this.addItem(itemData);
                await this.getStockCart();
                console.log(itemData);
              } else {
                modulComp.openToast({
                  header: "Gagal",
                  msg: "Stock tidak mencukupi",
                  color: "warning",
                  icon: warning,
                  side: "start",
                });
                modalController.dismiss();
              }
            },
          },
        ];
        alert.present();
      }
    },
    addItem(input) {
      return sesiAPI
        .addItem(input)
        .then((res) => {
          console.log(res);
          // sessionService.setSession(
          //   Object.assign({ session: res.data.result.session }, res.data.result)
          // );
          modulComp.openToast({
            header: "Berhasil",
            msg: "Menambah kuantitas item",
            color: "success",
            icon: checkmarkCircle,
            side: "start",
          });
          modalController.dismiss();
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
    getStockCart() {
      if (this.session.session != "") {
        return sesiAPI.getDetailCart(this.session.session).then((res) => {
          this.stockLength = res.data.result.length;
        });
      } else {
        this.stockLength = 0;
      }
    },
    async openModal(input) {
      let modal;
      if (input == "modalAddsesi") {
        modal = await modalController.create({
          component: modalAddsesi,
        });
      } else {
        modal = await modalController.create({
          component: modalCart,
          componentProps: {
            sesi: this.session?.session,
          },
        });
      }
      modal.onWillDismiss().then(async (output) => {
        // console.log(output.data);
        // await this.getKotaIDNumber(this.session.kota);
        // Harusnya ada pengecekan untuk parameter add dan parameter lainnya
        this.loading = true;
        if (sessionService.getSession() != null && output.data != "create") {
          this.session = await JSON.parse(sessionService.getSession());
          await this.getNewData(this.session.session);
        }

        this.items = [];
        this.session = (await JSON.parse(sessionService.getSession())) || {
          session: "",
          kota: "",
        };

        if (this.session.kota == "") {
          this.session.kota = "SURABAYA";
          console.log(this.session);
        }

        this.filters.name = this.session.kota;

        await this.setKota(); //Untuk mengatur log ketika tidak ada sesi
        await this.getKotaIDNumber(this.filters.name);
        await this.getStockCart();

        this.loading = false;
      });
      return await modal.present();
    },
    getNewData(input) {
      return sesiAPI
        .getDataSession(input)
        .then((res) => {
          console.log("Get New", res.data.result[0]);
          sessionService.setSession(res.data.result[0]);
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Gagal Memuat Data",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    getKota() {
      return queryAPI
        .getKota()
        .then((res) => {
          this.kota = res.data.result;
        })
        .catch((error) => {
          console.log(error);
          modulComp.openToast({
            header: "Error",
            msg: "Gagal Memuat Data",
            color: "danger",
            icon: alert,
            side: "start",
            duration: -1,
            handler: {
              side: "end",
              icon: reload || "close",
              handler: () => {
                modulComp.hideToast();
                this.getKota();
              },
            },
          });
        });
    },
    getKotaIDNumber(city) {
      queryAPI
        .getKotaID(city)
        .then(async (res) => {
          queryService.setQuery({ city: this.filters.name }); //Set nama kota dengan nama yang diubah.
          this.filters.id = res.data.result[0].KOTA_ID;
          this.items = [];
          this.getData(this.filters);
        })
        .catch((error) => {
          modulComp.openToast({
            header: "Error",
            msg: "Kota tidak ditemukan",
            color: "danger",
            icon: alert,
            side: "start",
          });
        });
    },
    getData(data) {
      this.loading = true;
      return queryAPI
        .getAllQuery(data, this.items.length)
        .then((res) => {
          // this.items = res.data.result;
          res.data.result.forEach((element) => {
            this.items.push(element);
          });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          modulComp.openToast({
            header: "Error",
            msg: error.data?.message || "Tidak dapat mengakses API",
            color: "danger",
            icon: alert,
            side: "start",
            duration: -1,
            handler: {
              side: "end",
              icon: reload || "close",
              handler: () => {
                modulComp.hideToast();
                this.getData(this.filters);
              },
            },
          });
        });
    },
    onCopyItem(item) {
      const textChat =
        item.barang +
        ` tersedia stock dengan jumlah ` +
        item.stock +
        ` pcs, dengan harga @ Rp. ` +
        item.harga.toLocaleString("ID") +
        `.\nKakak mau order berapa ?\n\nTerima kasih.`;
      toClipboard(textChat);
      // console.log(VueClipboard);
      modulComp.openToast({
        header: "Berhasil Salin",
        msg: item.barang,
        color: "success",
        icon: checkmarkCircle,
        side: "start",
      });
    },
    onCopyAllItem() {
      const limitItem = this.items;
      if (limitItem.length > 5) {
        limitItem.length = 5;
      }
      let textItem = "";
      limitItem.forEach((element) => {
        textItem +=
          element.barang + " @" + element.harga.toLocaleString("ID") + "\n";
      });
      const textChat =
        `Kami menjual :\n` + textItem + `\nMau pilih yang mana ?`;
      toClipboard(textChat);
      // console.log(VueClipboard);
      modulComp.openToast({
        header: "Berhasil Salin",
        msg: "Menyalin " + limitItem.length + " Stock teratas",
        color: "success",
        icon: checkmarkCircle,
        side: "start",
      });
    },
    doRefresh(event) {
      console.log("Begin async operation");
      this.kota = [];
      this.items = [];
      this.getData(this.filters);
      this.getKota();
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
      }, 2000);
    },
  },
};
