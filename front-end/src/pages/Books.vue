<template>
  <div v-if="books" class="q-pa-md booksContainer">
    <CardComponent
      v-for="book in books"
      :key="book.id"
      :id="book.id"
      :title="book.data.title"
      :author="book.data.author"
      :price="book.data.price"
      :type="book.data.type"
    />
    <!-- <div v-for="book in books" :key="book.id">dc</div> -->
    <!-- <div v-for="(ar, index) in arr" :key="index">ce</div> -->
  </div>
</template>

<script>
import CardComponent from "../components/Card.vue";
import { onMounted, ref, defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "Books",
  components: { CardComponent },
  setup() {
    let books = ref([]);
    onMounted(async () => {
      axios
        .get("http://localhost:8081/api/book/getAllBooks")
        .then((response) => {
          books.value = response.data;
          console.log(books.value);
        });
    });

    return { books };
  },
});
</script>

<style scoped>
.booksContainer {
  max-width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
