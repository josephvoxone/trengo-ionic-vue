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
  loadingController,
  actionSheetController,
  IonButton,
  IonLabel,
  IonNote,
  IonListHeader,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonToggle,
  IonList,
  IonCol,
  IonRow,
  IonFooter,
} from "@ionic/vue";
import {
  idCard,
  storefront,
  copy,
  save,
  card,
  basket,
  close,
  create,
  barcode,
  trashBin,
  alert,
  checkmark,
  addCircle,
  reload,
} from "ionicons/icons";
import sesiAPI from "@/api/sessions";
import { modulComp } from "@/helper/modulComponent";
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import modalProfile from "@/views/edit-customer/index.vue";
import modalStore from "@/views/session-store/index.vue";
import router from "@/router/index";
import moment from "moment";

import { sessionService } from "@/service/sessions";
import { transService } from "@/service/transaksi";

export default {
  name: "orderDetails",
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
    IonSelectOption,
    IonSelect,
    IonToggle,
    IonList,
    IonCol,
    IonRow,
    IonFooter,
  },
  props: {
    sesi: { type: String, default: null },
    push: { type: Boolean, default: false },
  },
  setup() {
    return {
      addCircle,
      idCard,
      close,
      storefront,
      copy,
      trashBin,
      save,
      create,
      card,
      basket,
      barcode,
      checkmark,
      alert,
      reload,
    };
  },
  data() {
    return {
      header: { biayatotal: 0, biayakirim: 0, shipment: null },
      details: [],
      kurir: [],
      pembayaran: [],
      search: "",
      trans: {
        delivereddatetime: "",
        shipment: "",
        biayakirim: "",
        paymenttype: "",
        location: "",
      },
    };
  },
  async created() {
    this.loading();
    await this.getHeader(this.sesi);
    await this.getDetail(this.sesi);
    await this.getKurir();
    await this.loadLocal();
    setTimeout(() => {
      modulComp.hideLoader();
    }, 1000);
  },
  // async mounted() {
  // console.log(this.sesi);
  // this.loading();
  // console.log("Mounted Berjalan");
  // await this.getHeader(this.sesi);
  // await this.getDetail(this.sesi);
  // await this.getKurir();
  // // await this.loadLocal();
  // setTimeout(() => {
  //   // Some AJAX call occurs
  //   modulComp.hideLoader();
  //   // loadingController.dismiss();
  // }, 1000);
  // },
  methods: {
    // Memuat data sebelumnya
    async loadLocal() {
      const value = await JSON.parse(transService.getItem());
      if (value) {
        this.trans = value; //Load data lama Local Storage
        // Pengesetan Value header
        this.header.delivereddatetime = this.trans.delivereddatetime;
        this.header.shipment = this.trans.shipment;
        this.header.biayakirim = this.trans.biayakirim;
        this.header.paymenttype = this.trans.paymenttype;
        this.header.location = this.trans.location;
        if (this.header.shipment) {
          await this.loadJenisBayar(this.header.shipment);
        }
        console.log("Memuat Data Local", this.trans);
      }
    },
    setLocal(value) {
      console.log(value);
      if (value.isTrusted) {
        this.trans.delivereddatetime = this.header.delivereddatetime;
        this.trans.shipment = this.header.shipment;
        this.trans.biayakirim = this.header.biayakirim;
        this.trans.paymenttype = this.header.paymenttype;
        this.trans.location = this.header.location;

        transService.setItem(this.trans); //Set Local Storage
        console.log("Set Data Local", JSON.parse(transService.getItem()));
        // Melakukan pengesetan data-data agar tidak hilang
      }
    },
    // Membuat proses transaksi
    async submitCreate() {
      const alert = await alertController.create({
        header: "Proses " + this.sesi,
        mode: "ios",
        message: "Apakah anda ingin memproses pesanan ini ?",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: async () => {
              this.loading;
              console.log();
              await this.createTrans();
              await transService.clear(); //Membersihkan data Local
              setTimeout(() => {
                // Some AJAX call occurs
                modulComp.hideLoader();
                // loadingController.dismiss();
              }, 1000);
            },
          },
        ],
      });
      return alert.present();
    },
    createTrans() {
      this.header.delivereddatetime = moment(
        this.header.delivereddatetime
      ).format("DD-MM-YYYY HH:mm");
      return sesiAPI
        .createTrans(this.header)
        .then((res) => {
          console.log("Hasil", res);
          modulComp.openToast({
            header: "Berhasil Memproses Transaksi",
            msg: res.data.message,
            color: "success",
            icon: checkmark,
            side: "start",
          });
          sessionService.clearSession();
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
        });
    },
    async openProfile() {
      const modal = await modalController.create({
        component: modalProfile,
        componentProps: {
          idcustomer: this.header.custid,
        },
      });
      modal.onWillDismiss().then(async () => {
        await this.getHeader(this.sesi);
        await this.getKurir();
        this.loadLocal();
      });
      return await modal.present();
    },
    async loading(input) {
      const loading = await loadingController.create({
        message: input ? input : "memuat data..",
        mode: "ios",
        spinner: "crescent",
      });
      await loading.present();
    },
    async getHeader(data) {
      return await sesiAPI
        .getHeaderCart(data)
        .then(async (res) => {
          console.log("Memuat Header", res);
          this.header = res.data.result[0];
          this.header.delivereddatetime = await moment(
            res.data.result[0].delivereddatetime,
            "DD/MM/YYYY HH:mm"
          ).format("YYYY-MM-DDTHH:mm:ss");
        })
        .catch((error) => {
          if (error) {
            modulComp.openToast({
              header: "Error Header",
              msg: "Gagal memuat data",
              color: "danger",
              icon: alert,
              side: "start",
              duration: -1,
              handler: {
                side: "end",
                icon: reload || "close",
                handler: () => {
                  modulComp.hideToast();
                  this.getHeader(this.sesi);
                },
              },
            });
          }
        });
    },
    async addMoreItem() {
      if (this.push) {
        console.log(this.push);
        console.log(this.sesi);
        const alert = await alertController.create({
          header: "Menggunakan Sesi",
          mode: "ios",
          message: "Apakah anda ingin menambah item pada sesi " + this.sesi,
          buttons: [
            {
              text: "Batal",
              role: "cancel",
            },
            {
              text: "Ok",
              handler: async () => {
                // await sessionService.clearSession();
                await this.getUserSesi(this.sesi);
                // console.log(sessionService.getSession());
                router.push("/query");
                modalController.dismiss();
              },
            },
          ],
        });
        return alert.present();
      } else {
        modalController.dismiss();
      }
    },
    getUserSesi(input) {
      return sesiAPI
        .getUserSession(input)
        .then(async (res) => {
          await sessionService.setSession(
            Object.assign(
              { session: res.data.result.orderno },
              res.data.result[0]
            )
          );
        })
        .catch((error) => {
          if (error) {
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
                  this.getUserSesi(this.sesi);
                },
              },
            });
          }
        });
    },
    getDetail(data) {
      return sesiAPI
        .getDetailCart(data)
        .then((res) => {
          console.log("Details", res);
          // if (res.data.result.length != 0) {
          this.details = res.data.result;
          // }
        })
        .catch((error) => {
          console.log("Error Detail", error);
          if (error) {
            modulComp.openToast({
              header: "Error Detail",
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
                  this.getDetail(this.sesi);
                },
              },
            });
          }
        });
    },
    async getKurir() {
      return await sesiAPI
        .getKurir(this.header.kota)
        .then((res) => {
          console.log("Kurir", res);
          this.kurir = res.data.result;
        })
        .catch((error) => {
          console.log("Error Kurir", error);
          if (error) {
            modulComp.openToast({
              header: "Error Kurir",
              msg: "Tidak ditemukan sesuai alamat",
              color: "danger",
              icon: alert,
              side: "start",
              duration: -1,
              handler: {
                side: "end",
                icon: reload || "close",
                handler: () => {
                  modulComp.hideToast();
                  this.getKurir();
                },
              },
            });
          }
        });
    },
    setOngkir(input) {
      console.log("Set Ongkir", input);
      if (input.isTrusted) {
        this.trans.shipment = input.target.value;
        this.header.shipment = input.target.value;
        this.pembayaran = []; //Initiate Null

        this.header.paymenttype = -1;
        this.loadJenisBayar(input.target.value); //Melakukan pengecekan jenis pembayaran

        // Melakukan set pada field ongkir
        this.header.biayakirim = this.kurir.find(
          (x) => x.SHIPPER_NO == input.target.value
        ).RATERIT;

        //Set data Local
        this.setLocal({ isTrusted: true });
      }
    },
    async loadJenisBayar(value) {
      // Melakukan set pada pilihan pembayaran
      const jenisBayar = await this.kurir.find((x) => x.SHIPPER_NO === value)
        .SHIPPER_JENIS_PEMBAYARAN;

      if (jenisBayar == 1) {
        //Hanya cash
        this.pembayaran = [{ id: 0, name: "Cash" }];
      } else if (jenisBayar == 2) {
        //Hanya Transfer
        this.pembayaran = [{ id: 1, name: "Transfer" }];
      } else {
        this.pembayaran = [
          { id: 0, name: "Cash" },
          { id: 1, name: "Transfer" },
        ];
      }
      console.log("jenis Bayar", this.pembayaran);
    },
    async submitDelete(input) {
      const alert = await alertController.create({
        header: "Hapus Item",
        mode: "ios",
        message:
          "Apakah anda ingin menghapus " + input.goddesc.toLocaleLowerCase(),
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: () => {
              this.deleteItem(input);
            },
          },
        ],
      });
      return alert.present();
    },
    deleteItem(data) {
      data = Object.assign({ session: this.sesi }, data);
      console.log(data);
      return sesiAPI
        .deleteItemCart(data)
        .then(async (res) => {
          await this.getHeader(this.sesi);
          await this.getDetail(this.sesi);
          await this.getKurir();
          await this.loadLocal();
          modulComp.openToast({
            header: "Berhasil Hapus Item",
            msg: res.data.message,
            color: "success",
            icon: checkmark,
            side: "start",
          });
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
    async presentOptions() {
      const actionSheet = await actionSheetController.create({
        header: "Copy to Text",
        buttons: [
          {
            text: "Proses",
            handler: () => {
              this.onCopyAllItem();
            },
          },
          {
            text: "Transfer",
            handler: () => {
              if (this.header.paymenttype == 1) {
                this.onCopyPayment(1);
              } else {
                this.onCopyPayment(0);
              }
            },
          },
          {
            text: "Batal",
            icon: close,
            role: "cancel",
          },
        ],
      });
      return actionSheet.present();
    },
    async onCopyPayment(input) {
      let textItem = "";
      const biayaKirim = this.header.biayakirim || 0;
      let totalHarga = 0;
      this.details.forEach((element) => {
        totalHarga += element.total;
        textItem +=
          element.stock +
          " x " +
          element.goddesc +
          " @Rp. " +
          element.harga.toLocaleString("ID") +
          " = Rp." +
          element.total.toLocaleString("ID") +
          "\n";
      });
      totalHarga += parseFloat(biayaKirim);

      if (input == 1) {
        const textTF =
          `Terima kasih, Order kakak sedang diproses.\nOrder kakak sebagai berikut :\n` +
          textItem +
          `\nDengan biaya pengiriman Rp.` +
          biayaKirim?.toLocaleString("ID") +
          `\nTotal seluruhnya Rp. ` +
          totalHarga?.toLocaleString("ID") +
          `\n\nSilakan melakukan pembayaran melalui transfer ke rekening BCA :\nNo. 3454 597 777, A/n Dummy Account, paling lambat pembayaran H-1 atau H-0\nSetelah melakukan transfer, mohon konfirmasi dengan refrensi :` +
          this.sesi;
        this.header.delivereddatetime;
        toClipboard(textTF);
        modulComp.openToast({
          header: "Berhasil Salin Transfer",
          msg: "Menyalin order transaksi transfer",
          color: "success",
          icon: checkmark,
          side: "start",
        });
      } else {
        const textCash =
          `Terima kasih, Order kakak sedang diproses. Dengan no Referensi : #` +
          this.sesi +
          `\nOrder kakak sebagai berikut :\n` +
          textItem +
          `\nDengan biaya pengiriman Rp.` +
          biayaKirim?.toLocaleString("ID") +
          `\nTotal seluruhnya Rp. ` +
          totalHarga?.toLocaleString("ID") +
          `\nEstimasi kedatangan tanggal ` +
          moment(this.header.delivereddatetime)
            .lang("id")
            .format("LLLL");
        toClipboard(textCash);
        modulComp.openToast({
          header: "Berhasil Salin Cash",
          msg: "Menyalin order transaksi cash",
          color: "success",
          icon: checkmark,
          side: "start",
        });
      }
    },
    onCopyAllItem() {
      let textItem = "";
      let totalHarga = 0;
      const biayaKirim = this.header.biayakirim || 0;
      this.details.forEach((element) => {
        totalHarga += element.total;
        textItem +=
          element.stock +
          " x " +
          element.goddesc +
          " @Rp. " +
          element.harga.toLocaleString("ID") +
          " = Rp." +
          element.total.toLocaleString("ID") +
          "\n";
      });
      totalHarga += parseFloat(biayaKirim);

      const textChat =
        `Order kakak sebagai berikut :\n` +
        textItem +
        `\nDengan biaya pengiriman Rp.` +
        biayaKirim?.toLocaleString("ID") +
        `\nTotal seluruhnya Rp. ` +
        totalHarga?.toLocaleString("ID") +
        `\nApakah kakak setuju order ini diproses ?`;
      toClipboard(textChat);
      // console.log(VueClipboard);
      modulComp.openToast({
        header: "Berhasil Salin Order",
        msg: "Menyalin semua item detail",
        color: "success",
        icon: checkmark,
        side: "start",
      });
    },
    async submitEdit(input) {
      const alert = await alertController.create({
        header: "Ubah Qty Item",
        mode: "ios",
        message:
          "Apakah anda ingin mengubah qty " + input.goddesc.toLocaleLowerCase(),
        inputs: [
          {
            name: "stock",
            type: "number",
            placeholder: "Jumlah Qty",
            min: 1,
            value: input.stock,
          },
        ],
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Ubah",
            handler: async (data) => {
              if (data.stock <= 0) {
                modulComp.openToast({
                  header: "Proses Gagal",
                  msg: "Inputan tidak valid",
                  color: "danger",
                  icon: alert,
                  side: "start",
                });
                return;
              } else if (data.stock == input.stock) {
                return;
              }
              // if (item.stock >= data.stock) {
              this.loading();
              let itemData = Object.assign({}, input);
              itemData.stock = data.stock;
              itemData = Object.assign(
                {
                  session: this.sesi,
                  tax: 0,
                  discount: 0,
                  promocode: " ",
                },
                itemData
              );
              itemData.godgoodsno = itemData.godgoodsno.trim();
              await this.editItem(itemData);
              await this.getHeader(this.sesi);
              await this.getDetail(this.sesi);
              await this.getKurir();
              await this.loadLocal();
              setTimeout(() => {
                // Some AJAX call occurs
                modulComp.hideLoader();
                // loadingController.dismiss();
              }, 1000);
              console.log(itemData);
              // } else {
              //   modulComp.openToast({
              //     header: "Gagal",
              //     msg: "Stock tidak mencukupi",
              //     color: "danger",
              //     icon: alert,
              //     side: "start",
              //   });
              //   modalController.dismiss();
              // }
            },
          },
        ],
      });
      return alert.present();
    },
    editItem(input) {
      return sesiAPI
        .editItem(input)
        .then((res) => {
          console.log(res);
          modulComp.openToast({
            header: "Berhasil",
            msg: "Mengatur kuantitas item",
            color: "success",
            icon: checkmark,
            side: "start",
          });
        })
        .catch((error) => {
          if (error) {
            modulComp.openToast({
              header: "Gagal Input",
              msg: error.data?.message || "Tidak dapat mengakses API",
              color: "danger",
              icon: alert,
              side: "start",
            });
          }
        });
    },
    async setStore(input) {
      if (input.alamat == " ") {
        modulComp.openToast({
          header: "Tidak Bisa Pilih Store",
          msg:
            "Pastikan alamat customer sudah terisi. Ubah edit profile customer.",
          color: "danger",
          icon: alert,
          side: "start",
        });
        return;
      }
      const modal = await modalController.create({
        component: modalStore,
        componentProps: {
          params: input,
        },
      });
      modal.onWillDismiss().then(async () => {
        await this.getHeader(this.sesi);
        await this.getKurir();
        // console.log("onWillDismiss");
        this.loadLocal();
      });
      return await modal.present();
    },
    closeModal() {
      modalController.dismiss();
    },
    async doRefresh(event) {
      console.log("Begin async operation", event);
      this.loading();
      await this.getHeader(this.sesi);
      await this.getDetail(this.sesi);
      await this.getKurir();
      this.loadLocal();
      setTimeout(() => {
        console.log("Async operation has ended");
        event.target.complete();
        modulComp.hideLoader();
      }, 1000);
    },
  },
};
