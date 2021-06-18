// import { modulComp } from "@/helper/modulComponent";
// import { alert } from "ionicons/icons";
// import axios from "axios";

const TRANS_KEY = 'user_trans'

// delivereddatetime == tanggal kirim
// shipment == pengiriman
// biayakirim == biayarkirim
// paymenttype == jenis pembayaran
// location == gmaps location

const transService = {
    getItem() {
        return localStorage.getItem(TRANS_KEY);
    },
    setItem(data: any) {
        localStorage.setItem(TRANS_KEY, JSON.stringify(data));
    },
    clear() {
        localStorage.removeItem(TRANS_KEY);
    }
}

export {
    transService
};
