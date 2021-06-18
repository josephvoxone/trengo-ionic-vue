import { toastController, loadingController } from "@ionic/vue";

const modulComp = {
  // Toast
  async openToast(data: any) {
    const toast = await toastController.create({
      header: data?.header,
      message: data?.msg,
      position: "bottom",
      color: data?.color,
      duration: data?.duration || 2000,
      mode: "ios",
      buttons: [
        {
          side: data?.side || "start",
          icon: data?.icon || 'alert',
        },
        data?.handler || {
          side: 'right',
          icon: 'close',
        },
      ],
    });
    return toast.present();
  },
  hideToast() {
    toastController
      .dismiss()
      .then((res) => {
        if (!res) toastController.dismiss();
        // console.log("Loading dismissed!", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  openLoader(data: any) {
    loadingController
      .create({
        spinner: "lines-small",
        animated: true,
        message: data?.msg,
        mode: "ios",
        translucent: true,
        // backdropDismiss: data?.backdrop || false,
      })
      .then((res) => {
        res.present();
      });
  },
  hideLoader() {
    loadingController
      .dismiss()
      .then((res) => {
        if (!res) loadingController.dismiss();
        // console.log("Loading dismissed!", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
}
export {
  modulComp
};
