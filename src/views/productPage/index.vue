<template>
  <div class="products">
    <Loader
      v-if="productsLoad"
      desc="Товар загружается"
    />
    <div class="products__container">
      <div class="products-header">
        <button
          class="products-header__back"
          @click="goToBack"
        >
          <img
            class="products-header__image"
            src="~@/assets/svg/arrow-back.svg"
            alt="Назад"
          >
        </button>
        <h1 class="products-header__title">
          {{ selectCategory?.name }}
        </h1>
      </div>
      <div class="products__body">
        <aside class="prodructs-sidebar">
          <ul class="prodructs-sidebar__list">
            <li
              class="prodructs-sidebar__item"
              :class="{ 'prodructs-sidebar__item_active': $route.params.subcategorySlug === 'all'  }"
              @click="choiceSlug('all')"
            >
              Все продукты
            </li>
            <li
              v-for="item in setCategoryList"
              :key="item.id"
              class="prodructs-sidebar__item"
              :class="{ 'prodructs-sidebar__item_active': $route.params.subcategorySlug === item.slug  }"
              @click="choiceSlug(item.slug)"
            >
            <p class="prodructs-sideba__name">
              {{ item.name }}
            </p>
            </li>
          </ul>
        </aside>
        <div class="products-main">
          <TransitionGroup
            name="list"
            tag="ul"
            class="products-main__list"
          >
            <li
              class="products-main__item"
              v-for="prod in filteredList"
              :key="prod.id"
            >
              <img
                class="products-main__image"
                :src="prod.main_image_thumb_300"
                alt="Товар"
              >
              <div class="products-main__wrapper">
                <p class="products-main__category">
                  {{ prod.category.name }}
                </p>
                <h4 class="products-main__name">
                  {{ prod.present_name }}
                </h4>
                <p class="products-main__comment">
                  {{ prod.comment_name }}
                </p>
                <p class="products-main__price">
                  {{ prod.price }} ₽
                </p>
                <button
                  class="products-main__button"
                  :class="{ 'products-main__button_disable': !prod.allowed || !prod.available }"
                >
                  {{ prod.allowed && prod.available ? "В корзину" : "Нет в наличии" }}
                </button>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "ProductPage",
  components: {
    Loader,
  },
  computed: {
    ...mapState("category", ["selectCategory", "products", "productsLoad"]),
    filteredList() {
      const slug = this.$route.params.subcategorySlug
      if ( slug !== "all") {
        return this.products?.filter(i => i.tags.find(j => j.slug === slug) )
      }
      return this.products;
    },
    setCategoryList() {
      if (this.selectCategory?.children.length < 2) {
        return 0
      } else {
        return this.selectCategory?.children
      }
    },
  },
  methods: {
    ...mapActions("category", ["UpdateProducts"]),
    choiceSlug(subSlug) {
      this.$router.push({
        params: {
          subcategorySlug: subSlug
        }
      });
    },
    goToBack() {
      this.UpdateProducts(null);
      this.$router.push({ name: "MainPage" })
    }
  },
  beforeMount() {
    if (!this.selectCategory) {
      this.$router.push({ name: "MainPage" })
    }
  }
}
</script>

<style scoped>

.products__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1250px;
  margin: 0 auto;
  padding: 35px 25px;
}

.products-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.products-header__back {
  background-color: transparent;
  cursor: pointer;
}
.products-header__image {
  width: 30px;
  height: 30px;
}

.products-header__title {
  color: #272727;
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
}

.products__body {
  display: flex;
  flex-direction: column;
  gap: 34px;
}


.prodructs-sidebar__item {
  padding: 8px;
  color:  #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-bottom: 1px solid #E9EEF3;
  transition: background 0.1s;
  cursor: pointer;
}

.prodructs-sidebar__item:hover,
.prodructs-sidebar__item_active {
  background-color: #E9EEF3;
}

.products-main {
  max-width: 876px;
  margin: 0 auto;
}

.products-main__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.products-main__item {
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 5px 5px;
  background: #FFF;
  box-shadow: 0px 2px 10px 0px rgba(151, 151, 151, 0.20);
}

.products-main__image {
  max-width: 100%;
  min-height: 276px;
  min-width: 276px;
  margin: 0 auto;
}

.products-main__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 6px 22px 22px;
}

.products-main__category {
  margin-bottom: 4px;
  color: #979797;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.products-main__name {
  margin-bottom: 9px;
  text-align: center;
  color: #272727;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.products-main__comment {
  margin-bottom: 14px;
  color: #272727;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
}

.products-main__price {
  margin-top: auto;
  margin-bottom: 16px;
  color: #272727;
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
}

.products-main__button {
  position: relative;
  width: 212px;
  height: 40px;
  color: #FFF;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  border-radius: 24px;
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 100%);
  z-index: 0;
  cursor: pointer;
}

.products-main__button::before {
  content: "";
  position: absolute;
  top: 17px;
  left: 9px;
  width: 194px;
  height: 28px;
  border-radius: 24px;
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 100%);
  filter: blur(13.591408729553223px);
  visibility: hidden;
  transition: all 0.1s;
  z-index: -1;
}

.products-main__button:hover::before {
  visibility: visible;
}

.products-main__button_disable {
  color: rgba(39, 39, 39, 0.50);
  background: transparent;
  border: 2px solid rgba(151, 151, 151, 0.30);
  pointer-events: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (min-width: 650px) {
	.products__body {
		flex-direction: row;
	}

  .prodructs-sidebar {
    min-width: 240px;
  }
}

@media screen and (min-width: 992px) {
	.products-main__list {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (min-width: 1250px) {
	.products-main__list {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>