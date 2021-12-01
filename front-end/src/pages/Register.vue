<template>
  <div class="container">
    <div class="registerContainer">
      <q-form @submit="onSubmit">
        <q-input v-model="firstName" label="First Name" class="inputField" />
        <q-input v-model="lastName" label="Last Name" class="inputField" />
        <q-input v-model="email" label="Email" class="inputField" />
        <q-input v-model="password" label="Password" />
        <div class="registerButtonContainer">
          <q-btn label="Register" type="submit" color="secondary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
export default defineComponent({
  name: "Register",

  setup() {
    let firstName = ref("");
    function onSubmit() {
      console.log(this.firstName);
      //   axios.post();
    }

    return {
      onSubmit,
      firstName,
    };
  },
});
</script>

<style>
.container {
  display: flex;
  height: 80vh;
}

.registerContainer {
  margin: auto;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 3%;
  border-radius: 3%;
  border: 2px solid secondary;
}

.q-input {
  width: 300px;
}

.registerButtonContainer {
  padding-top: 10%;
  display: flex;
  justify-content: center;
}

.inputField {
  margin-bottom: 2%;
}
</style>
