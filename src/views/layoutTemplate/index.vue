<template>
  <div class="layout-template">
    <Transition name="fade">
      <Modal
        v-if="modalState"
        @closeModal="modalState = false"
      />
    </Transition>
    <Header @openModal="modalState = true"/>
    <Transition name="fade">
      <slot />
    </Transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./LayoutTemplateHeader.vue";
import Modal from "./LayoutTemplateModal.vue";

export default {
  name: "layoutTemplate",
  components: {
    Header,
    Modal,
  },
  data() {
    return {
      modalState: false,
    };
  },
  methods: {
    ...mapActions("citys", ["InitDefaultCity"]),
    ...mapActions("category", ["GetCategories"]),
  },
  created() {
    this.InitDefaultCity();
    this.GetCategories();
  },
}
</script>

<style scoped>
.layout-template {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgba(247, 247, 247, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>