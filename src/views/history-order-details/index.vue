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
          <ion-label>Status</ion-label>
          <ion-note>
            <span class="status ion-margin-end">{{
              sesi.orderstatus
            }}</span></ion-note
          >
        </ion-list-header>
        <ion-item>
          <ion-label> Customer ID </ion-label>
          <ion-note slot="end">{{ sesi.custid }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label> Nama </ion-label>
          <ion-note slot="end">{{ sesi.nama }}</ion-note>
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
          <ion-note slot="end">{{ sesi.delivereddate }}</ion-note>
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

        <div class="nothing-found" v-if="detail.length == 0">
          <img class="box-img" :src="require(`../../assets/image/box.png`)" />
          <h3>Order kosong</h3>
          <p>Oops.. anda belum menambahkan item.</p>
        </div>

        <ion-item v-for="details of detail" :key="details.noreff" href="#">
          <ion-label>
            <h2>{{ details.nama_barang }}</h2>
            <p>Qty : {{ details.qty }}</p>
          </ion-label>
          <ion-label slot="end" class="ion-text-right">
            <h2>
              <strong>Rp. {{ details.subtotal }}</strong>
            </h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script  src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
