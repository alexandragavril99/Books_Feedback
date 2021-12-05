<template>
  <div class="container">
    <div class="loginContainer">
      <q-form @submit="onSubmit">
        <div class="imageContainer flex flex-center q-ma-md">
          <img src="../../public/book.png" alt="Book Icon" />
        </div>

        <div class="text-h6 text-secondary" style="text-align: center">
          Login
        </div>
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
        <div class="loginButtonContainer">
          <q-btn label="Login" type="submit" color="secondary" />
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
  name: "Login",
  setup() {
    let email = ref("");
    let password = ref("");
    let $q = useQuasar();
    const router = useRouter();

    function onSubmit() {
      axios
        .post(
          "http://localhost:8081/api/auth/login",
          { email: email.value, password: password.value },
          { withCredentials: true }
        )
        .then((res) => {
          $q.notify({
            message: "Login successfull",
            icon: "done",
            color: "green",
            textColor: "white",
          });
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          router.push({ path: "/" });
        })
        .catch((err) => {
          const errors = Object.values(err.response.data); //iau erorile din back
          errors.map((item) => {
            $q.notify({
              color: "red-9",
              textColor: "white",
              icon: "warning",
              message: item,
            });
          });
        });
    }
    return {
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

.loginContainer {
  margin: auto;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 3%;
  border-radius: 3%;
  border: 2px solid secondary;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.q-input {
  width: 300px;
}

.loginButtonContainer {
  padding-top: 10%;
  display: flex;
  justify-content: center;
}

.inputField {
  margin-bottom: 2%;
}
</style>
