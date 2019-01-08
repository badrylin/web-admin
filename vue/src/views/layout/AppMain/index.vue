<template>
  <div class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppMain extends Vue {}

</script>

<style lang="less" scoped>
.app-main{
  height: calc(100vh - 50px);
  overflow-y: auto;
  position: relative;
  background-color: #EFF1F4;
}
</style>

