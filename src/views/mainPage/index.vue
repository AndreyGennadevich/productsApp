<template>
  <div class="main">
    <Loader
      v-if="categoryLoad"
      desc="Категории загружаются..."
    />
    <div class="main__container">
      <h1 class="main__title">
        Категории товаров
      </h1>
      <TransitionGroup
        name="list"
        tag="ul"
        class="main__list"
      >
        <li
          v-for="item in categoriesList"
          :key="item.slug"
          class="main-item"
          :style="{ backgroundImage: `url(${item.image})` }"
          @click="choiceCategory(item.slug)"
        >
          <h3
            class="main-item__title"
            :style="{ color: item.text_color }"
          >
            {{ item.name }}
          </h3>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "MainPage",
  components: {
    Loader,
  },
  computed: {
    ...mapState("citys", ["selectCity"]),
    ...mapState("category", ["categoriesList", "categoryLoad"]),
  },
  methods: {
    ...mapActions("category", ["GetCategories", "ChoiceCategory"]),
    choiceCategory(slug) {
      this.ChoiceCategory(slug);
      this.$router.push({
        name: 'Products',
        params: {
          categorySlug: slug,
          subcategorySlug: "all"
        }
      });
    },
  },
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}

.main__container {
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  margin: 0 auto;
  padding: 35px 25px;
}

.main__title {
  margin-bottom: 20px;
  color: #272727;
  font-size: 44px;
  font-weight: 600;
  line-height: 44px;
}

.main__list {
  align-self: center;
  display: grid;
  grid-template-columns: 280px;
  grid-auto-rows: 152px;
  gap: 22px;
}

.main-item {
  padding: 20px;
  border-radius: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: boxShadow 0.1s;
}

.main-item:hover {
  box-shadow: 0px 2px 10px 0px rgba(151, 151, 151, 0.20);
}

.main-item__title {
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media screen and (min-width: 650px) {
	.main__list{
		grid-template-columns: repeat(2, 280px);
	}
}

@media screen and (min-width: 992px) {
	.main__list{
		grid-template-columns: repeat(3, 280px);
	}
}

@media screen and (min-width: 1250px) {
	.main__list{
		grid-template-columns: repeat(4, 280px);
	}
}
</style>