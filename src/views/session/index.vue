<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <!-- <ion-buttons slot="end">
          <ion-button @click="() => router.push('/addcustomer')">
            <ion-icon slot="icon-only" :icon="addCircle"></ion-icon>
          </ion-button>
        </ion-buttons> -->
        <ion-title>Sessions</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          v-model="search"
          debounce="0"
          @keyup.enter="searchData(search)"
          @ionCancel="searchData(search)"
          animated
          placeholder="Masukan No. Sesi"
        ></ion-searchbar>
      </ion-toolbar>
      <span
        @click="chooseFil()"
        class="filtersession"
        v-if="paramFilter.status != '' || paramFilter.sort != ''"
      >
        <span v-if="paramFilter.status != ''">
          filter dengan status
          <strong v-for="i of checkFilter" :key="i">
            {{ i.label }}
          </strong>
        </span>
        <span v-if="paramFilter.sort != ''">
          mengurutkan secara
          <strong>
            {{ paramFilter.sort }}
          </strong>
        </span>
      </span>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-if="loading == true">
        <ion-card mode="ios" v-for="ske of [1, 2, 3, 4, 5]" :key="ske">
          <ion-item lines="none">
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
        </ion-card>
      </div>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="nothing-found" v-if="loading != true && sessions.length == 0">
        <img :src="require(`../../assets/image/nothing.svg`)" />
        <h3>Data tidak tersedia</h3>
        <p>Oops.. sepertinya tidak ada data yang ditemukan.</p>
      </div>

      <ion-list v-if="sessions.length > 0">
        <ion-card
          mode="ios"
          button
          v-for="item of sessions"
          :key="item.noreff"
          class="listsession-session ion-margin-bottom"
        >
          <div
            @click="openOrderDetails(item.noreff)"
            v-if="item.orderstatus == 'Open'"
          >
            <div class="noreff-card">
              <strong> #{{ item.noreff }}</strong>
            </div>
            <ion-item lines="none">
              <ion-note slot="start" class="note-session">
                <ion-icon size="large" :icon="mailOpen"></ion-icon>
              </ion-note>
              <ion-label>
                <div class="makeitcent">
                  <p>
                    <strong> {{ item.telp }}</strong>
                  </p>
                  <p class="status">
                    {{ item.orderstatus }}
                  </p>
                </div>
                <h1>
                  <strong>{{ item.nama }}</strong>
                </h1>
                <p style="margin-bottom: 7px">
                  Tgl. Sesi : {{ item.orderdate }}
                   
                </p>
               
              </ion-label>
            </ion-item>
          </div>
          <div
            @click="() => router.push({ path: `/order-finish/${item.noreff}` })"
            v-else
          >
            <div class="noreff-card">
              <strong> #{{ item.noreff }}</strong>
            </div>
            <ion-item lines="none">
              <ion-note slot="start" class="note-session">
                <!-- <ion-icon
                  size="large"
                  v-if="item.orderstatus == 'Cancelled'"
                  :icon="closeCircle"
                ></ion-icon> -->
                <!-- <ion-icon
                  size="large"
                  v-if="item.orderstatus == 'Waiting Payment'"
                  :icon="wallet"
                ></ion-icon> -->
                <ion-icon
                  size="large"
                  :icon="
                    item.orderstatus == 'Cancelled'
                      ? closeCircle
                      : item.orderstatus == 'Waiting Payment'
                      ? wallet
                      : item.orderstatus == 'Complete'
                      ? checkmarkDoneCircle
                      : item.orderstatus == 'Waiting Shipment' ||
                        item.orderstatus == 'On Delivery'
                      ? car
                      : hourglass
                  "
                ></ion-icon>
              </ion-note>
              <ion-label>
                <div class="makeitcent">
                  <p>
                    <strong> {{ item.telp }}</strong>
                  </p>
                  <p
                    class="status"
                    :class="
                      item.orderstatus == 'Waiting Payment'
                        ? 'wait-payment'
                        : item.orderstatus == 'Cancelled'
                        ? 'canceled'
                        : item.orderstatus == 'Waiting Process'
                        ? 'wait-process'
                        : item.orderstatus == 'Complete'
                        ? 'complete'
                        : 'process'
                    "
                  >
                    {{ item.orderstatus }}
                  </p>
                </div>
                <h1>
                  <strong>{{ item.nama }}</strong>
                </h1>
                <p style="margin-bottom: 7px">
                  Tgl. Sesi : {{ item.orderdate }}
                  
                </p>
                <p>
                  SO NO : {{ item.sono }}
                </p>
              </ion-label>
            </ion-item>
          </div>
        </ion-card>
      </ion-list>

      <!-- Fab Button -->
      <ion-fab
        v-if="loading != true"
        horizontal="end"
        vertical="bottom"
        slot="fixed"
      >
        <ion-fab-button color="danger">
          <ion-icon :icon="settings"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="start">
          <ion-fab-button @click="sortItem">
            <ion-icon :icon="swapVertical"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="filterItem">
            <ion-icon :icon="filter"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <!-- Pagination -->
      <ion-infinite-scroll
        v-if="sessions.length > 0"
        @ionInfinite="loadData($event)"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="memuat data"
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
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
