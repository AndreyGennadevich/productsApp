<template>
  <div class="header">
    <div class="header__container">
      <button
        class="header-country"
        @click="$emit('openModal')"
      >
        <img
          src="@/assets/svg/marker.svg"
          alt="marker"
          class="header-country__marker"
        >
        {{ selectCity?.city }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LayoutTemplateHeader",
  emits: ["openModal"],
  computed: {
    ...mapState("citys", ["selectCity"]),
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 72px;
  background: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(39, 39, 39, 0.10);
}
.header__container {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1250px;
  padding: 0 25px;
  margin: 0 auto;
}

.header-country {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #272727;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  background-color: transparent;
  cursor: pointer;
}
</style>