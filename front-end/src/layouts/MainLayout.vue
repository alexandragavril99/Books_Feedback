<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-tabs
        v-model="tab"
        class="shadow-2 bg-secondary swipeable"
        align="right"
        style="font-family: 'Montserrat', sans-serif"
      >
        <q-tab
          name="home"
          label="Home"
          icon="home"
          class="tabsList"
          clickable
          @click="$router.push('/').catch((err) => {})"
        />
        <q-tab
          v-if="!token"
          name="Register"
          label="Register"
          icon="app_registration"
          class="tabsList"
          clickable
          @click="$router.push('/register').catch((err) => {})"
        ></q-tab>
        <q-tab
          v-if="!token"
          name="Login"
          label="Login"
          icon="login"
          class="tabsList"
          clickable
          @click="$router.push('/login').catch((err) => {})"
        ></q-tab>
        <q-tab
          name="Books"
          label="Books"
          icon="library_books"
          class="tabsList"
          clickable
          @click="$router.push('/books').catch((err) => {})"
        ></q-tab>
        <q-tab
          v-if="token"
          name="logout"
          label="Logout"
          icon="logout"
          class="tabsList"
          clickable
          @click="logout"
        ></q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
  },
});
</script>
