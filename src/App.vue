<template>
  <LayoutTemplate>
    <router-view />
  </LayoutTemplate>
</template>

<script>
import LayoutTemplate from "@/views/layoutTemplate";

export default {
  name: "App",
  components: {
    LayoutTemplate,
  },
}
</script>

<style>
@import "/src/assets/fonts/FuturaPT/stylesheet.css";
@import "/src/assets/style/reset.css";

#app {
  font-family: "Futura PT", sans-serif;
  height: 100vh;
  width: 100%;
  overflow: auto;
}

</style>
