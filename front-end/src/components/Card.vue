<template>
  <div class="q-pa-md">
    <q-card class="my-card bg-secondary text-white" style="text-align: center">
      <q-card-section style="height: 48%">
        <q-icon name="menu_book" align="left" style="font-size: 32px" />
        <div class="text-subtitle1 text-weight-medium">{{ title }}</div>
        <div class="text-subtitle2" align="right">{{ author }}</div>
      </q-card-section>

      <q-card-section class="card-section" style="height: 25%">
        <span> Type: {{ type }} </span>
        <br />
        <span> Price: {{ price }} lei </span>
      </q-card-section>

      <q-separator dark />

      <q-card-actions
        align="center"
        style="display: flex; flex-wrap: nowrap; height: 25%"
      >
        <q-btn flat @click="changePage()">View feedback</q-btn>
        <q-btn v-if="fav" flat @click="deleteFromFavorites()"
          >Delete from favorites</q-btn
        >

        <q-btn v-if="addFav" flat @click="addToFavorites()"
          >Add to favorites</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "CardComponent",
  props: ["id", "title", "author", "price", "type", "fav", "addFav"],
  emits: ["removeBook"],

  setup(props, { emit }) {
    let $q = useQuasar();

    let address = ref("");
    let bookId = ref(props.id);
    const router = useRouter();

    let token = localStorage.getItem("token");

    function removeBook() {
      emit("removeBook", {
        id: bookId.value,
      });
    }

    function changePage() {
      router.push(`/feedback/${bookId.value}`);
    }

    function deleteFromFavorites() {
      axios.defaults.headers.common["authorization"] =
        localStorage.getItem("token");
      axios
        .put(
          `http://localhost:8081/api/favorite/removeBookFromFavorites/${bookId.value}`
        )
        .then(() => {
          $q.notify({
            message: "Book deleted.",
            icon: "done",
            color: "green",
            textColor: "white",
          });

          removeBook();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function addToFavorites() {
      if (token) {
        axios.defaults.headers.common["authorization"] =
          localStorage.getItem("token");
        axios
          .put(
            `http://localhost:8081/api/favorite/addBookToFavorites/${props.id}`
          )
          .then(() => {
            $q.notify({
              message: "Book added to favorites.",
              icon: "done",
              color: "green",
              textColor: "white",
            });
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
      } else {
        $q.notify({
          color: "red-9",
          textColor: "white",
          icon: "warning",
          message: "You need to be logged in to add a book to favorites.",
        });
      }
    }

    return {
      bookId,
      address,
      changePage,
      deleteFromFavorites,
      removeBook,
      addToFavorites,
      token,
    };
  },
});
</script>

<style scoped>
/* .my-card {
  width: 100%;
}
.card {
  border-radius: 2%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: 290px;
  height: 250px;
}

.detailText {
  padding: 5px;
} */

.my-card {
  width: 100%;
  max-width: 275px;
  height: 275px;
}

.card-section {
  padding: 0 0 5% 0;
}
</style>
