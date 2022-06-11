<template>
  <div class="container is-fluid mt-4 is-hidden-mobile">
    <content-loader :speed="2" primaryColor="#efefef" secondaryColor="#bababa">
      <rect x="0" y="0" rx="2" ry="2" width="400" height="35" />
      <rect x="0" y="40" rx="2" ry="2" width="400" height="20" />

      <rect x="10" y="80" rx="2" ry="2" width="380" height="45" />
    </content-loader>
  </div>

  <div class="container is-fluid mt-4 is-hidden-desktop">
    <content-loader
      height="400"
      :speed="2"
      primaryColor="#efefef"
      secondaryColor="#bababa"
    >
      <rect x="0" y="0" rx="2" ry="2" width="330" height="80" />
      <rect x="0" y="100" rx="2" ry="2" width="330" height="40" />

      <rect x="15" y="180" rx="2" ry="2" width="300" height="65" />
      <rect x="15" y="260" rx="2" ry="2" width="300" height="65" />
      <rect x="15" y="340" rx="2" ry="2" width="300" height="65" />
    </content-loader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ContentLoader } from "vue-content-loader";

export default defineComponent({
  name: "BarraLateral",
  components: {
    ContentLoader,
  },
});
</script>
