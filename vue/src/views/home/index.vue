<template>
  <div class="home">
    首页
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {

}
</script>

<style lang="less" scoped>
.home{
  padding: 20px;
}
</style>
