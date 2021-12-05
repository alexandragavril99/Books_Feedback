<template>
  <div>
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
    </div>
    <div v-if="books" class="flex flex-center favoritesContainer">
      <CardComponent
        v-for="book in books"
        :key="book.id"
        :id="book.id"
        :title="book.data.title"
        :author="book.data.author"
        :price="book.data.price"
        :type="book.data.type"
        :fav="true"
        :addFav="false"
        @removeBook="getRemovedBook($event)"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent } from "vue";
import axios from "axios";
import CardComponent from "../components/Card.vue";
export default defineComponent({
  name: "Favorite",
  components: { CardComponent },
  setup() {
    let books = ref([]);
    let id = localStorage.getItem("id");
    let noFilterBooks = ref([]);

    onMounted(() => {
      axios
        .get(`http://localhost:8081/api/favorite/getFavoriteBooks/${id}`)
        .then((res) => {
          books.value = res.data;
          noFilterBooks.value = [...res.data];
          console.log(books.value);
        })
        .catch((err) => console.log(err));
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

    return {
      id,
      books,
      getRemovedBook(bookId) {
        books.value = books.value.filter((obj) => {
          console.log(obj.id);
          return obj.id !== bookId.id;
        });
        console.log(books.value);
      },
      sortAsc,
      sortDesc,
      noFilter,
    };
  },
});
</script>

<style scoped lang="scss">
.favoritesContainer {
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
