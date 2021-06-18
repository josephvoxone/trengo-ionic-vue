<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>History</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          v-model="search"
          debounce="0"
          @keyup.enter="searchData(search)"
          @ionCancel="searchData(search)"
          animated
          placeholder="Find history"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div v-if="loading == true">
        <ion-card mode="ios" v-for="ske of [1, 2, 3, 4, 5]" :key="ske">
          <ion-item lines="none">
            <ion-thumbnail slot="end">
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-thumbnail>
            <ion-label>
              <ion-skeleton-text
                animated
                style="width: 20%"
              ></ion-skeleton-text>
              <ion-skeleton-text
                animated
                style="width: 60%"
              ></ion-skeleton-text>
              <ion-skeleton-text
                animated
                style="width: 30%"
              ></ion-skeleton-text>
              <ion-skeleton-text
                animated
                style="width: 60%"
              ></ion-skeleton-text>
            </ion-label>
          </ion-item>
        </ion-card>
      </div>
      <ion-list v-if="history.length > 0">
        <ion-card
          mode="ios"
          v-for="item of history"
          :key="item.idcustomer"
          class="listsession"
          button
          @click="
            () =>
              router.push({
                name: 'history-details',
                query: { userId: item.idcustomer },
              })
          "
        >
          <!-- <span class="unit">
            <strong>
              <ion-icon slot="start" :icon="bagHandle"></ion-icon>
              {{ item.totalorder }} Order
            </strong>
          </span> -->
          <ion-item lines="none">
            <ion-note slot="start" class="note-session">
              <div class="note-history">
                <ion-badge color="secondary" class="badge-order">
                  {{ item.totalorder }}</ion-badge
                >
                <ion-icon
                  size="large"
                  color="primary"
                  :icon="bagHandle"
                ></ion-icon>
              </div>
            </ion-note>
            <ion-label>
              <p>
                <ion-icon slot="start" :icon="barcode"></ion-icon>
                <strong>{{ item.idcustomer }}</strong>
              </p>
              <h1>
                <strong>{{ item.nama }}</strong>
              </h1>
              <p>
                <ion-icon slot="start" :icon="call"></ion-icon>
                {{ item.telp }}
              </p>
            </ion-label>
          </ion-item>
        </ion-card>
      </ion-list>

      <div class="nothing-found" v-if="loading != true && history.length == 0">
        <img :src="require(`../../assets/image/nothing.svg`)" />
        <h3>Data tidak tersedia</h3>
        <p>Oops.. sepertinya tidak ada data yang ditemukan.</p>
      </div>

      <!-- Pagination -->
      <ion-infinite-scroll
        v-if="history.length > 0"
        @ionInfinite="loadData($event)"
      >
        <ion-infinite-scroll-content
          loading-spinner="dots"
          loading-text="memuat data"
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
