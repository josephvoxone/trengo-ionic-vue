<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-title>Sessions</ion-title>
        <ion-buttons slot="primary" @click="closeModal">
          <ion-button>
            <ion-icon slot="icon-only" :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list class="ion-no-padding">
        <ion-list-header class="list-header">
          <ion-label>Tipe Sesi Customer</ion-label>
          <ion-note>
            <span
              v-show="data.session != '' && data.orderstatus == '00'"
              class="status-add ion-margin-end"
              >Sesi Lama</span
            >
            <span
              v-show="data.session == '' || data.orderstatus != '00'"
              class="status-add ion-margin-end"
              >Sesi Baru</span
            >
          </ion-note>
        </ion-list-header>
        <ion-item>
          <ion-label position="stacked">No. Telepon</ion-label>
          <ion-icon :icon="call" slot="end"></ion-icon>
          <input
            class="datalistadd"
            list="telp"
            v-model="data.telp"
            placeholder="Masukan Nomor Telp."
            @Change="getPhone(data.telp)"
            @click="initPhone"
            autocomplete="off"
          />
          <datalist id="telp">
            <option v-for="i in userPhone" :key="i.telp" :value="i.telp">
              {{ i.nama }}
              <span v-if="i.idcustomer != ' '">{{ " - " + i.idcustomer }}</span>
            </option>
          </datalist>
        </ion-item>
        <ion-progress-bar
          v-if="loading"
          type="indeterminate"
        ></ion-progress-bar>
        <ion-item v-if="data.session != '' && data.orderstatus == '00'">
          <ion-label position="stacked">No. Session</ion-label>
          <ion-icon :icon="barcode" slot="end"></ion-icon>
          <ion-input
            type="text"
            readonly
            v-model="data.session"
            placeholder="No. Session"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nama Customer</ion-label>
          <ion-icon :icon="person" slot="end"></ion-icon>
          <ion-input
            type="text"
            :readonly="lock"
            v-model="data.nama"
            placeholder="Masukan Nama"
          ></ion-input>
        </ion-item>
        <ion-item
          v-if="
            data.idcustomer != '' &&
            data.idcustomer != ' ' &&
            data.session != ''
          "
        >
          <ion-label position="stacked">ID Customer</ion-label>
          <ion-icon :icon="idCard" slot="end"></ion-icon>
          <ion-input
            type="text"
            :readonly="lock"
            v-model="data.idcustomer"
            placeholder="Masukan Nama"
          ></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-row>
          <ion-col>
            <ion-button
              style="letter-spacing: 2px"
              mode="ios"
              expand="block"
              color="secondary"
              @click="clearData"
              v-show="olddata.idcustomer != ''"
            >
              Sesi Baru
            </ion-button>
            <ion-button
              style="letter-spacing: 2px"
              mode="ios"
              expand="block"
              @click="submitData"
              v-show="
                data.session != '' &&
                data.orderstatus == '00' &&
                data.session != olddata.session
              "
            >
              Lanjutkan
            </ion-button>
            <ion-button
              style="letter-spacing: 2px"
              mode="ios"
              expand="block"
              @click="submitData"
              v-show="data.session == '' || data.orderstatus != '00'"
              :disabled="
                data.telp.length == 0 ||
                data.nama.length == 0 ||
                data.telp == olddata.telp ||
                loading == true
              "
            >
              Simpan
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script  src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
