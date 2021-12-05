<template>
  <div class="container q-pa-lg">
    <div class="registerContainer">
      <q-form @submit="onSubmit">
        <div class="imageContainer flex flex-center q-ma-md">
          <img src="../../public/book.png" alt="Book Icon" />
        </div>

        <div class="text-h6 text-secondary" style="text-align: center">
          Register
        </div>
        <q-input
          v-model="firstName"
          label="First Name"
          class="inputField"
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your first name',
            (val) =>
              (val && val.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)) ||
              'Invalid name',
          ]"
        />
        <q-input
          v-model="lastName"
          label="Last Name"
          class="inputField"
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your last name',
            (val) =>
              (val && val.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)) ||
              'Invalid name',
          ]"
        />
        <q-input
          v-model="email"
          label="Email"
          class="inputField"
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your email',
            (val) =>
              (val &&
                val.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)) ||
              'Invalid email',
          ]"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
            (val) => (val.length > 6 && val.length < 30) || 'Invalid password',
          ]"
        />
        <div class="registerButtonContainer">
          <q-btn label="Register" type="submit" color="secondary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    let firstName = ref("");
    let lastName = ref("");
    let email = ref("");
    let password = ref("");
    const $q = useQuasar();
    const router = useRouter();

    function onSubmit() {
      axios
        .post("http://localhost:8081/api/user/addUser", {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        })
        .then(() => {
          $q.notify({
            message: "Registration successfull",
            icon: "done",
            color: "green",
          });
          router.push({ path: "/login" });
        });
    }

    return {
      firstName,
      lastName,
      email,
      password,
      onSubmit,
    };
  },
};
</script>

<style scoped>
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
  padding: 3%;
  border-radius: 3%;
  border: 2px solid secondary;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
