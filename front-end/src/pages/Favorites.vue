<template>
  <div v-if="books">
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

    onMounted(() => {
      axios
        .get(`http://localhost:8081/api/favorite/getFavoriteBooks/${id}`)
        .then((res) => {
          books.value = res.data;
          console.log(books.value);
        })
        .catch((err) => console.log(err));
    });

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
    };
  },
});
</script>

<style></style>
