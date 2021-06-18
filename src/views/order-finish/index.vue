<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Sesi #{{ sesi.noreff }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list class="ion-no-padding">
        <ion-list-header class="list-header">
          <ion-label>Status Transaksi</ion-label>
          <ion-note>
            <span
              class="status ion-margin-end"
              :class="
                sesi.orderstatus == 'Waiting Payment'
                  ? 'wait-payment'
                  : sesi.orderstatus == 'Cancelled'
                  ? 'canceled'
                  : sesi.orderstatus == 'Waiting Process'
                  ? 'wait-process'
                  : sesi.orderstatus == 'Complete'
                  ? 'complete'
                  : 'process'
              "
              >{{ sesi.orderstatus }}</span
            >
          </ion-note>
        </ion-list-header>
        <!-- <ion-item> </ion-item> -->
        <ion-item>
          <ion-label> ID Customer </ion-label>
          <ion-note slot="end">{{ sesi.custid }} </ion-note>
        </ion-item>
        <ion-item>
          <ion-label> Nama Customer </ion-label>
          <ion-note slot="end"> {{ sesi.nama }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Alamat</ion-label>
          <p>{{ sesi.alamat }}</p>
        </ion-item>
        <ion-item>
          <ion-label> No. Telepon </ion-label>
          <ion-note slot="end">{{ sesi.telp }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label> Start Date </ion-label>
          <ion-note slot="end">{{ sesi.orderdatetime }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label> Last Update </ion-label>
          <ion-note slot="end">{{ sesi.logchdatetime }}</ion-note>
        </ion-item>
        <ion-list-header class="list-header"> Pengiriman </ion-list-header>
        <ion-item>
          <ion-label>Tanggal Kirim</ion-label>
          <ion-note slot="end">{{ sesi.delivereddatetime }}</ion-note>
        </ion-item>
        <ion-item>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <ion-label position="stacked">Dikirim Dari</ion-label>
          </div>
          <p>
            <ion-icon :icon="storefront"></ion-icon> {{ sesi.subunitid }} -
            {{ sesi.subunit }}
          </p>
        </ion-item>
        <ion-item>
          <ion-label>Biaya Kirim</ion-label>
          <ion-note slot="end"
            >Rp. {{ sesi.biayakirim?.toLocaleString("ID") }}</ion-note
          >
        </ion-item>
        <ion-item>
          <ion-label>Total</ion-label>
          <ion-note slot="end"
            >Rp. {{ sesi.biayatotal?.toLocaleString("ID") }}</ion-note
          >
        </ion-item>

        <ion-list-header class="list-header">
          <ion-label>Detail Order </ion-label>
        </ion-list-header>

        <ion-item button v-for="item of detail" :key="item.noreff">
          <ion-label>
            <span class="nogoods"
              ><ion-icon slot="start" :icon="barcode"></ion-icon> &nbsp;{{
                item.godgoodsno
              }}</span
            >
            <div class="ion-text-wrap">
              <h2>{{ item.nama_barang }}</h2>
            </div>
          </ion-label>
          <ion-label slot="end" class="ion-text-right">
            <h2>
              <strong>Rp. {{ item.subtotal.toLocaleString("ID") }}</strong>
            </h2>
            <p>
              {{ item.qty }} x @{{ item.harga_satuan.toLocaleString("ID") }}
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer v-if="sesi.vbatal == '1' && sesi.vpaid == '1'">
      <ion-toolbar>
        <ion-row>
          <ion-col size="12" style="padding-bottom: 0">
            <ion-button
              style="letter-spacing: 2px"
              mode="ios"
              expand="block"
              @click="submitDataPaid"
              v-if="sesi.vpaid == 1"
            >
              Bayar
            </ion-button></ion-col
          >
          <ion-col size="12" style="padding-top: 0">
            <ion-button
              color="danger"
              style="letter-spacing: 1px"
              mode="ios"
              expand="block"
              @click="presentAlert"
              v-if="sesi.vbatal == 1"
            >
              Batalkan
            </ion-button></ion-col
          >
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script  src="./scripts.js"></script>

<style scoped>
/*  00	Open
    01	Waiting Payment
    02	Waiting Process 
    03	On Process
    04	Waiting Shipment
    05	On Delivery
    06	Complete
    07	Cancelled */

/* Untuk Status */
.process {
  background: #565656 !important;
}
.complete {
  background: #4caf50 !important;
}
.wait-process {
  background: #ff9800 !important;
}
.wait-payment {
  background: #ff6b3d !important;
}
.canceled {
  background: #f44336 !important;
}
</style>

<style scoped>
@import "./style.scss";
</style>
