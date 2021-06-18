<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-title>Sesi #{{ params.noreff }}</ion-title>
        <ion-buttons slot="primary" @click="closeModal">
          <ion-button>
            <ion-icon slot="icon-only" :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar mode="ios">
        <ion-card class="bg-card" color="primary">
          <ion-card-header>
            <ion-card-subtitle class="idmember">
              <ion-icon :icon="barcode"></ion-icon>
              {{ params.custid }}
            </ion-card-subtitle>
            <p class="holder">Nama customer</p>
            <ion-card-title>{{ params.nama.toLowerCase() }}</ion-card-title>
          </ion-card-header>
          <ion-card-content v-if="params.alamat != ' '">
            <p class="holder">Alamat</p>
            {{ params.alamat }}
          </ion-card-content>
          <ion-card-content v-else>
            <p class="holder">Alamat</p>
            alamat tidak tersedia.
          </ion-card-content>
        </ion-card>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list-header class="list-header ion-margin-bottom" slot="fixed">
        <ion-label>
          <ion-icon :icon="storefront"></ion-icon> Pilihan Store
        </ion-label>
      </ion-list-header>
      <ion-list style="margin-top: 45px">
        <div
          class="nothing-found"
          v-if="loading != true && stores.length == 0"
        >
          <img width="200" :src="require(`../../assets/image/nothing.svg`)" />
          <h3>Store tidak ditemukan</h3>
          <p>Oops.. sepertinya di wilayah customer tidak ada store yang tersedia.</p>
        </div>
        <div v-if="loading == true">
          <ion-item v-for="ske of [1, 2, 3, 4, 5]" :key="ske">
            <ion-thumbnail slot="end">
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-thumbnail>
            <ion-label>
              <ion-skeleton-text
                animated
                style="width: 30%"
              ></ion-skeleton-text>
              <ion-skeleton-text
                animated
                style="width: 50%"
              ></ion-skeleton-text>
              <ion-skeleton-text
                animated
                style="width: 40%"
              ></ion-skeleton-text>
            </ion-label>
          </ion-item>
        </div>
        <div v-if="stores.length > 0">
          <ion-item
            button
            v-for="store in stores"
            :key="store"
            @click="submitStore(store)"
          >
            <ion-label>
              <strong>{{ store.SUBUNIT_ID }}</strong>
              <h2>{{ store.SUBUNIT_NAME }}</h2>
              <!-- <h3>Ongkir : Rp. {{ randomOngkir().toLocaleString("ID") }}</h3> -->
              <h3>{{ store.KOTAKABUPATEN }}</h3>
            </ion-label>
            <ion-icon slot="end" :icon="addCircle" color="secondary"></ion-icon>
          </ion-item>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
