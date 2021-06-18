<template>
  <ion-page>
    <ion-header collapse="condense" mode="ios">
      <ion-toolbar>
        <ion-title>Detail Order #{{ sesi }}</ion-title>
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
          <ion-label>Status Transaksi</ion-label>
          <ion-note>
            <span class="status ion-margin-end">{{ header?.orderstatus }}</span>
          </ion-note>
        </ion-list-header>
        <ion-list-header class="ion-text-center" style="">
          <div class="infoupdate">
            Last Update : {{ header?.logchdatetime }}
          </div>
        </ion-list-header>
        <ion-item>
          <ion-label> Customer ID </ion-label>
          <ion-note slot="end">{{ header?.custid }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label> Nama </ion-label>
          <ion-note slot="end">{{ header?.nama }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Alamat</ion-label>
          <p v-if="header.alamat != ' '">{{ header?.alamat }}</p>
          <p style="color: #8f8f8f; font-size: small" v-else>Tidak tersedia</p>
        </ion-item>
        <ion-item>
          <ion-label> No. Telepon </ion-label>
          <ion-note slot="end">{{ header?.telp }}</ion-note>
        </ion-item>
        <!-- <ion-item>
          <ion-label> Start Date </ion-label>
          <ion-note slot="end">{{ header?.delivereddatetime }}</ion-note>
        </ion-item> -->
        <!-- <ion-item>
          <ion-label> Last Update </ion-label>
          <ion-note slot="end">{{ header?.logchdatetime }}</ion-note>
        </ion-item> -->
        <div class="ion-text-center ion-padding">
          <ion-button
            color="secondary"
            style="letter-spacing: 1px"
            @click="openProfile()"
            mode="ios"
          >
            Ubah Profile
          </ion-button>
        </div>
        <!-- =================== PENGIRIMAN =================== -->
        <ion-list-header class="list-header"> Pengiriman </ion-list-header>

        <ion-item>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <ion-label position="stacked">Dikirim Dari</ion-label>
            <ion-label
              button
              position="stacked"
              style="cursor: pointer"
              color="secondary"
              @click="setStore(header)"
              ><strong>Ubah</strong></ion-label
            >
          </div>
          <p>
            <ion-icon :icon="storefront"></ion-icon> {{ header.subunit }}
            <span
              style="color: #8f8f8f; font-size: small"
              v-if="!header.subunit"
              >Belum dipilih</span
            >
          </p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tanggal Kirim</ion-label>
          <ion-input
            @input="setLocal($event)"
            v-model="header.delivereddatetime"
            class="ion-text-left"
            type="datetime-local"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Pengiriman</ion-label>
          <p style="color: #b4b4b4" v-if="kurir.length == 0">
            Pilihan kurir tidak tersedia.
          </p>
          <ion-select
            v-if="kurir.length > 0"
            placeholder="Pilih Jasa Antar"
            class="ion-text-left"
            interface="popover"
            v-model="header.shipment"
            @focus="setOngkir($event)"
          >
            <!-- v-for="(item, index) in kurir"
              v-bind:key="index"
              v-bind:value="item.SHIPPER_NO"
              v-bind:selected="header.shipment" -->
            <ion-select-option
              v-for="(item, index) in kurir"
              v-bind:key="index"
              v-bind:value="item.SHIPPER_NO"
              v-bind:selected="header.shipment"
              >{{ item.SHIPPER_NAME }}</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Biaya Kirim</ion-label>
          <!-- <ion-label class="ion-text-right ion-padding-horizontal"
            >Rp. {{ header.biayakirim?.toLocaleString("ID") || 0 }}</ion-label
          > -->
          <ion-input
            @keyup="setLocal($event)"
            v-model="header.biayakirim"
            style="margin-right: 16px"
            class="ion-text-left"
            type="number"
            min="0"
            placeholder="Rp. 0"
          ></ion-input>
          <!-- <ion-note style="display: block">
            <ion-label>Transfer ?</ion-label>
            <ion-toggle
              mode="ios"
              @ionChange="changeTF($event.target.value)"
              :value="header.paymenttype"
              :checked="header.paymenttype == 1"
            >
            </ion-toggle>
          </ion-note> -->
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Jenis Pembayaran</ion-label>
          <p style="color: #b4b4b4" v-if="header.shipment == null">
            Pilih Jasa Pengiriman.
          </p>
          <ion-select
            v-if="header.shipment != null"
            @focus="setLocal($event)"
            v-model="header.paymenttype"
            placeholder="Pilih Pembayaran"
            class="ion-text-left"
            interface="popover"
          >
            <ion-select-option
              v-for="(item, index) in pembayaran"
              v-bind:key="index"
              v-bind:value="item.id"
              v-bind:selected="header.paymenttype"
            >
              {{ item.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Gmap Location</ion-label>
          <ion-input
            @change="setLocal($event)"
            v-model="header.location"
            placeholder="https://google.maps.com"
            class="ion-text-left"
            type="url"
          ></ion-input>
        </ion-item>
        <!-- Detail -->
        <ion-list-header class="list-header">
          <ion-label>Detail Order</ion-label>
          <ion-note>
            <ion-button
              v-on:click="onCopyAllItem"
              color="light"
              class="btn-copy"
            >
              <span class="ion-text-capitalize">Copy &nbsp;</span>
              <ion-icon :icon="copy" color="light"></ion-icon> </ion-button
          ></ion-note>
        </ion-list-header>
        <ion-item
          color="light"
          lines="none"
          style="border-bottom: 2px dashed #9c9c9c"
        >
          <ion-label><strong>Total Biaya</strong></ion-label>
          <ion-note slot="end" style="display: contents">
            <h5>
              <strong
                >Rp. {{ header?.biayatotal.toLocaleString("ID") || 0 }}</strong
              >
            </h5>
          </ion-note>
        </ion-item>
        <div class="nothing-found" v-if="details.length == 0">
          <img class="box-img" :src="require(`../../assets/image/box.png`)" />
          <h3>Order kosong</h3>
          <p>Oops.. anda belum menambahkan item.</p>
        </div>
        <ion-item v-for="item in details" :key="item">
          <ion-label>
            <span class="nogoods"
              ><ion-icon slot="start" :icon="barcode"></ion-icon> &nbsp;{{
                item.godgoodsno
              }}</span
            >
            <div class="ion-text-wrap">
              <h2>{{ item.goddesc }}</h2>
            </div>
          </ion-label>
          <ion-label slot="end" class="ion-text-right">
            <h2>
              <strong>Rp. {{ item.total.toLocaleString("ID") }}</strong>
            </h2>
            <p>{{ item.stock }} x @{{ item.harga.toLocaleString("ID") }}</p>
            <div class="status-detail" v-if="item.tax > 0">
              <span>PPN</span>
            </div>
          </ion-label>
          <ion-note slot="end" mode="ios" class="item-note">
            <ion-button color="secondary" @click="submitEdit(item)">
              <ion-icon slot="icon-only" :icon="create"></ion-icon>
            </ion-button>
            <ion-button color="danger" @click="submitDelete(item)">
              <ion-icon slot="icon-only" :icon="trashBin"></ion-icon>
            </ion-button>
          </ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer v-if="header.orderstatus == 'Open'">
      <ion-toolbar>
        <ion-row>
          <ion-col size="5">
            <ion-button
              :disabled="
                details.length == 0 ||
                header.subunitid == null ||
                header.subunitid.trim() == '' ||
                header.location.trim() == '' ||
                header.shipment == '' ||
                header.shipment == null
              "
              style="letter-spacing: 2px"
              mode="ios"
              expand="block"
              @click="submitCreate"
            >
              <ion-icon slot="start" :icon="card"></ion-icon>
              Proses
            </ion-button></ion-col
          >
          <ion-col size="2" style="padding-left: 0; padding-right: 0">
            <ion-button mode="ios" @click="onCopyPayment(header.paymenttype)">
              <ion-icon style="margin: 0" slot="start" :icon="copy"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col size="5">
            <ion-button
              color="secondary"
              style="letter-spacing: 2px"
              mode="ios"
              expand="block"
              @click="addMoreItem"
            >
              <ion-icon slot="start" :icon="addCircle"></ion-icon>
              Tambah
            </ion-button></ion-col
          >
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script  src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
