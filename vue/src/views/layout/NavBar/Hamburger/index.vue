<template>
  <div>
    <svg-icon
      name="hamburger"
      class="hamburger"
      :class="{'is-active':isActive}"
      @click.native="toggleClick"
    ></svg-icon>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Hamburger extends Vue {
  @Prop({ default: false }) isActive!: boolean;
  @Prop({ default: null }) toggleClick!: () => void;
}
</script>

<style lang="less" scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
  font-size: 20px;
  vertical-align: 0 !important;
  &.is-active {
    transform: rotate(0deg);
  }
}
</style>
