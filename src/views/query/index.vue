<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <!-- <ion-buttons slot="end" v-if="session?.session">
          <span class="sessionsnumber">{{ session?.session }}</span>
        </ion-buttons> -->
        <ion-title>Query</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-item lines="none" class="ion-no-padding">
          <input
            :disabled="session.session != ''"
            class="datalistquery"
            style="text-transform: uppercase"
            list="kota"
            v-model="filters.name"
            placeholder="Pilih Kota"
            @Change="getKotaIDNumber(filters.name)"
          />
          <datalist id="kota">
            <option v-for="k in kota" :key="k.KOTA_ID" :value="k.KOTA_NAME">
              {{ k.KOTA_NAME }}
            </option>
          </datalist>
        </ion-item>

        <!-- Untuk Pencarian -->
        <!-- @keyup.enter="searchData(filters)" 
             @ionChange="searchData(filters)"   -->
        <ion-searchbar
          v-model="filters.barang"
          autocorrect="off"
          @keyup.enter="searchData(filters)"
          animated
          enterkeyhint="enter"
          placeholder="Cari barang"
        ></ion-searchbar>
      </ion-toolbar>
      <div
        class="sesi-query"
        v-if="session?.session"
        button
        @click="openModal('modalAddsesi')"
      >
        menggunakan sesi :
        <strong>{{ session?.session }}</strong>
      </div>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding-bottom">
      <div class="nothing-found" v-if="loading != true && items.length == 0">
        <img
          class="box-img"
          style="margin-top: 60px"
          :src="require(`../../assets/image/box.png`)"
        />
        <h3>Item tidak tersedia</h3>
        <p>Oops.. sepertinya tidak ada item yang ditemukan.</p>
      </div>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list v-if="items.length > 0">
        <ion-card
          class="card-query"
          button
          mode="ios"
          v-for="item of items"
          :key="item.godgoodsno"
        >
          <ion-item lines="none">
            <ion-label @click="onCopyItem(item)">
              <h2 class="ion-text-wrap">
                <strong>{{ item.barang }}</strong>
              </h2>
              <p style="font-size: 17px">
                <strong>Rp. {{ item.harga.toLocaleString("ID") }}</strong>
              </p>
              <p>Stock : {{ item.stock.toLocaleString("ID") }}</p>
            </ion-label>
            <ion-note slot="end">
              <ion-button v-on:click="addtoCart(item)" color="secondary">
                <ion-icon
                  slot="icon-only"
                  :icon="addCircle"
                ></ion-icon> </ion-button
              ><br />
              <ion-button v-on:click="onCopyItem(item)" color="primary">
                <ion-icon slot="icon-only" :icon="copy"></ion-icon>
              </ion-button>
            </ion-note>
          </ion-item>
        </ion-card>
      </ion-list>
      <div v-if="loading == true">
        <ion-card
          class="card-query"
          mode="ios"
          v-for="ske of [1, 2, 3, 4, 5]"
          :key="ske"
        >
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

      <!-- Pagination -->
      <ion-infinite-scroll
        threshold="100px"
        v-if="items.length > 0"
        @ionInfinite="loadData($event)"
      >
        <ion-infinite-scroll-content
          loading-spinner="dots"
          loading-text="memuat data"
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>

    <!-- Button -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button :disabled="items.length <= 0" @click="onCopyAllItem">
        <ion-icon :icon="copy"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-fab
      style="right: 80px"
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <ion-fab-button color="secondary" @click="openModal('modalAddsesi')">
        <ion-icon :icon="people"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-fab
      vertical="bottom"
      horizontal="start"
      slot="fixed"
      mode="ios"
      v-if="session"
    >
      <ion-button
        v-if="stockLength != 0 && session"
        @click="openModal"
        color="secondary"
        expand="block"
        style="letter-spacing: 1px; width: 30vw"
      >
        <ion-badge slot="end" class="querybadge">{{ stockLength }}</ion-badge>
        <ion-icon slot="start" :icon="bagHandle"> </ion-icon>
        Cart &nbsp;
      </ion-button>
    </ion-fab>
  </ion-page>
</template>

<script src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
