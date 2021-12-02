<template>
  <div class="q-pa-md">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="address"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="my-card">
      <q-card-section class="card">
        <div class="flex flex-center" style="padding: 5px">
          <div
            style="margin: 0; text-align: center"
            class="text-subtitle1 text-weight-medium"
          >
            {{ title }}
          </div>
        </div>
        <div class="flex flex-center detailText">
          <span>Author: {{ author }}</span>
        </div>
        <div class="flex flex-center detailText">
          <span>Price: {{ price }} $</span>
        </div>
        <div class="flex flex-center detailText">
          <span>Type: {{ type }}</span>
        </div>

        <q-card-section>
          <div class="flex flex-center">
            <q-btn class="bg-primary text-white" @click="openDialog()"
              >View feedback</q-btn
            >
            <!-- <q-btn
              class="bg-primary text-white"
              @click="confirm = true"
              style="margin-top: 5%"
              >Modificare statut</q-btn
            > -->
          </div>
        </q-card-section>
      </q-card-section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref, defineComponent } from "vue";
export default defineComponent({
  name: "CardComponent",
  props: ["id", "title", "author", "price", "type"],
  setup(props) {
    let prompt = ref(false);
    let address = ref("");
    let feedback = ref([]);
    let bookId = ref(props.id);

    function openDialog() {
      prompt.value = true;

      console.log(bookId.value);
      axios
        .get(
          `http://localhost:8081/api/feedback/getFeedbackPerBook/${bookId.value}`
        )
        .then((response) => {
          feedback.value = response.data;
          console.log(feedback.value);
        });
    }

    return {
      bookId,
      prompt,
      address,
      openDialog,
    };
  },
});
</script>

<style scoped>
.my-card {
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
}
</style>
