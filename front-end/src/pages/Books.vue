<template>
  <div>
    <div class="q-mt-md q-pa-sm btnsContainer">
      <q-btn class="q-mr-sm" color="accent" @click="sortAsc()"
        >Sort ascending</q-btn
      >
      <q-btn class="q-mr-sm" color="accent" @click="sortDesc()"
        >Sort descending</q-btn
      >
      <q-btn class="q-mr-sm" @click="noFilter()">No filter</q-btn>
    </div>
    <div v-if="books" class="q-pa-md booksContainer">
      <CardComponent
        v-for="book in books"
        :key="book.id"
        :id="book.id"
        :title="book.data.title"
        :author="book.data.author"
        :price="book.data.price"
        :type="book.data.type"
        :fav="false"
        :addFav="true"
      />
    </div>
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
    let noFilterBooks = ref([]);
    onMounted(async () => {
      axios
        .get("http://localhost:8081/api/book/getAllBooks")
        .then((response) => {
          books.value = response.data;
          noFilterBooks.value = [...response.data];
          console.log(books.value);
        });
    });

    function sortAsc() {
      books.value.sort((item1, item2) => item1.data.price - item2.data.price);
    }

    function sortDesc() {
      books.value.sort((item1, item2) => item2.data.price - item1.data.price);
    }

    function noFilter() {
      books.value = noFilterBooks.value;
    }

    return { books, sortAsc, sortDesc, noFilter };
  },
});
</script>

<style lang="scss" scoped>
.booksContainer {
  max-width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  @media (max-width: 1023px) {
    max-width: unset;
  }
}

.btnsContainer {
  display: flex;
  justify-content: flex-end;
}
</style>
