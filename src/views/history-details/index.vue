<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>History Detail</ion-title>
      </ion-toolbar>
      <ion-toolbar mode="ios">
        <ion-card color="primary" class="bg-card">
          <div class="ion-text-right">
            <ion-card-subtitle class="idmember">
              <ion-icon :icon="barcode"></ion-icon>
              {{ history?.idcustomer }}
            </ion-card-subtitle>
          </div>
          <ion-card-content style="padding: 0 20px; margin-top: 1px">
            <p class="holder">Nama customer</p>
            <ion-card-title class="title-history">{{
              history.nama?.toLowerCase()
            }}</ion-card-title>
            <p class="holder">Alamat</p>
            <span class="title-history">{{
              history?.alamat || "alamat tidak tersedia."
            }}</span>
          </ion-card-content>
          <ion-card-content style="padding-top: 0">
            <p class="holder">Telepon</p>
            <span class="title-history">
              {{ history?.telp || "No. Telpon tidak tersedia." }}</span
            >
          </ion-card-content>
        </ion-card>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list class="ion-no-padding">
        <ion-list-header class="list-header">
          Riwayat Transaksi
        </ion-list-header>
        <ion-card
          mode="ios"
          v-for="items of riwayat"
          :key="items.idcustomer"
          button
          @click="
            () =>
              router.push({
                name: 'history-order-details',
                query: { sesi: items.orderno },
              })
          "
          style="margin: 10px"
        >
          <span class="unit">
            <strong>
              <ion-icon slot="start" :icon="calendar"></ion-icon>
              {{
                new Date(items.tgl).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </strong>
          </span>
          <ion-item lines="none">
            <ion-note slot="start" class="note-session">
              <ion-icon size="large" :icon="bagHandle"></ion-icon>
            </ion-note>
            <ion-label>
              <h2>
                <strong>#{{ items.orderno }}</strong>
              </h2>
              <p>
                Total :
                <strong>Rp. {{ items.total.toLocaleString("ID") }} </strong>
              </p>
            </ion-label>
          </ion-item>
        </ion-card>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          class="ion-padding-horizontal"
          style="letter-spacing: 2px"
          mode="ios"
          expand="block"
          @click="openModal()"
        >
          Edit Profile
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
