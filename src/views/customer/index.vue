<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Pendataan Customer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding-horizontal customeradd">
      <ion-list>
        <ion-item>
          <ion-label position="floating">No. Session</ion-label>
          <ion-icon :icon="idCard" slot="end"></ion-icon>
          <ion-input v-model="cust.nosesi"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">No. Telepon</ion-label>
          <ion-icon :icon="call" slot="end"></ion-icon>
          <ion-input
            v-model="cust.nohp"
            @input="filterInput"
            type="tel"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nama Customer</ion-label>
          <ion-icon :icon="person" slot="end"></ion-icon>
          <ion-input v-model="cust.nama"></ion-input>
        </ion-item>
        <ion-item lines="none" class="kota">
          <ion-label>Kota</ion-label>
          <input
            class="datalist"
            list="kota"
            v-model="cust.kota"
            placeholder="Pilih Kota"
            @Change="getKecamatan()"
          />
          <datalist id="kota">
            <option v-for="kotas in kota" :key="kotas.KOTA" :value="kotas.KOTA">
              {{ kotas.KOTA }}
            </option>
          </datalist>
          <!-- <ion-select
            interface="popover"
            v-model="cust.kota"
            @ionChange="getKecamatan()"
          >
            <ion-select-option value="">Pilih Kota/Kab</ion-select-option>
            <ion-select-option
              v-for="kotas in kota"
              :key="kotas.KOTA"
              :value="kotas.KOTA"
              >{{ kotas.KOTA }}</ion-select-option
            >
          </ion-select> -->
        </ion-item>
        <ion-item>
          <ion-label>Kecamatan</ion-label>
          <ion-select
            interface="popover"
            v-model="cust.kec"
            @ionChange="getKelurahan()"
          >
            <ion-select-option value="">Pilih Kecamatan</ion-select-option>
            <ion-select-option
              v-for="kecs in kec"
              :key="kecs.KECAMATAN"
              :value="kecs.KECAMATAN"
              >{{ kecs.KECAMATAN }}</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Kelurahan</ion-label>
          <ion-select interface="popover" v-model="cust.kel">
            <ion-select-option value="">Pilih Kelurahan</ion-select-option>
            <ion-select-option
              v-for="kels in kel"
              :key="kels.KELURAHAN"
              :value="kels.KELURAHAN"
              >{{ kels.KELURAHAN }}</ion-select-option
            >
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          class="ion-padding-horizontal"
          style="letter-spacing: 2px"
          mode="ios"
          expand="block"
          @click="addNew"
          :disabled="
            !cust.nosesi.length ||
            !cust.nohp.length ||
            !cust.nama.length ||
            !cust.kota.length
          "
        >
          Berikutnya
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script src="./scripts.js"></script>
<style scoped>
@import "./style.scss";
</style>
