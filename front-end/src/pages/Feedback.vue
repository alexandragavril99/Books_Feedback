<template>
  <div v-if="feedback" class="flex flex-center feedbackContainer">
    <FeedbackCard
      :id="bookId"
      :title="book.title"
      :author="book.author"
      :type="book.type"
      :price="book.price"
      :grade="grade"
      @sendFeedback="getFeedback($event)"
    />

    <div class="q-ma-md scroll">
      <q-scroll-area
        :visible="true"
        class="shadow-2 rounded-borders qscroll"
        style="height: 350px; width: 650px; background: white"
      >
        <div class="q-pa-md" v-if="feedback">
          <q-list v-for="item in feedback" :key="item.id">
            <q-item>
              <q-item-section>
                <q-item-label caption
                  >{{ item.userData.firstName }}
                  {{ item.userData.lastName }}</q-item-label
                >
                <q-item-label>{{ item.comment }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-badge color="teal">{{ item.grade }}</q-badge>
              </q-item-section>
              <q-item-section side bottom>
                <q-btn
                  v-if="userId == item.userId"
                  flat
                  round
                  icon="remove_circle_outline"
                  color="teal"
                  @click="deleteFeedback(item.id)"
                ></q-btn>
                <q-btn
                  v-else
                  flat
                  round
                  :disable="true"
                  icon="remove_circle_outline"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />
          </q-list>
        </div>
        <div v-else class="q-pa-md">
          <span>There is no feedback for this book.</span>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, defineComponent, onMounted } from "vue";
import axios from "axios";
import FeedbackCard from "../components/FeedbackCard.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Feedback",
  components: { FeedbackCard },
  setup() {
    let $q = useQuasar();

    const router = useRoute();
    let bookId = ref("");
    let feedback = ref([]);
    let book = ref({});
    let grade = ref("");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    let user = ref({});

    onMounted(async () => {
      bookId.value = router.params.id;

      axios
        .get(`http://localhost:8081/api/book/getBookById/${bookId.value}`)
        .then((response) => {
          book.value = response.data;
        });
      axios
        .get(
          `http://localhost:8081/api/feedback/getFeedbackPerBook/${bookId.value}`
        )
        .then((response) => {
          feedback.value = response.data;
          feedback.value.reverse();
          let s = 0;
          for (let i = 0; i < feedback.value.length; i++) {
            s += feedback.value[i].grade;
          }

          grade.value = s / feedback.value.length;
          grade.value = (Math.round(grade.value * 100) / 100).toFixed(2);
        });
    });

    return {
      feedback,
      grade,
      bookId,
      book,
      token,
      user,
      userId,
      getFeedback(f) {
        feedback.value.unshift(f);
        this.calculateGrade();
        console.log("DA");
      },
      calculateGrade() {
        let s = 0;
        for (let i = 0; i < feedback.value.length; i++) {
          s += feedback.value[i].grade;
        }

        grade.value = s / feedback.value.length;
        return (grade.value = (Math.round(grade.value * 100) / 100).toFixed(2));
      },
      deleteFeedback(id) {
        axios.defaults.headers.common["authorization"] =
          localStorage.getItem("token");
        axios
          .delete(`http://localhost:8081/api/feedback/deleteFeedback/${id}`)
          .then(() => {
            $q.notify({
              message: "Feedback deleted.",
              icon: "done",
              color: "green",
              textColor: "white",
            });

            feedback.value = feedback.value.filter((obj) => {
              return obj.id !== id;
            });

            this.calculateGrade();
          });
      },
    };
  },
});
</script>

<style>
.feedbackContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 85vh;
}

.q-scrollarea__content {
  display: flex;
  align-items: center;
}
</style>
