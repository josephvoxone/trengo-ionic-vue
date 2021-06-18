<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login">
        <img :src="require(`../../assets/image/trengo.svg`)" />
        <h5>Welcome to</h5>
        <h1 style="font-size: 25pt">Japfa Trengo</h1>
        <div class="desc">
          <h5>New level app of stock and customer sales</h5>
        </div>
        <ion-item class="ion-margin-top">
          <!-- <ion-label position="stacked">Username</ion-label> -->
          <ion-icon :icon="personCircle" slot="end"></ion-icon>
          <ion-input
            v-model="user.username"
            placeholder="Username"
            v-on:keyup.enter="login"
          ></ion-input>
        </ion-item>
        <ion-item>
          <!-- <ion-label position="stacked">Password</ion-label> -->
          <ion-input
            v-on:keyup.enter="login"
            v-model="user.password"
            placeholder="Password"
            :type="hide ? 'password' : 'text'"
          ></ion-input>
          <!-- <ion-icon
            (click)="hide = !hide"
            [name]="hide ? 'eye-off' : 'eye'"
            icon-start
            clear
            item-end
          ></ion-icon> -->

          <ion-icon
            @click="hide = !hide"
            :icon="hide ? eyeOff : eye"
            slot="end"
          ></ion-icon>
        </ion-item>
        <ion-button
          color="secondary"
          class="ion-margin-top"
          style="letter-spacing: 2px"
          mode="ios"
          expand="block"
          @click="login"
        >
          Masuk
        </ion-button>
        <!-- <p class="ion-text-center">
          Belum punya akun ?
          <router-link :to="{ name: 'Signup' }">
            <strong>Daftar</strong>
          </router-link>
        </p> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
