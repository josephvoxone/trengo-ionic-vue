<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login">
        <img :src="require(`../../assets/image/logo.png`)" />
        <h1>Welcome</h1>
        <h1>back</h1>
        <ion-item class="ion-margin-top">
          <ion-label position="floating">Username</ion-label>
          <ion-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password"></ion-input>
        </ion-item>
        <ion-button
          class="ion-margin-top"
          style="letter-spacing: 2px"
          mode="ios"
          expand="block"
        >
          Masuk
        </ion-button>
        <p class="ion-text-center">
          Belum punya akun ? <strong>Daftar</strong>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script  src="./scripts.js"></script>

<style scoped>
@import "./style.scss";
</style>
