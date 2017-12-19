<template>
  <div
    v-show="visible"
    class="el-loading-mask"
    :style="{ backgroundColor: background || '' }"
    :class="[customClass, { 'is-fullscreen': fullscreen }]">
    <div class="el-loading-spinner">
      <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"/>
      </svg>
      <i v-else :class="spinner"></i>
      <p v-if="text" class="el-loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lts-loading",
    data(){
      return {}
    }
  }
</script>

<style scoped>

</style>
