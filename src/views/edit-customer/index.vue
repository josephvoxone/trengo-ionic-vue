<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-title>Edit Customer</ion-title>
        <ion-buttons slot="primary" @click="closeModal">
          <ion-button>
            <ion-icon slot="icon-only" :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-progress-bar
        v-if="loading == true"
        type="indeterminate"
      ></ion-progress-bar>
      <ion-list class="customeradd">
        <ion-item>
          <ion-label position="stacked">Customer ID</ion-label>
          <ion-icon :icon="idCard" slot="end"></ion-icon>
          <ion-input v-model="cust.idcustomer" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">No. Telepon</ion-label>
          <ion-icon :icon="call" slot="end"></ion-icon>
          <ion-input
            @input="filterInput"
            v-model="cust.telp"
            type="tel"
            required
            placeholder="Masukan No. Telepon"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nama Customer</ion-label>
          <ion-icon :icon="person" slot="end"></ion-icon>
          <ion-input
            required
            v-model="cust.nama"
            placeholder="Nama Anda."
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-icon :icon="atCircle" slot="end"></ion-icon>
          <ion-input
            required
            type="email"
            v-model="cust.email"
            placeholder="Email anda."
          ></ion-input>
        </ion-item>
        <ion-item lines="none" class="kota">
          <ion-label>Kota</ion-label>
          <input
            class="datalist"
            list="kota"
            v-model="cust.kota"
            placeholder="Pilih Kota"
            @Change="changeKota(cust.kota)"
          />
          <datalist id="kota">
            <option v-for="kotas in kota" :key="kotas.KOTA" :value="kotas.KOTA">
              {{ kotas.KOTA }}
            </option>
          </datalist>
        </ion-item>
        <!-- KECAMATAN -->
        <ion-item lines="none" class="kota">
          <ion-label>Kecamatan</ion-label>
          <input
            class="datalist"
            list="kecamatan"
            v-model="cust.kecamatan"
            placeholder="Pilih Kecamatan"
            @Change="getKelurahan(cust.kota, cust.kecamatan)"
          />
          <datalist id="kecamatan">
            <option
              v-for="kecs in kecamatan"
              :key="kecs.KECAMATAN"
              :value="kecs.KECAMATAN"
            >
              {{ kecs.KECAMATAN }}
            </option>
          </datalist>
        </ion-item>
        <!-- KELURAHAN -->
        <ion-item lines="none" class="kota">
          <ion-label>Kelurahan</ion-label>
          <input
            class="datalist"
            list="kelurahan"
            v-model="cust.kelurahan"
            placeholder="Pilih Kelurahan"
            @Change="getKodepos(cust.kecamatan, cust.kelurahan)"
          />
          <datalist id="kelurahan">
            <option
              v-for="kels in kelurahan"
              :key="kels.KELURAHAN"
              :value="kels.KELURAHAN"
            >
              {{ kels.KELURAHAN }}
            </option>
          </datalist>
        </ion-item>
        <!-- <ion-item>
          <ion-label>Kecamatan</ion-label>
          {{ cust.kecamatan }}
          <ion-select
            interface="popover"
            v-model="cust.kecamatan"
            @ionChange="getKelurahan(cust.kota, cust.kecamatan)"
          >
            <ion-select-option
              v-for="kecs in kecamatan"
              v-bind:key="kecs.KECAMATAN"
              v-bind:value="kecs.KECAMATAN"
              :selected="kecs.KECAMATAN == cust.kecamatan"
              >{{ kecs.KECAMATAN }}</ion-select-option
            >
          </ion-select>
        </ion-item> -->
        <!-- <ion-item>
          <ion-label>Kelurahan</ion-label>
          <ion-select interface="popover" v-model="cust.kelurahan">
            <ion-select-option
              v-for="kels in kelurahan"
              v-bind:key="kels.KELURAHAN"
              v-bind:value="kels.KELURAHAN"
              >{{ kels.KELURAHAN }}</ion-select-option
            >
          </ion-select>
        </ion-item> -->
        <ion-item>
          <ion-label position="stacked">Kode Pos</ion-label>
          <ion-icon :icon="browsers" slot="end"></ion-icon>
          <ion-input
            v-model="cust.kodepos"
            type="number"
            placeholder="Masukan kodepos"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Alamat</ion-label>
          <ion-input
            required
            v-model="cust.alamat"
            placeholder="Masukkan alamat lengkap."
          ></ion-input>
          <ion-icon :icon="home" slot="end"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          type="submit"
          class="ion-padding-horizontal"
          style="letter-spacing: 2px"
          mode="ios"
          expand="block"
          @click="submitNew"
          :disabled="
            loading ||
            cust.idcustomer == '' ||
            cust.telp == '' ||
            cust.nama == '' ||
            cust.kota == '' ||
            cust.kelurahan == '' ||
            cust.kecamatan == '' ||
            cust.kodepos == '' ||
            cust.alamat == '' ||
            cust.email == ''
          "
        >
          Simpan
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script src="./scripts.js"></script>
<style scoped>
@import "./style.scss";
</style>
