<template>
  <div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 flex flex-center">Add your feedback</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="comment"
            filled
            type="textarea"
            @keyup.enter="prompt = false"
            label="Enter feedback"
            style="margin-bottom: 3%"
          />
          <q-select
            filled
            v-model="bookGrade"
            :options="options"
            label="Grade"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add feedback"
            @click="addFeedback()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pa-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section style="text-align: center">
          <div class="text-h6">{{ title }}</div>
          <div class="text-subtitle2" align="right">{{ author }}</div>
        </q-card-section>

        <q-card-section
          class="card-section flex flex-center"
          style="flex-direction: column; gap: 8px"
        >
          <span> Type: {{ type }} </span>
          <span> Price: {{ price }} lei </span>
          <span> Grade: {{ grade }}</span>
        </q-card-section>

        <q-separator dark />

        <q-card-actions align="center">
          <q-btn flat @click="openDialog()">Add feedback</q-btn>
          <q-btn flat @click="addToFavorites()">Add to favorites</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default defineComponent({
  name: "FeedbackCard",
  props: ["id", "title", "author", "price", "type", "grade"],
  emits: ["sendFeedback"],
  setup(props, { emit }) {
    let $q = useQuasar();

    let prompt = ref(false);
    let comment = ref("");
    let bookGrade = ref(1);
    let user = ref({});
    let userId = localStorage.getItem("id");

    onMounted(async () => {
      axios
        .get(`http://localhost:8081/api/user/getUser/${userId}`)
        .then((res) => {
          user.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    function sendFeedback() {
      console.log("HERE");
      emit("sendFeedback", {
        comment: comment.value,
        grade: bookGrade.value,
        userId: userId,
        userData: user.value,
      });
    }

    function openDialog() {
      if (localStorage.getItem("token")) {
        prompt.value = true;
      } else {
        $q.notify({
          color: "red-9",
          textColor: "white",
          icon: "warning",
          message: "You need to be logged in to add your feedback.",
        });
      }
    }

    function addFeedback() {
      axios.defaults.headers.common["authorization"] =
        localStorage.getItem("token");
      axios
        .post(`http://localhost:8081/api/feedback/createFeedback/${props.id}`, {
          comment: comment.value,
          grade: bookGrade.value,
        })
        .then(() => {
          $q.notify({
            message: "Feedback added.",
            icon: "done",
            color: "green",
            textColor: "white",
          });
          sendFeedback();
        })
        .catch((err) => {
          $q.notify({
            message: err.response.data.message,
            icon: "warning",
            color: "red-8",
            textColor: "white",
          });
        });
    }

    function addToFavorites() {
      if (localStorage.getItem("token")) {
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
            $q.notify({
            message: err.response.data.message,
            icon: "warning",
            color: "red-8",
            textColor: "white",
          });
          });
      } else {
        $q.notify({
          color: "red-9",
          textColor: "white",
          icon: "warning",
          message: "You need to be logged in to add books to favorites.",
        });
      }
    }

    return {
      prompt,
      comment,
      bookGrade,
      openDialog,
      addFeedback,
      sendFeedback,
      addToFavorites,
      userId,
      user,
      options: [1, 2, 3, 4, 5],
    };
  },
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.card-section {
  padding: 0 0 5% 0;
}
</style>
