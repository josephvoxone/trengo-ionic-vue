<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Trengo Dev Teams</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment @ionChange="segmentChanged($event)" value="changelog">
          <ion-segment-button value="changelog" class="ion-padding-horizontal">
            <ion-label>Change Logs</ion-label>
          </ion-segment-button>
          <ion-segment-button value="credit" class="ion-padding-horizontal">
            <ion-label>Credits</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list class="credit-item" v-if="segment == 'changelog'">
        <ion-item v-for="(item, index) in items" :key="index">
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p class="ion-text-wrap">
              {{ item.desc }}
            </p>
          </ion-label>
          <ion-note slot="start">
            <p>{{ item.date }}</p>
          </ion-note>
        </ion-item>
      </ion-list>

      <ion-list class="credit-item" v-if="segment == 'credit'">
        <!-- <ion-list-header> Trengo Dev Teams </ion-list-header> -->
        <ion-item>
          <ion-avatar slot="start">
            <img :src="require(`../../assets/dev/gunawan.png`)" />
          </ion-avatar>
          <ion-label>
            <h2>Gunawan Santoso</h2>
            <h3>Head of IT</h3>
            <p class="ion-text-wrap">
              Responsible specifically for the Trengo system project.
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img :src="require(`../../assets/dev/jingo.png`)" />
          </ion-avatar>
          <ion-label>
            <h2>Jingo Saputra</h2>
            <h3>Manager of IT</h3>
            <p class="ion-text-wrap">
              Oversee the implementation of the Trengo project.
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img :src="require(`../../assets/dev/ageng.png`)" />
          </ion-avatar>
          <ion-label>
            <h2>Ageng Nugroho</h2>
            <h3>Trenggo Project Manajer</h3>
            <p class="ion-text-wrap">
              Responsible for all tasks involved in the project.
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img :src="require(`../../assets/dev/dayat.png`)" />
          </ion-avatar>
          <ion-label>
            <h2>Muhammad Hidayat</h2>
            <h3 class="ion-text-wrap">
              Senior Database & Programmer Server Side
            </h3>
            <p class="ion-text-wrap">
              Provides client side data access with the database.
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <img :src="require(`../../assets/dev/joseph.png`)" />
          </ion-avatar>
          <ion-label>
            <h2>Joseph Voxone</h2>
            <h3>Senior UI & Programmer Client Side</h3>
            <p class="ion-text-wrap">
              Designing interface and provides convenience for the user.
            </p>
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
